"use client";

import React, { useState, useEffect } from "react";
import { Plus, MapPin, Calendar, ChevronRight, Tent } from "lucide-react";
import { Camp } from "@/types";

interface Props {
  onSelectCamp: (camp: Camp) => void;
  currentUser: { id: string; name: string };
  onBack: () => void;
}

export default function CampManager({
  onSelectCamp,
  currentUser,
  onBack,
}: Props) {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCamp, setNewCamp] = useState<Partial<Camp>>({
    name: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    status: "active",
  });

  useEffect(() => {
    const stored = localStorage.getItem("dental_camps");
    if (stored) {
      try {
        setCamps(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load camps", e);
      }
    }
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.name) return;

    const camp: Camp = {
      id: crypto.randomUUID(),
      name: newCamp.name,
      location: newCamp.location || "Unknown",
      date: newCamp.date || new Date().toISOString().split("T")[0],
      doctorId: currentUser.id,
      status: "active",
    };

    const updated = [camp, ...camps];
    setCamps(updated);
    localStorage.setItem("dental_camps", JSON.stringify(updated));
    setNewCamp({
      name: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      status: "active",
    });
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Manage Camps</h1>
            <p className="text-slate-400 text-sm mt-1">
              Select or create a screening camp
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition"
          >
            Switch Profile
          </button>
        </div>

        <div className="p-6">
          {isCreating ? (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Plus size={24} className="text-emerald-600" />
                Create New Camp
              </h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Camp Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. City School Screening"
                      className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={newCamp.name}
                      onChange={(e) =>
                        setNewCamp({ ...newCamp, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Main Hall"
                      className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={newCamp.location}
                      onChange={(e) =>
                        setNewCamp({ ...newCamp, location: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={newCamp.date}
                      onChange={(e) =>
                        setNewCamp({ ...newCamp, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-3 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-200 transition transform active:scale-95"
                  >
                    Create Camp
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => setIsCreating(true)}
                  className="h-full min-h-[160px] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition group"
                >
                  <div className="bg-slate-100 p-4 rounded-full mb-3 group-hover:bg-emerald-100 transition">
                    <Plus size={32} />
                  </div>
                  <span className="font-bold">Create New Camp</span>
                </button>

                {camps.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => onSelectCamp(camp)}
                    className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-500 transition text-left group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                          <Tent size={20} />
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-bold ${
                            camp.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {camp.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 mb-1">
                        {camp.name}
                      </h3>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <MapPin size={14} /> {camp.location}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <Calendar size={14} /> {camp.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-medium text-emerald-600">
                      <span>View Patients</span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
