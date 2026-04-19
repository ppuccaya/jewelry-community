import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { people } from "@/lib/peopleData";
import { LockBadge } from "@/components/public/LockedContent";

export default function PeoplePage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">People</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              사람들
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide">
            {people.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-ink-400 text-sm">
                  곧 소개될 예정입니다.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {people.map((p) => (
                  <article
                    key={p.id}
                    className="bg-white border border-ink-200 overflow-hidden"
                  >
                    <div
                      className={`aspect-[3/2] bg-gradient-to-br ${p.tone} flex items-center justify-center`}
                    >
                      <span className="font-serif text-7xl text-ink-50/80">
                        {p.initial}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-ink-900 mb-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-ink-500 mb-4">{p.field}</p>
                      <div className="w-6 h-px bg-bronze-400 mb-4" />
                      <p className="text-ink-700 text-sm italic mb-4">
                        &ldquo;{p.oneLiner}&rdquo;
                      </p>
                      {p.publicStory ? (
                        <p className="text-ink-600 text-sm leading-relaxed">
                          {p.publicStory}
                        </p>
                      ) : (
                        <div className="text-center py-2">
                          <LockBadge />
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
