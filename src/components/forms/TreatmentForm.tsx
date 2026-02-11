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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-8">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <Stethoscope className="text-emerald-600" />
        <h2 className="text-xl font-bold text-slate-800">Treatment Plan</h2>
      </div>

      {/* Advised */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
          <CheckSquare className="w-4 h-4 mr-2" />
          Advised Treatment
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ADVISED_OPTIONS.map((opt) => {
            const isSelected = data.advised.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleList(data.advised, opt, "advised")}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center justify-between group",
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-4 ring-emerald-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50",
                )}
              >
                <span>{opt}</span>
                {isSelected && (
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Done */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center text-rose-600">
          <Syringe className="w-4 h-4 mr-2" />
          Treatment Done (On-Site)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DONE_OPTIONS.map((opt) => {
            const isSelected = data.done.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleList(data.done, opt, "done")}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center space-x-3",
                  isSelected
                    ? "border-rose-500 bg-rose-50 text-rose-800 shadow-md transform scale-[1.02]"
                    : "border-slate-200 bg-white text-slate-600",
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition",
                    isSelected
                      ? "bg-rose-500 border-rose-500"
                      : "bg-white border-slate-300",
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
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
