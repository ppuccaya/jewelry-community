"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Event as EventType, EventPhoto, Member } from "@/types";

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [event, setEvent] = useState<EventType | null>(null);
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchData = useCallback(async () => {
    const [eventRes, photosRes, attendeesRes, membersRes] = await Promise.all([
      supabase.from("events").select("*").eq("id", id).single(),
      supabase
        .from("event_photos")
        .select("*")
        .eq("event_id", id)
        .order("created_at", { ascending: false }),
      supabase.from("event_attendees").select("member_id").eq("event_id", id),
      supabase
        .from("members")
        .select("*")
        .eq("status", "active")
        .order("name"),
    ]);
    if (eventRes.data) setEvent(eventRes.data as EventType);
    if (photosRes.data) setPhotos(photosRes.data as EventPhoto[]);
    if (attendeesRes.data)
      setAttendees(attendeesRes.data.map((a: { member_id: string }) => a.member_id));
    if (membersRes.data) setAllMembers(membersRes.data as Member[]);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function toggleAttendee(memberId: string) {
    if (attendees.includes(memberId)) {
      await supabase
        .from("event_attendees")
        .delete()
        .eq("event_id", id)
        .eq("member_id", memberId);
    } else {
      await supabase
        .from("event_attendees")
        .insert([{ event_id: id, member_id: memberId }]);
    }
    fetchData();
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(path, file);

      if (!uploadError) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("event-photos").getPublicUrl(path);

        await supabase
          .from("event_photos")
          .insert([{ event_id: id, storage_url: publicUrl }]);
      }
    }
    setUploading(false);
    fetchData();
    e.target.value = "";
  }

  async function deletePhoto(photo: EventPhoto) {
    if (!confirm("이 사진을 삭제할까요?")) return;
    const pathMatch = photo.storage_url.match(/event-photos\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from("event-photos").remove([pathMatch[1]]);
    }
    await supabase.from("event_photos").delete().eq("id", photo.id);
    fetchData();
  }

  if (!event) return <div className="text-gray-400">로딩 중...</div>;

  return (
    <div>
      <button
        onClick={() => router.push("/admin/activities")}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block"
      >
        &larr; 활동 목록
      </button>

      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{event.title}</h1>
        <p className="text-gray-500">
          {event.date}
          {event.time && ` ${event.time}`}
          {event.location && ` · ${event.location}`}
        </p>
        {event.notes && (
          <p className="text-sm text-gray-400 mt-2">{event.notes}</p>
        )}
      </div>

      {/* 참석자 */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          참석자 ({attendees.length}/{allMembers.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {allMembers.map((m) => {
            const isAttending = attendees.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleAttendee(m.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isAttending
                    ? "bg-gold-100 text-gold-800 border border-gold-300"
                    : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                {isAttending && "✓ "}
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 사진 */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            사진 ({photos.length})
          </h2>
          <label className="btn-primary text-sm cursor-pointer">
            {uploading ? "업로드 중..." : "+ 사진 추가"}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {photos.length === 0 ? (
          <p className="text-gray-400 text-sm py-8 text-center">
            아직 사진이 없어요.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((p) => (
              <div key={p.id} className="relative group rounded-lg overflow-hidden">
                <Image
                  src={p.storage_url}
                  alt={p.caption ?? "활동 사진"}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={() => deletePhoto(p)}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
