import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import MapArchive from "@/components/public/MapArchive";

export default function MapPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink-50 pt-24">
        <section className="py-16 md:py-20 text-center border-b border-ink-200">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Places We've Been</p>
            <h1 className="font-serif text-4xl md:text-5xl text-ink-900 leading-tight mb-6">
              함께 걸은 장소들
            </h1>
            <div className="divider mx-auto mb-6" />
            <p className="text-ink-600 leading-relaxed max-w-xl mx-auto">
              모임의 시간은 공간에 새겨집니다. 매달 새로운 자리에서 만나며
              <br />
              우리가 함께 쌓은 장소들을 지도로 모았습니다.
            </p>
          </div>
        </section>

        <MapArchive />

        <section className="py-16 text-center bg-ink-100 border-t border-ink-200">
          <div className="container-narrow">
            <p className="text-ink-600 text-sm mb-6">
              상세한 장소 아카이브는 멤버 라운지에서 볼 수 있습니다.
            </p>
            <a
              href="/members"
              className="inline-block text-sm border border-ink-300 hover:border-ink-900 px-6 py-2.5 text-ink-700 transition-colors"
            >
              멤버 라운지에서 보기 →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
