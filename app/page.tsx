"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult, EmotionType } from "./api/analyze/route";
import DesignC from "./components/DesignC";

export type { AnalysisResult, EmotionType };

export interface DiaryAppProps {
  diary: string;
  setDiary: (v: string) => void;
  isLoading: boolean;
  result: AnalysisResult | null;
  error: string | null;
  onAnalyze: () => void;
  onRestart: () => void;
  onSave: () => void;
  isListOpen: boolean;
  setIsListOpen: (v: boolean) => void;
  diaryList: { datetime: string; diary: string }[];
  isFetchingList: boolean;
  onFetchList: () => void;
}

export default function Home() {
  const [diary, setDiary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [diaryList, setDiaryList] = useState<{ datetime: string; diary: string }[]>([]);
  const [isFetchingList, setIsFetchingList] = useState(false);

  const onFetchList = useCallback(async () => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      alert("API URL이 환경 변수에 설정되지 않았습니다.");
      return;
    }
    
    setIsFetchingList(true);
    try {
      // GET 요청으로 데이터 가져오기
      const res = await fetch(scriptUrl);
      const data = await res.json();
      
      // 시트의 첫 번째 행(열 제목 헤더)이 데이터로 넘어오는 것을 방지
      const filteredData = data.filter((item: any) => item.datetime !== 'datetime');
      
      setDiaryList(filteredData);
      setIsListOpen(true);
    } catch (err) {
      console.error(err);
      alert("일기 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsFetchingList(false);
    }
  }, []);

  const onAnalyze = useCallback(async () => {
    if (!diary.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diary }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "오류가 발생했습니다.");
      } else {
        setResult(data as AnalysisResult);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [diary]);

  const onRestart = useCallback(() => {
    if (window.confirm("작성 중인 내용을 지우고 새로 시작하시겠습니까?")) {
      setDiary("");
      setResult(null);
      setError(null);
    }
  }, []);

  const onSave = useCallback(async () => {
    if (!result) {
      alert("먼저 AI 분석을 진행해 주세요!");
      return;
    }
    
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      alert("API URL이 환경 변수에 설정되지 않았습니다 (.env.local 확인)");
      return;
    }

    setIsLoading(true);
    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // 구글 앱스 스크립트 CORS 이슈 회피
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          datetime: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
          diary: diary,
        }),
      });

      alert("일기가 구글 시트에 안전하게 보관되었습니다!");
      
      // 초기 화면으로 리셋
      setDiary("");
      setResult(null);
      setError(null);
    } catch (err) {
      console.error(err);
      alert("일기 저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, [result, diary]);

  const props: DiaryAppProps = {
    diary,
    setDiary,
    isLoading,
    result,
    error,
    onAnalyze,
    onRestart,
    onSave,
    isListOpen,
    setIsListOpen,
    diaryList,
    isFetchingList,
    onFetchList,
  };

  return (
    <>
      <DesignC {...props} />
    </>
  );
}
