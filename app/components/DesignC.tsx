"use client";

/**
 * 시안 C — 민트 다크 (Material Design 3 / 다크 모드 + 민트 포인트)
 * 세련된 다크 테마, 민트/틸 포인트, 글래스모피즘 효과
 */

import { CSSProperties } from "react";
import type { DiaryAppProps } from "../page";
import { EMOTIONS, getTodayString } from "./emotions";

export default function DesignC({
  diary, setDiary, isLoading, result, error, onAnalyze, onRestart, onSave,
  isListOpen, setIsListOpen, diaryList, isFetchingList, onFetchList,
}: DiaryAppProps) {
  const { date, dayTime } = getTodayString();
  const activeEmotion = result?.emotion;

  const containerStyle: CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #0F1117 0%, #141828 50%, #0D1B2A 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px 16px 64px",
    fontFamily: "'Noto Sans KR', 'Roboto', sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const glassCard: CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
  };

  return (
    <div style={containerStyle}>
      {/* 배경 빛 효과 */}
      <div style={{
        position: "fixed", top: "-200px", left: "-200px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,200,180,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-150px", right: "-150px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(103,80,164,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "620px", position: "relative" }}>
        {/* 헤더 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#00C8B4",
                boxShadow: "0 0 12px rgba(0,200,180,0.8)",
              }} />
              <span style={{ fontSize: "12px", color: "#00C8B4", fontWeight: 600, letterSpacing: "0.1em" }}>
                DIARY MODE
              </span>
            </div>
            <h1 style={{ fontSize: "40px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1 }}>{date}</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "6px" }}>{dayTime}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            <button
              id="diary-list-btn-c"
              onClick={onFetchList}
              disabled={isFetchingList}
              style={{
                padding: "8px 16px", borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)",
                fontSize: "13px", fontWeight: 500, cursor: isFetchingList ? "not-allowed" : "pointer",
                opacity: isFetchingList ? 0.6 : 1,
              }}
            >
              {isFetchingList ? "⏳ 불러오는 중..." : "📋 일기 목록"}
            </button>
            <span style={{ fontSize: "13px", color: "#00C8B4", fontWeight: 600 }}>오늘의 일기 회고</span>
          </div>
        </div>

        {/* 일기 작성 카드 */}
        <div style={{ ...glassCard, padding: "28px", marginBottom: "16px" }}>
          <textarea
            id="diary-input-c"
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            placeholder="오늘 하루는 어떠셨나요? 당신의 마음을 들려주세요."
            style={{
              width: "100%", minHeight: "200px", border: "none", outline: "none",
              resize: "none", fontSize: "15px", lineHeight: "1.8",
              color: "rgba(255,255,255,0.85)",
              background: "transparent", fontFamily: "inherit",
              caretColor: "#00C8B4",
            }}
          />
          {/* 밑줄 장식 */}
          <div style={{
            height: "1px", background: "linear-gradient(90deg, #00C8B4, rgba(0,200,180,0.1))",
            marginBottom: "20px",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              {diary.length > 0 ? `${diary.length}자` : "마음을 자유롭게 적어보세요"}
            </span>
            <button
              id="analyze-btn-c"
              onClick={onAnalyze}
              disabled={isLoading || !diary.trim()}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "13px 24px", borderRadius: "100px",
                background: isLoading || !diary.trim()
                  ? "rgba(255,255,255,0.08)"
                  : "linear-gradient(135deg, #00C8B4, #00A896)",
                color: isLoading || !diary.trim() ? "rgba(255,255,255,0.3)" : "#031C1A",
                fontSize: "15px", fontWeight: 700,
                border: "none", cursor: isLoading || !diary.trim() ? "not-allowed" : "pointer",
                boxShadow: isLoading || !diary.trim() ? "none" : "0 0 24px rgba(0,200,180,0.4)",
                transition: "all 0.25s ease",
              }}
            >
              {isLoading ? (
                <span style={{ color: "rgba(255,255,255,0.5)" }}>⏳ 분석 중...</span>
              ) : "✨ AI 분석하기"}
            </button>
          </div>
        </div>

        {/* 감성 이모지 카드 */}
        <div style={{ ...glassCard, padding: "24px 28px", marginBottom: "16px" }}>
          {result?.title && (
            <div style={{ textAlign: "center", marginBottom: "20px", animation: "fadeSlideUp 0.3s ease-out" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>
                "{result.title}"
              </h2>
            </div>
          )}
          <p style={{ fontSize: "12px", color: "#00C8B4", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.08em" }}>
            EMOTION RADAR
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {EMOTIONS.map((em) => {
              const isActive = activeEmotion === em.key;
              return (
                <div key={em.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "68px", height: "68px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isActive ? "40px" : "28px",
                    background: isActive
                      ? `radial-gradient(circle, ${em.bg}30, transparent)`
                      : "rgba(255,255,255,0.04)",
                    border: isActive ? `2px solid ${em.color}80` : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isActive ? `0 0 20px ${em.glow}, inset 0 0 20px ${em.glow}20` : "none",
                    filter: isActive ? "none" : "grayscale(0.9) opacity(0.35)",
                    transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}>
                    {em.emoji}
                  </div>
                  <span style={{
                    fontSize: "11px",
                    color: isActive ? em.color : "rgba(255,255,255,0.3)",
                    fontWeight: isActive ? 700 : 400,
                    transition: "all 0.3s ease",
                  }}>
                    {em.label}
                  </span>
                  {isActive && result && (
                    <div style={{
                      padding: "2px 8px", borderRadius: "10px",
                      background: `${em.color}25`, border: `1px solid ${em.color}60`,
                      animation: "fadeSlideUp 0.3s ease-out",
                    }}>
                      <span style={{ fontSize: "11px", color: em.color, fontWeight: 700 }}>
                        {result.emotionScore[em.key]}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 분석 결과 */}
        {(result || error) && (
          <div style={{
            ...glassCard,
            padding: "24px 28px",
            animation: "fadeSlideUp 0.4s ease-out",
            borderColor: result ? `${EMOTIONS.find(e => e.key === result.emotion)?.color}30` : "rgba(211,47,47,0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#00C8B4",
                boxShadow: "0 0 8px rgba(0,200,180,0.8)",
              }} />
              <p style={{ fontSize: "12px", color: "#00C8B4", fontWeight: 600, letterSpacing: "0.08em" }}>
                AI ANALYSIS RESULT
              </p>
            </div>
            {error ? (
              <p style={{ color: "#EF5350", fontSize: "14px" }}>⚠️ {error}</p>
            ) : result ? (
              <>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {EMOTIONS.map(em => (
                    <div key={em.key} style={{
                      padding: "4px 12px", borderRadius: "20px",
                      background: result.emotion === em.key ? `${em.bg}20` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${result.emotion === em.key ? em.color + "60" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      <span style={{ fontSize: "13px" }}>{em.emoji}</span>
                      <span style={{ fontSize: "11px", color: result.emotion === em.key ? em.color : "rgba(255,255,255,0.4)", fontWeight: result.emotion === em.key ? 700 : 400 }}>
                        {result.emotionScore[em.key]}%
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "rgba(255,255,255,0.8)" }}>
                  {result.analysis}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
                  <button
                    onClick={onRestart}
                    style={{
                      padding: "10px 20px", borderRadius: "100px",
                      background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    🔄 새로 쓸래요
                  </button>
                  <button
                    onClick={onSave}
                    style={{
                      padding: "10px 20px", borderRadius: "100px",
                      background: "#00C8B4", border: "none",
                      color: "#031C1A", fontSize: "14px", fontWeight: 700, cursor: "pointer",
                      boxShadow: "0 0 16px rgba(0,200,180,0.3)",
                      transition: "all 0.2s"
                    }}
                  >
                    💾 간직할게요
                  </button>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      {/* 일기 목록 모달 */}
      {isListOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", zIndex: 100,
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: "20px", backdropFilter: "blur(4px)"
        }}>
          <div style={{
            ...glassCard,
            width: "100%", maxWidth: "600px", maxHeight: "80vh",
            background: "#141828", // 가독성을 위한 솔리드 배경
            display: "flex", flexDirection: "column",
            animation: "fadeSlideUp 0.3s ease-out"
          }}>
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <h2 style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700 }}>📖 지난 일기 모아보기</h2>
              <button 
                onClick={() => setIsListOpen(false)}
                style={{ background: "none", border: "none", color: "#FFFFFF", fontSize: "28px", cursor: "pointer", padding: "0 8px" }}
              >×</button>
            </div>
            <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
              {diaryList.length === 0 ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                  아직 작성된 일기가 없습니다.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {diaryList.slice().reverse().map((item, idx) => (
                    <div key={idx} style={{
                      padding: "16px", borderRadius: "16px",
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      <div style={{ fontSize: "12px", color: "#00C8B4", marginBottom: "8px", fontWeight: 600 }}>
                        {item.datetime}
                      </div>
                      <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                        {item.diary}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
