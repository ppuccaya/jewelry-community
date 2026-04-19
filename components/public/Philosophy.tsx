export default function Philosophy() {
  const principles = [
    {
      num: "01",
      title: "사람이 먼저다",
      body: "사업은 결국 사람이 한다. 우리는 사업보다 먼저 사람으로서 서로를 본다. 거래가 아닌 관계로 시작한다.",
    },
    {
      num: "02",
      title: "경험이 자산이다",
      body: "좋은 공간, 좋은 맛, 좋은 대화. 이 모임에서 겪는 모든 경험은 사업가로서의 감각을 만들어주는 재료가 된다.",
    },
    {
      num: "03",
      title: "격식은 배려다",
      body: "격식은 차가움이 아니라 상대를 존중하는 태도다. 서로에게 가볍지 않은 자리, 그것이 우리가 만들고 싶은 시간이다.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-ink-50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 leading-tight mb-6">
            우리가 지키는 세 가지 태도
          </h2>
          <div className="divider mx-auto" />
        </div>

        <div className="space-y-16 md:space-y-20">
          {principles.map((p, idx) => (
            <div
              key={p.num}
              className={`grid md:grid-cols-12 gap-6 md:gap-10 items-start ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:col-span-3">
                <span className="font-serif text-5xl text-bronze-300">
                  {p.num}
                </span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-2xl text-ink-900 mb-3">
                  {p.title}
                </h3>
                <p className="text-ink-600 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
