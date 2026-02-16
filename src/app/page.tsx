"use client";

import React, { useState } from "react";
import PatientManager from "@/components/PatientManager";
import DoctorManager from "@/components/DoctorManager";
import CampManager from "@/components/CampManager";
import { Doctor, Camp } from "@/types";

export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedCamp, setSelectedCamp] = useState<Camp | null>(null);

  // If no doctor selected, show Doctor Manager
  if (!selectedDoctor) {
    return <DoctorManager onSelectDoctor={setSelectedDoctor} />;
  }

  // If doctor selected but no camp, show Camp Manager
  if (!selectedCamp) {
    return (
      <CampManager
        currentUser={selectedDoctor}
        onSelectCamp={setSelectedCamp}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  // If camp selected, show Patient Manager (Dashboard)
  return (
    <PatientManager
      camp={selectedCamp}
      doctor={selectedDoctor}
      onBack={() => setSelectedCamp(null)}
    />
  );
}
