"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"

// --- SVG Icons (Replaced Lucide React) ---
// These are now raw SVG strings for direct use in dangerouslySetInnerHTML
const IconSelectSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h.01M7 10h.01M11 10h.01M15 10h.01M19 10h.01M3 14h.01M7 14h.01M11 14h.01M15 14h.01M19 14h.01M3 18h.01M7 18h.01M11 18h.01M15 18h.01M19 18h.01M3 6h.01M7 6h.01M11 6h.01M15 6h.01M19 6h.01" /></svg>`
const IconTypeSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>`
const IconSquareSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" /></svg>`
const IconCircleSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>`
const IconLineSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" /></svg>`
const IconStarSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>`
const ImageIconSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" /><circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" /><polyline points="21,15 16,10 5,21" strokeWidth="2" /></svg>`
const IconCodeSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>`
const IconSparklesSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>`
const IconUndoSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>`
const IconRedoSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" /></svg>`
const IconZoomOutSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="M21 21l-4.35-4.35" strokeWidth="2" /><path d="M8 11h6" strokeWidth="2" /></svg>`
const IconZoomInSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path d="M21 21l-4.35-4.35" strokeWidth="2" /><path d="M11 8v6" strokeWidth="2" /><path d="M8 11h6" strokeWidth="2" /></svg>`
const IconDownloadSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
const IconTrashSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>`
const IconCopySvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>`
const IconArrowUpSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>`
const IconArrowDownSvg = `<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>`

// --- Type Definitions ---
interface BaseObject {
  id: number
  type: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  zIndex: number
  opacity: number
  boxShadow: string
}

interface TextObject extends BaseObject {
  type: "text"
  content: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  color: string
  backgroundColor: string
  textAlign: "left" | "center" | "right" | "justify"
  lineHeight: number
  letterSpacing: number
}

interface ShapeObject extends BaseObject {
  type: "rectangle" | "circle" | "line" | "star"
  fill: string
  stroke: string
  strokeWidth: number
  borderRadius: number
  borderStyle: "solid" | "dashed" | "dotted"
}

interface ImageObject extends BaseObject {
  type: "image"
  src: string
}

interface CodeObject extends BaseObject {
  type: "code"
  content: string
  language: string
  fontSize: number
  color: string
  backgroundColor: string
}

interface IconObject extends BaseObject {
  type: "icon"
  iconSvg: string // Store the SVG string directly
  color: string
  size: number
}

type CanvasObject = TextObject | ShapeObject | ImageObject | CodeObject | IconObject

interface CanvasSize {
  width: number
  height: number
}

type Tool = "select" | "text" | "rectangle" | "circle" | "line" | "star" | "image" | "code" | "icon"

const SampleStudio = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [selectedTool, setSelectedTool] = useState<Tool>("select")
  const [canvasObjects, setCanvasObjects] = useState<CanvasObject[]>([])
  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 600 })
  const [isResizingCanvas, setIsResizingCanvas] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [history, setHistory] = useState<CanvasObject[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("tools") // For custom tabs
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#FFFFFF")
  const [showHtmlModal, setShowHtmlModal] = useState(false)
  const [generatedHtml, setGeneratedHtml] = useState("")

  // --- Object Creators ---
  const createTextObject = (x: number, y: number): TextObject => ({
    id: Date.now(),
    type: "text",
    x,
    y,
    width: 200,
    height: 50,
    content: "Double click to edit",
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "normal",
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "left",
    lineHeight: 1.5,
    letterSpacing: 0,
    rotation: 0,
    zIndex: canvasObjects.length,
    opacity: 1,
    boxShadow: "none",
  })

  const createShapeObject = (type: "rectangle" | "circle" | "line" | "star", x: number, y: number): ShapeObject => ({
    id: Date.now(),
    type,
    x,
    y,
    width: type === "line" ? 150 : 100,
    height: type === "line" ? 2 : 100,
    fill: type === "line" ? "#000000" : "#3B82F6",
    stroke: "#000000",
    strokeWidth: 2,
    borderRadius: 0,
    borderStyle: "solid",
    rotation: 0,
    zIndex: canvasObjects.length,
    opacity: 1,
    boxShadow: "none",
  })

  const createImageObject = (x: number, y: number, src: string): ImageObject => ({
    id: Date.now(),
    type: "image",
    x,
    y,
    width: 200,
    height: 150,
    src,
    rotation: 0,
    zIndex: canvasObjects.length,
    opacity: 1,
    boxShadow: "none",
  })

  const createCodeObject = (x: number, y: number): CodeObject => ({
    id: Date.now(),
    type: "code",
    x,
    y,
    width: 300,
    height: 150,
    content: 'console.log("Hello, v0!");',
    language: "javascript",
    fontSize: 14,
    color: "#FFFFFF",
    backgroundColor: "#282C34", // Dracula theme background
    rotation: 0,
    zIndex: canvasObjects.length,
    opacity: 1,
    boxShadow: "none",
  })

  const createIconObject = (x: number, y: number, iconSvg: string): IconObject => ({
    id: Date.now(),
    type: "icon",
    x,
    y,
    width: 48,
    height: 48,
    iconSvg,
    color: "#000000",
    size: 48,
    rotation: 0,
    zIndex: canvasObjects.length,
    opacity: 1,
    boxShadow: "none",
  })

  // --- History Management ---
  const saveToHistory = useCallback(
    (objects: CanvasObject[]) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push([...objects])
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    },
    [history, historyIndex],
  )

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCanvasObjects(history[historyIndex - 1])
      setSelectedObject(null)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCanvasObjects(history[historyIndex + 1])
      setSelectedObject(null)
    }
  }, [history, historyIndex])

  // --- Canvas Interaction Handlers ---
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / zoom
      const y = (e.clientY - rect.top) / zoom

      if (selectedTool === "text") {
        const newObject = createTextObject(x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "rectangle") {
        const newObject = createShapeObject("rectangle", x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "circle") {
        const newObject = createShapeObject("circle", x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "line") {
        const newObject = createShapeObject("line", x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "star") {
        const newObject = createShapeObject("star", x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "code") {
        const newObject = createCodeObject(x, y)
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "icon") {
        const newObject = createIconObject(x, y, IconStarSvg) // Default to star icon
        const newObjects = [...canvasObjects, newObject]
        setCanvasObjects(newObjects)
        saveToHistory(newObjects)
        setSelectedTool("select")
      } else if (selectedTool === "select") {
        // Check if clicking on an object
        const clickedObject = canvasObjects.find(
          (obj) => x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height,
        )
        setSelectedObject(clickedObject || null)
      }
    },
    [selectedTool, canvasObjects, saveToHistory],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, obj: CanvasObject) => {
      e.stopPropagation() // Prevent canvas click from deselecting
      if (selectedTool === "select") {
        setSelectedObject(obj)
        setIsDragging(true)
        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect()
          dragStartRef.current = {
            x: (e.clientX - rect.left) / zoom - obj.x,
            y: (e.clientY - rect.top) / zoom - obj.y,
          }
        }
      }
    },
    [selectedTool, zoom],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && selectedObject) {
        if (!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect()
        let newX = (e.clientX - rect.left) / zoom - dragStartRef.current.x
        let newY = (e.clientY - rect.top) / zoom - dragStartRef.current.y

        // Clamp X within canvas boundaries
        newX = Math.max(0, Math.min(newX, canvasSize.width - selectedObject.width))
        // Clamp Y within canvas boundaries
        newY = Math.max(0, Math.min(newY, canvasSize.height - selectedObject.height))

        const updatedObjects = canvasObjects.map((obj) =>
          obj.id === selectedObject.id ? { ...obj, x: newX, y: newY } : obj,
        ) as CanvasObject[]
        setCanvasObjects(updatedObjects)
        setSelectedObject((prev) => (prev ? { ...prev, x: newX, y: newY } : null))
      }
    },
    [isDragging, selectedObject, canvasObjects, zoom, canvasSize.width, canvasSize.height],
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      saveToHistory(canvasObjects)
      setIsDragging(false)
    }
    if (isResizingCanvas) {
      setIsResizingCanvas(false)
    }
  }, [isDragging, canvasObjects, saveToHistory, isResizingCanvas])

  const handleObjectUpdate = useCallback(
    (id: number, updates: Partial<CanvasObject>) => {
      const updatedObjects = canvasObjects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj,
      ) as CanvasObject[]
      setCanvasObjects(updatedObjects)
      if (selectedObject && selectedObject.id === id) {
        setSelectedObject((prev:any) => (prev ? { ...prev, ...updates } : null))
      }
      saveToHistory(updatedObjects) // Save after each property update
    },
    [canvasObjects, selectedObject, saveToHistory],
  )

  const deleteSelected = useCallback(() => {
    if (selectedObject) {
      const updatedObjects = canvasObjects.filter((obj) => obj.id !== selectedObject.id)
      setCanvasObjects(updatedObjects)
      saveToHistory(updatedObjects)
      setSelectedObject(null)
    }
  }, [selectedObject, canvasObjects, saveToHistory])

  const duplicateSelected = useCallback(() => {
    if (selectedObject) {
      const newObject: CanvasObject = {
        ...selectedObject,
        id: Date.now(),
        x: selectedObject.x + 20,
        y: selectedObject.y + 20,
        zIndex: canvasObjects.length,
      }
      const newObjects = [...canvasObjects, newObject]
      setCanvasObjects(newObjects)
      saveToHistory(newObjects)
      setSelectedObject(newObject)
    }
  }, [selectedObject, canvasObjects, saveToHistory])

  const changeZIndex = useCallback(
    (direction: "forward" | "backward") => {
      if (!selectedObject) return

      const currentZIndex = selectedObject.zIndex
      let newZIndex = currentZIndex

      if (direction === "forward") {
        newZIndex = Math.min(canvasObjects.length - 1, currentZIndex + 1)
      } else {
        newZIndex = Math.max(0, currentZIndex - 1)
      }

      if (newZIndex === currentZIndex) return // No change needed

      const updatedObjects = canvasObjects
        .map((obj) => {
          if (obj.id === selectedObject.id) {
            return { ...obj, zIndex: newZIndex }
          } else if (obj.zIndex === newZIndex) {
            // Swap zIndex with the object that was at the newZIndex
            return { ...obj, zIndex: currentZIndex }
          }
          return obj
        })
        .sort((a, b) => a.zIndex - b.zIndex) // Re-sort by zIndex

      // Re-assign zIndex to ensure no gaps and correct order
      const finalObjects = updatedObjects.map((obj, index) => ({ ...obj, zIndex: index })) as CanvasObject[]
      setCanvasObjects(finalObjects)
      setSelectedObject((prev) => (prev ? { ...prev, zIndex: newZIndex } : null))
      saveToHistory(finalObjects)
    },
    [selectedObject, canvasObjects, saveToHistory],
  )

  // --- Canvas Resizing ---
  const handleCanvasResizeMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation() // Prevent canvas click
    setIsResizingCanvas(true)
  }, [])

  const handleCanvasResizeMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizingCanvas && canvasRef.current) {
        const rect = canvasRef.current.parentElement!.getBoundingClientRect()
        const newWidth = Math.max(200, (e.clientX - rect.left) / zoom)
        const newHeight = Math.max(150, (e.clientY - rect.top) / zoom)
        setCanvasSize({ width: newWidth, height: newHeight })
      }
    },
    [isResizingCanvas, zoom],
  )

  // --- Keyboard Events ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        deleteSelected()
      } else if (e.ctrlKey && e.key === "z") {
        e.preventDefault()
        undo()
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault()
        redo()
      } else if (e.ctrlKey && e.key === "d") {
        e.preventDefault()
        duplicateSelected()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mouseup", handleMouseUp) // Global mouse up to stop dragging/resizing outside canvas
    window.addEventListener("mousemove", handleCanvasResizeMouseMove) // Global mouse move for canvas resizing
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleCanvasResizeMouseMove)
    }
  }, [deleteSelected, undo, redo, duplicateSelected, handleMouseUp, handleCanvasResizeMouseMove])

  // --- Render Canvas Object ---
  const renderObject = (obj: CanvasObject) => {
    const isSelected = selectedObject && selectedObject.id === obj.id
    const style: React.CSSProperties = {
      position: "absolute",
      left: obj.x,
      top: obj.y,
      width: obj.width,
      height: obj.height,
      transform: `rotate(${obj.rotation}deg)`,
      zIndex: obj.zIndex,
      cursor: selectedTool === "select" ? "grab" : "default",
      border: isSelected ? "2px dashed #3B82F6" : "none",
      outline: "none",
      boxSizing: "border-box", // Include padding and border in the element's total width and height
      opacity: obj.opacity,
      boxShadow: obj.boxShadow !== "none" ? obj.boxShadow : undefined,
    }

    if (obj.type === "text") {
      const textObj = obj as TextObject
      return (
        <div
          key={textObj.id}
          style={{
            ...style,
            fontSize: textObj.fontSize,
            fontFamily: textObj.fontFamily,
            fontWeight: textObj.fontWeight,
            color: textObj.color,
            backgroundColor: textObj.backgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent:
              textObj.textAlign === "center" ? "center" : textObj.textAlign === "right" ? "flex-end" : "flex-start",
            textAlign: textObj.textAlign,
            padding: "8px",
            overflow: "hidden",
            whiteSpace: "pre-wrap", // Allow text wrapping
            wordBreak: "break-word",
            lineHeight: textObj.lineHeight,
            letterSpacing: textObj.letterSpacing,
          }}
          onMouseDown={(e) => handleMouseDown(e, textObj)}
          onDoubleClick={() => {
            const newContent = prompt("Edit text:", textObj.content)
            if (newContent !== null) {
              handleObjectUpdate(textObj.id, { content: newContent })
            }
          }}
        >
          {textObj.content}
        </div>
      )
    } else if (obj.type === "rectangle") {
      const shapeObj = obj as ShapeObject
      return (
        <div
          key={shapeObj.id}
          style={{
            ...style,
            backgroundColor: shapeObj.fill,
            border: `${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke}`,
            borderRadius: shapeObj.borderRadius,
          }}
          onMouseDown={(e) => handleMouseDown(e, shapeObj)}
        />
      )
    } else if (obj.type === "circle") {
      const shapeObj = obj as ShapeObject
      return (
        <div
          key={shapeObj.id}
          style={{
            ...style,
            backgroundColor: shapeObj.fill,
            border: `${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke}`,
            borderRadius: "50%",
          }}
          onMouseDown={(e) => handleMouseDown(e, shapeObj)}
        />
      )
    } else if (obj.type === "line") {
      const shapeObj = obj as ShapeObject
      return (
        <div
          key={shapeObj.id}
          style={{
            ...style,
            backgroundColor: shapeObj.fill, // Line color
            height: shapeObj.height, // Thickness of the line
            width: shapeObj.width,
            border: "none", // No border for lines
            borderRadius: shapeObj.borderRadius,
          }}
          onMouseDown={(e) => handleMouseDown(e, shapeObj)}
        />
      )
    } else if (obj.type === "star") {
      const shapeObj = obj as ShapeObject
      return (
        <div
          key={shapeObj.id}
          style={{
            ...style,
            backgroundColor: shapeObj.fill,
            border: `${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke}`,
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            borderRadius: shapeObj.borderRadius,
          }}
          onMouseDown={(e) => handleMouseDown(e, shapeObj)}
        />
      )
    } else if (obj.type === "image") {
      const imageObj = obj as ImageObject
      return (
        <img
          key={imageObj.id}
          src={imageObj.src || "/placeholder.svg"}
          alt="Canvas object"
          style={{ ...style, objectFit: "contain" }}
          onMouseDown={(e) => handleMouseDown(e, imageObj)}
          draggable={false}
        />
      )
    } else if (obj.type === "code") {
      const codeObj = obj as CodeObject
      return (
        <div
          key={codeObj.id}
          style={{
            ...style,
            backgroundColor: codeObj.backgroundColor,
            color: codeObj.color,
            fontSize: codeObj.fontSize,
            fontFamily: "monospace",
            padding: "10px",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
          onMouseDown={(e) => handleMouseDown(e, codeObj)}
          onDoubleClick={() => {
            const newContent = prompt("Edit code:", codeObj.content)
            if (newContent !== null) {
              handleObjectUpdate(codeObj.id, { content: newContent })
            }
          }}
        >
          <pre>{codeObj.content}</pre>
        </div>
      )
    } else if (obj.type === "icon") {
      const iconObj = obj as IconObject
      return (
        <div
          key={iconObj.id}
          style={{
            ...style,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: iconObj.color,
            width: iconObj.size,
            height: iconObj.size,
          }}
          onMouseDown={(e) => handleMouseDown(e, iconObj)}
          dangerouslySetInnerHTML={{ __html: iconObj.iconSvg }}
        />
      )
    }
    return null
  }

  // --- Image Upload ---
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            const newObject = createImageObject(100, 100, event.target.result as string)
            const newObjects = [...canvasObjects, newObject]
            setCanvasObjects(newObjects)
            saveToHistory(newObjects)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [canvasObjects, saveToHistory],
  )

  // --- HTML Export Functionality ---
  const generateHtml = useCallback(() => {
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design Export</title>
    <style>
        body { margin: 0; overflow: hidden; }
        .canvas-container {
            position: relative;
            width: ${canvasSize.width}px;
            height: ${canvasSize.height}px;
            background-color: ${canvasBackgroundColor};
            overflow: hidden;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
        .canvas-object {
            position: absolute;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .canvas-object.text {
            text-align: left; /* Default, overridden by inline style */
        }
        .canvas-object.image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .canvas-object.code pre {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="canvas-container">
`

    canvasObjects.forEach((obj) => {
      let objectHtml = ""
      let inlineStyle = `
        left: ${obj.x}px;
        top: ${obj.y}px;
        width: ${obj.width}px;
        height: ${obj.height}px;
        transform: rotate(${obj.rotation}deg);
        z-index: ${obj.zIndex};
        opacity: ${obj.opacity};
        ${obj.boxShadow !== "none" ? `box-shadow: ${obj.boxShadow};` : ""}
      `

      if (obj.type === "text") {
        const textObj = obj as TextObject
        inlineStyle += `
          font-size: ${textObj.fontSize}px;
          font-family: ${textObj.fontFamily};
          font-weight: ${textObj.fontWeight};
          color: ${textObj.color};
          background-color: ${textObj.backgroundColor};
          text-align: ${textObj.textAlign};
          line-height: ${textObj.lineHeight};
          letter-spacing: ${textObj.letterSpacing}px;
          padding: 8px;
        `
        objectHtml = `<div class="canvas-object text" style="${inlineStyle}">${textObj.content}</div>`
      } else if (obj.type === "rectangle") {
        const shapeObj = obj as ShapeObject
        inlineStyle += `
          background-color: ${shapeObj.fill};
          border: ${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke};
          border-radius: ${shapeObj.borderRadius}px;
        `
        objectHtml = `<div class="canvas-object" style="${inlineStyle}"></div>`
      } else if (obj.type === "circle") {
        const shapeObj = obj as ShapeObject
        inlineStyle += `
          background-color: ${shapeObj.fill};
          border: ${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke};
          border-radius: 50%;
        `
        objectHtml = `<div class="canvas-object" style="${inlineStyle}"></div>`
      } else if (obj.type === "line") {
        const shapeObj = obj as ShapeObject
        inlineStyle += `
          background-color: ${shapeObj.fill};
          height: ${shapeObj.height}px;
          width: ${shapeObj.width}px;
          border-radius: ${shapeObj.borderRadius}px;
        `
        objectHtml = `<div class="canvas-object" style="${inlineStyle}"></div>`
      } else if (obj.type === "star") {
        const shapeObj = obj as ShapeObject
        inlineStyle += `
          background-color: ${shapeObj.fill};
          border: ${shapeObj.strokeWidth}px ${shapeObj.borderStyle} ${shapeObj.stroke};
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          border-radius: ${shapeObj.borderRadius}px;
        `
        objectHtml = `<div class="canvas-object" style="${inlineStyle}"></div>`
      } else if (obj.type === "image") {
        const imageObj = obj as ImageObject
        objectHtml = `<div class="canvas-object image" style="${inlineStyle}"><img src="${imageObj.src}" alt="Design Image" /></div>`
      } else if (obj.type === "code") {
        const codeObj = obj as CodeObject
        inlineStyle += `
          background-color: ${codeObj.backgroundColor};
          color: ${codeObj.color};
          font-size: ${codeObj.fontSize}px;
          font-family: monospace;
          padding: 10px;
        `
        objectHtml = `<div class="canvas-object code" style="${inlineStyle}"><pre>${codeObj.content}</pre></div>`
      } else if (obj.type === "icon") {
        const iconObj = obj as IconObject
        inlineStyle += `
          color: ${iconObj.color};
          width: ${iconObj.size}px;
          height: ${iconObj.size}px;
        `
        objectHtml = `<div class="canvas-object" style="${inlineStyle}">${iconObj.iconSvg}</div>`
      }
      htmlContent += `        ${objectHtml}`
    })

    htmlContent += `
    </div>
</body>
</html>
`
    setGeneratedHtml(htmlContent)
    setShowHtmlModal(true)
  }, [canvasObjects, canvasSize, canvasBackgroundColor])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Design Studio</h2>
        {/* Custom Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "tools" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("tools")}
          >
            Tools
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === "properties"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("properties")}
          >
            Properties
          </button>
        </div>
        {activeTab === "tools" && (
          <div className="flex-1 overflow-y-auto py-4">
            {/* Tools */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Elements</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "select" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("select")}
                  title="Select Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconSelectSvg }} />
                  <span>Select</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "text" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("text")}
                  title="Text Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconTypeSvg }} />
                  <span>Text</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "rectangle" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("rectangle")}
                  title="Rectangle Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconSquareSvg }} />
                  <span>Rect</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "circle" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("circle")}
                  title="Circle Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconCircleSvg }} />
                  <span>Circle</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "line" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("line")}
                  title="Line Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconLineSvg }} />
                  <span>Line</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "star" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("star")}
                  title="Star Tool"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconStarSvg }} />
                  <span>Star</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "code" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("code")}
                  title="Code Block"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconCodeSvg }} />
                  <span>Code</span>
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center justify-center text-xs font-medium ${
                    selectedTool === "icon" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedTool("icon")}
                  title="Icon"
                >
                  <div dangerouslySetInnerHTML={{ __html: IconSparklesSvg }} />
                  <span>Icon</span>
                </button>
              </div>
            </div>
            {/* Upload Image */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Media</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} id="image-upload" className="hidden" />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 text-sm"
              >
                <div dangerouslySetInnerHTML={{ __html: ImageIconSvg }} />
                Upload Image
              </label>
            </div>
          </div>
        )}
        {activeTab === "properties" && (
          <div className="flex-1 overflow-y-auto py-4">
            {/* Canvas Properties */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Canvas Properties</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="canvas-bg-color" className="text-xs block mb-1">
                    Background Color:
                  </label>
                  <input
                    id="canvas-bg-color"
                    type="color"
                    value={canvasBackgroundColor}
                    onChange={(e) => setCanvasBackgroundColor(e.target.value)}
                    className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="canvas-width" className="text-xs block mb-1">
                      Width:
                    </label>
                    <input
                      id="canvas-width"
                      type="number"
                      value={Math.round(canvasSize.width)}
                      onChange={(e) => setCanvasSize((prev) => ({ ...prev, width: Number(e.target.value) || 0 }))}
                      className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="canvas-height" className="text-xs block mb-1">
                      Height:
                    </label>
                    <input
                      id="canvas-height"
                      type="number"
                      value={Math.round(canvasSize.height)}
                      onChange={(e) => setCanvasSize((prev) => ({ ...prev, height: Number(e.target.value) || 0 }))}
                      className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Object Properties */}
            {selectedObject ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4">Object Properties</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prop-x" className="text-xs block mb-1">
                        X:
                      </label>
                      <input
                        id="prop-x"
                        type="number"
                        value={Math.round(selectedObject.x)}
                        onChange={(e) =>
                          handleObjectUpdate(selectedObject.id, { x: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="prop-y" className="text-xs block mb-1">
                        Y:
                      </label>
                      <input
                        id="prop-y"
                        type="number"
                        value={Math.round(selectedObject.y)}
                        onChange={(e) =>
                          handleObjectUpdate(selectedObject.id, { y: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="prop-width" className="text-xs block mb-1">
                        Width:
                      </label>
                      <input
                        id="prop-width"
                        type="number"
                        value={Math.round(selectedObject.width)}
                        onChange={(e) =>
                          handleObjectUpdate(selectedObject.id, { width: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="prop-height" className="text-xs block mb-1">
                        Height:
                      </label>
                      <input
                        id="prop-height"
                        type="number"
                        value={Math.round(selectedObject.height)}
                        onChange={(e) =>
                          handleObjectUpdate(selectedObject.id, { height: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="prop-rotation" className="text-xs block mb-1">
                      Rotation:
                    </label>
                    <input
                      id="prop-rotation"
                      type="range"
                      min={0}
                      max={360}
                      step={1}
                      value={Math.round(selectedObject.rotation)}
                      onChange={(e) =>
                        handleObjectUpdate(selectedObject.id, { rotation: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-500">{Math.round(selectedObject.rotation)}°</span>
                  </div>
                  <div>
                    <label htmlFor="prop-opacity" className="text-xs block mb-1">
                      Opacity:
                    </label>
                    <input
                      id="prop-opacity"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={selectedObject.opacity}
                      onChange={(e) =>
                        handleObjectUpdate(selectedObject.id, { opacity: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-500">{Math.round(selectedObject.opacity * 100)}%</span>
                  </div>
                  <div>
                    <label htmlFor="prop-box-shadow" className="text-xs block mb-1">
                      Box Shadow:
                    </label>
                    <input
                      id="prop-box-shadow"
                      type="text"
                      value={selectedObject.boxShadow}
                      onChange={(e) => handleObjectUpdate(selectedObject.id, { boxShadow: e.target.value })}
                      placeholder="e.g., 0px 4px 6px rgba(0,0,0,0.1)"
                      className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {selectedObject.type === "text" && (
                    <>
                      <div>
                        <label htmlFor="prop-font-size" className="text-xs block mb-1">
                          Font Size:
                        </label>
                        <input
                          id="prop-font-size"
                          type="number"
                          value={(selectedObject as TextObject).fontSize}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { fontSize: Number.parseInt(e.target.value) || 16 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-font-family" className="text-xs block mb-1">
                          Font Family:
                        </label>
                        <select
                          id="prop-font-family"
                          value={(selectedObject as TextObject).fontFamily}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { fontFamily: e.target.value })}
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Arial">Arial</option>
                          <option value="Verdana">Verdana</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Tahoma">Tahoma</option>
                          <option value="Trebuchet MS">Trebuchet MS</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Lucida Console">Lucida Console</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="prop-font-weight" className="text-xs block mb-1">
                          Font Weight:
                        </label>
                        <select
                          id="prop-font-weight"
                          value={(selectedObject as TextObject).fontWeight}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { fontWeight: e.target.value })}
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Bold</option>
                          <option value="bolder">Bolder</option>
                          <option value="lighter">Lighter</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                          <option value="400">400</option>
                          <option value="500">500</option>
                          <option value="600">600</option>
                          <option value="700">700</option>
                          <option value="800">800</option>
                          <option value="900">900</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="prop-text-align" className="text-xs block mb-1">
                          Text Align:
                        </label>
                        <select
                          id="prop-text-align"
                          value={(selectedObject as TextObject).textAlign}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, {
                              textAlign: e.target.value as TextObject["textAlign"],
                            })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                          <option value="justify">Justify</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="prop-line-height" className="text-xs block mb-1">
                          Line Height:
                        </label>
                        <input
                          id="prop-line-height"
                          type="number"
                          step="0.1"
                          value={(selectedObject as TextObject).lineHeight}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { lineHeight: Number(e.target.value) || 1 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-letter-spacing" className="text-xs block mb-1">
                          Letter Spacing:
                        </label>
                        <input
                          id="prop-letter-spacing"
                          type="number"
                          step="0.1"
                          value={(selectedObject as TextObject).letterSpacing}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { letterSpacing: Number(e.target.value) || 0 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-text-color" className="text-xs block mb-1">
                          Color:
                        </label>
                        <input
                          id="prop-text-color"
                          type="color"
                          value={(selectedObject as TextObject).color}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { color: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-bg-color" className="text-xs block mb-1">
                          Background Color:
                        </label>
                        <input
                          id="prop-bg-color"
                          type="color"
                          value={(selectedObject as TextObject).backgroundColor}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { backgroundColor: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                  {(selectedObject.type === "rectangle" ||
                    selectedObject.type === "circle" ||
                    selectedObject.type === "line" ||
                    selectedObject.type === "star") && (
                    <>
                      <div>
                        <label htmlFor="prop-fill" className="text-xs block mb-1">
                          Fill Color:
                        </label>
                        <input
                          id="prop-fill"
                          type="color"
                          value={(selectedObject as ShapeObject).fill}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { fill: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-stroke" className="text-xs block mb-1">
                          Stroke Color:
                        </label>
                        <input
                          id="prop-stroke"
                          type="color"
                          value={(selectedObject as ShapeObject).stroke}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { stroke: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-stroke-width" className="text-xs block mb-1">
                          Stroke Width:
                        </label>
                        <input
                          id="prop-stroke-width"
                          type="number"
                          value={(selectedObject as ShapeObject).strokeWidth}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { strokeWidth: Number.parseInt(e.target.value) || 0 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-border-radius" className="text-xs block mb-1">
                          Border Radius:
                        </label>
                        <input
                          id="prop-border-radius"
                          type="number"
                          value={(selectedObject as ShapeObject).borderRadius}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, {
                              borderRadius: Number.parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-border-style" className="text-xs block mb-1">
                          Border Style:
                        </label>
                        <select
                          id="prop-border-style"
                          value={(selectedObject as ShapeObject).borderStyle}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, {
                              borderStyle: e.target.value as ShapeObject["borderStyle"],
                            })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                          <option value="dotted">Dotted</option>
                        </select>
                      </div>
                    </>
                  )}
                  {selectedObject.type === "code" && (
                    <>
                      <div>
                        <label htmlFor="prop-code-font-size" className="text-xs block mb-1">
                          Font Size:
                        </label>
                        <input
                          id="prop-code-font-size"
                          type="number"
                          value={(selectedObject as CodeObject).fontSize}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { fontSize: Number.parseInt(e.target.value) || 14 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-code-color" className="text-xs block mb-1">
                          Text Color:
                        </label>
                        <input
                          id="prop-code-color"
                          type="color"
                          value={(selectedObject as CodeObject).color}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { color: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-code-bg-color" className="text-xs block mb-1">
                          Background Color:
                        </label>
                        <input
                          id="prop-code-bg-color"
                          type="color"
                          value={(selectedObject as CodeObject).backgroundColor}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { backgroundColor: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-code-language" className="text-xs block mb-1">
                          Language:
                        </label>
                        <input
                          id="prop-code-language"
                          type="text"
                          value={(selectedObject as CodeObject).language}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { language: e.target.value })}
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                  {selectedObject.type === "icon" && (
                    <>
                      <div>
                        <label htmlFor="prop-icon-size" className="text-xs block mb-1">
                          Size:
                        </label>
                        <input
                          id="prop-icon-size"
                          type="number"
                          value={(selectedObject as IconObject).size}
                          onChange={(e) =>
                            handleObjectUpdate(selectedObject.id, { size: Number.parseInt(e.target.value) || 24 })
                          }
                          className="w-full p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="prop-icon-color" className="text-xs block mb-1">
                          Color:
                        </label>
                        <input
                          id="prop-icon-color"
                          type="color"
                          value={(selectedObject as IconObject).color}
                          onChange={(e) => handleObjectUpdate(selectedObject.id, { color: e.target.value })}
                          className="w-full h-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={duplicateSelected}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                    >
                      <div dangerouslySetInnerHTML={{ __html: IconCopySvg }} /> <span className="ml-2">Duplicate</span>
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium"
                    >
                      <div dangerouslySetInnerHTML={{ __html: IconTrashSvg }} /> <span className="ml-2">Delete</span>
                    </button>
                  </div>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => changeZIndex("forward")}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                    >
                      <div dangerouslySetInnerHTML={{ __html: IconArrowUpSvg }} />{" "}
                      <span className="ml-2">Bring Forward</span>
                    </button>
                    <button
                      onClick={() => changeZIndex("backward")}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                    >
                      <div dangerouslySetInnerHTML={{ __html: IconArrowDownSvg }} />{" "}
                      <span className="ml-2">Send Backward</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm mt-8">Select an object to edit its properties.</p>
            )}
          </div>
        )}
      </div>
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              title="Undo (Ctrl+Z)"
            >
              <div dangerouslySetInnerHTML={{ __html: IconUndoSvg }} />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              title="Redo (Ctrl+Y)"
            >
              <div dangerouslySetInnerHTML={{ __html: IconRedoSvg }} />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom((prev) => Math.max(0.1, prev * 0.9))}
                className="p-2 rounded-md hover:bg-gray-100"
                title="Zoom Out"
              >
                <div dangerouslySetInnerHTML={{ __html: IconZoomOutSvg }} />
              </button>
              <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(3, prev * 1.1))}
                className="p-2 rounded-md hover:bg-gray-100"
                title="Zoom In"
              >
                <div dangerouslySetInnerHTML={{ __html: IconZoomInSvg }} />
              </button>
            </div>
          </div>
          <button
            onClick={generateHtml}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
          >
            <div dangerouslySetInnerHTML={{ __html: IconCodeSvg }} />
            <span>View HTML</span>
          </button>
        </div>
        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-200 p-8 flex items-center justify-center">
          <div
            ref={canvasRef}
            className="bg-white shadow-lg relative border border-gray-300"
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              cursor: selectedTool === "select" ? (isDragging ? "grabbing" : "grab") : "crosshair",
              backgroundColor: canvasBackgroundColor,
            }}
            onClick={handleCanvasClick}
            onMouseMove={(e) => handleMouseMove(e.nativeEvent)} // Use nativeEvent for global mousemove
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves canvas
          >
            {canvasObjects.map(renderObject)}
            {/* Canvas Resize Handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize"
              onMouseDown={handleCanvasResizeMouseDown}
            />
          </div>
        </div>
      </div>

      {/* HTML Preview Modal */}
      {showHtmlModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Generated HTML</h2>
            <textarea
              readOnly
              value={generatedHtml}
              className="flex-1 w-full p-4 border border-gray-300 rounded-md font-mono text-sm resize-none"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedHtml)
                  alert("HTML copied to clipboard!")
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Copy HTML
              </button>
              <button
                onClick={() => setShowHtmlModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SampleStudio
