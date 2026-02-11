import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
import PrintPreview from "./PrintPreview";
import { ScreeningData } from "@/types";

interface Props {
  data: ScreeningData;
}

export default function ZoomablePreview({ data }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <TransformWrapper
        initialScale={0.65}
        minScale={0.4}
        maxScale={2.5}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Toolbar */}
            <div className="flex gap-2 mb-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-200 z-50 sticky top-2">
              <button
                onClick={() => zoomOut()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Zoom Out"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Reset View"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => zoomIn()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Zoom In"
              >
                <ZoomIn size={18} />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
              <div className="flex items-center text-xs text-slate-400 gap-1 px-2">
                <Move size={14} />
                <span>Pan to move</span>
              </div>
            </div>

            {/* Viewport */}
            <div className="flex-1 w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing border border-slate-200/50 shadow-2xl rounded-sm bg-slate-500/5">
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div
                  className="bg-white text-slate-900 print-container shadow-2xl origin-center"
                  style={{ width: "210mm", minHeight: "297mm" }}
                >
                  <PrintPreview data={data} />
                </div>
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
