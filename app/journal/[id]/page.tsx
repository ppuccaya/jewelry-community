import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalEntries } from "@/lib/journalData";
import { LockOverlay } from "@/components/public/LockedContent";

export function generateStaticParams() {
  return journalEntries.map((e) => ({ id: e.id }));
}

export default async function JournalDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = journalEntries.find((e) => e.id === id);
  if (!entry) return notFound();

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        {/* 커버 */}
        <section
          className={`bg-gradient-to-br ${entry.coverTone} py-32 md:py-40 text-center`}
        >
          <div className="container-narrow">
            <p className="eyebrow text-bronze-200 mb-4">
              {entry.tag}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-ink-50 leading-tight mb-6 drop-shadow">
              {entry.title}
            </h1>
            <div className="w-12 h-px bg-bronze-300 mx-auto mb-4" />
            <p className="text-ink-200 text-sm">
              {entry.date} · {entry.place}
            </p>
          </div>
        </section>

        {/* 본문 */}
        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <p className="text-ink-800 text-lg leading-loose mb-10 font-serif">
              {entry.teaser}
            </p>

            {entry.isPublic && entry.body ? (
              <div className="space-y-6 text-ink-700 leading-loose">
                {entry.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <div className="relative min-h-[280px] mt-10">
                <div className="space-y-6 text-ink-500 leading-loose select-none pointer-events-none blur-[2px]">
                  <p>
                    이 날의 이야기는 여기서부터 조금 더 깊어집니다.
                    우리가 나눈 대화, 서로의 표정, 그리고 남긴 약속.
                  </p>
                  <p>
                    멤버들과만 공유하는 문장이 이어집니다. 이곳에 적힌 이야기는
                    모임 안에서 오랫동안 기억되고, 다음 해의 방향을 만드는
                    재료가 됩니다.
                  </p>
                  <p>
                    몇 명의 이름과 몇 번의 잔, 그리고 창밖의 장면까지.
                  </p>
                </div>
                <LockOverlay message="이야기의 뒷부분은 멤버 라운지에서 이어집니다." />
              </div>
            )}

            <div className="mt-16 pt-10 border-t border-ink-200 flex items-center justify-between">
              <Link
                href="/journal"
                className="text-sm text-ink-500 hover:text-ink-900"
              >
                ← 모임 일지 목록
              </Link>
              <Link
                href="/apply"
                className="text-sm text-bronze-700 hover:text-bronze-900"
              >
                참여 신청 →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
