import React from "react";
import { Activity, Mic } from "lucide-react";

interface Props {
  data: {
    chief_complaint: string;
    med_dental_history: string;
    personal_history: string;
  };
  update: (data: any) => void;
}

const QUICK_TAGS = [
  "Pain",
  "Sensitivity",
  "Bleeding Gums",
  "Cavity",
  "Bad Breath",
  "Loose Tooth",
  "Routine Checkup",
];

export default function GeneralExamForm({ data, update }: Props) {
  const addTag = (tag: string) => {
    const current = data.chief_complaint;
    const separator = current.length > 0 ? ", " : "";
    update({ chief_complaint: current + separator + tag });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <Activity className="text-emerald-600" />
        <h2 className="text-xl font-bold text-slate-800">
          General Examination
        </h2>
      </div>

      {/* Chief Complaint */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-slate-700">
            Chief Complaint*
          </label>
          <button
            title="Voice to Text"
            className="p-2 bg-slate-100 rounded-full hover:bg-emerald-100 text-slate-500 hover:text-emerald-600 transition"
          >
            <Mic size={18} />
          </button>
        </div>

        <textarea
          value={data.chief_complaint}
          onChange={(e) => update({ chief_complaint: e.target.value })}
          className="w-full p-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition min-h-[100px] resize-none"
          placeholder="Describe patient's primary concern..."
        />

        {/* Quick Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Medical / Dental History
          </label>
          <input
            type="text"
            value={data.med_dental_history}
            onChange={(e) => update({ med_dental_history: e.target.value })}
            className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:border-emerald-500 outline-none"
            placeholder="Allergies, Past treatments..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Personal History
          </label>
          <input
            type="text"
            value={data.personal_history}
            onChange={(e) => update({ personal_history: e.target.value })}
            className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:border-emerald-500 outline-none"
            placeholder="e.g. Brushes once daily"
          />
        </div>
      </div>
    </div>
  );
}
