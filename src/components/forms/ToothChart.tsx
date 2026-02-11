import React from "react";
import { cn } from "@/lib/utils";

interface ToothProps {
  id: number;
  selected: boolean;
  onClick: (id: string) => void;
  isPrimary?: boolean;
}

const Tooth = ({ id, selected, onClick, isPrimary }: ToothProps) => {
  return (
    <button
      onClick={() => onClick(id.toString())}
      className={cn(
        "flex items-center justify-center rounded-full border transition-all duration-200 shadow-sm",
        isPrimary
          ? "w-8 h-8 text-xs bg-slate-50 border-slate-300" // Primary teeth are smaller/lighter
          : "w-10 h-10 md:w-12 md:h-12 text-sm md:text-base font-medium", // Permanent teeth
        selected
          ? "bg-rose-500 border-rose-600 text-white ring-2 ring-rose-200 shadow-rose-200 scale-110 z-10"
          : "bg-white border-slate-300 text-slate-600 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50",
      )}
    >
      {id}
    </button>
  );
};

interface ToothChartProps {
  selectedTeeth: string[];
  onToggleTooth: (id: string) => void;
  mode: "Permanent" | "Mixed";
  markedTeeth: Record<string, string>;
}

// FDI Notation Arrays
const U_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11];
const U_LEFT = [21, 22, 23, 24, 25, 26, 27, 28];
const L_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41];
const L_LEFT = [31, 32, 33, 34, 35, 36, 37, 38];

const PRIMARY_U_RIGHT = [55, 54, 53, 52, 51];
const PRIMARY_U_LEFT = [61, 62, 63, 64, 65];
const PRIMARY_L_RIGHT = [85, 84, 83, 82, 81];
const PRIMARY_L_LEFT = [71, 72, 73, 74, 75];

export default function ToothChart({
  selectedTeeth,
  onToggleTooth,
  mode,
}: ToothChartProps) {
  const renderQuadrant = (
    teeth: number[],
    label: string,
    isPrimary = false,
  ) => (
    <div className="flex flex-col items-center gap-2">
      {/* Visual Guidelines */}
      {!isPrimary && (
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          {label}
        </span>
      )}
      <div className="flex gap-1 md:gap-2">
        {teeth.map((t) => (
          <Tooth
            key={t}
            id={t}
            selected={selectedTeeth.includes(t.toString())}
            onClick={onToggleTooth}
            isPrimary={isPrimary}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-slate-100/50 p-2 md:p-4 rounded-xl border border-dashed border-slate-300">
      <div className="overflow-x-auto pb-4 px-2">
        {/* Use w-max to force the container to be as wide as the teeth row, preventing any centering clipping */}
        <div className="flex flex-col items-center w-max mx-auto gap-8">
          {/* Upper Arch */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h4 className="text-xs font-bold text-slate-500 uppercase bg-slate-200 px-3 py-1 rounded-full sticky left-0 right-0">
              Upper Arch (Maxilla)
            </h4>

            <div className="flex gap-4 md:gap-8 lg:gap-12 relative px-4">
              {/* Midline Marker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 -translate-x-1/2 z-0"></div>

              {renderQuadrant(U_RIGHT, "Right (Q1)")}
              {renderQuadrant(U_LEFT, "Left (Q2)")}
            </div>

            {/* Primary Upper */}
            {mode === "Mixed" && (
              <div className="flex gap-4 md:gap-8 relative mt-2 opacity-90 scale-95 px-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 -translate-x-1/2 z-0"></div>
                {renderQuadrant(PRIMARY_U_RIGHT, "", true)}
                {renderQuadrant(PRIMARY_U_LEFT, "", true)}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-200"></div>

          {/* Lower Arch */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Primary Lower */}
            {mode === "Mixed" && (
              <div className="flex gap-4 md:gap-8 relative mb-2 opacity-90 scale-95 px-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 -translate-x-1/2 z-0"></div>
                {renderQuadrant(PRIMARY_L_RIGHT, "", true)}
                {renderQuadrant(PRIMARY_L_LEFT, "", true)}
              </div>
            )}

            <div className="flex gap-4 md:gap-8 lg:gap-12 relative px-4">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 -translate-x-1/2 z-0"></div>
              {renderQuadrant(L_RIGHT, "Right (Q4)")}
              {renderQuadrant(L_LEFT, "Left (Q3)")}
            </div>

            <h4 className="text-xs font-bold text-slate-500 uppercase bg-slate-200 px-3 py-1 rounded-full sticky left-0 right-0">
              Lower Arch (Mandible)
            </h4>
          </div>
        </div>
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="md:hidden text-center text-[10px] text-slate-400 mt-2 font-medium italic">
        Scroll horizontally to see all teeth →
      </div>
    </div>
  );
}
