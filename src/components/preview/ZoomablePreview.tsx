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
        initialScale={0.5}
        minScale={0.2}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false} /* Allow panning anywhere */
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Toolbar */}
            <div className="flex gap-2 mb-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-lg border border-slate-200 z-50 fixed bottom-28 lg:absolute lg:top-4 lg:bottom-auto">
              <button
                onClick={() => zoomOut()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Reset View"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => zoomIn()}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Viewport - Canvas-like feel */}
            <div className="flex-1 w-full h-full bg-slate-500/10 cursor-grab active:cursor-grabbing overflow-hidden relative">
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center p-[50vh]" /* Large padding to allow scrolling past edges */
              >
                <div
                  className="bg-white text-slate-900 print-container shadow-[0_0_40px_rgba(0,0,0,0.1)] origin-center"
                  style={{
                    width: "210mm",
                    height: "297mm",
                    minHeight: "297mm",
                    minWidth: "210mm",
                  }} /* Force A4 dimensions */
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
