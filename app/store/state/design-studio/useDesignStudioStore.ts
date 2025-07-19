import { create } from "zustand";

interface DesignStudioState {
  canvaWidth: number;
  canvaHeight: number;
  zoomPercentage: number;
  setCanvaWidth: (width: number) => void;
  setCanvaHeight: (height: number) => void;
  setZoomPercentage: (percentage: number) => void;
}

export const useDesignStudioStore = create<DesignStudioState>((set) => ({
  zoomPercentage: 70,
  canvaWidth: 794,
  canvaHeight: 1123,
  setCanvaWidth: (width: number) => set({ canvaWidth: width }),
  setCanvaHeight: (height: number) => set({ canvaHeight: height }),
  setZoomPercentage: (percentage: number) => set({ zoomPercentage: percentage }),
}));
