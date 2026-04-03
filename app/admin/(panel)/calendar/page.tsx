"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import type { Event as EventType } from "@/types";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { ko },
});

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: EventType;
}

const emptyForm = { title: "", date: "", time: "", location: "", notes: "" };

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [calView, setCalView] = useState<View>("month");
  const [calDate, setCalDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    if (data) {
      setEvents(
        data.map((e: EventType) => {
          const [y, m, d] = e.date.split("-").map(Number);
          const [hh, mm] = e.time ? e.time.split(":").map(Number) : [0, 0];
          const start = new Date(y, m - 1, d, hh, mm);
          const end = new Date(y, m - 1, d, hh + 2, mm);
          return { id: e.id, title: e.title, start, end, resource: e };
        })
      );
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(evt: EventType) {
    setForm({
      title: evt.title,
      date: evt.date,
      time: evt.time ?? "",
      location: evt.location ?? "",
      notes: evt.notes ?? "",
    });
    setEditingId(evt.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      date: form.date,
      time: form.time || null,
      location: form.location || null,
      notes: form.notes || null,
    };
    if (editingId) {
      await supabase.from("events").update(payload).eq("id", editingId);
    } else {
      await supabase.from("events").insert([payload]);
    }
    setModalOpen(false);
    setLoading(false);
    fetchEvents();
  }

  async function handleDelete() {
    if (!editingId || !confirm("이 행사를 삭제할까요?")) return;
    await supabase.from("events").delete().eq("id", editingId);
    setModalOpen(false);
    fetchEvents();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">일정 캘린더</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView(view === "calendar" ? "list" : "calendar")}
            className="btn-secondary text-sm"
          >
            {view === "calendar" ? "리스트 보기" : "캘린더 보기"}
          </button>
          <button onClick={openCreate} className="btn-primary text-sm">
            + 행사 등록
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="card" style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            view={calView}
            onView={(v) => setCalView(v)}
            date={calDate}
            onNavigate={(d) => setCalDate(d)}
            onSelectEvent={(e) => openEdit(e.resource)}
            messages={{
              today: "오늘",
              previous: "이전",
              next: "다음",
              month: "월",
              week: "주",
              day: "일",
              agenda: "일정",
            }}
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {events.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">
              등록된 행사가 없어요.
            </p>
          ) : (
            events.map((e) => (
              <div
                key={e.id}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 -mx-5 px-5"
                onClick={() => openEdit(e.resource)}
              >
                <div>
                  <p className="font-medium text-gray-900">{e.resource.title}</p>
                  <p className="text-sm text-gray-500">
                    {e.resource.date}
                    {e.resource.time && ` ${e.resource.time}`}
                    {e.resource.location && ` · ${e.resource.location}`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "행사 수정" : "행사 등록"}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="label">행사명 *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input"
                  placeholder="예: 4월 와인 모임"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">날짜 *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">시간</label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="label">장소</label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="input"
                  placeholder="예: 종로3가 OO레스토랑"
                />
              </div>
              <div>
                <label className="label">메모</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-2 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn-danger text-sm"
                  >
                    삭제
                  </button>
                )}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-sm"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {loading ? "저장 중..." : "저장"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
