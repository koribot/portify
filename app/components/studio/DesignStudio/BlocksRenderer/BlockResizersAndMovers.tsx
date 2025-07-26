"use client";

import { minDesignBlockSizeWidthXHeight } from "@/app/constants/variables";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
import type React from "react";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useStore } from "zustand";

// Import your utility functions
import {
  getNewStyle,
  getCursor,
  centerToTL,
  tLToCenter,
  getAngle,
  type ResizeType,
  type CursorDirection,
  type Rect,
  type Point,
  getLength,
  degToRadian,
} from "@/app/util/block-resizers-and-movers-util"; // Update with correct path
import { Toast } from "@/app/utils/toast";

interface IResizers {
  children: React.ReactNode;
  index: number;
}

// Smooth zoom factor calculation
const getZoomFactor = (zoomPercentage: number) => {
  if (zoomPercentage <= 10) return 10;
  if (zoomPercentage <= 15) return 5;
  if (zoomPercentage <= 25) return 4;
  if (zoomPercentage <= 35) return 3.5;
  if (zoomPercentage <= 50) return 2;
  if (zoomPercentage <= 75) return 1.5;
  if (zoomPercentage <= 100) return 1.25;
  if (zoomPercentage <= 150) return 1.1;
  if (zoomPercentage <= 200) return 1.05;
  if (zoomPercentage <= 290) return 0.5;
  if (zoomPercentage <= 500) return 0.25;
  return 1;
};

// Map resize types to cursor directions for proper cursor display
const resizeTypeToCursorDirection: Record<ResizeType, CursorDirection> = {
  top: "n",
  "top-right": "ne",
  right: "e",
  "bottom-right": "se",
  bottom: "s",
  "bottom-left": "sw",
  left: "w",
  "top-left": "nw",
};

const BlockResizersAndMovers = ({ children, index }: IResizers) => {
  const {
    content,
    zoomPercentage,
    isTextBlockInputActive,
    setContentBlockHeight,
    setContentBlockWidth,
    setContentBlockPosition,
    setFontSize,
  } = useStore(designStudioStore);

  // Transform-based state - using center-based coordinates
  const [transform, setTransform] = useState({
    centerX: 0,
    centerY: 0,
    width: 0,
    height: 0,
    rotateAngle: 0, // in degrees
  });

  const [isSelected, setIsSelected] = useState(false);
  const [resizingType, setResizingType] = useState<ResizeType | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const elementRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastStoreUpdate = useRef({
    centerX: 0,
    centerY: 0,
    width: 0,
    height: 0,
    rotateAngle: 0,
  });
  const lastZoomPercentage = useRef(zoomPercentage);
  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPos = useRef({
    mouseX: 0,
    mouseY: 0,
    elementTransform: {
      centerX: 0,
      centerY: 0,
      width: 0,
      height: 0,
      rotateAngle: 0,
    },
    rotationCenter: { x: 0, y: 0 },
    startVector: { x: 0, y: 0 },
    startAngle: 0,
  });

  // Convert center-based coordinates to top-left for rendering
  const getTopLeftStyle = () => {
    const tlResult = centerToTL({
      centerX: transform.centerX,
      centerY: transform.centerY,
      width: transform.width,
      height: transform.height,
      rotateAngle: transform.rotateAngle,
    });

    return {
      left: tlResult.left,
      top: tlResult.top,
      width: tlResult.width,
      height: tlResult.height,
      transform: `rotate(${tlResult.rotateAngle}deg)`,
      transformOrigin: "center center",
    };
  };

  // Update store with debouncing
  const updateStore = useCallback(() => {
    const hasChanged =
      lastStoreUpdate.current.centerX !== transform.centerX ||
      lastStoreUpdate.current.centerY !== transform.centerY ||
      lastStoreUpdate.current.width !== transform.width ||
      lastStoreUpdate.current.height !== transform.height ||
      lastStoreUpdate.current.rotateAngle !== transform.rotateAngle;

    if (hasChanged) {
      // Convert to top-left coordinates for store
      const tlResult = centerToTL({
        centerX: transform.centerX,
        centerY: transform.centerY,
        width: transform.width,
        height: transform.height,
        rotateAngle: transform.rotateAngle,
      });

      setContentBlockWidth({ width: tlResult.width, index });
      setContentBlockHeight({ height: tlResult.height, index });
      setContentBlockPosition({
        x: tlResult.left,
        y: tlResult.top,
        rotation: tlResult.rotateAngle,
        index,
      });

      lastStoreUpdate.current = { ...transform };
    }
  }, [
    transform,
    index,
    setContentBlockWidth,
    setContentBlockHeight,
    setContentBlockPosition,
  ]);

  const handleMouseDown = useCallback(
    (type: string) => (e: React.MouseEvent) => {
      // e.preventDefault();
      e.stopPropagation();

      if (!elementRef.current) return;

      setIsSelected(true);

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Create start vector for rotation (like file 3)
      const startVector: Point = {
        x: e.clientX - centerX,
        y: e.clientY - centerY,
      };

      startPos.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        elementTransform: { ...transform },
        rotationCenter: { x: centerX, y: centerY },
        startVector,
        startAngle: transform.rotateAngle,
      };

      if (type === "drag") {
        setIsDragging(true);
        setIsRotating(false);
        setResizingType(null);
      } else if (type === "rotate") {
        setIsRotating(true);
        setIsDragging(false);
        setResizingType(null);
      } else {
        setResizingType(type as ResizeType);
        setIsDragging(false);
        setIsRotating(false);
      }
    },
    [transform]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return;

      const deltaX = e.clientX - startPos.current.mouseX;
      const deltaY = e.clientY - startPos.current.mouseY;

      if (isRotating) {
        // Use the same approach as file 3
        const centerX = startPos.current.rotationCenter.x;
        const centerY = startPos.current.rotationCenter.y;

        const rotateVector: Point = {
          x: e.clientX - centerX,
          y: e.clientY - centerY,
        };

        // Use getAngle utility function like file 3
        const angle = getAngle(startPos.current.startVector, rotateVector);
        let newRotation = Math.round(startPos.current.startAngle + angle);
        if (newRotation >= 360) {
          newRotation -= 360;
        } else if (newRotation < 0) {
          newRotation += 360;
        }
        // for snapping like
        // if (newRotation > 356 || newRotation < 4) {
        //   newRotation = 0;
        // } else if (newRotation > 86 && newRotation < 94) {
        //   newRotation = 90;
        // } else if (newRotation > 176 && newRotation < 184) {
        //   newRotation = 180;
        // } else if (newRotation > 266 && newRotation < 274) {
        //   newRotation = 270;
        // }
        setTransform((prev) => ({
          ...prev,
          rotateAngle: newRotation,
        }));
        return;
      }

      if (isDragging) {
        if (isTextBlockInputActive) return;
        const zoomFactor = getZoomFactor(zoomPercentage);
        const newCenterX =
          startPos.current.elementTransform.centerX + deltaX * zoomFactor;
        const newCenterY =
          startPos.current.elementTransform.centerY + deltaY * zoomFactor;

        setTransform((prev) => ({
          ...prev,
          centerX: newCenterX,
          centerY: newCenterY,
        }));
        return;
      }

      if (!resizingType) return;

      // Use the utility function for proper rotated resizing
      const zoomFactor = getZoomFactor(zoomPercentage);
      const angle = Math.atan2(deltaY, deltaX);
      const dragDistance = getLength(deltaX, deltaY);
      const radianAngle = angle - degToRadian(transform.rotateAngle);
      const rotatedDeltaX = dragDistance * Math.cos(radianAngle) * zoomFactor;
      const rotatedDeltaY = dragDistance * Math.sin(radianAngle) * zoomFactor;

      const currentRect: Rect = {
        width: startPos.current.elementTransform.width,
        height: startPos.current.elementTransform.height,
        centerX: startPos.current.elementTransform.centerX,
        centerY: startPos.current.elementTransform.centerY,
        rotateAngle: startPos.current.elementTransform.rotateAngle,
      };

      try {
        const newStyleResult = getNewStyle(
          resizingType,
          currentRect,
          rotatedDeltaX,
          rotatedDeltaY,
          null, // ratio - set to null for free resize, or provide aspect ratio if needed
          minDesignBlockSizeWidthXHeight,
          minDesignBlockSizeWidthXHeight
        );

        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        const isAdding =
          newStyleResult.size.width > elementRef.current.offsetWidth ||
          newStyleResult.size.height > elementRef.current.offsetHeight;
        const mode = isAdding ? "add" : "subtract";

        frameRef.current = requestAnimationFrame(() => {
          setTransform((prev) => ({
            ...prev,
            centerX: newStyleResult.position.centerX,
            centerY: newStyleResult.position.centerY,
            width: Math.abs(newStyleResult.size.width),
            height: Math.abs(newStyleResult.size.height),
          }));

          // if (
          //   resizingType === "top-left" ||
          //   resizingType === "bottom-right" ||
          //   resizingType === "bottom-left" ||
          //   resizingType === "top-right"
          // ) {
          //   setFontSize({
          //     fontSize: 0.5,
          //     index,
          //     id: content[index].id,
          //     mode: mode,
          //   });
          // }
        });
      } catch (error) {
        Toast().fire({
          icon: "error",
          title: "Error resizing block",
        });
      }
    },
    [isDragging, isRotating, resizingType, zoomPercentage]
  );

  const handleMouseUp = useCallback(() => {
    const wasActive = resizingType || isDragging || isRotating;

    setResizingType(null);
    setIsDragging(false);
    setIsRotating(false);
    if (wasActive) {
      updateStore();
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [resizingType, isDragging, isRotating, updateStore]);

  // Handle cursor changes and event listeners
  useEffect(() => {
    if (resizingType || isDragging || isRotating) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";

      // Set appropriate cursor with rotation awareness
      if (resizingType) {
        const cursorDirection = resizeTypeToCursorDirection[resizingType];
        const rotatedCursor = getCursor(transform.rotateAngle, cursorDirection);

        const cursorMap: Record<CursorDirection, string> = {
          n: "ns-resize",
          ne: "ne-resize",
          e: "ew-resize",
          se: "se-resize",
          s: "ns-resize",
          sw: "sw-resize",
          w: "ew-resize",
          nw: "nw-resize",
        };

        document.body.style.cursor = cursorMap[rotatedCursor] || "default";
      } else if (isDragging) {
        document.body.style.cursor = "move";
      } else if (isRotating) {
        document.body.style.cursor = "crosshair";
      }

      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [
    resizingType,
    isRotating,
    isDragging,
    handleMouseMove,
    handleMouseUp,
    transform.rotateAngle,
  ]);

  // Initialize from store and handle global clicks
  useLayoutEffect(() => {
    // Convert store's top-left coordinates to center-based
    const storeData = content[index];
    const centerResult = tLToCenter({
      top: storeData.y || 0,
      left: storeData.x || 0,
      width: storeData.width || minDesignBlockSizeWidthXHeight,
      height: storeData.height || minDesignBlockSizeWidthXHeight,
      rotateAngle: storeData.rotation || 0,
    });

    const initialTransform = {
      centerX: centerResult.position.centerX,
      centerY: centerResult.position.centerY,
      width: centerResult.size.width,
      height: centerResult.size.height,
      rotateAngle: centerResult.transform.rotateAngle,
    };

    setTransform(initialTransform);
    lastStoreUpdate.current = initialTransform;

    const handleGlobalMouseDown = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleGlobalMouseDown);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
      document.removeEventListener("mousedown", handleGlobalMouseDown);
    };
  }, [content, index]);

  // Detect zoom changes
  useEffect(() => {
    if (Math.abs(lastZoomPercentage.current - zoomPercentage) > 0.1) {
      setIsZooming(true);

      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }

      zoomTimeoutRef.current = setTimeout(() => {
        setIsZooming(false);
      }, 150);

      lastZoomPercentage.current = zoomPercentage;
    }
  }, [zoomPercentage]);

  // Determine if transitions should be shown
  const shouldShowTransition =
    !resizingType && !isDragging && !isRotating && !isZooming;

  const style = getTopLeftStyle();

  return (
    <div
      ref={elementRef}
      className={`absolute ${
        isSelected
          ? "border-2 border-blue-500"
          : "border-2 border-transparent hover:border-gray-300 hover:cursor-move"
      } ${shouldShowTransition ? "transition-all duration-150 ease-out" : ""}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        transform: style.transform,
        transformOrigin: style.transformOrigin,
        zIndex: isSelected ? 1 : 0,
        cursor: isDragging ? "move" : "default",
        pointerEvents: isZooming ? "none" : "auto",
      }}
      onMouseDown={handleMouseDown("drag")}
      role="button"
    >
      {/* Angle display when rotating */}
      {isRotating && (
        <div
          className="absolute bg-black text-white px-2 py-1 rounded text-sm font-mono shadow-lg"
          style={{
            bottom: "-90px",
            left: "50% + 50%",
            transform: "translateY(-50%, -50%)",
            zIndex: 1002,
            whiteSpace: "nowrap",
          }}
        >
          {Math.round(transform.rotateAngle)}°
        </div>
      )}
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {children}
      </div>

      {isSelected && !isZooming && (
        <>
          {/* Rotation handle */}
          <button
            className="absolute flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-500 rounded-full shadow-lg hover:bg-blue-50"
            style={{
              bottom: "-50px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: index,
              pointerEvents: isRotating ? "none" : "auto",
            }}
            onMouseDown={handleMouseDown("rotate")}
          >
            <FaArrowsRotate className="text-blue-500 text-sm" />
          </button>

          {/* Corner resize handles */}
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              top: "-8px",
              left: "-8px",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "nw")}-resize`,
            }}
            onMouseDown={handleMouseDown("top-left")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              top: "-8px",
              right: "-8px",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "ne")}-resize`,
            }}
            onMouseDown={handleMouseDown("top-right")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              bottom: "-8px",
              left: "-8px",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "sw")}-resize`,
            }}
            onMouseDown={handleMouseDown("bottom-left")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              bottom: "-8px",
              right: "-8px",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "se")}-resize`,
            }}
            onMouseDown={handleMouseDown("bottom-right")}
          />

          {/* Side handles */}
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "n")}-resize`,
            }}
            onMouseDown={handleMouseDown("top")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "s")}-resize`,
            }}
            onMouseDown={handleMouseDown("bottom")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              left: "-8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "w")}-resize`,
            }}
            onMouseDown={handleMouseDown("left")}
          />
          <div
            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-sm shadow-md hover:bg-blue-600"
            style={{
              right: "-8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: index,
              cursor: `${getCursor(transform.rotateAngle, "e")}-resize`,
            }}
            onMouseDown={handleMouseDown("right")}
          />
        </>
      )}
    </div>
  );
};

export default BlockResizersAndMovers;

// old
// "use client";

// import { minDesignBlockSizeWidthXHeight } from "@/app/constants/variables";
// import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
// import type React from "react";
// import {
//   useState,
//   useRef,
//   useCallback,
//   useEffect,
//   useLayoutEffect,
// } from "react";
// import { FaArrowsRotate } from "react-icons/fa6";
// import { useStore } from "zustand";

// interface IResizers {
//   children: React.ReactNode;
//   index: number;
// }

// const BlockResizers = ({ children, index }: IResizers) => {
//   const {
//     content,
//     zoomPercentage,
//     setFontSize,
//     setContentBlockHeight,
//     setContentBlockWidth,
//     setContentBlockPosition,
//   } = useStore(designStudioStore);
//   const [x, setX] = useState(0);
//   const [y, setY] = useState(0);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const [isSelected, setIsSelected] = useState(false);
//   const [resizingType, setResizingType] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isRotating, setIsRotating] = useState(false);
//   const elementRef = useRef<HTMLDivElement>(null);
//   const frameRef = useRef<number | null>(null);
//   const startPos = useRef({
//     x: 0,
//     y: 0,
//     elemX: 0,
//     elemY: 0,
//     elemWidth: 0,
//     elemHeight: 0,
//   });
//   const handleMouseDown = useCallback(
//     (type: string) => (e: React.MouseEvent) => {
//       e.preventDefault();
//       e.stopPropagation();
//       if (!elementRef.current) return;
//       setIsSelected(true);
//       if (type === "drag") {
//         setIsRotating(false);
//         setIsDragging(true);
//         console.log("drag")
//       } else if (type === "rotate") {
//         console.log("rotate")
//         setIsRotating(true);
//       } else {
//         console.log("resize")
//         setResizingType(type);
//         setIsDragging(false);
//         setIsRotating(false);
//       }
//       startPos.current = {
//         x: e.clientX,
//         y: e.clientY,
//         elemX: x,
//         elemY: y,
//         elemWidth: width,
//         elemHeight: height,
//       };
//     },
//     [x, y, width, height]
//   );

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!elementRef.current) return;
//       const deltaX = e.clientX - startPos.current.x;
//       const deltaY = e.clientY - startPos.current.y;

//       if (isRotating) {
//         // elementRef.current.style = "transform: rotate(45deg)";
//         console.log("hey")
//         // startPos.current.elemHeight + deltaY;
//         return;
//       }

//       if (isDragging) {
//         const newX =
//           startPos.current.elemX + deltaX * (zoomPercentage <= 50 ? 2 : 1);
//         const newY =
//           startPos.current.elemY + deltaY * (zoomPercentage <= 50 ? 2 : 1);
//         setX(newX);
//         setY(newY);
//         return;
//       }

//       if (!resizingType) return;

//       let newWidth = startPos.current.elemWidth;
//       let newHeight = startPos.current.elemHeight;
//       let newX = startPos.current.elemX;
//       let newY = startPos.current.elemY;

//       switch (resizingType) {
//         case "top":
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight - deltaY
//           );
//           newY =
//             startPos.current.elemY + (startPos.current.elemHeight - newHeight);
//           break;
//         case "bottom":
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight + deltaY
//           );
//           break;
//         case "left":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth - deltaX
//           );
//           newX =
//             startPos.current.elemX + (startPos.current.elemWidth - newWidth);
//           break;
//         case "right":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth + deltaX
//           );
//           break;
//         case "top-left":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth - deltaX
//           );
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight - deltaY
//           );
//           newX =
//             startPos.current.elemX + (startPos.current.elemWidth - newWidth);
//           newY =
//             startPos.current.elemY + (startPos.current.elemHeight - newHeight);
//           break;
//         case "top-right":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth + deltaX
//           );
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight - deltaY
//           );
//           newY =
//             startPos.current.elemY + (startPos.current.elemHeight - newHeight);
//           break;
//         case "bottom-left":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth - deltaX
//           );
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight + deltaY
//           );
//           newX =
//             startPos.current.elemX + (startPos.current.elemWidth - newWidth);
//           break;
//         case "bottom-right":
//           newWidth = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemWidth + deltaX
//           );
//           newHeight = Math.max(
//             minDesignBlockSizeWidthXHeight,
//             startPos.current.elemHeight + deltaY
//           );
//           break;
//       }
//       const isAdding =
//         newWidth > elementRef.current.offsetWidth ||
//         newHeight > elementRef.current.offsetHeight;
//       const mode = isAdding ? "add" : "subtract";
//       if (
//         index !== undefined &&
//         (resizingType === "top-left" ||
//           resizingType === "top-right" ||
//           resizingType === "bottom-left" ||
//           resizingType === "bottom-right")
//       ) {
//         setFontSize({
//           fontSize: 0.5,
//           index,
//           id: content[index].id,
//           mode: mode,
//         });
//       }
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }

//       frameRef.current = requestAnimationFrame(() => {
//         setX(newX);
//         setY(newY);
//         setWidth(newWidth);
//         setHeight(newHeight);
//       });
//     },
//     [isDragging, isRotating, resizingType, index, content, setFontSize]
//   );

//   const handleMouseUp = useCallback(() => {
//     setResizingType(null);
//     setIsDragging(false);
//     setIsRotating(false);
//     if (!isDragging) {
//       setContentBlockWidth({
//         width: width,
//         index: index,
//       });

//       setContentBlockHeight({
//         height: height,
//         index: index,
//       });
//     }
//     setContentBlockPosition({
//       x: x,
//       y: y,
//       index: index,
//     });
//     if (frameRef.current) {
//       cancelAnimationFrame(frameRef.current);
//     }
//     document.body.style.cursor = "";
//     document.body.style.userSelect = "";
//   }, [width, height, x, y, index]);

//   useEffect(() => {
//     if (resizingType || isDragging || isRotating) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//       document.body.style.userSelect = "none";
//       // Set cursor based on resize type
//       if (resizingType) {
//         const cursorMap: { [key: string]: string } = {
//           top: "ns-resize",
//           bottom: "ns-resize",
//           left: "ew-resize",
//           right: "ew-resize",
//           "top-left": "nw-resize",
//           "top-right": "ne-resize",
//           "bottom-left": "sw-resize",
//           "bottom-right": "se-resize",
//         };
//         document.body.style.cursor = cursorMap[resizingType] || "default";
//       } else if (isDragging) {
//         document.body.style.cursor = "move";
//       }
//       return () => {
//         if (frameRef.current) {
//           cancelAnimationFrame(frameRef.current);
//         }
//         document.removeEventListener("mousemove", handleMouseMove);
//         document.removeEventListener("mouseup", handleMouseUp);
//         document.body.style.cursor = "";
//         document.body.style.userSelect = "";
//       };
//     }
//   }, [resizingType, isRotating, isDragging, handleMouseMove, handleMouseUp]);

//   useLayoutEffect(() => {
//     setX(content[index].x);
//     setY(content[index].y);
//     setWidth(content[index].width);
//     setHeight(content[index].height);
//     const handleGlobalMouseDown = (event: MouseEvent) => {
//       if (
//         elementRef.current &&
//         !elementRef.current.contains(event.target as Node)
//       ) {
//         setIsSelected(false);
//         setIsRotating(false);
//       }
//     };
//     document.addEventListener("mousedown", handleGlobalMouseDown);
//     return () => {
//       if (frameRef.current) {
//         cancelAnimationFrame(frameRef.current);
//       }
//       document.removeEventListener("mousedown", handleGlobalMouseDown);
//     };
//   }, []);

//   return (
//     <div
//       ref={elementRef}
//       className={`absolute ${
//         isSelected
//           ? "border-2 border-blue-500"
//           : "border-2 border-transparent hover:border-gray-300"
//       } ${
//         resizingType || isDragging ? "" : "transition-all duration-150 ease-out"
//       }`}
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         left: x,
//         top: y,
//         width: width,
//         height: height,
//         zIndex: isSelected ? 1 : 0,
//       }}
//       onMouseDown={handleMouseDown("drag")}
//     >
//       <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
//         {children}
//       </div>
//       {isSelected && (
//         <>
//           <button
//             className="absolute bottom-[-40]"
//             style={{ zIndex: 3 }}
//             onMouseDown={handleMouseDown("rotate")}
//           >
//             <FaArrowsRotate className="text-blue-500 text-2xl cursor-" />
//           </button>

//           {/* Corner handles */}
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-nw-resize z-20"
//             style={{ top: "-6px", left: "-6px" }}
//             onMouseDown={handleMouseDown("top-left")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-ne-resize z-20"
//             style={{ top: "-6px", right: "-6px" }}
//             onMouseDown={handleMouseDown("top-right")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-sw-resize z-20"
//             style={{ bottom: "-6px", left: "-6px" }}
//             onMouseDown={handleMouseDown("bottom-left")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-se-resize z-20"
//             style={{ bottom: "-6px", right: "-6px" }}
//             onMouseDown={handleMouseDown("bottom-right")}
//           ></div>
//           {/* Side handles */}
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-ns-resize z-20"
//             style={{ top: "-6px", left: "50%", transform: "translateX(-50%)" }}
//             onMouseDown={handleMouseDown("top")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-ns-resize z-20"
//             style={{
//               bottom: "-6px",
//               left: "50%",
//               transform: "translateX(-50%)",
//             }}
//             onMouseDown={handleMouseDown("bottom")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-ew-resize z-20"
//             style={{ left: "-6px", top: "50%", transform: "translateY(-50%)" }}
//             onMouseDown={handleMouseDown("left")}
//           ></div>
//           <div
//             className="absolute w-3 h-3 bg-blue-500 border-2 border-white shadow-md cursor-ew-resize z-20"
//             style={{ right: "-6px", top: "50%", transform: "translateY(-50%)" }}
//             onMouseDown={handleMouseDown("right")}
//           ></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BlockResizers;
