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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-[10px] font-bold ring-1 ring-emerald-100">
          LOGO
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            Screening Details
          </h2>
          <p className="text-xs text-slate-500">Camp Information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600">
            <MapPin size={14} className="text-emerald-600" />
            <span>Camp Location</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="Enter School/Camp Name"
            className="w-full h-10 px-3 text-sm border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600">
            <Calendar size={14} className="text-emerald-600" />
            <span>Date</span>
          </label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => update({ date: e.target.value })}
            className="w-full h-10 px-3 text-sm border border-slate-300 rounded-md focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 outline-none transition bg-white text-slate-700"
          />
        </div>
      </div>
    </div>
  );
}
