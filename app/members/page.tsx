import MembersNav from "@/components/public/MembersNav";
import Link from "next/link";

export default function MembersHomePage() {
  const shortcuts = [
    { href: "/members/schedule", label: "일정", eyebrow: "Schedule" },
    { href: "/members/worries", label: "익명 고민", eyebrow: "Worries" },
    { href: "/members/mvp", label: "연간 MVP", eyebrow: "MVP" },
  ];

  return (
    <div className="flex min-h-screen bg-ink-950 text-ink-100">
      <MembersNav />
      <main className="flex-1 p-10 md:p-14 overflow-auto">
        <div className="mb-14">
          <p className="eyebrow text-bronze-400 mb-3">Members Lounge</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-50 mb-4">
            환영합니다.
          </h1>
          <div className="w-12 h-px bg-bronze-400" />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-ink-900 border border-ink-800 hover:border-bronze-500 p-6 transition-all"
            >
              <p className="eyebrow text-bronze-400 mb-4">{s.eyebrow}</p>
              <h3 className="font-serif text-lg text-ink-50 mb-6 leading-tight">
                {s.label}
              </h3>
              <span className="text-xs text-ink-400 group-hover:text-bronze-300 tracking-wide">
                이동 →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-20 text-xs text-ink-600 text-center tracking-wide">
          * 이 공간은 멤버 전용입니다.
        </p>
      </main>
    </div>
  );
}
