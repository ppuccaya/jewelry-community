import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import GallerySection from "@/components/landing/GallerySection";
import InquirySection from "@/components/landing/InquirySection";
import type { Event, EventPhoto } from "@/types";

export const revalidate = 60; // 1분마다 재검증

async function getRecentPhotos(): Promise<(EventPhoto & { event: Event })[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("event_photos")
    .select("*, event:events(id, title, date)")
    .order("created_at", { ascending: false })
    .limit(12);
  return (data as (EventPhoto & { event: Event })[]) ?? [];
}

export default async function HomePage() {
  const photos = await getRecentPhotos();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GallerySection photos={photos} />
      <InquirySection />
    </main>
  );
}
