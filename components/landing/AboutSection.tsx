const activities = [
  { emoji: "🍷", label: "와인 모임", desc: "함께 즐기는 와인 테이스팅" },
  { emoji: "✈️", label: "여행", desc: "국내외 단체 여행" },
  { emoji: "🎭", label: "문화 활동", desc: "전시, 공연 함께 관람" },
  { emoji: "💼", label: "비즈니스", desc: "업계 정보 교류 및 협업" },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            우리는 누구인가요?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            종로에서 주얼리 업을 이어가는 2세들이 모였습니다.
            친목을 다지고, 함께 놀며, 나아가 새로운 비즈니스를 만들어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {activities.map((a) => (
            <div
              key={a.label}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gold-50 transition-colors group"
            >
              <span className="text-4xl mb-3 block">{a.emoji}</span>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gold-700">
                {a.label}
              </h3>
              <p className="text-sm text-gray-500">{a.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-gold-600">15</p>
            <p className="text-gray-500 mt-1">멤버</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gold-600">2024</p>
            <p className="text-gray-500 mt-1">설립 연도</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gold-600">종로</p>
            <p className="text-gray-500 mt-1">활동 기반</p>
          </div>
        </div>
      </div>
    </section>
  );
}
