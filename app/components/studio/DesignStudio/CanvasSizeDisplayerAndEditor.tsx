import {
  maxPaperSizeHeightInpixels,
  maxPaperSizeWidthInpixels,
  minPaperSizeWidthInpixels,
  PAPER_SIZES,
} from "@/app/constants/variables";
import { IPaperSize } from "@/app/global-types/paper-size/types";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
import { getGCD } from "@/app/util/getGCD";
import { Toast } from "@/app/utils/toast";
import React, { useState, useLayoutEffect } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useStore } from "zustand";

interface TempSize {
  width: number | any;
  height: number | any;
}

type FocusedInput = "width" | "height" | null;

const CanvasSizeDisplayerAndEditor: React.FC = () => {
  const {
    canvaHeight,
    canvaWidth,
    isCanvasSizeLocked,
    dpi,
    setCanvaHeight,
    setCanvaWidth,
    setIsCanvasSizeLocked,
  } = useStore(designStudioStore);

  const [tempSize, setTempSize] = useState<TempSize>({
    width: canvaWidth,
    height: canvaHeight,
  });

  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useLayoutEffect(() => {
    setTempSize({
      width: canvaWidth,
      height: canvaHeight,
    });
  }, [canvaWidth, canvaHeight]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (/^\d+\.?\d*$|^\d*\.\d+$/.test(val) || val === "") {
      const newWidth = val || 0;
      setTempSize({ ...tempSize, width: newWidth });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    if (/^\d+\.?\d*$|^\d*\.\d+$/.test(val) || val === "") {
      const newHeight = Number(val) || 0;
      setTempSize({ ...tempSize, height: newHeight });
    }
  };

  const handleWidthBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    const finalWidth =
      Number(val) < minPaperSizeWidthInpixels
        ? minPaperSizeWidthInpixels
        : Number(val) > maxPaperSizeWidthInpixels
        ? maxPaperSizeWidthInpixels
        : Number(val);
    setCanvaWidth(finalWidth);

    if (tempSize.width < minPaperSizeWidthInpixels) {
      setTempSize({
        ...tempSize,
        width: minPaperSizeWidthInpixels,
      });
      Toast().fire({
        position: "top-end",
        icon: "info",
        title: "Opps",
        text: "Width cannot be less than 70",
      });
    }
    if (tempSize.width > maxPaperSizeWidthInpixels) {
      setTempSize({
        ...tempSize,
        width: maxPaperSizeWidthInpixels,
      });
      Toast().fire({
        position: "top-end",
        icon: "info",
        title: "Opps",
        text: `Width cannot be greater than ${maxPaperSizeWidthInpixels}`,
      });
    }
    setFocusedInput(null);
  };

  const handleHeightBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    const finalHeight =
      Number(val) < minPaperSizeWidthInpixels
        ? minPaperSizeWidthInpixels
        : Number(val) > maxPaperSizeHeightInpixels
        ? maxPaperSizeHeightInpixels
        : Number(val);

    setCanvaHeight(finalHeight);

    if (tempSize.height < minPaperSizeWidthInpixels) {
      setTempSize({
        ...tempSize,
        height: minPaperSizeWidthInpixels,
      });
      Toast().fire({
        position: "top-end",
        icon: "info",
        title: "Opps",
        text: `Height cannot be less than ${minPaperSizeWidthInpixels}`,
      });
    }
    if (tempSize.height > maxPaperSizeHeightInpixels) {
      setTempSize({
        ...tempSize,
        height: maxPaperSizeHeightInpixels,
      });
      Toast().fire({
        position: "top-end",
        icon: "info",
        title: "Opps",
        text: `Height cannot be greater than ${maxPaperSizeHeightInpixels}`,
      });
    }

    setFocusedInput(null);
  };

  const handlePaperSizeSelect = (paperSize: IPaperSize): void => {
    setTempSize({
      width: paperSize.width,
      height: paperSize.height,
    });
    setCanvaWidth(paperSize.width);
    setCanvaHeight(paperSize.height);
    setShowDropdown(false);
  };

  const groupedPaperSizes = PAPER_SIZES.reduce((acc, size) => {
    if (!acc[size.category]) {
      acc[size.category] = [];
    }
    acc[size.category].push(size);
    return acc;
  }, {} as Record<string, IPaperSize[]>);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3">
        {/* Width Input */}
        <div className="relative group">
          <div
            className={`
            relative rounded-lg border transition-all duration-200
            ${
              focusedInput === "width"
                ? "border-blue-400 shadow-sm bg-blue-50/30"
                : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
            }
          `}
          >
            <input
              value={tempSize.width}
              onFocus={() => setFocusedInput("width")}
              onBlur={handleWidthBlur}
              onChange={handleWidthChange}
              readOnly={isCanvasSizeLocked}
              type="text"
              className="w-16 px-2 py-2 text-sm font-mono text-center bg-transparent border-none outline-none text-gray-700"
              placeholder="0"
            />
            <div className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-500 bg-white">
              W
            </div>
          </div>
        </div>

        {/* Height Input */}
        <div className="relative group">
          <div
            className={`
            relative rounded-lg border transition-all duration-200
            ${
              focusedInput === "height"
                ? "border-blue-400 shadow-sm bg-blue-50/30"
                : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
            }
          `}
          >
            <input
              value={tempSize.height}
              onFocus={() => setFocusedInput("height")}
              onBlur={handleHeightBlur}
              onChange={handleHeightChange}
              readOnly={isCanvasSizeLocked}
              type="text"
              className="w-16 px-2 py-2 text-sm font-mono text-center bg-transparent border-none outline-none text-gray-700"
              placeholder="0"
            />
            <div className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-500 bg-white">
              H
            </div>
          </div>
        </div>

        {/* Paper Size Dropdown */}
        <div className="relative" style={{ zIndex: 2 }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 rounded-lg transition-all duration-200 border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-700"
            title="Select paper size preset"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>

          {showDropdown && (
            <div
             style={{zIndex: 1000000000}}
              className={`absolute top-full left-0 mt-1 w-[fit-content] bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-x-hidden overflow-y-scroll text-nowrap`}
            >
              {Object.entries(groupedPaperSizes).map(([category, sizes]) => (
                <div key={category}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    {category}
                  </div>
                  {sizes.map((size) => (
                    <button
                      key={`${size.category}-${size.name}`}
                      onClick={() => handlePaperSizeSelect(size)}
                      className={`
                      w-full px-3 py-2 text-left text-sm transition-colors duration-150 flex items-center justify-between hover:bg-gray-50 text-gray-700`}
                      // disabled={isCanvasSizeLocked}
                    >
                      <span className="font-medium">{size.name}</span>
                      <span className="text-xs text-gray-500">
                        {size.width} x {size.height}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lock Button */}
        <button
          onClick={() => setIsCanvasSizeLocked(!isCanvasSizeLocked)}
          className="p-2 rounded-lg transition-all duration-200 border bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          title={`${
            isCanvasSizeLocked
              ? "Unlock to edit canvas dimensions"
              : "Lock canvas dimensions to prevent accidental changes"
          } `}
        >
          {isCanvasSizeLocked ? (
            <FaLock className="w-3.5 h-3.5" />
          ) : (
            <FaUnlock className="w-3.5 h-3.5" />
          )}
        </button>
        <div className="relative group">
          <div
            className={`
            relative rounded-lg border transition-all duration-200 border-gray-200 hover:border-gray-300 bg-gray-50/50`}
          >
            <input
              defaultValue={
                tempSize.width > 0 && tempSize.height > 0
                  ? `${(tempSize.width / tempSize.height).toFixed(2)}:1 (${
                      tempSize.width /
                      getGCD({ a: tempSize.width, b: tempSize.height })
                    }:${
                      tempSize.height /
                      getGCD({ a: tempSize.width, b: tempSize.height })
                    })`
                  : "--"
              }
              readOnly
              type="text"
              className="w-full px-2 py-2 text-sm font-mono text-center bg-transparent border-none outline-none text-gray-700"
              placeholder="0"
            />
            <div className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-500 bg-white">
              Aspect Ratio
            </div>
          </div>
        </div>
        <div className="relative group">
          <div
            className={`
            relative rounded-lg border transition-all duration-200 border-gray-200 hover:border-gray-300 bg-gray-50/50`}
          >
            <input
              defaultValue={dpi}
              readOnly
              type="text"
              className="w-full max-w-12 px-2 py-2 text-sm font-mono text-center bg-transparent border-none outline-none text-gray-700"
              placeholder="0"
            />
            <div className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-500 bg-white">
              DPI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasSizeDisplayerAndEditor;
