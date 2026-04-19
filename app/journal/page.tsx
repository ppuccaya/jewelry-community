import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { journalEntries } from "@/lib/journalData";
import { LockBadge } from "@/components/public/LockedContent";

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 md:py-20 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Journal</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-tight mb-6">
              모임 일지
            </h1>
            <div className="divider mx-auto mb-6" />
            <p className="text-ink-600 leading-relaxed max-w-lg mx-auto">
              매달 모임이 끝난 뒤, 모임장이 그날의 공기를 기록합니다.
              <br />
              몇 편은 외부에도 열어두었습니다.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journalEntries.map((e) => {
                const card = (
                  <article className="group h-full bg-white border border-ink-200 hover:border-bronze-400 overflow-hidden transition-colors">
                    {/* 커버 */}
                    <div
                      className={`aspect-[4/3] bg-gradient-to-br ${e.coverTone} relative flex items-end p-6`}
                    >
                      <div>
                        <p className="text-[10px] tracking-wide text-ink-100 mb-1 drop-shadow">
                          {e.tag.toUpperCase()}
                        </p>
                        <p className="text-ink-50 text-xs drop-shadow">
                          {e.date} · {e.place}
                        </p>
                      </div>
                      {!e.isPublic && (
                        <div className="absolute top-4 right-4">
                          <LockBadge />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-xl text-ink-900 mb-3 leading-tight">
                        {e.title}
                      </h3>
                      <p className="text-ink-600 text-sm leading-relaxed line-clamp-3">
                        {e.teaser}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-xs text-ink-500 group-hover:text-bronze-700 tracking-wide">
                        {e.isPublic ? "전체 읽기 →" : "멤버 라운지에서 보기 →"}
                      </div>
                    </div>
                  </article>
                );

                return e.isPublic ? (
                  <Link key={e.id} href={`/journal/${e.id}`}>
                    {card}
                  </Link>
                ) : (
                  <Link key={e.id} href="/members">
                    {card}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
