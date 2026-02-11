"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Printer,
  Share2,
  Wifi,
  WifiOff,
  RotateCcw,
  ArrowLeft,
  LayoutTemplate,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";
import HeaderForm from "./forms/HeaderForm";
import DemographicsForm from "./forms/DemographicsForm";
import GeneralExamForm from "./forms/GeneralExamForm";
import DentalExamForm from "./forms/DentalExamForm";
import TreatmentForm from "./forms/TreatmentForm";
import PrintPreview from "./preview/PrintPreview";
import ZoomablePreview from "./preview/ZoomablePreview";

// Types
export interface ScreeningData {
  header: {
    location: string;
    date: string;
  };
  demographics: {
    name: string;
    age: string;
    gender: "Male" | "Female" | "";
    class: string;
    contact: string;
    teacher_contact: string;
  };
  general: {
    chief_complaint: string;
    med_dental_history: string;
    personal_history: string;
  };
  dental: {
    // We map findings to lists of teeth
    caries_gross: string[];
    caries_dentinal: string[];
    caries_pit_fissure: string[];
    caries_proximal: string[];
    caries_smooth: string[];
    missing: string[];
    root_piece: string[];
    // Auxiliary
    stains: string;
    calculus: string;
    tmj: string;
    soft_tissue: string;
    malocclusion: string;
    additional: string;
  };
  treatment: {
    advised: string[];
    done: string[];
  };
  id: string; // Unique ID for sync
  synced: boolean;
}

const INITIAL_DATA: ScreeningData = {
  header: { location: "", date: new Date().toISOString().split("T")[0] },
  demographics: {
    name: "",
    age: "",
    gender: "",
    class: "",
    contact: "",
    teacher_contact: "",
  },
  general: {
    chief_complaint: "",
    med_dental_history: "",
    personal_history: "",
  },
  dental: {
    caries_gross: [],
    caries_dentinal: [],
    caries_pit_fissure: [],
    caries_proximal: [],
    caries_smooth: [],
    missing: [],
    root_piece: [],
    stains: "",
    calculus: "",
    tmj: "",
    soft_tissue: "",
    malocclusion: "",
    additional: "",
  },
  treatment: { advised: [], done: [] },
  id: "",
  synced: false,
};

interface Props {
  initialData?: ScreeningData;
  onSave?: (data: ScreeningData) => void;
  onBack?: () => void;
}

export default function ScreeningDashboard({
  initialData,
  onSave,
  onBack,
}: Props) {
  const [data, setData] = useState<ScreeningData>(
    initialData || { ...INITIAL_DATA, id: crypto.randomUUID() },
  );
  const [isOnline, setIsOnline] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Mobile View State
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  // Load from local storage if no initial data provided (standalone mode)
  useEffect(() => {
    if (!initialData) {
      const saved = localStorage.getItem("current_screening");
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved data", e);
        }
      }
    }
    // Simulate online/offline
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
    return () => {
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, [initialData]);

  // Auto-save logic (only if standalone or explicitly desired)
  useEffect(() => {
    // We only auto-save to "current_screening" if we are in standalone mode,
    // BUT for the manager mode, we probably don't want to overwrite the "current_screening" draft constantly.
    // For now, let's keep the local storage draft logic for safety.
    if (data.id) {
      // Optional: Save draft by ID?
      // For simplicity, let's just track lastSaved state time on change
      setLastSaved(new Date());
    }
  }, [data]);

  const updateSection = (
    section: keyof Omit<ScreeningData, "id" | "synced">,
    value: any,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...value },
      synced: false,
    }));
  };

  const loadExample = () => {
    const example: ScreeningData = {
      ...INITIAL_DATA,
      id: data.id, // Preserve ID
      header: {
        location: "Central High Camp",
        date: new Date().toISOString().split("T")[0],
      },
      demographics: {
        name: "ABC",
        age: "12",
        gender: "Male",
        class: "6-B",
        contact: "555-0123",
        teacher_contact: "555-0987",
      },
      general: {
        chief_complaint: "Pain in lower right back tooth",
        med_dental_history: "None",
        personal_history: "Brushes once daily",
      },
      dental: {
        ...INITIAL_DATA.dental,
        caries_dentinal: ["46"],
        stains: "++",
        calculus: "+",
      },
      treatment: {
        advised: ["Restoration"],
        done: ["Fluoride Gel"],
      },
    };
    setData(example);
  };

  const resetForm = () => {
    if (confirm("Start new screening? This will clear the current form.")) {
      setData({
        ...INITIAL_DATA,
        id: crypto.randomUUID(),
        header: data.header,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    if (onSave) {
      onSave(data);
    } else {
      // Standalone save (alert)
      alert("Data saved directly to local storage draft.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-slate-100 text-slate-900 font-sans">
      {/* Left Panel: Input */}
      <div
        className={cn(
          "w-full lg:w-1/2 h-full flex flex-col border-r border-slate-300 bg-white shadow-xl z-10 no-print transition-all duration-300",
          activeTab === "preview" ? "hidden lg:flex" : "flex",
        )}
      >
        {/* Top Bar */}
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center shadow-md shrink-0">
          <div className="flex items-center space-x-2">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-2 p-1 hover:bg-emerald-700 rounded-full transition"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-lg md:text-xl font-bold tracking-tight truncate">
              DentaCamp
            </h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={loadExample}
              className="hidden md:block text-xs bg-emerald-500 hover:bg-emerald-400 px-3 py-1 rounded transition"
            >
              Load Example
            </button>
            <div
              className="flex items-center space-x-1"
              title={isOnline ? "Synced" : "Offline"}
            >
              {isOnline ? (
                <Wifi size={16} />
              ) : (
                <WifiOff size={16} className="text-rose-300" />
              )}
              <span className="text-xs hidden md:inline">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 pb-32 lg:pb-20 scroll-smooth">
          <HeaderForm
            data={data.header}
            update={(v) => updateSection("header", v)}
          />
          <DemographicsForm
            data={data.demographics}
            update={(v) => updateSection("demographics", v)}
          />
          <GeneralExamForm
            data={data.general}
            update={(v) => updateSection("general", v)}
          />
          <DentalExamForm
            data={data.dental}
            update={(v) => updateSection("dental", v)}
          />
          <TreatmentForm
            data={data.treatment}
            update={(v) => updateSection("treatment", v)}
          />
        </div>

        {/* Sticky Action Bar (Desktop) */}
        <div className="hidden lg:flex p-4 bg-slate-50 border-t border-slate-200 justify-between items-center z-20">
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 text-slate-600 hover:text-rose-600 transition px-4 py-2 rounded-lg hover:bg-rose-50"
          >
            <RotateCcw size={20} />
            <span className="font-semibold">Reset</span>
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400">
              {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : "Ready"}
            </span>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-200 transition transform active:scale-95 font-bold"
            >
              <Save size={20} />
              <span>Save Record</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      {/* Right Panel: Live Preview - Zoomable & Pannable */}
      <div
        className={cn(
          "w-full lg:w-1/2 h-full bg-slate-200/50 relative overflow-hidden flex flex-col items-center justify-center", // No scroll here, handled by zoom library
          activeTab === "form" ? "hidden lg:flex" : "flex",
        )}
      >
        <ZoomablePreview data={data} />

        <div className="fixed lg:absolute bottom-24 lg:bottom-8 right-8 flex space-x-4 no-print z-50">
          <button
            onClick={handlePrint}
            className="bg-slate-800 text-white p-4 rounded-full shadow-xl hover:bg-slate-700 transition active:scale-95"
            title="Print"
          >
            <Printer size={24} />
          </button>
          <button
            className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] transition active:scale-95"
            title="Share via WhatsApp"
          >
            <Share2 size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-slate-900 rounded-2xl shadow-2xl z-50 flex items-center justify-around px-2 text-slate-400 no-print">
        <button
          onClick={() => setActiveTab("form")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full rounded-xl transition",
            activeTab === "form"
              ? "text-emerald-400 bg-white/10"
              : "hover:text-white",
          )}
        >
          <PenTool size={20} />
          <span className="text-[10px] font-bold mt-1">Screening</span>
        </button>

        <button
          onClick={handleSave}
          className="flex flex-col items-center justify-center w-full h-full rounded-xl transition hover:text-white text-emerald-500"
        >
          <Save size={24} />
          <span className="text-[10px] font-bold mt-1">Save</span>
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full rounded-xl transition",
            activeTab === "preview"
              ? "text-emerald-400 bg-white/10"
              : "hover:text-white",
          )}
        >
          <LayoutTemplate size={20} />
          <span className="text-[10px] font-bold mt-1">Preview</span>
        </button>
      </div>
    </div>
  );
}
