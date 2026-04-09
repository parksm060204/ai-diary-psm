import type { EmotionType } from "../page";

export const EMOTIONS: {
  key: EmotionType;
  emoji: string;
  label: string;
  color: string;
  bg: string;
  glow: string;
}[] = [
  { key: "happy",     emoji: "😊", label: "기쁨",   color: "#F9A825", bg: "#FFF9C4", glow: "rgba(249,168,37,0.5)" },
  { key: "sad",       emoji: "😢", label: "슬픔",   color: "#0288D1", bg: "#E1F5FE", glow: "rgba(2,136,209,0.5)" },
  { key: "angry",     emoji: "😠", label: "화남",   color: "#D32F2F", bg: "#FFEBEE", glow: "rgba(211,47,47,0.5)" },
  { key: "surprised", emoji: "😲", label: "놀람",   color: "#E64A19", bg: "#FBE9E7", glow: "rgba(230,74,25,0.5)" },
  { key: "neutral",   emoji: "😐", label: "평온",   color: "#546E7A", bg: "#ECEFF1", glow: "rgba(84,110,122,0.5)" },
];

export function getTodayString() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayName = days[now.getDay()];
  const hour = now.getHours();
  const minute = now.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "오후" : "오전";
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return {
    date: `${month}월 ${day}일`,
    dayTime: `${dayName} • ${ampm} ${h}:${minute}`,
  };
}
