"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ProgramSection, ProgramItem } from "@/types";

type SectionWithItems = ProgramSection & { items: ProgramItem[] };

export default function AdminProgramPage() {
  const [sections, setSections] = useState<SectionWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [sectionsRes, itemsRes] = await Promise.all([
      supabase
        .from("program_sections")
        .select("*")
        .order("order_num", { ascending: true }),
      supabase
        .from("program_items")
        .select("*")
        .order("order_num", { ascending: true }),
    ]);
    const sectionsData = (sectionsRes.data as ProgramSection[]) ?? [];
    const itemsData = (itemsRes.data as ProgramItem[]) ?? [];
    setSections(
      sectionsData.map((s) => ({
        ...s,
        items: itemsData.filter((i) => i.section_id === s.id),
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function addSection() {
    const nextOrder = sections.length + 1;
    await supabase.from("program_sections").insert([
      {
        number: String(nextOrder).padStart(2, "0"),
        title: "새 섹션",
        order_num: nextOrder,
        is_published: true,
      },
    ]);
    fetchAll();
  }

  async function updateSection(id: string, patch: Partial<ProgramSection>) {
    await supabase.from("program_sections").update(patch).eq("id", id);
    fetchAll();
  }

  async function deleteSection(id: string) {
    if (!confirm("이 섹션과 하위 항목을 모두 삭제할까요?")) return;
    await supabase.from("program_sections").delete().eq("id", id);
    fetchAll();
  }

  async function addItem(sectionId: string, currentCount: number) {
    await supabase.from("program_items").insert([
      {
        section_id: sectionId,
        label: "새 항목",
        order_num: currentCount + 1,
      },
    ]);
    fetchAll();
  }

  async function updateItem(id: string, label: string) {
    await supabase.from("program_items").update({ label }).eq("id", id);
    fetchAll();
  }

  async function deleteItem(id: string) {
    await supabase.from("program_items").delete().eq("id", id);
    fetchAll();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">프로그램 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            /program 페이지에 표시되는 카테고리와 항목을 관리합니다.
          </p>
        </div>
        <button onClick={addSection} className="btn-primary text-sm">
          + 섹션 추가
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">불러오는 중...</p>
      ) : sections.length === 0 ? (
        <div className="card text-center py-12 text-gray-400">
          등록된 프로그램 섹션이 없습니다. 위 버튼으로 추가해보세요.
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              onUpdate={(patch) => updateSection(section.id, patch)}
              onDelete={() => deleteSection(section.id)}
              onAddItem={() => addItem(section.id, section.items.length)}
              onUpdateItem={updateItem}
              onDeleteItem={deleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  onUpdate,
  onDelete,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: {
  section: SectionWithItems;
  onUpdate: (patch: Partial<ProgramSection>) => void;
  onDelete: () => void;
  onAddItem: () => void;
  onUpdateItem: (id: string, label: string) => void;
  onDeleteItem: (id: string) => void;
}) {
  const [number, setNumber] = useState(section.number);
  const [title, setTitle] = useState(section.title);

  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-4">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onBlur={() => number !== section.number && onUpdate({ number })}
          className="input w-16 text-center font-bold"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => title !== section.title && onUpdate({ title })}
          className="input flex-1 font-semibold"
          placeholder="섹션 제목"
        />
        <label className="flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap px-2">
          <input
            type="checkbox"
            checked={section.is_published}
            onChange={(e) => onUpdate({ is_published: e.target.checked })}
          />
          공개
        </label>
        <button
          onClick={onDelete}
          className="text-xs text-gray-400 hover:text-red-500 px-2"
        >
          삭제
        </button>
      </div>

      <div className="pl-20 space-y-2">
        {section.items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            onUpdate={onUpdateItem}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
        <button
          onClick={onAddItem}
          className="text-xs text-gray-500 hover:text-gold-600 px-2 py-1"
        >
          + 항목 추가
        </button>
      </div>
    </div>
  );
}

function ItemRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: ProgramItem;
  onUpdate: (id: string, label: string) => void;
  onDelete: () => void;
}) {
  const [label, setLabel] = useState(item.label);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-6">·</span>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => label !== item.label && onUpdate(item.id, label)}
        className="input flex-1 text-sm"
      />
      <button
        onClick={onDelete}
        className="text-xs text-gray-300 hover:text-red-500 px-2"
      >
        ✕
      </button>
    </div>
  );
}
