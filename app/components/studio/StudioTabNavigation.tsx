"use client";

import * as React from "react";
import DesignStudio from "./DesignStudio";
import Image from "next/image";
import { constructionIcon } from "@/app/config/icons";
import SampleStudio from "./sample";

export default function StudioTabNavigation() {
  const [activeTab, setActiveTab] = React.useState("design-studio");

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex gap-1">
        <button
          className={`p-2 rounded shadow-lg transition ${
            activeTab === "design-studio"
              ? "bg-orange-600 text-yellow-50 shadow-xl"
              : "bg-orange-300 text-yellow-50 hover:bg-orange-600"
          }`}
          onClick={() => setActiveTab("design-studio")}
          role="tab"
          aria-selected={activeTab === "design-studio"}
          aria-controls="design-studio-panel"
          id="design-studio-tab"
        >
          Design Studio
        </button>
        <button
          className={`p-2 rounded shadow-lg transition ${
            activeTab === "website-builder"
              ? "bg-orange-600 text-yellow-50 shadow-xl"
              : "bg-orange-300 text-yellow-50 hover:bg-orange-600"
          }`}
          onClick={() => setActiveTab("website-builder")}
          role="tab"
          aria-selected={activeTab === "website-builder"}
          aria-controls="website-builder-panel"
          id="website-builder-tab"
        >
          Website Studio
        </button>
      </div>
      <div className="flex-1 min-h-[60vh] rounded-xl bg-orange-50/50 border border-orange-300 shadow-inner p-4">
        <div className="w-full">
          {activeTab === "design-studio" && 
          <DesignStudio />
          }

          {activeTab === "website-builder" && (
            <div
              id="website-builder-panel"
              role="tabpanel"
              aria-labelledby="website-builder-tab"
              className="mt-4 p-4 rounded-lg border border-orange-200 bg-white/80 shadow-md "
            >
              <h3 className="text-lg font-semibold text-orange-800 mb-5">
                Stay tuned!
              </h3>
              <Image
                src={constructionIcon}
                alt="Under Construction"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
