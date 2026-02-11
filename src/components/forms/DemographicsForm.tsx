import React from "react";
import { User, Calculator, Hash, Phone, School } from "lucide-react";

interface Props {
  data: {
    name: string;
    age: string;
    gender: "Male" | "Female" | "";
    class: string;
    contact: string;
    teacher_contact: string;
  };
  update: (data: any) => void;
}

export default function DemographicsForm({ data, update }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <User className="text-emerald-600" />
        <h2 className="text-xl font-bold text-slate-800">Demographics</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Patient Name*
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full h-16 text-xl px-5 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition placeholder:text-slate-300"
            placeholder="Full Name"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Age*
            </label>
            <div className="relative">
              <input
                type="number"
                value={data.age}
                onChange={(e) => update({ age: e.target.value })}
                className="w-full h-16 text-2xl px-5 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition bg-slate-50 text-center font-bold"
                placeholder="--"
              />
            </div>
          </div>
          {/* Gender Toggle */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gender*
            </label>
            <div className="flex h-16 bg-slate-100 rounded-xl p-1.5 space-x-2">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  onClick={() => update({ gender: g })}
                  className={`flex-1 rounded-lg font-bold text-lg transition-all shadow-sm ${
                    data.gender === g
                      ? "bg-white text-emerald-700 shadow ring-1 ring-slate-200"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Class */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Class / Sec
            </label>
            <div className="relative">
              <School
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={data.class}
                onChange={(e) => update({ class: e.target.value })}
                className="w-full h-14 pl-12 pr-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                placeholder="e.g. 5-A"
              />
            </div>
          </div>
          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Contact
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="tel"
                value={data.contact}
                onChange={(e) => update({ contact: e.target.value })}
                className="w-full h-14 pl-12 pr-4 text-lg border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                placeholder="Parent No."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
