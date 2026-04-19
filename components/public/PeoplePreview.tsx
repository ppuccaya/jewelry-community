"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { PublicPerson } from "@/types";

export default function PeoplePreview() {
  const [people, setPeople] = useState<PublicPerson[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("public_people")
      .select("*")
      .order("order_num", { ascending: true })
      .limit(6)
      .then((res) => {
        setPeople((res.data as PublicPerson[]) ?? []);
        setLoaded(true);
      });
  }, []);

  if (!loaded || people.length === 0) return null;

  return (
    <section className="py-24 md:py-28 bg-ink-900 text-ink-100">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="eyebrow text-bronze-400 mb-3">People</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-50">
              이 자리의 얼굴들
            </h2>
          </div>
          <Link
            href="/people"
            className="text-sm text-ink-400 hover:text-ink-50 border-b border-ink-700 hover:border-bronze-400 pb-1"
          >
            모두 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {people.map((p) => (
            <Link key={p.id} href="/people" className="group">
              <div
                className={`aspect-square bg-gradient-to-br ${p.tone} flex items-center justify-center group-hover:scale-[1.02] transition-transform`}
              >
                <span className="font-serif text-4xl text-ink-50/80">
                  {p.initial}
                </span>
              </div>
              <p className="mt-2 text-center font-serif text-ink-100 text-sm">
                {p.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
