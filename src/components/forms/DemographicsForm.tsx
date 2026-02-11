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
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
        <User size={20} className="text-emerald-600" />
        <h2 className="text-lg font-bold text-slate-800">Demographics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name - Full width */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Patient Name*
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            className="w-full h-10 px-3 text-base font-medium border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition placeholder:text-slate-400"
            placeholder="Full Name"
          />
        </div>

        {/* Age & Gender Row */}
        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Age*
            </label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => update({ age: e.target.value })}
              className="w-full h-10 px-2 text-center text-lg font-bold border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition bg-slate-50"
              placeholder="--"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Gender*
            </label>
            <div className="flex h-10 bg-slate-100 rounded-md p-1 space-x-1">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  onClick={() => update({ gender: g })}
                  className={`flex-1 rounded text-xs font-bold transition-all shadow-sm ${
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

        {/* Class */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Class / Sec
          </label>
          <div className="relative">
            <School
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              value={data.class}
              onChange={(e) => update({ class: e.target.value })}
              className="w-full h-10 pl-9 pr-3 text-sm border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition"
              placeholder="e.g. 5-A"
            />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Parent Contact
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />
            <input
              type="tel"
              value={data.contact}
              onChange={(e) => update({ contact: e.target.value })}
              className="w-full h-10 pl-9 pr-3 text-sm border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition"
              placeholder="Mobile No."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
