"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import { LockOverlay } from "@/components/public/LockedContent";
import type { JournalEntryRow } from "@/types";

export default function JournalDetail() {
  const { id } = useParams<{ id: string }>(); // 실제로는 slug
  const [entry, setEntry] = useState<JournalEntryRow | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("journal_entries")
      .select("*")
      .eq("slug", id)
      .single()
      .then((res) => {
        if (res.error || !res.data) setNotFoundState(true);
        else setEntry(res.data as JournalEntryRow);
      });
  }, [id]);

  if (notFoundState) notFound();
  if (!entry)
    return (
      <>
        <Nav />
        <main className="bg-ink-50 pt-40 min-h-screen text-center">
          <p className="text-ink-400 text-sm">불러오는 중...</p>
        </main>
      </>
    );

  const paragraphs = entry.body
    ? entry.body.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section
          className={`bg-gradient-to-br ${entry.cover_tone} py-32 md:py-40 text-center`}
        >
          <div className="container-narrow">
            {entry.tag && (
              <p className="eyebrow text-bronze-200 mb-4">{entry.tag}</p>
            )}
            <h1 className="font-serif text-3xl md:text-5xl text-ink-50 leading-tight mb-6 drop-shadow">
              {entry.title}
            </h1>
            <div className="w-12 h-px bg-bronze-300 mx-auto mb-4" />
            <p className="text-ink-200 text-sm">
              {entry.date}
              {entry.place && ` · ${entry.place}`}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-narrow">
            <p className="text-ink-800 text-lg leading-loose mb-10 font-serif">
              {entry.teaser}
            </p>

            {entry.is_public && paragraphs.length > 0 ? (
              <div className="space-y-6 text-ink-700 leading-loose">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : !entry.is_public ? (
              <div className="relative min-h-[280px] mt-10">
                <div className="space-y-6 text-ink-500 leading-loose select-none pointer-events-none blur-[2px]">
                  <p>
                    이 날의 이야기는 여기서부터 조금 더 깊어집니다.
                    우리가 나눈 대화, 서로의 표정, 그리고 남긴 약속.
                  </p>
                  <p>
                    멤버들과만 공유하는 문장이 이어집니다.
                  </p>
                </div>
                <LockOverlay message="이야기의 뒷부분은 멤버 라운지에서 이어집니다." />
              </div>
            ) : null}

            <div className="mt-16 pt-10 border-t border-ink-200 flex items-center justify-between">
              <Link
                href="/journal"
                className="text-sm text-ink-500 hover:text-ink-900"
              >
                ← 목록
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
