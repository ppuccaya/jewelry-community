"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Event as EventType } from "@/types";

export default function ActivitiesPage() {
  const [events, setEvents] = useState<(EventType & { photo_count: number; attendee_count: number })[]>([]);

  const supabase = createClient();

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase
      .from("events")
      .select("*, event_photos(id), event_attendees(member_id)")
      .order("date", { ascending: false });
    if (data) {
      setEvents(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((e: any) => ({
          ...e,
          photo_count: Array.isArray(e.event_photos) ? e.event_photos.length : 0,
          attendee_count: Array.isArray(e.event_attendees) ? e.event_attendees.length : 0,
        }))
      );
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">활동 기록</h1>
        <Link href="/admin/activities/new" className="btn-primary text-sm">
          + 활동 등록
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">📸</p>
          <p>아직 기록된 활동이 없어요.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((e) => (
            <Link
              key={e.id}
              href={`/admin/activities/${e.id}`}
              className="card flex items-center justify-between hover:border-gold-200 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900">{e.title}</p>
                <p className="text-sm text-gray-500">
                  {e.date}
                  {e.time && ` ${e.time}`}
                  {e.location && ` · ${e.location}`}
                </p>
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>📸 {e.photo_count}</span>
                <span>👥 {e.attendee_count}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
