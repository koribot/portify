import { useDesignStudioStore } from "@/app/store/state/design-studio/useDesignStudioStore";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import CanvasResizers from "./CanvasResizers";

const DesignStudioMainCanvas = () => {
  const {
    canvaHeight,
    canvaWidth,
    zoomPercentage,
    setCanvaWidth,
    setCanvaHeight,
  } = useDesignStudioStore();
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false });

  const handleResize = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const id = target.id;
    dragState.current.isDragging = true;

    const zoomFactor = zoomPercentage / 100;
    const startMouseX = event.clientX;
    const startMouseY = event.clientY;
    const startWidth = canvaWidth;
    const startHeight = canvaHeight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return;

      const deltaX = (e.clientX - startMouseX) / zoomFactor;
      const deltaY = (e.clientY - startMouseY) / zoomFactor;

      let newWidth = startWidth;
      let newHeight = startHeight;

      switch (id) {
        // Corner resizers
        case "resize-top-left-point":
          newWidth = Math.max(100, startWidth - deltaX);
          newHeight = Math.max(100, startHeight - deltaY);
          break;
        case "resize-top-right-point":
          newWidth = Math.max(100, startWidth + deltaX);
          newHeight = Math.max(100, startHeight - deltaY);
          break;
        case "resize-bottom-right-point":
          newWidth = Math.max(100, startWidth + deltaX);
          newHeight = Math.max(100, startHeight + deltaY);
          break;
        case "resize-bottom-left-point":
          newWidth = Math.max(100, startWidth - deltaX);
          newHeight = Math.max(100, startHeight + deltaY);
          break;

        // Side, top, and bottom resizers
        case "resize-left-bar":
          newWidth = Math.max(100, startWidth - deltaX);
          break;
        case "resize-right-bar":
          newWidth = Math.max(100, startWidth + deltaX);
          break;
        case "resize-top-bar":
          newHeight = Math.max(100, startHeight - deltaY);
          break;
        case "resize-bottom-bar":
          newHeight = Math.max(100, startHeight + deltaY);
          break;
      }

      if (newWidth !== startWidth) {
        setCanvaWidth(Math.round(newWidth));
      }
      if (newHeight !== startHeight) {
        setCanvaHeight(Math.round(newHeight));
      }
    };

    const handleMouseUp = () => {
      dragState.current.isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <span>
        {canvaWidth}W x {canvaHeight}H
      </span>
      <div
        id="canvas"
        className="flex-1 bg-gray-100 p-8 flex items-center justify-center "
      >
        <div
          ref={mainCanvasRef}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            width: canvaWidth + "px",
            height: canvaHeight + "px",
            zoom: `${zoomPercentage}%`,
          }}
          className={`bg-white relative flex items-center justify-center w-[${canvaWidth}px] h-[${canvaHeight}px]`}
        >
          <CanvasResizers handleResize={handleResize} canvaWidth={canvaWidth} canvaHeight={canvaHeight}/>
          <p className="text-nowrap">Your Design Canvas</p>
        </div>
      </div>
    </>
  );
};

export default DesignStudioMainCanvas;
