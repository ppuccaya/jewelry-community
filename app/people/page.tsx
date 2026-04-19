import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { people } from "@/lib/peopleData";
import { LockBadge } from "@/components/public/LockedContent";

export default function PeoplePage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 md:py-20 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">People</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-tight mb-6">
              이 자리에 있는 사람들
            </h1>
            <div className="divider mx-auto mb-6" />
            <p className="text-ink-600 leading-relaxed max-w-lg mx-auto">
              각자의 분야에서 조용히 깊이를 만들어가는 사람들입니다.
              <br />
              이름 한 줄, 분야 한 줄로 먼저 소개드립니다.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {people.map((p) => (
                <article
                  key={p.id}
                  className="bg-white border border-ink-200 hover:border-bronze-400 transition-colors overflow-hidden"
                >
                  <div
                    className={`aspect-[3/2] bg-gradient-to-br ${p.tone} flex items-center justify-center relative`}
                  >
                    <span className="font-serif text-7xl text-ink-50/80">
                      {p.initial}
                    </span>
                    {p.tags && p.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] tracking-wide bg-ink-900/60 text-ink-50 px-2 py-0.5"
                          >
                            {t.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-serif text-xl text-ink-900">
                        {p.name}
                      </h3>
                      <span className="text-[10px] text-ink-500 tracking-wide">
                        SINCE {p.since}
                      </span>
                    </div>
                    <p className="text-xs text-ink-500 mb-4">{p.field}</p>
                    <div className="w-6 h-px bg-bronze-400 mb-4" />
                    <p className="text-ink-700 text-sm leading-relaxed italic mb-5">
                      &ldquo;{p.oneLiner}&rdquo;
                    </p>

                    {p.publicStory ? (
                      <p className="text-ink-600 text-sm leading-relaxed">
                        {p.publicStory}
                      </p>
                    ) : (
                      <div className="relative bg-ink-100 p-4 text-center">
                        <div className="blur-sm text-ink-400 text-sm select-none pointer-events-none">
                          자세한 이야기는 멤버만 볼 수 있습니다.
                          이 사람이 어떤 길을 걸어왔는지, 지금 무엇을 만들고
                          있는지에 대한 깊은 이야기.
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <LockBadge />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center bg-ink-100 border-t border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-4">Curious to know more?</p>
            <p className="text-ink-700 leading-relaxed mb-6 max-w-md mx-auto">
              각자의 이야기와 연락처는 멤버 라운지에서 열립니다.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/members"
                className="text-sm border border-ink-300 hover:border-ink-900 px-6 py-2.5 text-ink-700 transition-colors"
              >
                멤버 라운지
              </Link>
              <Link
                href="/apply"
                className="text-sm bg-ink-900 hover:bg-ink-800 text-ink-50 px-6 py-2.5 transition-colors"
              >
                참여 신청
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
