import type { Metadata } from "next";
import { Nanum_Myeongjo, Gowun_Batang } from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-nanum-myeongjo" });
const gowunBatang = Gowun_Batang({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-gowun-batang" });

export const metadata: Metadata = {
  title: "첫돌 초대장 | 우진이의 돌잔치",
  description: "소중한 우리 우진이의 첫돌에 초대합니다.",
  keywords: ["첫돌", "돌잔치", "초대장", "우진이", "생일", "파티"],
  authors: [{ name: "우진이 가족" }],
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "첫돌 초대장 | 우진이의 돌잔치",
    description: "소중한 우리 우진이의 첫돌에 초대합니다.",
    images: [
      {
        url: "https://dol-project-45f85.web.app/images/woojin/woojin-01.jpeg?v=1",
        width: 1200,
        height: 630,
        alt: "우진이의 첫돌 초대장",
      },
    ],
    type: "website",
    siteName: "우진이의 첫돌 초대장",
  },
  twitter: {
    card: "summary_large_image",
    title: "첫돌 초대장 | 우진이의 돌잔치",
    description: "소중한 우리 우진이의 첫돌에 초대합니다.",
    images: ["https://dol-project-45f85.web.app/images/woojin/woojin-01.jpeg?v=1"],
  },
  metadataBase: new URL("https://dol-project-45f85.web.app"),
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
