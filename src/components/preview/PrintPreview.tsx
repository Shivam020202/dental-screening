import React from "react";
import { ScreeningData } from "@/types";
import { cn } from "@/lib/utils"; // Assuming cn utility exists

interface Props {
  data: ScreeningData;
}

export default function PrintPreview({ data }: Props) {
  // Use a refined serif or sans-serif for the printed form to mimic professional medical records
  // "Outfit" or "Inter" from Google fonts are good, we will stick to a clean Inter-like look
  // but maybe slightly more spaced out for readability.

  const Field = ({
    label,
    value,
    width = "w-full",
    className,
  }: {
    label: string;
    value?: string;
    width?: string;
    className?: string;
  }) => (
    <div
      className={cn(
        "flex flex-col border-b border-slate-400 pb-1 mb-2",
        width,
        className,
      )}
    >
      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
        {label}
      </span>
      <span
        className={cn(
          "font-medium text-slate-900 min-h-[1.2em]",
          !value && "text-transparent",
        )}
      >
        {value || "."}
      </span>
    </div>
  );

  const CheckBox = ({
    label,
    checked,
  }: {
    label: string;
    checked: boolean;
  }) => (
    <div className="flex items-center space-x-2 mr-4">
      <div
        className={cn(
          "w-4 h-4 border-2 border-slate-400 flex items-center justify-center rounded-sm",
          checked ? "bg-slate-800 border-slate-800" : "",
        )}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          checked ? "text-slate-900" : "text-slate-500",
        )}
      >
        {label}
      </span>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-sm font-bold text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-4 mt-6 tracking-wide">
      {title}
    </h3>
  );

  const CircleFinding = ({
    label,
    items,
    color = "border-slate-800",
  }: {
    label: string;
    items: string[];
    color?: string;
  }) => (
    <div className="flex items-start py-1 border-b border-dashed border-slate-200">
      <span className="w-32 text-xs font-bold text-slate-700">{label}:</span>
      <div className="flex-1 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((t) => (
            <span
              key={t}
              className={cn(
                "inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold",
                color,
              )}
            >
              {t}
            </span>
          ))
        ) : (
          <span className="text-slate-300 text-xs">—</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white text-slate-900 p-8 box-border font-sans flex flex-col justify-between print-container">
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b-2 border-slate-900 pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 text-[10px] font-bold">
              LOGO
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                DENTAL ASSESSMENT FORM
              </h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
                Official Screening Record
              </p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end space-y-2">
            <div className="flex items-baseline space-x-2 border-b border-slate-400 pb-1 min-w-[200px] justify-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Date:
              </span>
              <span className="font-medium">{data.header.date}</span>
            </div>
            <div className="flex items-baseline space-x-2 border-b border-slate-400 pb-1 min-w-[200px] justify-end">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Location:
              </span>
              <span className="font-medium ">{data.header.location}</span>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 mb-6">
          <Field
            label="Patient Name"
            value={data.demographics.name}
            className="col-span-6"
          />
          <div className="col-span-2 flex flex-col border-b border-slate-400 pb-1 mb-2">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
              Age
            </span>
            <span className="font-medium text-slate-900 text-center">
              {data.demographics.age}
            </span>
          </div>
          <div className="col-span-4 flex flex-col border-b border-slate-400 pb-1 mb-2">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
              Gender
            </span>
            <div className="flex mt-1">
              <CheckBox
                label="Male"
                checked={data.demographics.gender === "Male"}
              />
              <CheckBox
                label="Female"
                checked={data.demographics.gender === "Female"}
              />
            </div>
          </div>

          <Field
            label="Class / Section"
            value={data.demographics.class}
            className="col-span-3"
          />
          <Field
            label="Parent Contact"
            value={data.demographics.contact}
            className="col-span-4"
          />
          <Field
            label="Teacher Contact"
            value={data.demographics.teacher_contact}
            className="col-span-5"
          />
        </div>

        {/* History */}
        <div className="mb-6 space-y-4">
          <div className="flex items-baseline border-b border-slate-400 pb-1">
            <span className="text-xs font-bold text-slate-700 mr-2 shrink-0">
              *Chief Complaint:
            </span>
            <span className="text-sm font-medium text-slate-900 flex-1">
              {data.general.chief_complaint}
            </span>
          </div>
          <div className="flex items-baseline border-b border-slate-400 pb-1">
            <span className="text-xs font-bold text-slate-500 mr-2 shrink-0">
              Medical History:
            </span>
            <span className="text-sm font-medium text-slate-900 flex-1">
              {data.general.med_dental_history}
            </span>
          </div>
          <div className="flex items-baseline border-b border-slate-400 pb-1">
            <span className="text-xs font-bold text-slate-500 mr-2 shrink-0">
              Personal History:
            </span>
            <span className="text-sm font-medium text-slate-900 flex-1">
              {data.general.personal_history}
            </span>
          </div>
        </div>

        {/* Clinical Findings */}
        <div className="mb-6">
          <SectionTitle title="Oral Examination" />

          <div className="grid grid-cols-2 gap-8">
            {/* Visual Chart Data List */}
            <div className="space-y-2">
              <CircleFinding
                label="Grossly Carious"
                items={data.dental.caries_gross}
                color="border-rose-600 text-rose-700 bg-rose-50"
              />
              <CircleFinding
                label="Dentinal Caries"
                items={data.dental.caries_dentinal}
                color="border-orange-500 text-orange-700"
              />
              <CircleFinding
                label="Pit & Fissure"
                items={data.dental.caries_pit_fissure}
              />
              <CircleFinding
                label="Proximal Caries"
                items={data.dental.caries_proximal}
              />
              <CircleFinding
                label="Root Piece"
                items={data.dental.root_piece}
              />
              <CircleFinding
                label="Missing"
                items={data.dental.missing}
                color="border-slate-400 text-slate-500"
              />
            </div>

            {/* Other Ratings */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="border border-slate-200 rounded p-2 text-center bg-slate-50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">
                    Stains
                  </div>
                  <div className="font-bold text-lg">
                    {data.dental.stains || "-"}
                  </div>
                </div>
                <div className="border border-slate-200 rounded p-2 text-center bg-slate-50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">
                    Calculus
                  </div>
                  <div className="font-bold text-lg">
                    {data.dental.calculus || "-"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex border-b border-slate-300 pb-1">
                  <span className="w-24 text-xs font-bold text-slate-500">
                    Soft Tissues:
                  </span>
                  <span className="text-sm font-medium">
                    {data.dental.soft_tissue}
                  </span>
                </div>
                <div className="flex border-b border-slate-300 pb-1">
                  <span className="w-24 text-xs font-bold text-slate-500">
                    Malocclusion:
                  </span>
                  <span className="text-sm font-medium">
                    {data.dental.malocclusion}
                  </span>
                </div>
                <div className="flex border-b border-slate-300 pb-1">
                  <span className="w-24 text-xs font-bold text-slate-500">
                    TMJ:
                  </span>
                  <span className="text-sm font-medium">{data.dental.tmj}</span>
                </div>
                <div className="flex border-b border-slate-300 pb-1">
                  <span className="w-24 text-xs font-bold text-slate-500">
                    Other:
                  </span>
                  <span className="text-sm font-medium">
                    {data.dental.additional}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Plan */}
        <div>
          <SectionTitle title="Treatment Plan" />
          <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Investigations & Procedures Advised:
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.treatment.advised.length > 0 ? (
                  data.treatment.advised.map((t) => (
                    <span
                      key={t}
                      className="text-sm font-bold text-slate-900 flex items-center"
                    >
                      <div className="w-3 h-3 border border-slate-900 bg-slate-900 mr-2 rounded-sm" />
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400 italic">
                    None Recorded
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 mt-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                Treatment Done (Camp Site):
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.treatment.done.length > 0 ? (
                  data.treatment.done.map((t) => (
                    <span
                      key={t}
                      className="text-sm font-bold text-emerald-800 flex items-center"
                    >
                      <div className="w-3 h-3 border border-emerald-600 bg-emerald-600 mr-2 rounded-full" />
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-emerald-600/50 italic">
                    None
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="pb-4">
        {/* Handwriting Area */}
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Remarks / Handwriting Space:
          </p>
          <div className="space-y-6">
            <div className="border-b border-slate-300 h-1 w-full" />
            <div className="border-b border-slate-300 h-1 w-full" />
            <div className="border-b border-slate-300 h-1 w-full" />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[10px] text-slate-400">
            Printed via <span className="font-bold">DentaCamp FastScreen</span>{" "}
            • {new Date().toLocaleDateString()}
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 border-b border-slate-900 mb-1" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Examiner Signature
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
