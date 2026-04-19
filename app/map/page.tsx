import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";
import MapArchive from "@/components/public/MapArchive";

export default function MapPage() {
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
        <MapArchive />
      </main>
      <Footer />
    </>
  );
}
