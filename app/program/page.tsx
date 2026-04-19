"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import type { ProgramSection, ProgramItem } from "@/types";

type SectionWithItems = ProgramSection & { items: ProgramItem[] };

export default function ProgramPage() {
  const [sections, setSections] = useState<SectionWithItems[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase
        .from("program_sections")
        .select("*")
        .eq("is_published", true)
        .order("order_num", { ascending: true }),
      supabase
        .from("program_items")
        .select("*")
        .order("order_num", { ascending: true }),
    ]).then(([sectionsRes, itemsRes]) => {
      const sectionsData = (sectionsRes.data as ProgramSection[]) ?? [];
      const itemsData = (itemsRes.data as ProgramItem[]) ?? [];
      setSections(
        sectionsData.map((s) => ({
          ...s,
          items: itemsData.filter((i) => i.section_id === s.id),
        }))
      );
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">Program</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              프로그램
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-narrow">
            {!loaded ? (
              <p className="text-center text-ink-400 text-sm">불러오는 중...</p>
            ) : sections.length === 0 ? (
              <p className="text-center text-ink-400 text-sm py-12">
                곧 소개될 예정입니다.
              </p>
            ) : (
              <div className="space-y-14">
                {sections.map((s) => (
                  <div
                    key={s.id}
                    className="grid md:grid-cols-12 gap-6 md:gap-10"
                  >
                    <div className="md:col-span-3">
                      <span className="block font-serif text-5xl text-bronze-300 leading-none mb-2">
                        {s.number}
                      </span>
                      <h2 className="font-serif text-xl text-ink-900">
                        {s.title}
                      </h2>
                    </div>
                    <ul className="md:col-span-9 space-y-2 border-l border-ink-200 pl-6">
                      {s.items.length === 0 ? (
                        <li className="text-ink-400 text-sm italic">
                          (아직 항목이 없습니다)
                        </li>
                      ) : (
                        s.items.map((item) => (
                          <li
                            key={item.id}
                            className="text-ink-700 text-[15px] leading-relaxed"
                          >
                            {item.label}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
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
