import Nav from "@/components/public/Nav";
import Hero from "@/components/public/Hero";
import Philosophy from "@/components/public/Philosophy";
import Experience from "@/components/public/Experience";
import MapArchive from "@/components/public/MapArchive";
import InquiryForm from "@/components/public/InquiryForm";
import Footer from "@/components/public/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Experience />
        <MapArchive />

        {/* 참여 신청 CTA */}
        <section className="py-24 md:py-32 bg-ink-50 border-y border-ink-200">
          <div className="container-narrow text-center">
            <p className="eyebrow mb-6">Join Our Circle</p>
            <h2 className="font-serif text-3xl md:text-5xl text-ink-900 leading-tight mb-8">
              격식을 아는 사람들이
              <br />
              조용히 모입니다.
            </h2>
            <div className="divider mx-auto mb-8" />
            <p className="text-ink-600 leading-relaxed max-w-lg mx-auto mb-10">
              이 모임은 공개 모집을 하지 않습니다.
              <br />
              결이 맞는 분들을 천천히 알아가고, 서로 초대하는 방식으로 채워갑니다.
            </p>
            <a
              href="/apply"
              className="inline-block bg-ink-900 hover:bg-ink-800 text-ink-50 font-medium px-10 py-4 tracking-wide transition-colors"
            >
              참여를 신청하시겠어요?
            </a>
          </div>
        </section>

        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
