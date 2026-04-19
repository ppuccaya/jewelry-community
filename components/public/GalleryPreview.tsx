"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { EventPhoto } from "@/types";

// DB에 사진이 없을 때 보여줄 fallback
const fallbackTiles = [
  { tone: "from-ink-700 via-bronze-600 to-ink-800", label: "봄의 여유", date: "2026.03" },
  { tone: "from-bronze-400 via-bronze-700 to-ink-900", label: "블라인드 와인", date: "2026.02" },
  { tone: "from-ink-800 via-ink-900 to-bronze-700", label: "새해 첫 모임", date: "2026.01" },
  { tone: "from-ink-500 via-ink-700 to-bronze-600", label: "서촌의 밤", date: "2025.12" },
  { tone: "from-ink-200 via-ink-400 to-ink-700", label: "기장 엠티", date: "2025.11" },
  { tone: "from-bronze-300 via-bronze-500 to-ink-600", label: "연남 전시", date: "2025.10" },
  { tone: "from-ink-300 via-bronze-300 to-ink-500", label: "9월 테마", date: "2025.09" },
  { tone: "from-bronze-500 via-ink-600 to-ink-900", label: "여름 저녁", date: "2025.08" },
];

export default function GalleryPreview() {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchPhotos = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("event_photos")
      .select("id, storage_url, caption")
      .order("created_at", { ascending: false })
      .limit(8);
    if (data) setPhotos(data as EventPhoto[]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const useReal = loaded && photos.length >= 4;

  return (
    <section className="py-24 md:py-32 bg-ink-100">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="eyebrow mb-4">Activity Gallery</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight">
              함께 쌓은 장면들
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden md:inline-block text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 갤러리 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {useReal
            ? photos.slice(0, 8).map((p, i) => (
                <figure
                  key={p.id}
                  className={`relative overflow-hidden group ${
                    i === 0 || i === 5
                      ? "aspect-square md:aspect-[3/4]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={p.storage_url}
                    alt={p.caption ?? "활동"}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </figure>
              ))
            : fallbackTiles.map((t, i) => (
                <figure
                  key={i}
                  className={`relative overflow-hidden group ${
                    i === 0 || i === 5
                      ? "aspect-square md:aspect-[3/4]"
                      : "aspect-square"
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${t.tone} flex items-end p-4 group-hover:scale-[1.04] transition-transform duration-500`}
                  >
                    <div>
                      <p className="text-ink-50 text-xs font-medium drop-shadow">
                        {t.label}
                      </p>
                      <p className="text-ink-100 text-[10px] mt-0.5 drop-shadow">
                        {t.date}
                      </p>
                    </div>
                  </div>
                </figure>
              ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/gallery"
            className="text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 갤러리 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
