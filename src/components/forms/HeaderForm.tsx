import React from "react";
import { MapPin, Calendar } from "lucide-react";

interface Props {
  data: {
    location: string;
    date: string;
  };
  update: (data: any) => void;
}

export default function HeaderForm({ data, update }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xs font-bold ring-2 ring-emerald-100">
          LOGO
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Screening Details
          </h2>
          <p className="text-slate-500">Camp Information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <MapPin size={18} className="text-emerald-600" />
            <span>Camp Location</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="Enter School/Camp Name"
            className="w-full h-14 px-4 text-lg border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <Calendar size={18} className="text-emerald-600" />
            <span>Date</span>
          </label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => update({ date: e.target.value })}
            className="w-full h-14 px-4 text-lg border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition bg-white"
          />
        </div>
      </div>
    </div>
  );
}
