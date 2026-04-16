const prompt = `당신은 일기 감성 분석 전문가입니다. 사용자가 작성한 일기를 읽고 다음 형식에 맞게 JSON으로 답변해주세요.

일기 내용:
\"\"\"
오늘 날씨가 따뜻하고 봄이 지나가는거 같아
\"\"\"

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

const GEMINI_API_KEY = 'AIzaSyAPcFo_mPg2-cVPjIpYN8C9UzbZLknjV9g';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent';
fetch(GEMINI_API_URL + '?key=' + GEMINI_API_KEY, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 }
  }),
}).then(r=>{console.log('status', r.status); return r.text()}).then(console.log);
