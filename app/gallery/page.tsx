"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import type { Event, EventPhoto } from "@/types";

// 샘플 데이터 (DB에 사진이 없을 때 표시)
const samplePhotos = [
  { id: "s1", title: "봄의 여유", date: "2026.03", tone: "from-ink-300 to-bronze-200" },
  { id: "s2", title: "블라인드 테이스팅", date: "2026.02", tone: "from-bronze-300 to-ink-400" },
  { id: "s3", title: "새해 첫 모임", date: "2026.01", tone: "from-ink-400 to-ink-700" },
  { id: "s4", title: "서촌 초대의 밤", date: "2025.12", tone: "from-bronze-400 to-bronze-700" },
  { id: "s5", title: "연례 엠티 · 기장", date: "2025.11", tone: "from-ink-200 to-ink-500" },
  { id: "s6", title: "전시 투어", date: "2025.10", tone: "from-bronze-200 to-ink-400" },
  { id: "s7", title: "9월 테마", date: "2025.09", tone: "from-ink-300 to-bronze-300" },
  { id: "s8", title: "여름 저녁", date: "2025.08", tone: "from-bronze-500 to-ink-600" },
  { id: "s9", title: "업계 브리핑", date: "2025.07", tone: "from-ink-500 to-ink-800" },
];

type PhotoWithEvent = EventPhoto & { event: Pick<Event, "title" | "date"> };

export default function GalleryPage() {
  const [photos, setPhotos] = useState<PhotoWithEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchPhotos = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("event_photos")
      .select("*, event:events(title, date)")
      .order("created_at", { ascending: false })
      .limit(60);
    if (data) setPhotos(data as PhotoWithEvent[]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const hasRealPhotos = photos.length > 0;

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 md:py-20 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Activity Gallery</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-tight mb-6">
              우리의 순간들
            </h1>
            <div className="divider mx-auto mb-6" />
            <p className="text-ink-600 leading-relaxed max-w-lg mx-auto">
              한 해 동안 함께 쌓은 장면을 모았습니다.
              <br />
              그 자리의 공기와 결이 그대로 담겨 있습니다.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container-wide">
            {!loaded ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-ink-100 animate-pulse"
                  />
                ))}
              </div>
            ) : hasRealPhotos ? (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
                {photos.map((p) => (
                  <figure
                    key={p.id}
                    className="break-inside-avoid group relative overflow-hidden"
                  >
                    <Image
                      src={p.storage_url}
                      alt={p.caption ?? p.event?.title ?? "활동 사진"}
                      width={400}
                      height={500}
                      className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <figcaption className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <p className="text-ink-50 text-sm font-medium">
                          {p.event?.title}
                        </p>
                        {p.event?.date && (
                          <p className="text-ink-300 text-xs mt-0.5">
                            {p.event.date}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <>
                <p className="text-center text-sm text-ink-500 mb-10">
                  * 아래는 분위기 미리보기입니다. 어드민에서 사진이 등록되면 실제 사진으로 교체됩니다.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {samplePhotos.map((s, i) => (
                    <figure
                      key={s.id}
                      className={`group relative overflow-hidden ${
                        i % 7 === 0
                          ? "row-span-2 aspect-[3/5]"
                          : "aspect-square"
                      }`}
                    >
                      <div
                        className={`w-full h-full bg-gradient-to-br ${s.tone} flex items-end p-4 group-hover:scale-[1.03] transition-transform duration-500`}
                      >
                        <div>
                          <p className="text-ink-50 text-sm font-medium drop-shadow">
                            {s.title}
                          </p>
                          <p className="text-ink-100 text-[11px] mt-0.5 drop-shadow">
                            {s.date}
                          </p>
                        </div>
                      </div>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center bg-ink-100 border-t border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Join the Moments</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight mb-6">
              이 분위기를 함께 만들고 싶다면
            </h2>
            <a
              href="/apply"
              className="inline-block bg-ink-900 hover:bg-ink-800 text-ink-50 font-medium px-8 py-3 tracking-wide transition-colors"
            >
              참여 신청하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
