"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const publicLinks = [
    { href: "/", label: "소개" },
    { href: "/program", label: "프로그램" },
    { href: "/gallery", label: "갤러리" },
    { href: "/journal", label: "모임 일지" },
    { href: "/people", label: "사람들" },
    { href: "/map", label: "지도" },
    { href: "/apply", label: "참여 신청" },
  ];

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled || !isHome
          ? "bg-ink-50/95 backdrop-blur border-b border-ink-200"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16">
        <Link href="/" className="font-serif tracking-wide">
          <span
            className={`eyebrow block text-[10px] mb-0.5 ${
              isHome && !scrolled ? "text-bronze-300" : "text-ink-500"
            }`}
          >
            Private Circle
          </span>
          <span
            className={`text-base ${
              isHome && !scrolled ? "text-ink-50" : "text-ink-900"
            }`}
          >
            사업가의 격식
          </span>
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {publicLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active
                    ? isHome && !scrolled
                      ? "text-ink-50 font-medium"
                      : "text-ink-900 font-medium"
                    : isHome && !scrolled
                    ? "text-ink-300 hover:text-ink-50"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/members"
            className={`text-sm ml-4 pl-6 border-l transition-colors ${
              isHome && !scrolled
                ? "border-ink-700 text-bronze-300 hover:text-bronze-200"
                : "border-ink-300 text-bronze-700 hover:text-bronze-900"
            }`}
          >
            멤버 라운지
          </Link>
        </nav>

        {/* 모바일 */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden text-xl ${
            isHome && !scrolled ? "text-ink-50" : "text-ink-900"
          }`}
          aria-label="메뉴"
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-ink-50 border-t border-ink-200">
          <nav className="container-wide py-4 flex flex-col">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-700 py-3 border-b border-ink-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/members"
              onClick={() => setOpen(false)}
              className="text-sm text-bronze-700 py-3 font-medium"
            >
              멤버 라운지 →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
