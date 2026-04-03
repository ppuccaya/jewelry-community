"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Member } from "@/types";

const emptyForm = { name: "", phone: "", joined_at: new Date().toISOString().split("T")[0] };

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase
      .from("members")
      .select("*")
      .order("name");
    if (data) setMembers(data as Member[]);
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(m: Member) {
    setForm({ name: m.name, phone: m.phone, joined_at: m.joined_at });
    setEditingId(m.id);
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await supabase.from("members").update(form).eq("id", editingId);
    } else {
      await supabase.from("members").insert([{ ...form, status: "active" }]);
    }
    setModalOpen(false);
    setLoading(false);
    fetchMembers();
  }

  async function toggleStatus(m: Member) {
    const newStatus = m.status === "active" ? "inactive" : "active";
    await supabase.from("members").update({ status: newStatus }).eq("id", m.id);
    fetchMembers();
  }

  const active = members.filter((m) => m.status === "active");
  const inactive = members.filter((m) => m.status === "inactive");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">멤버 명단</h1>
        <button onClick={openCreate} className="btn-primary text-sm">
          + 멤버 추가
        </button>
      </div>

      {/* 활동 멤버 */}
      <div className="card mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          활동 멤버 ({active.length})
        </h2>
        {active.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">아직 멤버가 없어요.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {active.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between">
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => openEdit(m)}
                >
                  <p className="font-medium text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-500">
                    {m.phone} · 가입 {m.joined_at}
                  </p>
                </div>
                <button
                  onClick={() => toggleStatus(m)}
                  className="text-xs text-gray-400 hover:text-red-500 ml-4"
                >
                  비활성화
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 비활동 멤버 */}
      {inactive.length > 0 && (
        <div className="card">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            비활동 ({inactive.length})
          </h2>
          <div className="divide-y divide-gray-100">
            {inactive.map((m) => (
              <div
                key={m.id}
                className="py-3 flex items-center justify-between opacity-60"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => openEdit(m)}
                >
                  <p className="font-medium text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.phone}</p>
                </div>
                <button
                  onClick={() => toggleStatus(m)}
                  className="text-xs text-gray-400 hover:text-green-500 ml-4"
                >
                  활성화
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? "멤버 수정" : "멤버 추가"}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="label">이름 *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">연락처 *</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <label className="label">가입일</label>
                <input
                  type="date"
                  value={form.joined_at}
                  onChange={(e) =>
                    setForm({ ...form, joined_at: e.target.value })
                  }
                  className="input"
                />
              </div>
              <div className="flex gap-2 pt-2 justify-end">
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
