import Link from "next/link";
import { journalEntries } from "@/lib/journalData";
import { LockBadge } from "./LockedContent";

export default function JournalPreview() {
  const recent = journalEntries.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-ink-50">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="eyebrow mb-4">Recent Journal</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight">
              최근 모임의 기록
            </h2>
          </div>
          <Link
            href="/journal"
            className="hidden md:inline-block text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 일지 보기 →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recent.map((e) => {
            const href = e.isPublic ? `/journal/${e.id}` : "/members";
            return (
              <Link key={e.id} href={href} className="group">
                <article className="bg-white border border-ink-200 group-hover:border-bronze-400 transition-colors h-full flex flex-col">
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${e.coverTone} relative flex items-end p-5`}
                  >
                    <div>
                      <p className="text-[10px] tracking-wide text-ink-100 mb-1 drop-shadow">
                        {e.tag.toUpperCase()}
                      </p>
                      <p className="text-ink-200 text-xs drop-shadow">
                        {e.date}
                      </p>
                    </div>
                    {!e.isPublic && (
                      <div className="absolute top-3 right-3">
                        <LockBadge />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-serif text-lg text-ink-900 mb-3 leading-tight">
                      {e.title}
                    </h3>
                    <p className="text-ink-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {e.teaser}
                    </p>
                    <div className="mt-auto text-xs text-ink-500 group-hover:text-bronze-700 tracking-wide">
                      {e.isPublic ? "읽기 →" : "멤버 라운지 →"}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/journal"
            className="text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 일지 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
