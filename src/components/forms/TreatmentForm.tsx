import React from "react";
import { Stethoscope, Syringe, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  data: {
    advised: string[];
    done: string[];
  };
  update: (data: any) => void;
}

const ADVISED_OPTIONS = [
  "X-Ray (IOPA/OPG)",
  "RCT",
  "Extraction",
  "Scaling",
  "Ortho Consultation",
  "Restoration",
  "Other",
];

const DONE_OPTIONS = [
  "Scaling (Ultrasonic/Hand)",
  "GIC Restoration",
  "Fluoride Gel",
  "Pit/Fissure Sealant",
  "Counselling",
];

export default function TreatmentForm({ data, update }: Props) {
  const toggleList = (
    list: string[],
    item: string,
    key: "advised" | "done",
  ) => {
    const included = list.includes(item);
    const newList = included ? list.filter((i) => i !== item) : [...list, item];
    update({ [key]: newList });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
        <Stethoscope size={20} className="text-emerald-600" />
        <h2 className="text-lg font-bold text-slate-800">Treatment Plan</h2>
      </div>

      {/* Advised */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center">
          <CheckSquare className="w-3.5 h-3.5 mr-1.5" />
          Advised Treatment
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {ADVISED_OPTIONS.map((opt) => {
            const isSelected = data.advised.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleList(data.advised, opt, "advised")}
                className={cn(
                  "px-3 py-2 rounded-lg border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between group",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50",
                )}
              >
                <span>{opt}</span>
                {isSelected && (
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Done */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center text-rose-600">
          <Syringe className="w-3.5 h-3.5 mr-1.5" />
          Treatment Done (On-Site)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {DONE_OPTIONS.map((opt) => {
            const isSelected = data.done.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleList(data.done, opt, "done")}
                className={cn(
                  "px-3 py-2 rounded-lg border text-left text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                  isSelected
                    ? "border-rose-500 bg-rose-50 text-rose-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition",
                    isSelected
                      ? "bg-rose-500 border-rose-500"
                      : "bg-white border-slate-300",
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
