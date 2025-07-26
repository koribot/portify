"use client";

import type React from "react";
import { useEffect, useRef, useCallback } from "react";
import {
  minPaperSizeHeightInpixels,
  minPaperSizeWidthInpixels,
} from "@/app/constants/variables";
import CanvasSidesAndCornersResizers from "./CanvasSidesAndCornersResizers";
import BlockRenderer from "./BlocksRenderer/BlockRenderer";
import { useStore } from "zustand";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";

const DesignStudioMainCanvas = ({
  mainCanvasRef,
}: {
  mainCanvasRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const {
    canvaWidth,
    canvaHeight,
    zoomPercentage,
    setCanvaWidth,
    setCanvaHeight,
    setWindowCurrentWidth,
    isCanvasSizeLocked,
  } = useStore(designStudioStore);

  const frameRef = useRef<number | null>(null);

  const resizeState = useRef<{
    isResizing: boolean;
    startMouseX: number;
    startMouseY: number;
    startWidth: number;
    startHeight: number;
    resizeId: string;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeState.current) return;

      const { startMouseX, startMouseY, startWidth, startHeight, resizeId } =
        resizeState.current;
      const zoomFactor = zoomPercentage / 100;

      const deltaX = (e.clientX - startMouseX) / zoomFactor;
      const deltaY = (e.clientY - startMouseY) / zoomFactor;

      let newWidth = startWidth;
      let newHeight = startHeight;

      switch (resizeId) {
        // Corner resizers
        case "resize-top-left-point":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth - deltaX);
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight - deltaY
          );
          break;
        case "resize-top-right-point":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth + deltaX);
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight - deltaY
          );
          break;
        case "resize-bottom-right-point":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth + deltaX);
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight + deltaY
          );
          break;
        case "resize-bottom-left-point":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth - deltaX);
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight + deltaY
          );
          break;
        // Side, top, and bottom resizers
        case "resize-left-bar":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth - deltaX);
          break;
        case "resize-right-bar":
          newWidth = Math.max(minPaperSizeWidthInpixels, startWidth + deltaX);
          break;
        case "resize-top-bar":
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight - deltaY
          );
          break;
        case "resize-bottom-bar":
          newHeight = Math.max(
            minPaperSizeHeightInpixels,
            startHeight + deltaY
          );
          break;
      }

      // Use requestAnimationFrame to smooth updates
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        setCanvaWidth(Math.round(newWidth));
        setCanvaHeight(Math.round(newHeight));
      });
    },
    [zoomPercentage, setCanvaWidth, setCanvaHeight]
  );

  const handleMouseUp = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    resizeState.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = ""; // Reset cursor
    document.body.style.userSelect = ""; // Reset user-select
  }, [handleMouseMove]);

  const handleResizeMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const target = event.target as HTMLDivElement;
      const resizeId = target.id;

      resizeState.current = {
        isResizing: true,
        startMouseX: event.clientX,
        startMouseY: event.clientY,
        startWidth: canvaWidth,
        startHeight: canvaHeight,
        resizeId: resizeId,
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none"; // Prevent text selection during drag

      // Set cursor based on resize type
      const cursorMap: { [key: string]: string } = {
        "resize-top-left-point": "nw-resize",
        "resize-top-right-point": "ne-resize",
        "resize-bottom-right-point": "se-resize",
        "resize-bottom-left-point": "sw-resize",
        "resize-left-bar": "ew-resize",
        "resize-right-bar": "ew-resize",
        "resize-top-bar": "ns-resize",
        "resize-bottom-bar": "ns-resize",
      };
      document.body.style.cursor = cursorMap[resizeId] || "default";
    },
    [canvaWidth, canvaHeight, handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowCurrentWidth(window.innerWidth);
    };

    setWindowCurrentWidth(window.innerWidth); // Initial set
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
      // Clean up any active animation frame or mouse listeners if component unmounts during resize
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [setWindowCurrentWidth, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex h-full overflow-auto">
      <div
        id="canvas"
        className="flex-1 bg-gray-50 p-8 flex items-center justify-center min-h-[300px]
                   bg-[radial-gradient(circle,theme(colors.gray.300)_1px,transparent_1px)]
                   [background-size:16px_16px]"
      >
        <div
          // Removed redundant Tailwind classes for width/height as inline style handles it
          className={`relative flex items-center justify-center`}
        >
          {!isCanvasSizeLocked && (
            <CanvasSidesAndCornersResizers
              handleResize={handleResizeMouseDown} // Pass the new handler
              canvaWidth={canvaWidth}
              canvaHeight={canvaHeight}
            />
          )}
          <main
            id="main-canvas"
            ref={mainCanvasRef}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              width:
                canvaWidth <= minPaperSizeWidthInpixels
                  ? `${minPaperSizeWidthInpixels}px`
                  : canvaWidth + "px",
              height:
                canvaHeight <= minPaperSizeHeightInpixels
                  ? `${minPaperSizeHeightInpixels}px`
                  : canvaHeight + "px",
              zoom: `${zoomPercentage}%`,
            }}
            // Removed redundant Tailwind classes for width/height as inline style handles it
            className={`bg-white relative flex items-center justify-center overflow-hidden`}
          >
            <BlockRenderer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DesignStudioMainCanvas;
