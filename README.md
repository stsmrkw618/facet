# Facet — ベストアングル発見アプリ

## クイックスタート

### 現在の状態
`index.html` が最新の動作するプロトタイプです。
ブラウザで直接開いて動作確認できます。

### Next.jsプロジェクトへの移行手順

```bash
# 1. プロジェクト作成
npx create-next-app@latest facet --typescript --tailwind --app --src-dir

# 2. MediaPipe依存追加
cd facet
npm install @mediapipe/tasks-vision

# 3. CLAUDE.mdをプロジェクトルートにコピー
cp CLAUDE.md ./CLAUDE.md

# 4. 開発サーバー起動
npm run dev
```

### 推奨ファイル構成（Next.js移行後）
```
facet/
├── CLAUDE.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # メインページ（画面遷移管理）
│   │   └── globals.css       # デザインシステムのCSS変数
│   ├── components/
│   │   ├── LoadingScreen.tsx
│   │   ├── ScanScreen.tsx    # カメラ + ヒートマップ + HUD
│   │   ├── AnalyzingScreen.tsx
│   │   ├── ResultsScreen.tsx # ランキング + AVOIDカード
│   │   └── Viewfinder.tsx    # カメラ映像 + オーバーレイ
│   ├── lib/
│   │   ├── mediapipe.ts      # FaceLandmarker初期化・管理
│   │   ├── angles.ts         # matrixToEuler, landmarkAngles
│   │   ├── scoring.ts        # スコアリングエンジンv3全体
│   │   ├── symmetry.ts       # analyzeSymmetry
│   │   ├── measurements.ts   # 各評価関数（jawline, faceSlim等）
│   │   └── heatmap.ts        # ヒートマップ描画
│   └── types/
│       └── index.ts          # 型定義
└── public/
```

## ファイル一覧

| ファイル | 説明 |
|---------|------|
| `CLAUDE.md` | Claude Code用のプロジェクト知識ベース |
| `README.md` | このファイル |
| `index.html` | 最新の動作するプロトタイプ（全機能入り） |
| `archive/` | 初期段階の古いファイル置き場 |
| `archive/facet-yaw-debug.html` | Yaw方向デバッグツール（左右確認用） |
| `archive/facet-camera-demo.html` | 初期カメラデモ（リアルタイム角度表示のみ） |
| `archive/best-angle-app.jsx` | 初期コンセプトUIプロトタイプ（React） |
