import { NextRequest } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent";

export type EmotionType = "happy" | "sad" | "angry" | "surprised" | "neutral";

export interface AnalysisResult {
  title?: string;
  emotion: EmotionType;
  analysis: string;
  emotionScore: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const { diary } = await request.json();


    if (!diary || diary.trim().length === 0) {
      return Response.json(
        { error: "일기 내용을 입력해주세요." },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
      return Response.json(
        { error: "API 키가 설정되지 않았습니다. .env.local 파일에 실제 키를 입력해주세요." },
        { status: 500 }
      );
    }

    const prompt = `당신은 일기 감성 분석 전문가입니다. 사용자가 작성한 일기를 읽고 다음 형식에 맞게 JSON으로 답변해주세요.

일기 내용:
"""
${diary}
"""

분석 요청:
1. 일기의 주된 감성을 5가지 중 하나로 분류하세요: happy(기쁨), sad(슬픔), angry(화남), surprised(놀람), neutral(평온)
2. 각 감성의 점수를 0~100으로 매기세요 (합산 100)
3. 따뜻하고 공감적인 한국어로 3~4문장으로 감성 분석 결과를 작성하세요
4. 일기 내용에 어울리는 짧고 감각적인 제목(15자 내외)을 하나 작성해주세요.

반드시 아래 JSON 형식으로만 응답하세요:
{
  "title": "일기 제목",
  "emotion": "happy|sad|angry|surprised|neutral",
  "emotionScore": {
    "happy": 숫자,
    "sad": 숫자,
    "angry": 숫자,
    "surprised": 숫자,
    "neutral": 숫자
  },
  "analysis": "분석 텍스트"
}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return Response.json(
        { error: "AI 분석 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return Response.json(
        { error: "AI 응답을 받지 못했습니다." },
        { status: 500 }
      );
    }

    // JSON 파싱 - 마크다운 코드블록 제거
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) ||
                      text.match(/```\s*([\s\S]*?)```/) ||
                      [null, text];
    const jsonText = jsonMatch[1]?.trim() || text.trim();

    const result: AnalysisResult = JSON.parse(jsonText);
    return Response.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "분석 중 예상치 못한 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
