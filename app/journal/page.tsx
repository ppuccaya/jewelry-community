"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import { LockBadge } from "@/components/public/LockedContent";
import type { JournalEntryRow } from "@/types";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntryRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("journal_entries")
      .select("*")
      .order("date", { ascending: false })
      .then((res) => {
        setEntries((res.data as JournalEntryRow[]) ?? []);
        setLoaded(true);
      });
  }, []);

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
            {!loaded ? (
              <p className="text-center text-ink-400 text-sm">불러오는 중...</p>
            ) : entries.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-ink-400 text-sm">
                  아직 등록된 일지가 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map((e) => {
                  const href = e.is_public ? `/journal/${e.slug}` : "/members";
                  return (
                    <Link key={e.id} href={href} className="group">
                      <article className="bg-white border border-ink-200 group-hover:border-bronze-400 transition-colors h-full flex flex-col">
                        <div
                          className={`aspect-[4/3] bg-gradient-to-br ${e.cover_tone} relative flex items-end p-6`}
                        >
                          <p className="text-ink-200 text-xs drop-shadow">
                            {e.date}
                          </p>
                          {!e.is_public && (
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
