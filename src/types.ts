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

export const INITIAL_DATA: ScreeningData = {
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
