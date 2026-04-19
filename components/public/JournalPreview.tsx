"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LockBadge } from "./LockedContent";
import type { JournalEntryRow } from "@/types";

export default function JournalPreview() {
  const [entries, setEntries] = useState<JournalEntryRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("journal_entries")
      .select("*")
      .order("date", { ascending: false })
      .limit(3)
      .then((res) => {
        setEntries((res.data as JournalEntryRow[]) ?? []);
        setLoaded(true);
      });
  }, []);

  if (!loaded || entries.length === 0) return null;

  return (
    <section className="py-24 md:py-28 bg-ink-50">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="eyebrow mb-3">Journal</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
              최근 모임의 기록
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {entries.map((e) => {
            const href = e.is_public ? `/journal/${e.slug}` : "/members";
            return (
              <Link key={e.id} href={href} className="group">
                <article className="bg-white border border-ink-200 group-hover:border-bronze-400 transition-colors h-full flex flex-col">
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${e.cover_tone} relative flex items-end p-5`}
                  >
                    <p className="text-ink-200 text-xs drop-shadow">{e.date}</p>
                    {!e.is_public && (
                      <div className="absolute top-3 right-3">
                        <LockBadge />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-ink-900 leading-tight">
                      {e.title}
                    </h3>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
