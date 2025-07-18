"use client";

import Image from "next/image";
import { useUserSession } from "../hooks/user/useUserSession";
import ZoomRange from "./ZoomRange";

const DesignStudio = () => {
  const { image } = useUserSession();
  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center h-16">
          <span className="text-2xl font-bold text-blue-600">Design</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-wrap p-2">
            <li>
              <button className="flex flex-col items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                <div className="w-5 h-5 bg-gray-400 rounded-sm flex items-center justify-center text-xs text-white">
                  T
                </div>
                Text
              </button>
            </li>
            <li>
              <button className="flex flex-col items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                <div className="w-5 h-5 bg-gray-400 rounded-sm flex items-center justify-center text-xs text-white">
                  T
                </div>
                Elements
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium">
              <span className="sr-only">Undo</span>
              &#x21B6; {/* Unicode for undo arrow */}
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium">
              <span className="sr-only">Redo</span>
              &#x21B7; {/* Unicode for redo arrow */}
            </button>
            <div className="flex items-center ml-4 border-l border-gray-200 pl-4 gap-1">
              <ZoomRange />
            </div>
          </div>

          {/* Project Title / Center */}
          <div className="flex-1 text-center">
            <span className="text-lg font-semibold text-gray-700">
              Untitled Design
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Download
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors duration-200 shadow-sm">
              Share
            </button>
          </div>
        </nav>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8 flex items-center justify-center">
          <div
            onContextMenu={(e) => e.preventDefault()}
            className="w-[800px] h-[600px] bg-white shadow-2xl relative border border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-2xl font-semibold"
          >
            Your Design Canvas
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
