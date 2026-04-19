import Nav from "@/components/public/Nav";
import Hero from "@/components/public/Hero";
import Philosophy from "@/components/public/Philosophy";
import GalleryPreview from "@/components/public/GalleryPreview";
import JournalPreview from "@/components/public/JournalPreview";
import PeoplePreview from "@/components/public/PeoplePreview";
import Experience from "@/components/public/Experience";
import InquiryForm from "@/components/public/InquiryForm";
import Footer from "@/components/public/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Experience />
        <GalleryPreview />
        <JournalPreview />
        <PeoplePreview />

        <section className="py-24 bg-ink-50 border-y border-ink-200 text-center">
          <div className="container-narrow">
            <p className="eyebrow mb-6">Join</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mb-8">
              조용히 모이는 자리
            </h2>
            <div className="divider mx-auto mb-8" />
            <Link
              href="/apply"
              className="inline-block bg-ink-900 hover:bg-ink-800 text-ink-50 font-medium px-10 py-4 tracking-wide transition-colors"
            >
              참여 신청
            </Link>
          </div>
        </section>

        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
