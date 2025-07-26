"use client"

import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa" // Using react-icons for edit, save, and cancel
import { useStore } from "zustand"

const TitleOfDesignInput = () => {
  const { currentDesignTitle, setCurrentDesignTitle } = useStore(designStudioStore)
  const [tempTitle, setTempTitle] = useState(currentDesignTitle)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTempTitle(currentDesignTitle)
  }, [currentDesignTitle])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    // Only update if the title has actually changed
    if (tempTitle !== currentDesignTitle) {
      setCurrentDesignTitle(tempTitle)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempTitle(currentDesignTitle) // Revert to the original title
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  const handleInputBlur = () => {
    if (isEditing) {
      handleSave()
    }
  }

  return (
    <div className="">
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
            placeholder="Untitled Design"
            aria-label="Edit design title"
          />
          <button
            onClick={handleSave}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
            title="Save title"
            aria-label="Save title"
          >
            <FaCheck className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors duration-200"
            title="Cancel edit"
            aria-label="Cancel edit"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setIsEditing(true)}
          title="Click to edit title"
          aria-label="Design title, click to edit"
          role="button"
          tabIndex={0} // Make the div focusable
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsEditing(true)
            }
          }}
        >
          <h1 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
            {currentDesignTitle || "Untitled Design"}
          </h1>
          <FaPencilAlt className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
        </div>
      )}
    </div>
  )
}

export default TitleOfDesignInput
