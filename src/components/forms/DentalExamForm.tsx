import React, { useState } from "react";
import { Smile, Zap, Plus, Info } from "lucide-react";
import ToothChart from "./ToothChart";
import { cn } from "@/lib/utils";

interface Props {
  data: any;
  update: (data: any) => void;
}

const CATEGORIES = [
  {
    id: "caries_gross",
    label: "Grossly Carious",
    color: "bg-rose-500",
    active: "border-rose-500 bg-rose-50 ring-rose-200 text-rose-900",
    text: "text-rose-500",
  },
  {
    id: "caries_dentinal",
    label: "Dentinal Caries",
    color: "bg-orange-500",
    active: "border-orange-500 bg-orange-50 ring-orange-200 text-orange-900",
    text: "text-orange-500",
  },
  {
    id: "caries_pit_fissure",
    label: "Pit & Fissure",
    color: "bg-yellow-500",
    active: "border-yellow-500 bg-yellow-50 ring-yellow-200 text-yellow-900",
    text: "text-yellow-600",
  },
  {
    id: "caries_proximal",
    label: "Proximal Caries",
    color: "bg-amber-600",
    active: "border-amber-600 bg-amber-50 ring-amber-200 text-amber-900",
    text: "text-amber-600",
  },
  {
    id: "caries_smooth",
    label: "Smooth Surface",
    color: "bg-purple-500",
    active: "border-purple-500 bg-purple-50 ring-purple-200 text-purple-900",
    text: "text-purple-500",
  },
  {
    id: "missing",
    label: "Missing",
    color: "bg-slate-500",
    active: "border-slate-500 bg-slate-50 ring-slate-200 text-slate-900",
    text: "text-slate-500",
  },
  {
    id: "root_piece",
    label: "Root Piece",
    color: "bg-stone-600",
    active: "border-stone-600 bg-stone-50 ring-stone-200 text-stone-900",
    text: "text-stone-600",
  },
];

export default function DentalExamForm({ data, update }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [dentitionMode, setDentitionMode] = useState<"Permanent" | "Mixed">(
    "Mixed",
  );

  const handleToothClick = (toothId: string) => {
    if (!activeCategory) return;

    // Toggle tooth in the active category list
    const currentList = data[activeCategory] || [];
    const isIncluded = currentList.includes(toothId);

    const newList = isIncluded
      ? currentList.filter((id: string) => id !== toothId)
      : [...currentList, toothId];

    update({ [activeCategory]: newList });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Smile size={20} className="text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-800">
            Dental Examination
          </h2>
        </div>
        <div className="flex bg-slate-100 p-0.5 rounded-md">
          <button
            onClick={() => setDentitionMode("Permanent")}
            className={cn(
              "px-2 py-1 rounded text-xs font-semibold transition",
              dentitionMode === "Permanent"
                ? "bg-white shadow-sm text-emerald-700"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            Permanent
          </button>
          <button
            onClick={() => setDentitionMode("Mixed")}
            className={cn(
              "px-2 py-1 rounded text-xs font-semibold transition",
              dentitionMode === "Mixed"
                ? "bg-white shadow-sm text-emerald-700"
                : "text-slate-500 hover:text-slate-700",
            )}
          >
            Mixed
          </button>
        </div>
      </div>

      {/* Category Selectors */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
          Select Finding Category
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count = (data[cat.id] || []).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className={cn(
                  "relative px-3 py-2 rounded-lg border text-sm font-semibold transition-all flex items-center space-x-1.5 shadow-sm",
                  isActive
                    ? cn(cat.active, "ring-1 border-transparent")
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                <div
                  className={cn("w-2.5 h-2.5 rounded-full shrink-0", cat.color)}
                />
                <span>{cat.label}</span>
                {count > 0 && (
                  <span className="ml-1 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-2 h-5 text-xs text-slate-500 flex items-center">
          <Info size={12} className="mr-1" />
          {activeCategory ? (
            <span>
              Select teeth for{" "}
              <b className="text-slate-700">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </b>
            </span>
          ) : (
            <span>Select a category above to start marking teeth.</span>
          )}
        </div>
      </div>

      {/* The Chart */}
      <div className="mb-6 overflow-x-auto pb-2">
        <ToothChart
          mode={dentitionMode}
          selectedTeeth={activeCategory ? data[activeCategory] || [] : []}
          onToggleTooth={handleToothClick}
          markedTeeth={{}}
        />
      </div>

      {/* Auxiliary Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        {/* Ratings */}
        <div className="space-y-3">
          {[
            { id: "stains", label: "Stains" },
            { id: "calculus", label: "Calculus" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                {item.label}
              </label>
              <div className="flex space-x-1">
                {["+", "++", "+++"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      update({ [item.id]: data[item.id] === opt ? "" : opt })
                    }
                    className={cn(
                      "w-10 h-8 rounded border text-xs font-bold transition",
                      data[item.id] === opt
                        ? "bg-slate-800 text-white border-slate-800"
                        : "bg-white border-slate-200 text-slate-400 hover:border-emerald-400 hover:text-emerald-500",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Text Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Soft Tissues
            </label>
            <input
              className="w-full p-2 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition"
              value={data.soft_tissue}
              onChange={(e) => update({ soft_tissue: e.target.value })}
              placeholder="e.g. Inflammed gingiva"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
              Malocclusion
            </label>
            <input
              className="w-full p-2 text-sm border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition"
              value={data.malocclusion}
              onChange={(e) => update({ malocclusion: e.target.value })}
              placeholder="e.g. Crowding"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
          Additional Findings
        </label>
        <textarea
          className="w-full p-2 text-sm border border-slate-200 rounded focus:border-emerald-500 outline-none h-16 resize-none placeholder:text-slate-400"
          value={data.additional}
          onChange={(e) => update({ additional: e.target.value })}
          placeholder="Any other notes..."
        />
      </div>
    </div>
  );
}
