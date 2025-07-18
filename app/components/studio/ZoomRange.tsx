"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface ZoomRangeProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  label?: string
  unit?: string
  onChange?: (value: number) => void
}

const ZoomRange: React.FC<ZoomRangeProps> = ({
  min = 10,
  max = 200,
  step = 10,
  defaultValue = 100,
  label = "Zoom",
  unit = "",
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue)

  // Ensure the value stays within min/max bounds
  useEffect(() => {
    setValue((prev) => Math.max(min, Math.min(max, prev)))
  }, [min, max])

  const updateValue = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setValue(clampedValue)
    onChange?.(clampedValue)
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(event.target.value))
  }

  const handleManualInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    // Allow empty string for temporary input state, but convert to number for update
    if (inputValue === "") {
      setValue(Number.NaN) // Set to NaN to indicate invalid input temporarily
      return
    }
    const newValue = Number(inputValue)
    if (!isNaN(newValue)) {
      updateValue(newValue)
    }
  }

  const handleIncrement = () => {
    updateValue(value + step)
  }

  const handleDecrement = () => {
    updateValue(value - step)
  }

  return (
    <div className="flex items-center gap-2">
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleRangeChange}
        className="
          w-32 h-2 rounded-lg appearance-none cursor-pointer
          bg-gray-300
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:bg-blue-600
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:-mt-[3px] /* Adjust thumb position */
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:bg-blue-600
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:shadow-md
        "
      />
      <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <input
          type="number" 
          value={isNaN(value) ? "" : value} 
          onChange={handleManualInputChange}
          onBlur={() => updateValue(value)} 
          min={min}
          max={max}
          className="w-16 text-center p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
        />
        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
        <span className="text-sm font-medium text-gray-700">{unit}</span>
      </div>
    </div>
  )
}

export default ZoomRange
