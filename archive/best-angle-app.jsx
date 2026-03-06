import { useState } from "react";

// ─── App Concept ───
// アプリ名候補: "Facet" (面＝angle + facet＝魅力の側面)
// コンセプト: 誰にでもある「最高の角度」を発見し、体で覚えるまで練習するアプリ

const SCREENS = {
  HOME: "home",
  CONCEPT: "concept",
  FLOW: "flow",
  SCAN: "scan",
  RESULT: "result",
  PRACTICE: "practice",
};

// ─── Color System ───
const colors = {
  bg: "#0A0A0F",
  surface: "#14141F",
  surfaceHover: "#1C1C2E",
  accent: "#E8C872",
  accentSoft: "rgba(232, 200, 114, 0.12)",
  accentGlow: "rgba(232, 200, 114, 0.25)",
  text: "#F0EDE6",
  textMuted: "#8A8698",
  textDim: "#5A5668",
  border: "rgba(232, 200, 114, 0.08)",
  success: "#72E8A0",
  warning: "#E8A872",
  danger: "#E87272",
};

// ─── Shared Styles ───
const font = `'Cormorant Garamond', 'Georgia', serif`;
const fontSans = `'DM Sans', 'Helvetica Neue', sans-serif`;

export default function FacetApp() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [practiceAngle, setPracticeAngle] = useState(null);

  return (
    <div
      style={{
        fontFamily: fontSans,
        background: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Ambient background glow */}
      <div
        style={{
          position: "fixed",
          top: "-30%",
          right: "-20%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />

      {screen === SCREENS.HOME && (
        <HomeScreen onNavigate={setScreen} />
      )}
      {screen === SCREENS.CONCEPT && (
        <ConceptScreen onNavigate={setScreen} />
      )}
      {screen === SCREENS.FLOW && (
        <FlowScreen onNavigate={setScreen} />
      )}
      {screen === SCREENS.SCAN && (
        <ScanScreen
          onNavigate={setScreen}
          step={analysisStep}
          setStep={setAnalysisStep}
        />
      )}
      {screen === SCREENS.RESULT && (
        <ResultScreen onNavigate={setScreen} onSelectAngle={setPracticeAngle} />
      )}
      {screen === SCREENS.PRACTICE && (
        <PracticeScreen
          onNavigate={setScreen}
          targetAngle={practiceAngle}
        />
      )}
    </div>
  );
}

// ════════════════════════════════════════
// HOME SCREEN
// ════════════════════════════════════════
function HomeScreen({ onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        animation: "fadeIn 1s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      `}</style>

      {/* Logo Mark */}
      <div style={{ position: "relative", marginBottom: "2.5rem" }}>
        <div
          style={{
            width: 90,
            height: 90,
            border: `1.5px solid ${colors.accent}`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Inner diamond */}
          <div
            style={{
              width: 28,
              height: 28,
              border: `1.5px solid ${colors.accent}`,
              transform: "rotate(45deg)",
              opacity: 0.8,
            }}
          />
          {/* Orbiting dot */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              animation: "rotate 8s linear infinite",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                background: colors.accent,
                borderRadius: "50%",
                position: "absolute",
                top: -3,
                left: "50%",
                marginLeft: -3,
              }}
            />
          </div>
        </div>
      </div>

      {/* App name */}
      <h1
        style={{
          fontFamily: font,
          fontSize: "3.5rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          margin: 0,
          color: colors.accent,
        }}
      >
        FACET
      </h1>

      <p
        style={{
          fontFamily: font,
          fontSize: "1.1rem",
          fontWeight: 300,
          color: colors.textMuted,
          letterSpacing: "0.2em",
          marginTop: "0.5rem",
          marginBottom: "3rem",
        }}
      >
        あなたの最高の角度を、見つける
      </p>

      {/* Navigation Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          width: "100%",
          maxWidth: 360,
        }}
      >
        {[
          {
            key: "concept",
            label: "CONCEPT",
            sub: "アプリの全体像",
            screen: SCREENS.CONCEPT,
          },
          {
            key: "flow",
            label: "USER FLOW",
            sub: "画面遷移と機能設計",
            screen: SCREENS.FLOW,
          },
          {
            key: "demo",
            label: "DEMO",
            sub: "プロトタイプを体験",
            screen: SCREENS.SCAN,
          },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.screen)}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === item.key ? colors.surfaceHover : colors.surface,
              border: `1px solid ${hovered === item.key ? colors.accent : colors.border}`,
              borderRadius: 12,
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: hovered === item.key ? "translateX(4px)" : "none",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: fontSans,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color:
                    hovered === item.key ? colors.accent : colors.textMuted,
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: colors.text,
                  marginTop: "0.25rem",
                }}
              >
                {item.sub}
              </div>
            </div>
            <span
              style={{
                color:
                  hovered === item.key ? colors.accent : colors.textDim,
                fontSize: "1.2rem",
                transition: "color 0.3s",
              }}
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// CONCEPT SCREEN
// ════════════════════════════════════════
function ConceptScreen({ onNavigate }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        maxWidth: 640,
        margin: "0 auto",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <BackButton onClick={() => onNavigate(SCREENS.HOME)} />

      <SectionTitle number="01" title="INSIGHT" />
      <ConceptCard>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.8, margin: 0 }}>
          人は自分の顔を<Highlight>鏡の中の反転像</Highlight>でしか知らない。
          他人が見ている自分と、自分が認識している自分には<Highlight>ズレ</Highlight>がある。
        </p>
        <Divider />
        <p style={{ fontSize: "0.95rem", lineHeight: 1.8, margin: 0, color: colors.textMuted }}>
          ふとした瞬間に人に撮られた写真が「盛れてる」のは、
          自分では意識しないナチュラルな角度が、
          実はその人の骨格・パーツ配置に最適だったから。
        </p>
      </ConceptCard>

      <SectionTitle number="02" title="CORE VALUE" />
      <ConceptCard>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            {
              icon: "◇",
              title: "発見する",
              desc: "顔の左右差・骨格・パーツ比率をAIが分析し、あなた固有の「ベストアングル」を特定",
            },
            {
              icon: "△",
              title: "理解する",
              desc: "なぜその角度が良いのか、顔の構造に基づいた理由を視覚的に解説",
            },
            {
              icon: "○",
              title: "身につける",
              desc: "リアルタイムガイド付き練習モードで、ベストアングルを「体の記憶」に変える",
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  fontFamily: font,
                  fontSize: "1.5rem",
                  color: colors.accent,
                  lineHeight: 1,
                  marginTop: 2,
                  flexShrink: 0,
                  width: 28,
                  textAlign: "center",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    marginBottom: "0.3rem",
                    color: colors.accent,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: "0.85rem", lineHeight: 1.7, color: colors.textMuted }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ConceptCard>

      <SectionTitle number="03" title="TECHNOLOGY" />
      <ConceptCard>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Face Landmarks", desc: "MediaPipe / TensorFlow.js で468点のランドマーク検出" },
            { label: "Symmetry Analysis", desc: "左右パーツの位置差・大きさ差を数値化" },
            { label: "Angle Scoring", desc: "Yaw / Pitch / Roll ごとのスコアリングモデル" },
            { label: "Real-time Guide", desc: "カメラ映像にオーバーレイでリアルタイム誘導" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                padding: "0.5rem 0",
                borderBottom: i < 3 ? `1px solid ${colors.border}` : "none",
              }}
            >
              <code
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  color: colors.accent,
                  background: colors.accentSoft,
                  padding: "0.2rem 0.5rem",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </code>
              <span style={{ fontSize: "0.8rem", color: colors.textMuted }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </ConceptCard>

      <SectionTitle number="04" title="DIFFERENTIATOR" />
      <ConceptCard>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
          <thead>
            <tr>
              <th style={thStyle}></th>
              <th style={{ ...thStyle, color: colors.accent }}>Facet</th>
              <th style={thStyle}>加工アプリ</th>
              <th style={thStyle}>自撮りTips</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["個人最適化", "◎", "×", "△"],
              ["科学的根拠", "◎", "×", "△"],
              ["練習機能", "◎", "×", "×"],
              ["加工不要", "◎", "×", "○"],
              ["再現性", "◎", "×", "△"],
            ].map(([label, ...vals], i) => (
              <tr key={i}>
                <td style={tdStyle}>{label}</td>
                {vals.map((v, j) => (
                  <td
                    key={j}
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      color: j === 0 ? colors.accent : colors.textDim,
                      fontWeight: j === 0 ? 600 : 400,
                    }}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ConceptCard>

      <div style={{ height: "3rem" }} />
    </div>
  );
}

const thStyle = {
  textAlign: "center",
  padding: "0.6rem 0.4rem",
  borderBottom: `1px solid ${colors.border}`,
  color: colors.textMuted,
  fontWeight: 500,
  fontSize: "0.75rem",
};
const tdStyle = {
  padding: "0.6rem 0.4rem",
  borderBottom: `1px solid ${colors.border}`,
  color: colors.textMuted,
  fontSize: "0.8rem",
};

// ════════════════════════════════════════
// FLOW SCREEN
// ════════════════════════════════════════
function FlowScreen({ onNavigate }) {
  const steps = [
    {
      id: "onboard",
      title: "オンボーディング",
      desc: "アプリの価値を伝え、カメラ許可を取得",
      details: [
        "「加工じゃない、あなた本来の魅力を引き出す」",
        "3ステップの簡潔な説明",
        "カメラアクセス許可",
      ],
    },
    {
      id: "scan",
      title: "フェイススキャン",
      desc: "複数角度から顔を撮影し、3D分析",
      details: [
        "正面→左→右→上→下の5アングル撮影",
        "リアルタイムで撮影ガイド表示",
        "468ランドマークの検出・記録",
      ],
    },
    {
      id: "analysis",
      title: "AI分析",
      desc: "骨格・左右差・パーツ比率を総合評価",
      details: [
        "顔の左右対称性スコア",
        "各パーツのサイズ比率",
        "顎ライン・頬骨の立体感",
        "光と影が最も映える角度の算出",
      ],
    },
    {
      id: "result",
      title: "結果表示",
      desc: "ベスト3アングルを理由付きで提示",
      details: [
        "1st / 2nd / 3rd ベストアングル",
        "各アングルの強み解説",
        "「避けた方がいい角度」も注意として表示",
        "シーン別おすすめ（自撮り・集合写真・証明写真）",
      ],
    },
    {
      id: "practice",
      title: "練習モード",
      desc: "リアルタイムガイドでアングルを体得",
      details: [
        "画面にターゲット角度をオーバーレイ表示",
        "顔の現在角度とのズレをリアルタイム表示",
        "「もう少し左」「顎を引いて」等の音声/テキストガイド",
        "合格ラインに達したらシャッター＆保存",
        "日々の練習記録とスコア推移",
      ],
    },
    {
      id: "share",
      title: "共有・記録",
      desc: "ビフォーアフターの成長を可視化",
      details: [
        "初回スキャン vs 最新の比較",
        "「ベストアングル習得度」のスコア推移グラフ",
        "友達招待・シェア機能",
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        maxWidth: 640,
        margin: "0 auto",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <BackButton onClick={() => onNavigate(SCREENS.HOME)} />

      <h2
        style={{
          fontFamily: font,
          fontSize: "1.8rem",
          fontWeight: 300,
          color: colors.accent,
          marginBottom: "0.5rem",
        }}
      >
        User Flow
      </h2>
      <p style={{ color: colors.textMuted, fontSize: "0.85rem", marginBottom: "2rem" }}>
        6つのステップで「発見→理解→習得」を実現
      </p>

      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 19,
            top: 0,
            bottom: 0,
            width: 1,
            background: `linear-gradient(to bottom, ${colors.accent}, ${colors.border})`,
          }}
        />

        {steps.map((step, i) => (
          <div
            key={step.id}
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "1.5rem",
              position: "relative",
            }}
          >
            {/* Node */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1.5px solid ${colors.accent}`,
                background: colors.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: font,
                fontSize: "0.9rem",
                color: colors.accent,
                zIndex: 1,
              }}
            >
              {i + 1}
            </div>

            {/* Card */}
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: "1.25rem",
                flex: 1,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  marginBottom: "0.25rem",
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: colors.textMuted,
                  marginBottom: "0.75rem",
                }}
              >
                {step.desc}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                {step.details.map((d, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: "0.75rem",
                      color: colors.textDim,
                      paddingLeft: "0.75rem",
                      borderLeft: `2px solid ${colors.accentSoft}`,
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: "3rem" }} />
    </div>
  );
}

// ════════════════════════════════════════
// SCAN SCREEN (Demo)
// ════════════════════════════════════════
function ScanScreen({ onNavigate, step, setStep }) {
  const angles = [
    { label: "正面", icon: "○", yaw: 0, pitch: 0 },
    { label: "左15°", icon: "◐", yaw: -15, pitch: 0 },
    { label: "右15°", icon: "◑", yaw: 15, pitch: 0 },
    { label: "やや上", icon: "△", yaw: 0, pitch: -10 },
    { label: "やや下", icon: "▽", yaw: 0, pitch: 10 },
  ];

  const currentAngle = angles[Math.min(step, angles.length - 1)];
  const isComplete = step >= angles.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <div style={{ padding: "1.5rem 2rem" }}>
        <BackButton onClick={() => { setStep(0); onNavigate(SCREENS.HOME); }} />
      </div>

      {/* Camera viewfinder area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Simulated camera frame */}
        <div
          style={{
            width: 260,
            height: 340,
            borderRadius: 24,
            border: `2px solid ${isComplete ? colors.success : colors.accent}`,
            background: "rgba(20,20,35,0.6)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "border-color 0.5s",
          }}
        >
          {/* Face outline */}
          <svg width="140" height="190" viewBox="0 0 140 190" fill="none">
            <ellipse
              cx="70"
              cy="85"
              rx="55"
              ry="70"
              stroke={isComplete ? colors.success : colors.accent}
              strokeWidth="1.5"
              strokeDasharray={isComplete ? "none" : "4 4"}
              opacity="0.5"
              style={{
                transform: isComplete
                  ? "none"
                  : `rotate(${currentAngle.yaw * 0.3}deg)`,
                transformOrigin: "center",
                transition: "transform 0.5s",
              }}
            />
            {/* Eyes */}
            <circle cx="48" cy="75" r="4" fill={colors.accent} opacity="0.3" />
            <circle cx="92" cy="75" r="4" fill={colors.accent} opacity="0.3" />
            {/* Nose */}
            <line x1="70" y1="82" x2="70" y2="100" stroke={colors.accent} strokeWidth="1" opacity="0.2" />
            {/* Mouth */}
            <path d="M55 115 Q70 125 85 115" stroke={colors.accent} strokeWidth="1" opacity="0.2" fill="none" />

            {/* Direction arrow */}
            {!isComplete && (
              <text
                x="70"
                y="170"
                textAnchor="middle"
                fill={colors.accent}
                fontSize="28"
                style={{ transition: "all 0.3s" }}
              >
                {currentAngle.icon}
              </text>
            )}
            {isComplete && (
              <text
                x="70"
                y="170"
                textAnchor="middle"
                fill={colors.success}
                fontSize="22"
              >
                ✓
              </text>
            )}
          </svg>

          {/* Corner brackets */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...pos,
                width: 20,
                height: 20,
                borderColor: isComplete ? colors.success : colors.accent,
                borderStyle: "solid",
                borderWidth: 0,
                ...(i === 0 && { borderTopWidth: 2, borderLeftWidth: 2 }),
                ...(i === 1 && { borderTopWidth: 2, borderRightWidth: 2 }),
                ...(i === 2 && { borderBottomWidth: 2, borderLeftWidth: 2 }),
                ...(i === 3 && { borderBottomWidth: 2, borderRightWidth: 2 }),
                borderRadius: 4,
                transition: "border-color 0.5s",
              }}
            />
          ))}
        </div>

        {/* Instruction */}
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          {!isComplete ? (
            <>
              <div
                style={{
                  fontFamily: font,
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  marginBottom: "0.5rem",
                }}
              >
                {currentAngle.label}を向いてください
              </div>
              <div style={{ fontSize: "0.8rem", color: colors.textMuted }}>
                ステップ {step + 1} / {angles.length}
              </div>
            </>
          ) : (
            <div
              style={{
                fontFamily: font,
                fontSize: "1.3rem",
                fontWeight: 400,
                color: colors.success,
              }}
            >
              スキャン完了！
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {angles.map((_, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i < step ? colors.accent : i === step && !isComplete ? colors.accent : colors.textDim,
                opacity: i < step ? 1 : i === step && !isComplete ? 0.5 : 0.2,
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            if (isComplete) {
              setStep(0);
              onNavigate(SCREENS.RESULT);
            } else {
              setStep(step + 1);
            }
          }}
          style={{
            marginTop: "2rem",
            padding: isComplete ? "0.8rem 2.5rem" : "0",
            width: isComplete ? "auto" : 64,
            height: isComplete ? "auto" : 64,
            borderRadius: isComplete ? 30 : "50%",
            border: `2px solid ${isComplete ? colors.success : colors.accent}`,
            background: isComplete ? colors.success : "transparent",
            color: isComplete ? colors.bg : colors.accent,
            fontSize: isComplete ? "0.85rem" : "1.5rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {isComplete ? "分析結果を見る →" : "◉"}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// RESULT SCREEN
// ════════════════════════════════════════
function ResultScreen({ onNavigate, onSelectAngle }) {
  const [expanded, setExpanded] = useState(null);

  const results = [
    {
      rank: "1st",
      angle: "左15° やや下",
      score: 94,
      yaw: -15,
      pitch: 8,
      reasons: [
        "左目がやや大きく、左側を見せることで目力が増す",
        "顎ラインの左側がよりシャープで輪郭が引き締まる",
        "頬骨の左側が高く、光が自然に当たりやすい",
      ],
      scenes: ["自撮り", "ポートレート", "プロフィール写真"],
    },
    {
      rank: "2nd",
      angle: "右10° 正面",
      score: 87,
      yaw: 10,
      pitch: 0,
      reasons: [
        "鼻筋のラインがまっすぐに見える",
        "左右の目のバランスが最も均等になる角度",
      ],
      scenes: ["集合写真", "ビデオ通話"],
    },
    {
      rank: "3rd",
      angle: "正面 やや上",
      score: 82,
      yaw: 0,
      pitch: -8,
      reasons: [
        "顎が引き締まり、フェイスラインがすっきり",
        "目の開きが大きくなり、表情が明るい印象に",
      ],
      scenes: ["証明写真", "正式な場面"],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        maxWidth: 640,
        margin: "0 auto",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <BackButton onClick={() => onNavigate(SCREENS.HOME)} />

      <h2
        style={{
          fontFamily: font,
          fontSize: "1.8rem",
          fontWeight: 300,
          color: colors.accent,
          marginBottom: "0.25rem",
        }}
      >
        Your Best Angles
      </h2>
      <p style={{ color: colors.textMuted, fontSize: "0.85rem", marginBottom: "2rem" }}>
        あなたの顔の特徴に基づく、最適な角度TOP3
      </p>

      {results.map((r, i) => (
        <div
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          style={{
            background: colors.surface,
            border: `1px solid ${expanded === i ? colors.accent : colors.border}`,
            borderRadius: 16,
            padding: "1.25rem",
            marginBottom: "1rem",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Rank badge */}
              <div
                style={{
                  fontFamily: font,
                  fontSize: i === 0 ? "1.5rem" : "1.2rem",
                  color: i === 0 ? colors.accent : colors.textMuted,
                  fontWeight: 400,
                  width: 44,
                }}
              >
                {r.rank}
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {r.angle}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: colors.textMuted,
                    marginTop: "0.15rem",
                  }}
                >
                  Yaw {r.yaw}° / Pitch {r.pitch}°
                </div>
              </div>
            </div>

            {/* Score */}
            <div
              style={{
                fontFamily: font,
                fontSize: "1.8rem",
                fontWeight: 300,
                color: i === 0 ? colors.accent : colors.textMuted,
              }}
            >
              {r.score}
            </div>
          </div>

          {/* Expanded details */}
          {expanded === i && (
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: `1px solid ${colors.border}`,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: colors.textDim,
                  marginBottom: "0.5rem",
                }}
              >
                WHY THIS WORKS
              </div>
              {r.reasons.map((reason, j) => (
                <div
                  key={j}
                  style={{
                    fontSize: "0.8rem",
                    color: colors.textMuted,
                    padding: "0.4rem 0",
                    paddingLeft: "0.75rem",
                    borderLeft: `2px solid ${colors.accentSoft}`,
                    marginBottom: "0.25rem",
                    lineHeight: 1.6,
                  }}
                >
                  {reason}
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                {r.scenes.map((s, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: 20,
                      background: colors.accentSoft,
                      color: colors.accent,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAngle({ yaw: r.yaw, pitch: r.pitch, label: r.angle });
                  onNavigate(SCREENS.PRACTICE);
                }}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 10,
                  border: `1px solid ${colors.accent}`,
                  background: "transparent",
                  color: colors.accent,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                この角度を練習する →
              </button>
            </div>
          )}
        </div>
      ))}

      <div style={{ height: "2rem" }} />
    </div>
  );
}

// ════════════════════════════════════════
// PRACTICE SCREEN
// ════════════════════════════════════════
function PracticeScreen({ onNavigate, targetAngle }) {
  const [currentYaw, setCurrentYaw] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const target = targetAngle || { yaw: -15, pitch: 8, label: "左15° やや下" };
  const yawDiff = Math.abs(currentYaw - target.yaw);
  const pitchDiff = Math.abs(currentPitch - target.pitch);
  const totalDiff = yawDiff + pitchDiff;

  const isGood = totalDiff < 8;
  const isPerfect = totalDiff < 3;

  // Simulate face movement with mouse
  const handleMouseMove = (e) => {
    if (isLocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setCurrentYaw(Math.round(x));
    setCurrentPitch(Math.round(y));
  };

  const handleCapture = () => {
    if (isPerfect) {
      setIsLocked(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setTimeout(() => setIsLocked(false), 1500);
    }
  };

  const statusColor = isPerfect
    ? colors.success
    : isGood
    ? colors.warning
    : colors.danger;

  const guidance = [];
  if (currentYaw > target.yaw + 4) guidance.push("← もう少し左へ");
  if (currentYaw < target.yaw - 4) guidance.push("→ もう少し右へ");
  if (currentPitch > target.pitch + 4) guidance.push("↑ 顎を引いて");
  if (currentPitch < target.pitch - 4) guidance.push("↓ 少し上を向いて");
  if (isPerfect) guidance.push("✦ パーフェクト！");
  else if (isGood) guidance.push("○ いい感じ！あと少し");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.6s ease",
      }}
    >
      <div style={{ padding: "1.5rem 2rem" }}>
        <BackButton onClick={() => onNavigate(SCREENS.RESULT)} />
      </div>

      {/* Practice area */}
      <div
        onMouseMove={handleMouseMove}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 2rem 2rem",
          cursor: "crosshair",
          userSelect: "none",
        }}
      >
        {/* Target info */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: colors.textDim,
              marginBottom: "0.25rem",
            }}
          >
            TARGET ANGLE
          </div>
          <div
            style={{
              fontFamily: font,
              fontSize: "1.3rem",
              fontWeight: 400,
              color: colors.accent,
            }}
          >
            {target.label}
          </div>
        </div>

        {/* Viewfinder with guide overlay */}
        <div
          style={{
            width: 260,
            height: 340,
            borderRadius: 24,
            border: `2px solid ${statusColor}`,
            background: "rgba(20,20,35,0.6)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s",
            boxShadow: isPerfect ? `0 0 30px ${colors.success}40` : "none",
          }}
        >
          {/* Target position (ghost) */}
          <svg
            width="140"
            height="190"
            viewBox="0 0 140 190"
            fill="none"
            style={{
              position: "absolute",
              opacity: 0.2,
            }}
          >
            <ellipse
              cx="70"
              cy="85"
              rx="55"
              ry="70"
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeDasharray="6 4"
              style={{
                transform: `rotate(${target.yaw * 0.3}deg) translateY(${target.pitch * 0.5}px)`,
                transformOrigin: "center",
              }}
            />
          </svg>

          {/* Current position (active) */}
          <svg width="140" height="190" viewBox="0 0 140 190" fill="none">
            <ellipse
              cx="70"
              cy="85"
              rx="55"
              ry="70"
              stroke={statusColor}
              strokeWidth="2"
              style={{
                transform: `rotate(${currentYaw * 0.3}deg) translateY(${currentPitch * 0.5}px)`,
                transformOrigin: "center",
                transition: "transform 0.1s",
              }}
            />
            <circle
              cx="48"
              cy="75"
              r="4"
              fill={statusColor}
              opacity="0.5"
              style={{
                transform: `translateX(${currentYaw * 0.2}px)`,
                transition: "transform 0.1s",
              }}
            />
            <circle
              cx="92"
              cy="75"
              r="4"
              fill={statusColor}
              opacity="0.5"
              style={{
                transform: `translateX(${currentYaw * 0.2}px)`,
                transition: "transform 0.1s",
              }}
            />
          </svg>

          {/* Lock overlay */}
          {isLocked && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 22,
                background: `${colors.success}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  fontFamily: font,
                  fontSize: "2rem",
                  color: colors.success,
                }}
              >
                ✓ Captured!
              </div>
            </div>
          )}
        </div>

        {/* Guidance text */}
        <div
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            minHeight: 48,
          }}
        >
          {guidance.map((g, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.95rem",
                color: statusColor,
                fontWeight: isPerfect ? 600 : 400,
                lineHeight: 1.8,
              }}
            >
              {g}
            </div>
          ))}
        </div>

        {/* Angle meters */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "1rem",
          }}
        >
          <AngleMeter label="YAW" current={currentYaw} target={target.yaw} />
          <AngleMeter label="PITCH" current={currentPitch} target={target.pitch} />
        </div>

        {/* Capture button */}
        <button
          onClick={handleCapture}
          disabled={!isPerfect || isLocked}
          style={{
            marginTop: "1.5rem",
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: `3px solid ${isPerfect ? colors.success : colors.textDim}`,
            background: isPerfect ? `${colors.success}20` : "transparent",
            cursor: isPerfect && !isLocked ? "pointer" : "default",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: isPerfect ? colors.success : colors.textDim,
              opacity: isPerfect ? 1 : 0.2,
              transition: "all 0.3s",
            }}
          />
        </button>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.6rem", color: colors.textDim, letterSpacing: "0.1em" }}>
              STREAK
            </div>
            <div style={{ fontFamily: font, fontSize: "1.5rem", color: colors.accent }}>
              {streak}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.6rem", color: colors.textDim, letterSpacing: "0.1em" }}>
              BEST
            </div>
            <div style={{ fontFamily: font, fontSize: "1.5rem", color: colors.textMuted }}>
              {bestStreak}
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: "0.7rem",
            color: colors.textDim,
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          ※ デモではマウスで顔の角度をシミュレーション。
          実際のアプリではカメラ映像から検出します。
        </p>
      </div>
    </div>
  );
}

// ─── Shared Components ───

function AngleMeter({ label, current, target }) {
  const diff = Math.abs(current - target);
  const color = diff < 3 ? colors.success : diff < 8 ? colors.warning : colors.danger;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "0.6rem", color: colors.textDim, letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.25rem" }}>
        <span style={{ fontFamily: font, fontSize: "1.2rem", color, transition: "color 0.2s" }}>
          {current > 0 ? "+" : ""}{current}°
        </span>
        <span style={{ fontSize: "0.7rem", color: colors.textDim }}>
          / {target > 0 ? "+" : ""}{target}°
        </span>
      </div>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: colors.textMuted,
        fontSize: "0.8rem",
        cursor: "pointer",
        padding: "0.25rem 0",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1.5rem",
      }}
    >
      ← Back
    </button>
  );
}

function SectionTitle({ number, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.75rem",
        marginTop: "2rem",
        marginBottom: "0.75rem",
      }}
    >
      <span
        style={{
          fontFamily: font,
          fontSize: "0.8rem",
          color: colors.textDim,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily: fontSans,
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: colors.accent,
        }}
      >
        {title}
      </span>
    </div>
  );
}

function ConceptCard({ children }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

function Highlight({ children }) {
  return (
    <span
      style={{
        color: colors.accent,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: colors.border,
        margin: "1rem 0",
      }}
    />
  );
}
