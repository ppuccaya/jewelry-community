"use client";

import { useState } from "react";

const samplePins = [
  { id: 1, name: "성북동 한옥 다이닝", date: "2025.03", top: "30%", left: "55%", story: "봄비 내리던 저녁, 오랜 시간 기다려온 한 멤버의 승진을 조용히 축하한 자리." },
  { id: 2, name: "청담 와인 셀러", date: "2025.02", top: "55%", left: "40%", story: "블라인드 테이스팅. 올해 처음으로 6명 전원이 같은 와인을 1등으로 뽑은 밤." },
  { id: 3, name: "부산 기장 숙소", date: "2024.11", top: "68%", left: "72%", story: "연례 엠티. 바다와 노을, 그리고 다음 해 각자가 쓴 목표를 함께 읽은 시간." },
  { id: 4, name: "연남동 소규모 전시", date: "2024.09", top: "40%", left: "28%", story: "한 멤버가 추천한 독립 작가 전시. 그 자리에서 협업이 시작되었다." },
];

export default function MapArchive() {
  const [active, setActive] = useState<number | null>(1);
  const activePin = samplePins.find((p) => p.id === active);

  return (
    <section className="py-24 md:py-32 bg-ink-50">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Our Map</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight mb-6">
            우리가 함께 걸은 장소들
          </h2>
          <div className="divider mx-auto mb-6" />
          <p className="text-ink-600 text-sm max-w-xl mx-auto leading-relaxed">
            모임의 시간은 공간에 새겨집니다.
            <br />
            함께 다녀온 자리마다 남은 이야기를 지도로 모았습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* 지도 (Placeholder) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative aspect-[4/3] bg-ink-100 border border-ink-200 overflow-hidden">
              {/* 지도 placeholder - 실제 지도는 추후 연동 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #eeece6 0%, #d9d5c9 100%)",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(117,110,93,0.08) 39px, rgba(117,110,93,0.08) 40px)",
                }}
              />
              <div className="absolute top-4 left-4 text-xs text-ink-500 tracking-wide">
                MAP · PLACEHOLDER
              </div>
              <div className="absolute top-4 right-4 text-xs text-ink-400">
                {samplePins.length} Pins
              </div>

              {/* 핀 */}
              {samplePins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActive(pin.id)}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  aria-label={pin.name}
                >
                  <span
                    className={`block w-3 h-3 rounded-full transition-all ${
                      active === pin.id
                        ? "bg-bronze-600 ring-8 ring-bronze-500/20"
                        : "bg-ink-700 hover:bg-bronze-600 ring-4 ring-ink-700/20"
                    }`}
                  />
                </button>
              ))}

              {/* 연결선 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <polyline
                  points="220,190 160,280 280,155 112,200"
                  stroke="#8b7143"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="3,5"
                />
              </svg>
            </div>
            <p className="text-xs text-ink-400 mt-3 tracking-wide">
              * 실제 지도는 추후 연동될 예정입니다.
            </p>
          </div>

          {/* 이야기 */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
            <div className="bg-ink-100 p-6 md:p-8 border border-ink-200 min-h-[240px]">
              {activePin ? (
                <>
                  <p className="eyebrow text-bronze-600 mb-2">{activePin.date}</p>
                  <h3 className="font-serif text-xl text-ink-900 mb-4">
                    {activePin.name}
                  </h3>
                  <div className="divider mb-4" />
                  <p className="text-ink-600 leading-relaxed text-[15px]">
                    {activePin.story}
                  </p>
                </>
              ) : (
                <p className="text-ink-500 text-sm">지도에서 핀을 선택해주세요.</p>
              )}
            </div>

            <div className="space-y-1">
              {samplePins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActive(pin.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors border-l-2 ${
                    active === pin.id
                      ? "border-bronze-500 bg-ink-100 text-ink-900"
                      : "border-transparent text-ink-500 hover:text-ink-900 hover:border-ink-300"
                  }`}
                >
                  <span className="text-ink-400 mr-2">{pin.date}</span>
                  {pin.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
