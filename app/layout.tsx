import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나의 감성 일기 | AI 감성 분석 다이어리",
  description: "AI가 분석해주는 나만의 감성 일기 서비스. 하루의 이야기를 적고 Gemini AI의 감성 분석을 받아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
