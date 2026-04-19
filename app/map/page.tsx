"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import { createClient } from "@/lib/supabase/client";
import type { MapLocation } from "@/types";

export default function MapPage() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("map_locations")
      .select("*")
      .eq("is_public", true)
      .order("order_num", { ascending: true })
      .then((res) => {
        const data = (res.data as MapLocation[]) ?? [];
        setLocations(data);
        if (data[0]) setActive(data[0].id);
        setLoaded(true);
      });
  }, []);

  const activeLoc = locations.find((l) => l.id === active);

  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-5">Map</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">
              지도
            </h1>
            <div className="divider mx-auto" />
          </div>
        </section>

        <section className="py-16">
          <div className="container-wide">
            {!loaded ? (
              <p className="text-center text-ink-400 text-sm">
                불러오는 중...
              </p>
            ) : locations.length === 0 ? (
              <div className="max-w-3xl mx-auto">
                <div className="relative aspect-[4/3] bg-ink-100 border border-ink-200 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-ink-400 text-xs tracking-wide">
                    MAP · PLACEHOLDER
                  </div>
                </div>
                <p className="text-center text-ink-400 text-sm mt-6">
                  아직 등록된 장소가 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 max-w-5xl mx-auto">
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="relative aspect-[4/3] bg-ink-100 border border-ink-200 overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px)",
                      }}
                    />
                    <div className="absolute top-4 left-4 text-xs text-ink-500 tracking-wide">
                      MAP · PLACEHOLDER
                    </div>
                    {/* 핀 자리는 추후 실제 지도 연동 시 좌표 기반으로 */}
                  </div>
                  <p className="text-xs text-ink-400 mt-3">
                    * 실제 지도는 추후 연동될 예정입니다.
                  </p>
                </div>

                <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
                  {activeLoc && (
                    <div className="bg-ink-100 p-6 border border-ink-200 min-h-[200px]">
                      {activeLoc.date && (
                        <p className="eyebrow text-bronze-600 mb-2">
                          {activeLoc.date}
                        </p>
                      )}
                      <h3 className="font-serif text-xl text-ink-900 mb-3">
                        {activeLoc.name}
                      </h3>
                      <div className="divider mb-3" />
                      {activeLoc.story && (
                        <p className="text-ink-600 leading-relaxed text-[15px]">
                          {activeLoc.story}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-1">
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setActive(loc.id)}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 ${
                          active === loc.id
                            ? "border-bronze-500 bg-ink-100 text-ink-900"
                            : "border-transparent text-ink-500 hover:text-ink-900 hover:border-ink-300"
                        }`}
                      >
                        {loc.date && (
                          <span className="text-ink-400 mr-2">{loc.date}</span>
                        )}
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
