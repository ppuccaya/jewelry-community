"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Member, Due, Event as EventType, EventCost } from "@/types";

export default function FinancePage() {
  const [tab, setTab] = useState<"dues" | "costs">("dues");
  const [members, setMembers] = useState<Member[]>([]);
  const [dues, setDues] = useState<Due[]>([]);
  const [events, setEvents] = useState<(EventType & { costs: EventCost[] })[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const supabase = createClient();

  const fetchDues = useCallback(async () => {
    const [membersRes, duesRes] = await Promise.all([
      supabase.from("members").select("*").eq("status", "active").order("name"),
      supabase.from("dues").select("*").eq("year", year),
    ]);
    if (membersRes.data) setMembers(membersRes.data as Member[]);
    if (duesRes.data) setDues(duesRes.data as Due[]);
  }, [year]);

  const fetchCosts = useCallback(async () => {
    const { data } = await supabase
      .from("events")
      .select("*, event_costs(*), event_attendees(member_id)")
      .order("date", { ascending: false });
    if (data) {
      setEvents(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((e: any) => ({
          ...e,
          costs: Array.isArray(e.event_costs) ? e.event_costs : [],
          _attendeeCount: Array.isArray(e.event_attendees) ? e.event_attendees.length : 0,
        }))
      );
    }
  }, []);

  useEffect(() => {
    fetchDues();
    fetchCosts();
  }, [fetchDues, fetchCosts]);

  function getDuePaid(memberId: string, month: number) {
    return dues.find((d) => d.member_id === memberId && d.month === month)?.paid ?? false;
  }

  async function toggleDue(memberId: string, month: number) {
    const existing = dues.find(
      (d) => d.member_id === memberId && d.month === month
    );
    if (existing) {
      await supabase
        .from("dues")
        .update({ paid: !existing.paid })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("dues")
        .insert([{ member_id: memberId, year, month, paid: true }]);
    }
    fetchDues();
  }

  // 행사 비용 추가
  const [costModal, setCostModal] = useState<string | null>(null);
  const [costForm, setCostForm] = useState({ amount: "", description: "" });

  async function addCost(eventId: string) {
    if (!costForm.amount) return;
    await supabase.from("event_costs").insert([
      {
        event_id: eventId,
        amount: parseInt(costForm.amount),
        description: costForm.description || null,
      },
    ]);
    setCostModal(null);
    setCostForm({ amount: "", description: "" });
    fetchCosts();
  }

  async function deleteCost(costId: string) {
    await supabase.from("event_costs").delete().eq("id", costId);
    fetchCosts();
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회비 / 정산</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("dues")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "dues" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          회비 납부
        </button>
        <button
          onClick={() => setTab("costs")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "costs" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
          }`}
        >
          행사 정산
        </button>
      </div>

      {tab === "dues" ? (
        <div className="card overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setYear(year - 1)}
              className="btn-secondary text-sm px-2"
            >
              &larr;
            </button>
            <span className="font-semibold text-gray-900">{year}년</span>
            <button
              onClick={() => setYear(year + 1)}
              className="btn-secondary text-sm px-2"
            >
              &rarr;
            </button>
          </div>

          {members.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">멤버를 먼저 등록해주세요.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-medium text-gray-500 sticky left-0 bg-white">
                    이름
                  </th>
                  {months.map((m) => (
                    <th
                      key={m}
                      className={`text-center py-2 px-2 font-medium min-w-[40px] ${
                        m === currentMonth && year === new Date().getFullYear()
                          ? "text-gold-600"
                          : "text-gray-400"
                      }`}
                    >
                      {m}월
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-50">
                    <td className="py-2 px-2 font-medium text-gray-900 sticky left-0 bg-white">
                      {member.name}
                    </td>
                    {months.map((m) => {
                      const paid = getDuePaid(member.id, m);
                      return (
                        <td key={m} className="text-center py-2 px-2">
                          <button
                            onClick={() => toggleDue(member.id, m)}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                              paid
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-300 hover:bg-red-50 hover:text-red-400"
                            }`}
                          >
                            {paid ? "O" : "X"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="card text-center py-12 text-gray-400">
              행사를 먼저 등록해주세요.
            </div>
          ) : (
            events.map((evt) => {
              const totalCost = evt.costs.reduce((s, c) => s + c.amount, 0);
              const attendeeCount =
                (evt as unknown as { _attendeeCount: number })._attendeeCount || 1;
              const perPerson = Math.ceil(totalCost / attendeeCount);

              return (
                <div key={evt.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{evt.title}</h3>
                      <p className="text-sm text-gray-500">{evt.date}</p>
                    </div>
                    <button
                      onClick={() => {
                        setCostModal(evt.id);
                        setCostForm({ amount: "", description: "" });
                      }}
                      className="btn-secondary text-xs"
                    >
                      + 비용 추가
                    </button>
                  </div>

                  {evt.costs.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {evt.costs.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-1.5"
                        >
                          <span className="text-gray-700">
                            {c.description ?? "기타"} —{" "}
                            {c.amount.toLocaleString()}원
                          </span>
                          <button
                            onClick={() => deleteCost(c.id)}
                            className="text-gray-300 hover:text-red-500 text-xs"
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 text-sm border-t border-gray-100 pt-3">
                    <span className="text-gray-500">
                      총 비용:{" "}
                      <span className="font-semibold text-gray-900">
                        {totalCost.toLocaleString()}원
                      </span>
                    </span>
                    <span className="text-gray-500">
                      참석: {attendeeCount}명
                    </span>
                    <span className="text-gray-500">
                      1인:{" "}
                      <span className="font-semibold text-gold-700">
                        {perPerson.toLocaleString()}원
                      </span>
                    </span>
                  </div>

                  {/* 비용 추가 인라인 모달 */}
                  {costModal === evt.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                      <input
                        type="number"
                        placeholder="금액"
                        value={costForm.amount}
                        onChange={(e) =>
                          setCostForm({ ...costForm, amount: e.target.value })
                        }
                        className="input flex-1"
                      />
                      <input
                        placeholder="내용"
                        value={costForm.description}
                        onChange={(e) =>
                          setCostForm({
                            ...costForm,
                            description: e.target.value,
                          })
                        }
                        className="input flex-1"
                      />
                      <button
                        onClick={() => addCost(evt.id)}
                        className="btn-primary text-sm"
                      >
                        추가
                      </button>
                      <button
                        onClick={() => setCostModal(null)}
                        className="btn-secondary text-sm"
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
