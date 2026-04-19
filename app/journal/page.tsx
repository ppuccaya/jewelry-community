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
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">Journal</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              모임 일지
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide">
            {journalEntries.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-ink-400 text-sm">
                  아직 등록된 일지가 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {journalEntries.map((e) => {
                  const href = e.isPublic ? `/journal/${e.id}` : "/members";
                  return (
                    <Link key={e.id} href={href} className="group">
                      <article className="bg-white border border-ink-200 group-hover:border-bronze-400 transition-colors h-full flex flex-col">
                        <div
                          className={`aspect-[4/3] bg-gradient-to-br ${e.coverTone} relative flex items-end p-6`}
                        >
                          <p className="text-ink-200 text-xs drop-shadow">
                            {e.date}
                          </p>
                          {!e.isPublic && (
                            <div className="absolute top-4 right-4">
                              <LockBadge />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-lg text-ink-900 leading-tight">
                            {e.title}
                          </h3>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
