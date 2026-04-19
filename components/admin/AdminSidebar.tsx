"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/dashboard", label: "대시보드", icon: "📊", group: "기본" },
  { href: "/admin/program", label: "프로그램", icon: "📘", group: "웹 콘텐츠" },
  { href: "/admin/journal", label: "모임 일지", icon: "📖", group: "웹 콘텐츠" },
  { href: "/admin/people", label: "사람들", icon: "👤", group: "웹 콘텐츠" },
  { href: "/admin/locations", label: "지도 장소", icon: "📍", group: "웹 콘텐츠" },
  { href: "/admin/calendar", label: "일정 캘린더", icon: "📅", group: "운영" },
  { href: "/admin/activities", label: "활동 기록", icon: "📸", group: "운영" },
  { href: "/admin/members", label: "멤버 명단", icon: "👥", group: "운영" },
  { href: "/admin/ideas", label: "아이디어 판", icon: "💡", group: "운영" },
  { href: "/admin/finance", label: "회비/정산", icon: "💰", group: "운영" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-60 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-gray-700">
        <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-1">
          Admin
        </p>
        <h1 className="font-bold text-lg leading-tight">종로 주얼리 2세</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {["기본", "웹 콘텐츠", "운영"].map((group) => (
          <div key={group} className="mb-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 px-3 mb-2">
              {group}
            </p>
            {navItems
              .filter((n) => n.group === group)
              .map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-gold-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-700">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mb-1"
        >
          <span>🌐</span>
          <span>랜딩 보기</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
        >
          <span>🚪</span>
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
