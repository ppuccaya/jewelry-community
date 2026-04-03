import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "종로 주얼리 2세 모임",
  description: "종로 주얼리 업계 2세들의 친목과 성장을 위한 모임",
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
