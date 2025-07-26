"use client";

import type React from "react";
import { useState, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { useStore } from "zustand";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
import { snapdom } from "@zumer/snapdom";
import jsPDF from "jspdf";

const DownloadDropdown = ({
  mainCanvasRef,
}: {
  mainCanvasRef: React.RefObject<HTMLElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { canvaHeight, canvaWidth, dpi, currentDesignTitle } =
    useStore(designStudioStore);

  const handleItemClick = async (
    format: "png" | "jpeg" | "jpg" | "webp" | "svg" | "pdf"
  ) => {
    if (mainCanvasRef.current) {
      const targetDpi = 300;
      const scaleMultiplier = targetDpi / dpi;
      setIsDownloading(true);
      setIsOpen(false);
      const width = canvaWidth;
      const height = canvaHeight;
      
      if (format === "pdf") {
        try {
          // Create PDF with proper dimensions
          const pdf = new jsPDF({
            orientation: width > height ? "landscape" : "portrait",
            unit: "px",
            format: [width, height],
          });

          // Generate image blob instead of SVG for better compatibility
          const imageBlob = await snapdom.toBlob(mainCanvasRef.current, {
            width,
            height,
            scale: scaleMultiplier,
            type: "png", // Use PNG for better quality in PDF
            quality: 1,
          });

          // Convert blob to base64 data URL
          const reader = new FileReader();
          reader.onload = function() {
            const imageDataUrl = reader.result as string;
            
            // Add image to PDF
            pdf.addImage(
              imageDataUrl,
              "PNG",
              0, // x position
              0, // y position
              width,
              height,
            );
            
            // Save the PDF
            pdf.save(`${currentDesignTitle}.pdf`);
          };
          
          reader.readAsDataURL(imageBlob);
        } catch (error) {
          console.error("Error generating PDF:", error);
          // Fallback: try with SVG method
          try {
            const pdf = new jsPDF({
              orientation: width > height ? "landscape" : "portrait",
              unit: "px",
              format: [width, height],
            });

            const svgBlob = await snapdom.toBlob(mainCanvasRef.current, {
              width,
              height,
              scale: scaleMultiplier,
              type: "svg",
              quality: 1,
            });
            
            const svgText = await svgBlob.text();
            pdf.addSvgAsImage(svgText, 0, 0, width, height);
            pdf.save(`${currentDesignTitle}.pdf`);
          } catch (svgError) {
            console.error("Error with SVG fallback:", svgError);
          }
        }
      } else {
        // Handle other formats as before
        snapdom.download(mainCanvasRef.current, { 
          width: canvaWidth,
          compress: true,
          type: format,
          // scale: scaleMultiplier,
          height: canvaHeight,
          filename: `${currentDesignTitle}`,
          quality: 1,
        });
      }

      setIsDownloading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isDownloading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FaDownload
          className={`w-3.5 h-3.5 ${isDownloading ? "animate-pulse" : ""}`}
        />
        <span>{isDownloading ? "Generating..." : "Download"}</span>
        <svg
          className={`ml-1 w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20 origin-top-right animate-fade-in-scale"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="download-menu-button"
        >
          <div className="py-1">
            <button
              onClick={() => handleItemClick("png")}
              disabled={isDownloading}
              className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
            >
              Download as PNG
            </button>
            <button
              onClick={() => handleItemClick("jpg")}
              disabled={isDownloading}
              className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
            >
              Download as JPG
            </button>
            <button
              onClick={() => handleItemClick("jpeg")}
              disabled={isDownloading}
              className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
            >
              Download as JPEG
            </button>
            <button
              onClick={() => handleItemClick("pdf")}
              disabled={isDownloading}
              className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              role="menuitem"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadDropdown;