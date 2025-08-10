import type { Metadata } from "next";
import { Nanum_Myeongjo, Gowun_Batang } from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-nanum-myeongjo" });
const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-gowun-batang" });

export const metadata: Metadata = {
  title: "첫돌 초대장 | 우진이의 돌잔치",
  description: "소중한 우리 우진이의 첫돌에 초대합니다.",
  openGraph: {
    title: "첫돌 초대장 | 우진이의 돌잔치",
    description: "소중한 우리 우진이의 첫돌에 초대합니다.",
    images: [
      {
        url: "/images/cover.svg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className={`${nanumMyeongjo.variable} ${gowunBatang.variable} antialiased`}>{children}</body>
    </html>
  );
}
