"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  User,
  Calendar,
  FileText,
  ChevronRight,
  LayoutGrid,
  List,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScreeningDashboard from "@/components/ScreeningDashboard";
import { ScreeningData, INITIAL_DATA } from "@/types";

// Minimal type for the list view
type PatientSummary = Pick<
  ScreeningData,
  "id" | "header" | "demographics" | "synced"
>;

interface Props {
  camp: { id: string; name: string; location: string };
  doctor: { id: string; name: string };
  onBack: () => void;
}

export default function PatientManager({ camp, doctor, onBack }: Props) {
  const [view, setView] = useState<"list" | "screening">("list");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  );
  const [patients, setPatients] = useState<ScreeningData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load all patients on mount
  useEffect(() => {
    const loadPatients = () => {
      const stored = localStorage.getItem("dental_patients");
      if (stored) {
        try {
          setPatients(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    };
    loadPatients();

    // Listen for updates from the dashboard
    window.addEventListener("storage", loadPatients);
    return () => window.removeEventListener("storage", loadPatients);
  }, [view]);

  const handleSavePatient = (data: ScreeningData) => {
    // Ensure camp and doctor IDs are set
    const pData = {
      ...data,
      campId: camp.id,
      doctorId: doctor.id,
    };

    // Determine if update or new
    setPatients((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === pData.id);
      let updated;
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = pData;
      } else {
        updated = [pData, ...prev];
      }
      localStorage.setItem("dental_patients", JSON.stringify(updated));
      return updated;
    });
    // Go back to list
    setView("list");
    setSelectedPatientId(null);
  };

  const startNewScreening = () => {
    setSelectedPatientId(null); // Triggers new form in dashboard
    setView("screening");
  };

  const openPatient = (id: string) => {
    setSelectedPatientId(id);
    setView("screening");
  };

  // Filter patients by Camp
  const filteredPatients = patients.filter(
    (p) =>
      p.campId === camp.id &&
      (p.demographics.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.includes(searchQuery)),
  );

  if (view === "screening") {
    const patientData = patients.find((p) => p.id === selectedPatientId);

    // If new patient, pre-fill with camp context
    const initialData = patientData || {
      ...INITIAL_DATA, // Imported from local types or component
      id: crypto.randomUUID(), // Temp ID
      campId: camp.id,
      doctorId: doctor.id,
      header: {
        location: camp.location,
        date: new Date().toISOString().split("T")[0],
      },
    };

    return (
      <ScreeningDashboard
        initialData={initialData}
        onSave={handleSavePatient}
        onBack={() => setView("list")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="mr-2 p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="bg-emerald-500 p-2 rounded-lg">
              <LayoutGrid size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{camp.name}</h1>
              <p className="text-slate-400 text-xs uppercase tracking-wider">
                Dr. {doctor.name} • {filteredPatients.length} Patients
              </p>
            </div>
          </div>
          <button
            onClick={startNewScreening}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-emerald-900/20 transition transform active:scale-95 w-full md:w-auto justify-center"
          >
            <Plus size={20} />
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <List size={18} />
              Patient List
            </h3>
            <span className="text-xs text-slate-400">
              {filteredPatients.length} records in this camp
            </span>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <User size={48} className="mx-auto mb-4 opacity-20" />
              <p>No patients in this camp yet.</p>
              <button
                onClick={startNewScreening}
                className="text-emerald-600 font-bold mt-2 hover:underline"
              >
                Start Screening
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => openPatient(patient.id)}
                  className="w-full p-4 hover:bg-slate-50 transition flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      {patient.demographics.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {patient.demographics.name || "Unknown"}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <User size={12} /> {patient.demographics.age}y /{" "}
                          {patient.demographics.gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {patient.header.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {patient.synced ? (
                      <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold">
                        {" "}
                        synced
                      </span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
                        {" "}
                        local
                      </span>
                    )}
                    <ChevronRight className="text-slate-300 group-hover:text-emerald-500" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
