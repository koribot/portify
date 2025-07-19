import { useDesignStudioStore } from "@/app/store/state/design-studio/useDesignStudioStore";
import React from "react";

interface Props {
  handleResize: (event: React.MouseEvent<HTMLDivElement>) => void;
  canvaWidth: number;
  canvaHeight: number;
}
const CanvasResizers = ({ handleResize, canvaWidth, canvaHeight }: Props) => {
  return (
    <>
      {/* Corner resize points */}
      <div
        onMouseDown={handleResize}
        id="resize-top-left-point"
        className="bg-gray-400 w-[6px] h-[6px] cursor-nwse-resize absolute left-[-10px] top-[-10px] opacity-50 border-5 border-gray-400 
                      hover:bg-gray-500 hover:opacity-75 transition-all duration-200"
      />
      <div
        onMouseDown={handleResize}
        id="resize-top-right-point"
        className="bg-gray-400 w-[6px] h-[6px] cursor-nesw-resize absolute right-[-10px] top-[-10px] opacity-50 border-5 border-gray-400
                      hover:bg-gray-500 hover:opacity-75 transition-all duration-200"
      />
      <div
        onMouseDown={handleResize}
        id="resize-bottom-right-point"
        className="bg-gray-400 w-[6px] h-[6px] cursor-nwse-resize absolute right-[-10px] bottom-[-10px] opacity-50 border-5 border-gray-400
                      hover:bg-gray-500 hover:opacity-75 transition-all duration-200"
      />
      <div
        onMouseDown={handleResize}
        id="resize-bottom-left-point"
        className="bg-gray-400 w-[6px] h-[6px] cursor-nesw-resize absolute left-[-10px] bottom-[-10px] opacity-50 border-5 border-gray-400
                      hover:bg-gray-500 hover:opacity-75 transition-all duration-200"
      />

      {/* Side resize bars */}
      <div
        onMouseDown={handleResize}
        id="resize-left-bar"
        style={{ height: `${canvaHeight - 10}px` }}
        className="left-[-10px] cursor-ew-resize absolute w-[6px] bg-gradient-to-b from-gray-200 to-gray-300 
                      border border-gray-400/20 rounded-sm opacity-50
                      hover:from-gray-300 hover:to-gray-400 hover:scale-x-110
                      before:content-[''] before:absolute before:top-1/2 before:left-1/2 
                      before:-translate-x-1/2 before:-translate-y-1/2
                      before:w-[2px] before:h-5 before:rounded-sm
                      before:bg-[repeating-linear-gradient(to_bottom,_theme(colors.gray.400)_0px,_theme(colors.gray.400)_2px,_transparent_2px,_transparent_4px)]"
      />
      <div
        onMouseDown={handleResize}
        id="resize-right-bar"
        style={{ height: `${canvaHeight - 10}px` }}
        className="cursor-ew-resize absolute right-[-10px] w-[6px] bg-gradient-to-b from-gray-200 to-gray-300 
                      border border-gray-400/20 rounded-sm opacity-50
                      hover:from-gray-300 hover:to-gray-400 hover:scale-x-110
                      before:content-[''] before:absolute before:top-1/2 before:left-1/2 
                      before:-translate-x-1/2 before:-translate-y-1/2
                      before:w-[2px] before:h-5 before:rounded-sm
                      before:bg-[repeating-linear-gradient(to_bottom,_theme(colors.gray.400)_0px,_theme(colors.gray.400)_2px,_transparent_2px,_transparent_4px)]"
      />

      <div
        onMouseDown={handleResize}
        id="resize-top-bar"
        style={{ width: `${canvaWidth - 10}px` }}
        className="h-[6px] cursor-ns-resize absolute top-[-10px] bg-gradient-to-r from-gray-200 to-gray-300 
                      border border-gray-400/20 rounded-sm opacity-50
                      hover:from-gray-300 hover:to-gray-400 hover:scale-y-110
                      before:content-[''] before:absolute before:top-1/2 before:left-1/2 
                      before:-translate-x-1/2 before:-translate-y-1/2
                      before:h-[2px] before:w-5 before:rounded-sm
                      before:bg-[repeating-linear-gradient(to_right,_theme(colors.gray.400)_0px,_theme(colors.gray.400)_2px,_transparent_2px,_transparent_4px)]"
      />
      <div
        onMouseDown={handleResize}
        id="resize-bottom-bar"
        style={{ width: `${canvaWidth - 10}px` }}
        className="h-[6px] cursor-ns-resize absolute bottom-[-10px] bg-gradient-to-r from-gray-200 to-gray-300 
                      border border-gray-400/20 rounded-sm opacity-50
                      hover:from-gray-300 hover:to-gray-400 hover:scale-y-110
                      before:content-[''] before:absolute before:top-1/2 before:left-1/2 
                      before:-translate-x-1/2 before:-translate-y-1/2
                      before:h-[2px] before:w-5 before:rounded-sm
                      before:bg-[repeating-linear-gradient(to_right,_theme(colors.gray.400)_0px,_theme(colors.gray.400)_2px,_transparent_2px,_transparent_4px)]"
      />
    </>
  );
};

export default CanvasResizers;
