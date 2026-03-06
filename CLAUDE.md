# Facet — ベストアングル発見アプリ

## プロジェクト概要

「Facet」は、ユーザーの顔をカメラでスキャンし、その人固有の「ベストアングル（最も盛れる角度）」をAI分析で特定するWebアプリ。

### コアインサイト
人は自分の顔を鏡の反転像でしか知らない。他人が見ている自分と、自分が認識している自分にはズレがある。ふとした瞬間に撮られた写真が「盛れてる」のは、自分では意識しないナチュラルな角度が骨格・パーツ配置に最適だったから。

### アプリ名の由来
「Facet」= face + facet（角度 × 魅力の側面）

## 技術スタック

### 現在（プロトタイプ）
- 単一HTMLファイル（`facet-scanner-v2.html`）
- MediaPipe FaceLandmarker（CDN経由、ブラウザ内推論）
- バニラJS

### 移行先
- Next.js（DayStackと同じ開発環境）
- 将来的にSupabaseでデータ永続化の可能性あり
- 現時点では個人ツールとして利用

## コア技術: MediaPipe FaceLandmarker

### 初期化
```javascript
import { FaceLandmarker, FilesetResolver } from
  "@mediapipe/tasks-vision";

const fs = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm"
);
faceLandmarker = await FaceLandmarker.createFromOptions(fs, {
  baseOptions: {
    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    delegate: "GPU"
  },
  outputFaceBlendshapes: true,
  outputFacialTransformationMatrixes: true,
  runningMode: "VIDEO",
  numFaces: 1
});
```

### 顔角度の取得（Euler角）
`facialTransformationMatrixes`から4×4変換行列を取得し、YXZ分解でYaw/Pitch/Rollを算出。

**重要: Yawの符号規則**
- MediaPipeのraw Yaw: **ユーザーが自分から見て左を向く = 正の値**
- この符号をそのまま使用（反転不要）
- `matrixToEuler()`関数でそのまま`yaw * d`を返す

```javascript
function matrixToEuler(m) {
  // m = flat array of 16 (4x4 row-major)
  const r20 = m[8], r21 = m[9], r22 = m[10];
  // ... YXZ decomposition
  // yaw = atan2(r20, r22) → そのまま使用（反転しない）
}
```

### ランドマーク番号メモ
- 鼻先: 1
- 左目外側: 33, 左目内側: 133
- 右目外側: 263, 右目内側: 362
- 左目上: 159, 左目下: 145
- 右目上: 386, 右目下: 374
- 口左角: 61, 口右角: 291
- 顎先: 152, 額中央: 10
- 左耳: 234, 右耳: 454

## スキャン方式

### 連続サンプリング（30秒）
- ユーザーが自由に顔を動かす
- 5フレームごとに自動サンプリング（100〜150サンプル/回）
- リアルタイムでヒートマップにカバレッジを表示
- カバレッジの偏りをガイダンスで通知

### スナップショット撮影ルール
- 5サンプルに1回 + 新しい角度ゾーンに入ったら即撮影
- 全ビンにサムネイルが付くことを保証する

## スコアリングエンジン v3

### 設計思想
- 「盛れる」≠ 対称性。顎ライン・小顔効果・目の大きさ・立体感が重要
- 正面スキャンを基準（ベースライン）とし、各角度の相対評価で判定
- Sigmoid stretchingでスコア差を増幅し、ランキングの信頼性を確保
- v4: 印象論の研究知見を反映（Pitch非対称性、左頬ボーナス、3/4ビュー最適化、笑顔動的ウェイト）

### スコアリング配分 v5（約100点、相対スケール、正面比評価）
| 指標 | 重み（通常） | 重み（メガネ） | 説明 |
|------|-------------|--------------|------|
| 顎ライン改善度 | ~20 | ~22 | **正面比**で何%シャープになったか |
| 小顔改善度 | ~16 | ~18 | **正面比**で何%スリムに見えるか |
| 目の大きさ・開き | 14 | 8 | 目の縦横比 + 顔に対する相対サイズ |
| 立体感（3D depth） | 8 | 8 | 3/4ビュー(15-30°) ※ウェイト控えめ（二重カウント防止） |
| 笑顔の美しさ | 4-12(動的) | 4-12(動的) | 無表情時は自動減→他に再配分 |
| 対称性 | 10 | 6 | 左右パーツバランス |
| 安定性 | 8 | 10 | consistency + rollStability 統合 |
| 自然さ | ~5 | ~6 | 極端な表情へのペナルティ |
| Pitchボーナス | ~3 | ~3 | やや下向きで目が大きく見える（タイブレーカー） |
| 左頬ボーナス | 3 | 3 | 他者視点で左頬を見せると好印象（タイブレーカー） |

**v5の主な改善:**
- 顎ライン・小顔を正面比の「改善度」で評価 → 斜め角度の二重カウント解消
- depth3dのウェイトを大幅削減（14→8）→ faceSlim/jawlineとの重複を排除
- consistency + rollStability → stability に統合（11→9指標）

### 研究知見ソース
- Marshall et al. 2020: 下向きPitch→目が大きく顎が小さく見え魅力UP
- Lindsay et al. 2023: 3/4ビュー(15-30°)が最も好評
- Baranowski & Hecht 2018: 正面は信頼感高いが魅力はニュートラル
- Wake Forest Univ. / Selfiecity: 左頬を見せる方が好印象（右脳の感情制御）

### Sigmoid Stretching
```javascript
function sigmoidStretch(x, k) {
  return 1 / (1 + Math.exp(-k * (x - 0.5)));
}
// raw scores → 正規化(0-1) → sigmoid(k=3.5) → 30-98にマッピング
```

### ビニング
- 5°刻みのグリッドでサンプルをビン分け
- 各ビン最低2サンプル以上で評価対象
- TOP5を表示

### 理由生成（データドリブン）
正面を基準に、実測値の差分で説明する：
- 「正面と比べて顔幅が約8%スリムに見えます（横顔比 72% → 正面 78%）」
- 「左右の目の差が2.3%に収まります（正面では7.1%）」
- 「顎の角度が5°シャープになり、フェイスラインが引き締まります」

## アプリ画面遷移

1. **Loading** → MediaPipeモデルのダウンロード・初期化
2. **Scan** → 30秒の連続スキャン（ヒートマップ・カバレッジ表示）
3. **Analyzing** → ステップ表示付きの分析アニメーション
4. **Results** → TOP5ランキング + AVOIDカード + 再スキャン

## デザインシステム

### カラー
```
--bg: #0A0A0F（背景）
--surface: #14141F（カード）
--accent: #E8C872（ゴールド、アクセント）
--text: #F0EDE6（本文）
--text-muted: #8A8698
--success: #72E8A0（良い状態）
--warning: #E8A872（注意）
--danger: #E87272（悪い状態）
```

### フォント
- 見出し・スコア: Cormorant Garamond（serif）
- 本文: DM Sans
- ラベル・数値: DM Mono

### トーン
ダーク＆ゴールドのラグジュアリー系。高級感を保ちつつ、情報は具体的・データドリブン。

## 今後の開発候補

- [ ] 練習モード（ベストアングルへのリアルタイムガイド）
- [ ] 結果の保存・履歴（IndexedDB → Supabase）
- [ ] ビフォーアフター比較
- [ ] PWA化（オフライン対応）
- [ ] スコアリングの更なるチューニング（ユーザーフィードバック反映）
