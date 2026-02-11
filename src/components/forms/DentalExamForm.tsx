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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <Smile className="text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-800">
            Dental Examination (FDI)
          </h2>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setDentitionMode("Permanent")}
            className={cn(
              "px-3 py-1 rounded text-sm font-medium transition",
              dentitionMode === "Permanent"
                ? "bg-white shadow text-emerald-700"
                : "text-slate-500",
            )}
          >
            Permanent
          </button>
          <button
            onClick={() => setDentitionMode("Mixed")}
            className={cn(
              "px-3 py-1 rounded text-sm font-medium transition",
              dentitionMode === "Mixed"
                ? "bg-white shadow text-emerald-700"
                : "text-slate-500",
            )}
          >
            Mixed
          </button>
        </div>
      </div>

      {/* Category Selectors */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
          Select Finding Category
        </p>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => {
            const count = (data[cat.id] || []).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className={cn(
                  "relative px-4 py-3 rounded-xl border-2 font-semibold transition-all flex items-center space-x-2 shadow-sm",
                  isActive
                    ? cn(cat.active, "ring-2")
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                <span className={cn("w-3 h-3 rounded-full", cat.color)} />
                <span>{cat.label}</span>
                {count > 0 && (
                  <span className="ml-2 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-2 h-6 text-sm text-slate-500 flex items-center">
          <Info size={14} className="mr-1" />
          {activeCategory ? (
            <span>
              Select teeth for{" "}
              <b>{CATEGORIES.find((c) => c.id === activeCategory)?.label}</b>
            </span>
          ) : (
            <span>Select a category above to start marking teeth.</span>
          )}
        </div>
      </div>

      {/* The Chart */}
      <div className="mb-8 overflow-x-auto pb-4">
        <ToothChart
          mode={dentitionMode}
          selectedTeeth={activeCategory ? data[activeCategory] || [] : []}
          onToggleTooth={handleToothClick}
          markedTeeth={{}}
        />
      </div>

      {/* Auxiliary Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
        {/* Ratings */}
        <div className="space-y-4">
          {[
            { id: "stains", label: "Stains" },
            { id: "calculus", label: "Calculus" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">
                {item.label}
              </label>
              <div className="flex space-x-2">
                {["+", "++", "+++"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      update({ [item.id]: data[item.id] === opt ? "" : opt })
                    }
                    className={cn(
                      "w-12 h-10 rounded-lg border font-bold transition",
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
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Soft Tissues
            </label>
            <input
              className="w-full p-2 text-sm border-b-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition"
              value={data.soft_tissue}
              onChange={(e) => update({ soft_tissue: e.target.value })}
              placeholder="e.g. Inflammed gingiva"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Malocclusion
            </label>
            <input
              className="w-full p-2 text-sm border-b-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none transition"
              value={data.malocclusion}
              onChange={(e) => update({ malocclusion: e.target.value })}
              placeholder="e.g. Crowding"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
          Additional Findings
        </label>
        <textarea
          className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 outline-none h-20 resize-none"
          value={data.additional}
          onChange={(e) => update({ additional: e.target.value })}
          placeholder="Any other notes..."
        />
      </div>
    </div>
  );
}
