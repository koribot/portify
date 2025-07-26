"use client";

import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
import type React from "react";
import { useStore } from "zustand";

const TextsBlockPanel: React.FC = () => {
  const {addContentBlock} = useStore(designStudioStore);
  const addTextBlock = () => {
    addContentBlock({ type: "text", content: "New text block" });
  }
  return (
    <div className="p-4 bg-gray-50">
      <button onClick={addTextBlock} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
        Add text box
      </button>
      <div className="text-gray-700">Hello from Text Category</div>
    </div>
  );
};

export default TextsBlockPanel;
