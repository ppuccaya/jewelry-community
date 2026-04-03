import Image from "next/image";
import type { Event, EventPhoto } from "@/types";

interface Props {
  photos: (EventPhoto & { event: Event })[];
}

export default function GallerySection({ photos }: Props) {
  return (
    <section id="gallery" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            활동 갤러리
          </h2>
          <p className="text-gray-500 text-lg">함께한 순간들</p>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📸</p>
            <p>아직 등록된 사진이 없어요.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="break-inside-avoid rounded-xl overflow-hidden group relative"
              >
                <Image
                  src={photo.storage_url}
                  alt={photo.caption ?? photo.event?.title ?? "활동 사진"}
                  width={400}
                  height={300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{photo.event?.title}</p>
                    {photo.caption && (
                      <p className="text-xs text-gray-300">{photo.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
