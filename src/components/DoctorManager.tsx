"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, User, ChevronRight, Stethoscope } from "lucide-react";
import { Doctor } from "@/types";

interface Props {
  onSelectDoctor: (doctor: Doctor) => void;
}

export default function DoctorManager({ onSelectDoctor }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: "",
    specialty: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("dental_doctors");
    if (stored) {
      try {
        setDoctors(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load doctors", e);
      }
    }
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name) return;

    const doctor: Doctor = {
      id: crypto.randomUUID(),
      name: newDoctor.name,
      specialty: newDoctor.specialty || "General Dentist",
      email: newDoctor.email,
      phone: newDoctor.phone,
    };

    const updated = [...doctors, doctor];
    setDoctors(updated);
    localStorage.setItem("dental_doctors", JSON.stringify(updated));
    setNewDoctor({ name: "", specialty: "", email: "", phone: "" });
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-6 text-white text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/50">
            <Stethoscope size={32} />
          </div>
          <h1 className="text-2xl font-bold">Welcome, Doctor</h1>
          <p className="text-slate-400 text-sm mt-1">
            Select your profile to continue
          </p>
        </div>

        <div className="p-6">
          {isCreating ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. John Doe"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Orthodontist"
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={newDoctor.specialty}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, specialty: e.target.value })
                  }
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-200 transition transform active:scale-95"
                >
                  Create Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {doctors.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <User size={48} className="mx-auto mb-2 opacity-20" />
                  <p>No doctor profiles found.</p>
                </div>
              )}

              <div className="max-h-64 overflow-y-auto space-y-2">
                {doctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => onSelectDoctor(doc)}
                    className="w-full p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl flex items-center justify-between group transition text-left"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-emerald-700">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-500">{doc.specialty}</p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsCreating(true)}
                className="w-full py-3 mt-4 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 text-slate-500 font-bold rounded-xl hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition"
              >
                <UserPlus size={20} />
                <span>Create New Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
