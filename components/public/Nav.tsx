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

  const links = [
    { href: "/", label: "소개" },
    { href: "/program", label: "프로그램" },
    { href: "/apply", label: "참여 신청" },
    { href: "/members", label: "멤버 라운지", private: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled
          ? "bg-ink-50/95 backdrop-blur border-b border-ink-200"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-serif text-lg tracking-wide text-ink-900"
        >
          <span className="eyebrow block text-[10px] text-ink-500 mb-0.5">
            Private Circle
          </span>
          사업가의 격식
        </Link>

        {/* 데스크탑 */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-ink-900 font-medium"
                  : "text-ink-500 hover:text-ink-900"
              } ${link.private ? "border-l border-ink-300 pl-8 text-bronze-700" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink-900"
          aria-label="메뉴"
        >
          {open ? "✕" : "≡"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink-50 border-t border-ink-200">
          <nav className="container-wide py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${
                  link.private ? "text-bronze-700" : "text-ink-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
