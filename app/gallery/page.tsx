"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import type { Event, EventPhoto } from "@/types";

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

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">Gallery</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              갤러리
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide">
            {!loaded ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-ink-100 animate-pulse" />
                ))}
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-ink-400 text-sm">
                  아직 등록된 사진이 없습니다.
                </p>
              </div>
            ) : (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
