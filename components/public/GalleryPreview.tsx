"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { EventPhoto } from "@/types";

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

  if (!loaded || photos.length === 0) return null;

  return (
    <section className="py-24 md:py-28 bg-ink-100">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="eyebrow mb-3">Gallery</p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
              함께 쌓은 장면들
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-sm text-ink-500 hover:text-ink-900 border-b border-ink-300 hover:border-ink-900 pb-1"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photos.slice(0, 8).map((p, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
