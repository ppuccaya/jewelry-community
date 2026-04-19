import MembersNav from "@/components/public/MembersNav";
import Link from "next/link";

export default function MembersHomePage() {
  const shortcuts = [
    { href: "/members/schedule", label: "다음 모임 확인", eyebrow: "Schedule" },
    { href: "/members/worries", label: "익명 고민 남기기", eyebrow: "Worries" },
    { href: "/members/mvp", label: "MVP 추천하기", eyebrow: "MVP" },
  ];

  const publicShortcuts = [
    { href: "/journal", label: "모임 일지 전체 보기", note: "퍼블릭" },
    { href: "/people", label: "사람들 전체 보기", note: "퍼블릭" },
    { href: "/gallery", label: "갤러리 전체 보기", note: "퍼블릭" },
  ];

  return (
    <div className="flex min-h-screen bg-ink-950 text-ink-100">
      <MembersNav />
      <main className="flex-1 p-10 md:p-14 overflow-auto">
        <div className="mb-14">
          <p className="eyebrow text-bronze-400 mb-3">Welcome Back</p>
          <h1 className="font-serif text-4xl md:text-5xl text-ink-50 mb-4">
            오늘도, 조용히 모여주셔서 감사합니다.
          </h1>
          <div className="w-12 h-px bg-bronze-400" />
        </div>

        {/* 프라이빗 액션 */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
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

        {/* 다음 모임 + 공지 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <section className="bg-ink-900 border border-ink-800 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="eyebrow text-bronze-400 mb-2">Next Gathering</p>
                <h2 className="font-serif text-2xl text-ink-50">
                  4월 테마 모임
                </h2>
              </div>
              <span className="text-xs text-ink-500">2026.04.26 · 19:00</span>
            </div>
            <div className="w-8 h-px bg-bronze-400 mb-6" />
            <p className="text-ink-300 leading-relaxed mb-6">
              이번 달의 테마는 <span className="text-bronze-300">「감각의 회복」</span>입니다.
              성북동의 조용한 한옥 다이닝에서 만납니다. 드레스 코드는 아이보리 톤.
            </p>
            <div className="text-xs text-ink-500 space-y-1">
              <p>장소 · 성북동 한옥 다이닝</p>
              <p>인원 · 10명</p>
              <p>회비 · 9만원</p>
            </div>
          </section>

          <section className="bg-ink-900 border border-ink-800 p-8">
            <p className="eyebrow text-bronze-400 mb-2">Recent Notes</p>
            <h2 className="font-serif text-2xl text-ink-50 mb-6">최근 공지</h2>
            <div className="w-8 h-px bg-bronze-400 mb-6" />
            <ul className="space-y-5">
              {[
                { date: "04.10", title: "4월 테마 모임 드레스 코드 안내", tag: "공지" },
                { date: "04.07", title: "5월 엠티 일정 후보 투표 시작", tag: "투표" },
                { date: "04.02", title: "신규 멤버 2명 합류 · 환영합니다", tag: "소식" },
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-xs text-ink-500 pt-1 w-10 shrink-0">
                    {note.date}
                  </span>
                  <p className="flex-1 text-ink-100 text-sm leading-snug">
                    {note.title}
                  </p>
                  <span className="text-[10px] text-bronze-400 tracking-wide">
                    {note.tag}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 퍼블릭 바로가기 */}
        <section>
          <p className="eyebrow text-bronze-400 mb-3">Also Visible</p>
          <h3 className="font-serif text-xl text-ink-50 mb-6">
            외부에도 열려 있는 페이지
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {publicShortcuts.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center justify-between border border-ink-800 hover:border-bronze-500 px-5 py-4 text-sm text-ink-300 hover:text-ink-50 transition-colors"
              >
                <span>{s.label}</span>
                <span className="text-[10px] text-ink-600 tracking-wide">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-20 text-xs text-ink-600 text-center tracking-wide">
          * 이 공간은 멤버 전용입니다. 외부 공유를 삼가주세요.
        </p>
      </main>
    </div>
  );
}
