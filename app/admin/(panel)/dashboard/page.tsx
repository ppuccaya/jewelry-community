"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Inquiry } from "@/types";

export default function DashboardPage() {
  const [memberCount, setMemberCount] = useState(0);
  const [nextEvent, setNextEvent] = useState<{
    title: string;
    date: string;
    time?: string;
  } | null>(null);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    const [membersRes, eventsRes, unpaidRes, inquiriesRes] = await Promise.all([
      supabase
        .from("members")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("events")
        .select("id, title, date, time")
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true })
        .limit(1),
      supabase
        .from("dues")
        .select("id", { count: "exact", head: true })
        .eq("paid", false)
        .eq("year", new Date().getFullYear())
        .eq("month", new Date().getMonth() + 1),
      supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    setMemberCount(membersRes.count ?? 0);
    setNextEvent(eventsRes.data?.[0] ?? null);
    setUnpaidCount(unpaidRes.count ?? 0);
    setRecentInquiries((inquiriesRes.data as Inquiry[]) ?? []);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = [
    {
      label: "활동 멤버",
      value: `${memberCount}명`,
      icon: "👥",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "다음 행사",
      value: nextEvent
        ? `${nextEvent.date}${nextEvent.time ? ` ${nextEvent.time}` : ""}`
        : "예정 없음",
      sub: nextEvent?.title,
      icon: "📅",
      color: "bg-gold-50 text-gold-700",
    },
    {
      label: "이번 달 미납",
      value: `${unpaidCount}건`,
      icon: "💰",
      color:
        unpaidCount > 0
          ? "bg-red-50 text-red-700"
          : "bg-green-50 text-green-700",
    },
    {
      label: "최근 문의",
      value: `${recentInquiries.length}건`,
      icon: "📩",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="card">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${card.color}`}
              >
                {card.icon}
              </span>
              <span className="text-sm text-gray-500">{card.label}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            {"sub" in card && card.sub && (
              <p className="text-sm text-gray-500 mt-0.5">{card.sub}</p>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          최근 입회 문의
        </h2>
        {recentInquiries.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">아직 문의가 없어요.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                className="py-3 flex items-start justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{inq.name}</p>
                  <p className="text-sm text-gray-500">{inq.phone}</p>
                  {inq.message && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                      {inq.message}
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(inq.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
