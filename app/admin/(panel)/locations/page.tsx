"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { MapLocation } from "@/types";

const emptyForm = { name: "", date: "", story: "", is_public: true };

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("map_locations")
      .select("*")
      .order("order_num", { ascending: true });
    setLocations((data as MapLocation[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(loc: MapLocation) {
    setForm({
      name: loc.name,
      date: loc.date ?? "",
      story: loc.story ?? "",
      is_public: loc.is_public,
    });
    setEditingId(loc.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: form.name,
      date: form.date || null,
      story: form.story || null,
      is_public: form.is_public,
    };
    if (editingId) {
      await supabase.from("map_locations").update(payload).eq("id", editingId);
    } else {
      await supabase
        .from("map_locations")
        .insert([{ ...payload, order_num: locations.length + 1 }]);
    }
    setModalOpen(false);
    fetchAll();
  }

  async function handleDelete() {
    if (!editingId || !confirm("삭제할까요?")) return;
    await supabase.from("map_locations").delete().eq("id", editingId);
    setModalOpen(false);
    fetchAll();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지도 장소 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            /map 페이지에 표시되는 장소를 관리합니다.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          + 장소 추가
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">불러오는 중...</p>
      ) : locations.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          등록된 장소가 없습니다.
        </div>
      ) : (
        <div className="card divide-y divide-gray-100">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => openEdit(loc)}
              className="w-full py-3 flex items-start justify-between text-left hover:bg-gray-50 -mx-5 px-5"
            >
              <div>
                <p className="font-medium">{loc.name}</p>
                <p className="text-xs text-gray-500">
                  {loc.date}
                  {loc.story && ` · ${loc.story.slice(0, 40)}${loc.story.length > 40 ? "..." : ""}`}
                </p>
              </div>
              <span
                className={`text-xs ${
                  loc.is_public ? "text-green-600" : "text-gray-400"
                }`}
              >
                {loc.is_public ? "공개" : "멤버 전용"}
              </span>
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "장소 수정" : "장소 추가"}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="label">장소명 *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="성북동 한옥 다이닝"
                />
              </div>
              <div>
                <label className="label">날짜</label>
                <input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="input"
                  placeholder="2026.03"
                />
              </div>
              <div>
                <label className="label">이야기</label>
                <textarea
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  rows={3}
                  className="input resize-none"
                  placeholder="그날의 한 줄 기록"
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_public}
                  onChange={(e) =>
                    setForm({ ...form, is_public: e.target.checked })
                  }
                />
                <span>/map 페이지에 공개</span>
              </label>
              <div className="flex gap-2 pt-2 justify-end">
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
                <button type="submit" className="btn-primary text-sm">
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
