"use client";

export default function MapArchive() {
  return (
    <section className="py-24 md:py-28 bg-ink-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">Map Archive</p>
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            우리가 함께 걸은 장소들
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-[4/3] bg-ink-100 border border-ink-200 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-ink-400 text-xs tracking-wide">
                MAP · PLACEHOLDER
              </p>
            </div>
          </div>
          <p className="text-xs text-ink-400 mt-3 text-center">
            * 지도는 추후 연동될 예정입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
