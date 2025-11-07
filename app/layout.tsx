import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import GNB from "@/components/GNB";

// 폰트 세팅
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// ✅ SEO 메타데이터
export const metadata: Metadata = {
  metadataBase: new URL("https://www.lkcustoms.co.kr"), // 실제 도메인
  title: {
    default: "LK 관세사무소 | 수출입 통관·FTA·관세환급 전문",
    template: "%s | LK 관세사무소",
  },
  description: "LK 관세사무소는 수출입 통관, FTA 컨설팅, 관세환급, 식품검역 등 다양한 관세 관련 업무를 전문적으로 수행합니다.",
  keywords: ["LK 관세사무소", "수입통관", "수출통관", "관세환급", "FTA 컨설팅", "식품검역", "수출입 대행", "세관 신고", "통관 전문"],
  authors: [{ name: "LK 관세사무소", url: "https://www.lkcustoms.co.kr" }],
  openGraph: {
    type: "website",
    url: "https://www.lkcustoms.co.kr",
    title: "LK 관세사무소 | 수출입 통관·FTA·관세환급 전문",
    description: "수출입 통관, FTA 협정, 관세환급, 식품검역 등 전문 서비스를 제공합니다.",
    siteName: "LK 관세사무소",
    images: [
      {
        url: "/img/SEO.png", // og 이미지 (public 폴더에)
        width: 1200,
        height: 630,
        alt: "LK 관세사무소 대표 이미지",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "LK 관세사무소 | 수출입 통관·FTA·관세환급 전문",
    description: "수출입 통관 및 FTA 컨설팅 전문, 관세 환급과 식품검역까지 한 번에.",
    images: ["/img/SEO.png"],
  },
  alternates: {
    canonical: "https://www.lkcustoms.co.kr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "naver-site-verification": "ac9ff0ce060a869f0f1826783d8ee5567fe32814",
  },
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <GNB />
        <main className="flex-1 min-h-screen">{children}</main>
        <footer className="mt-auto">
          <Footer />
        </footer>
        {/* ✅ 구조화 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "LK 관세사무소",
              url: "https://www.lkcustoms.co.kr",
              description: "수출입 통관, FTA 컨설팅, 관세환급, 식품검역 등 관세 전문 서비스 제공.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "KR",
                addressLocality: "서울특별시",
                addressRegion: "성동구",
              },
              telephone: "02-XXXX-XXXX",
            }),
          }}
        />
      </body>
    </html>
  );
}
