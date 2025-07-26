"use client"
import type React from "react"
import { FaUndo, FaRedo, FaShareAlt } from "react-icons/fa" // Removed FaDownload
import CanvasZoomRange from "./CanvasZoomRange"
import DesignStudioMainCanvas from "./DesignStudioMainCanvas"
import CanvasSizeDisplayerAndEditor from "./CanvasSizeDisplayerAndEditor"
import TitleOfDesignInput from "./TitleOfDesignInput"
import DesignStudioSidebar from "./DesignStudioSidebar"
import { useStore } from "zustand"
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store"
import DownloadDropdown from "./DownloadDropdown"
import { useRef } from "react"

const DesignStudio: React.FC = () => {
  const { windowCurrentWidth } = useStore(designStudioStore)
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="flex min-h-screen h-full bg-gray-50 font-sans text-gray-800">
      <DesignStudioSidebar />
      <div style={{ width: windowCurrentWidth - 500 + "px" }} className="flex-1 flex flex-col">
        <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm h-16 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
                <FaUndo className="w-4 h-4" />
                <span className="sr-only">Undo</span>
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
                <FaRedo className="w-4 h-4" />
                <span className="sr-only">Redo</span>
              </button>
            </div>
            <div className="flex items-center border-l border-gray-200 pl-4">
              <CanvasZoomRange step={1} />
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <TitleOfDesignInput />
          </div>
          <div className="flex items-center gap-3">
            <CanvasSizeDisplayerAndEditor />
            <div className="flex items-center gap-2 ml-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2">
                <FaShareAlt className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              {/* Use the new DownloadDropdown component */}
              <DownloadDropdown mainCanvasRef={mainCanvasRef} />
            </div>
          </div>
        </nav>
        <DesignStudioMainCanvas mainCanvasRef={mainCanvasRef} />
      </div>
    </div>
  )
}

export default DesignStudio
