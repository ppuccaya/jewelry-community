import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사업가의 격식",
  description:
    "사업가이기 전에 한 인간으로서 더 잘 살고, 그것이 사업으로 연결되는 선순환 — 종로 주얼리 2세 프라이빗 모임",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
