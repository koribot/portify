// IMPROVED VERSION - FITS ALL TEXT CONTENT AND SMOOTHER INTERACTIONS
"use client";
import type React from "react";
import BlockResizersAndMovers from "./BlockResizersAndMovers";
import { useStore } from "zustand";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";

interface ITextBlock {
  index: number;
}

const TextBlock = ({ index }: ITextBlock) => {
  const { content, changeTextBlockContent, setIsTextBlockInputActive } =
    useStore(designStudioStore);
  const block = content[index];

  const [displayContent, setDisplayContent] = useState(
    block.textBlock?.content || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const editableDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setDisplayContent(block.textBlock?.content || "");
  }, [block.textBlock?.content]);

  // Listen for drag events to prevent focus during dragging
  useEffect(() => {
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => {
      setIsDragging(false);
      // Prevent focus after dragging
      setTimeout(() => {
        if (editableDivRef.current) {
          editableDivRef.current.blur();
        }
      }, 0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('dragstart', handleDragStart);
      container.addEventListener('dragend', handleDragEnd);
      
      return () => {
        container.removeEventListener('dragstart', handleDragStart);
        container.removeEventListener('dragend', handleDragEnd);
      };
    }
  }, []);

  useEffect(() => {
    if (isEditing && editableDivRef.current && !isDragging) {
      editableDivRef.current.innerHTML = displayContent;
      editableDivRef.current.focus();
      
      const selection = window.getSelection();
      const range = document.createRange();
      if (selection && editableDivRef.current.firstChild) {
        range.selectNodeContents(editableDivRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing, displayContent, isDragging]);

  const handleSave = useCallback(() => {
    let newContent = editableDivRef.current?.innerHTML || "";

    // Clean up <br> tags if the content is effectively empty
    if (newContent === "<br>" || newContent.trim() === "") {
      newContent = "";
    }

    // Only update if the content has actually changed
    if (newContent !== block.textBlock?.content) {
      changeTextBlockContent({ index, content: newContent });
      setDisplayContent(newContent);
    }
    setIsEditing(false);
    setIsTextBlockInputActive(false);
  }, [
    block.textBlock?.content,
    changeTextBlockContent,
    index,
    setIsTextBlockInputActive,
  ]);

  const handleCancel = useCallback(() => {
    setDisplayContent(block.textBlock?.content || "");
    setIsEditing(false);
    setIsTextBlockInputActive(false);
  }, [block.textBlock?.content, setIsTextBlockInputActive]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  const handleBlur = useCallback(() => {
    // Only save if we're actually editing and not dragging
    if (isEditing && !isDragging) {
      handleSave();
    }
    setIsTextBlockInputActive(false);
  }, [isEditing, handleSave, setIsTextBlockInputActive, isDragging]);

  const handleDoubleClick = useCallback(() => {
    // Prevent editing if we just finished dragging
    if (!isDragging) {
      setIsEditing(true);
      setIsTextBlockInputActive(true);
    }
  }, [isDragging, setIsTextBlockInputActive]);

  const commonTextStyle = {
    fontSize: `${block.textBlock?.fontSize || 16}px`,
    textAlign: block.textBlock?.textAlign || "center" as const,
    color: block.textBlock?.color || "#000000",
    wordWrap: "break-word" as const,
    overflowWrap: "break-word" as const,
    hyphens: "auto" as const,
    lineHeight: "1.4",
  };

  return (
    <BlockResizersAndMovers key={block.id} index={index}>
      <div
        ref={containerRef}
        style={{
          backgroundColor: block.backgroundColor,
          width: "100%",
          height: "100%",
          zIndex: content.length + 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "8px", // Add padding so text doesn't touch edges
          boxSizing: "border-box",
        }}
      >
        {isEditing ? (
          <div
            ref={editableDivRef}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full flex items-center justify-center cursor-text outline-none "
            style={{
              ...commonTextStyle,
              minHeight: "100%",
              resize: "none",
            }}
            aria-label="Edit text block content"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onDoubleClick={handleDoubleClick}
            title="Double click to edit text"
            aria-label="Text block content, double-click to edit"
            role="button"
            tabIndex={0}
            style={{
              ...commonTextStyle,
              userSelect: "none", // Prevent text selection during drag
            }}
           
          >{displayContent}</div>
        )}
      </div>
    </BlockResizersAndMovers>
  );
};

export default TextBlock;