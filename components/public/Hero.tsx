export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-950">
      {/* 배경 - 미세한 텍스처 */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(163,135,86,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(30,28,25,1) 0%, rgba(13,12,9,1) 100%)",
        }}
      />

      {/* 세로 라인 장식 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bronze-500/20 to-transparent" />

      <div className="relative container-narrow text-center py-32">
        <p className="eyebrow text-bronze-400 mb-8 fade-in-up">
          Private Circle · Since 2024
        </p>

        <h1
          className="font-serif text-5xl md:text-7xl text-ink-50 leading-[1.15] mb-10 fade-in-up"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          사업가의
          <br />
          <span className="text-bronze-300">격식</span>
        </h1>

        <div
          className="divider mx-auto mb-10 fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        />

        <p
          className="text-ink-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4 fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          사업가이기 전에, 한 인간으로서 더 잘 살고
          <br className="hidden md:block" />
          그것이 사업으로 자연스럽게 연결되는 선순환.
        </p>
        <p
          className="text-ink-400 text-sm mb-16 fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          그 조용한 성장을 함께하는 모임입니다.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 justify-center fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <a
            href="/program"
            className="btn-outline !border-ink-400 !text-ink-100 hover:!bg-ink-100 hover:!text-ink-900"
          >
            프로그램 살펴보기
          </a>
          <a
            href="/apply"
            className="bg-bronze-500 hover:bg-bronze-600 text-ink-50 font-medium px-6 py-3 tracking-wide transition-colors"
          >
            참여 신청
          </a>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-bronze-400/60">
        <div className="flex flex-col items-center gap-2 text-xs tracking-wide">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-bronze-400/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
