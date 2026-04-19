"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/members", label: "Lounge", note: "홈" },
  { href: "/members/schedule", label: "Schedule", note: "일정" },
  { href: "/members/worries", label: "Worries", note: "익명 고민" },
  { href: "/members/mvp", label: "MVP", note: "연간 MVP" },
];

const publicItems = [
  { href: "/gallery", label: "갤러리" },
  { href: "/journal", label: "모임 일지" },
  { href: "/people", label: "사람들" },
  { href: "/map", label: "지도" },
];

export default function MembersNav() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-ink-950 text-ink-300 min-h-screen flex flex-col p-6 border-r border-ink-900">
      <div className="mb-10">
        <p className="eyebrow text-bronze-400 text-[10px] mb-2">
          Members Lounge
        </p>
        <Link
          href="/members"
          className="font-serif text-xl text-ink-50 leading-tight"
        >
          사업가의 격식
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] tracking-wide text-ink-600 mb-2 px-3">
          PRIVATE
        </p>
        {items.map((item) => {
          const active =
            item.href === "/members"
              ? pathname === "/members"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-baseline justify-between px-3 py-2.5 transition-colors ${
                active
                  ? "bg-ink-900 text-ink-50 border-l-2 border-bronze-500"
                  : "text-ink-400 hover:text-ink-100 border-l-2 border-transparent"
              }`}
            >
              <span className="font-serif text-sm">{item.label}</span>
              <span className="text-[10px] text-ink-600 tracking-wide">
                {item.note}
              </span>
            </Link>
          );
        })}

        <p className="text-[10px] tracking-wide text-ink-600 mb-2 mt-6 px-3">
          PUBLIC PAGES
        </p>
        {publicItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-3 py-2 text-ink-500 hover:text-ink-200 transition-colors"
          >
            <span className="text-sm">{item.label}</span>
            <span className="text-[10px] text-ink-700">↗</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-ink-900 space-y-2">
        <Link
          href="/"
          className="block text-xs text-ink-500 hover:text-ink-200 px-3"
        >
          ← 메인으로
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("members_access_v1");
            window.location.href = "/members";
          }}
          className="w-full text-left text-xs text-ink-600 hover:text-red-400 px-3"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
