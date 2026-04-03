export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 opacity-90" />

      {/* 골드 장식 */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-gold-400 text-sm font-medium tracking-widest uppercase mb-4">
          Since 2024 · 종로
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          종로
          <span className="text-gold-400"> 주얼리</span>
          <br />
          2세 모임
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          종로 주얼리 업계의 다음 세대가 모여
          <br />
          친목을 나누고, 함께 성장하는 공간입니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#gallery"
            className="bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            활동 보기
          </a>
          <a
            href="#inquiry"
            className="border border-white/30 hover:bg-white/10 text-white font-medium px-8 py-3 rounded-full transition-colors"
          >
            입회 문의
          </a>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
