import {
  maxFontSize,
  minDesignBlockSizeWidthXHeight,
  PAPER_SIZES,
} from "@/app/constants/variables";
import {
  IDesignBlock,
  IShapeBlock,
  ITextBlock,
} from "@/app/global-types/design-blocks/types";
import { ResizeType } from "@/app/utils/block-resizers-and-movers-util";
import { generateUniqueId } from "@/app/utils/generateUniqueId";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DesignStudioState {
  canvaWidth: number;
  canvaHeight: number;
  zoomPercentage: number;
  windowCurrentWidth: number;
  isCanvasSizeLocked: boolean;
  dpi: number;
  currentDesignTitle: string;
  content: IDesignBlock[];
  loadingLocalStorage: boolean;
  isTextBlockInputActive: boolean; // this is for the text block handleMouseDown we need to check it cause TextBlock uses input
  setIsTextBlockInputActive: (selected: boolean) => void;
  setCanvaWidth: (width: number) => void;
  addContentBlock: ({
    type,
    content,
  }: {
    type: string;
    content: string;
  }) => void;
  setContentBlockZIndex: ({
    index,
    id,
    mode,
  }: {
    index: number;
    id?: string;
    mode: "front" | "back" | "to-front" | "to-back";
  }) => void;
  setFontSize: ({
    fontSize,
    index,
    id,
  }: {
    fontSize: number;
    index?: number;
    id?: string;
    mode: "add" | "subtract" | "set";
  }) => void;
  setLoadingLocalStorage: (loading: boolean) => void;
  setCanvaHeight: (height: number) => void;
  setContentBlockWidth: ({
    width,
    index,
    id,
  }: {
    width: number;
    index?: number;
    id?: string;
  }) => void;
  setContentBlockHeight: ({
    height,
    index,
    id,
  }: {
    height: number;
    index?: number;
    id?: string;
  }) => void;
  setContentBlockPosition: ({
    x,
    y,
    rotation,
    index,
    id,
  }: {
    x: number;
    y: number;
    rotation?: number;
    index?: number;
    id?: string;
  }) => void;
  setZoomPercentage: (percentage: number) => void;
  setWindowCurrentWidth: (width: number) => void;
  setIsCanvasSizeLocked: (locked: boolean) => void;
  setDpi: (dpi: number) => void;
  setCurrentDesignTitle: (title: string) => void;
  changeTextBlockContent: ({
    index,
    id,
    content,
  }: {
    index: number;
    id?: string;
    content: string;
  }) => void;
  deleteContentBlock: ({ index, id }: { index: number; id?: string }) => void;
}
export const designStudioStore = create<DesignStudioState>()(
  persist(
    (set, get) => ({
      zoomPercentage: 70,
      currentDesignTitle: "",
      content: [],
      loadingLocalStorage: false,
      isCanvasSizeLocked: true,
      windowCurrentWidth: 0,
      canvaWidth: PAPER_SIZES[4].width, // A4
      canvaHeight: PAPER_SIZES[4].height, // A4
      dpi: 72,
      isTextBlockInputActive: false,
      addContentBlock: ({ type, content }) => {
        const { canvaWidth, canvaHeight } = get();
        const _content = get().content;
        let id = generateUniqueId();
        let isAlreadyExist = _content.find((block) => block.id === id);

        while (isAlreadyExist) {
          id = generateUniqueId();
          isAlreadyExist = _content.find((block) => block.id === id);
        }
        const defaultProperties = {
          id: id,
          x: canvaWidth / 2 - 150,
          y: canvaHeight / 2 + 50,
          width: 300,
          height: 100,
          rotation: 0,
          zIndex: _content.length,
          opacity: 1,
          backgroundColor: "#ffffff",
          type: "text",
        };
        let newBlock: IDesignBlock = {
          ...defaultProperties,
        };
        if (type === "text") {
          newBlock = {
            ...defaultProperties,
            textBlock: {
              fontSize: 40,
              fontFamily: "Arial",
              fontWeight: "normal",
              color: "#000000",
              textAlign: "center",
              lineHeight: 1.5,
              content: content,
            },
          };
        }
        set({ content: [..._content, newBlock] });
      },

      setContentBlockZIndex: ({ index, id, mode }) => {
        const content = get().content;
        let blockToUpdate = -1;

        if (index !== undefined && content[index]) {
          blockToUpdate = index;
        } else if (id) {
          blockToUpdate = content.findIndex((block) => block.id === id);
        }

        if (blockToUpdate === -1) return { content };

        const newContent = [...content];
        const currentBlock = newContent[blockToUpdate];
        const maxZIndex = Math.max(...content.map((block) => block.zIndex));
        const minZIndex = Math.min(...content.map((block) => block.zIndex));

        switch (mode) {
          case "front":
            // Move one step forward, but don't exceed max
            const nextZIndex = Math.min(currentBlock.zIndex + 1, maxZIndex);
            if (nextZIndex !== currentBlock.zIndex) {
              // Find block that currently has this z-index and swap
              const blockAtNextZ = newContent.find(
                (block) => block.zIndex === nextZIndex
              );
              if (blockAtNextZ) {
                blockAtNextZ.zIndex = currentBlock.zIndex;
              }
              currentBlock.zIndex = nextZIndex;
            }
            break;

          case "back":
            const prevZIndex = Math.max(currentBlock.zIndex - 1, minZIndex);
            if (prevZIndex !== currentBlock.zIndex) {
              const blockAtPrevZ = newContent.find(
                (block) => block.zIndex === prevZIndex
              );
              if (blockAtPrevZ) {
                blockAtPrevZ.zIndex = currentBlock.zIndex;
              }
              currentBlock.zIndex = prevZIndex;
            }
            break;

          case "to-front":
            newContent.forEach((block) => {
              if (block.zIndex > currentBlock.zIndex) {
                block.zIndex -= 1;
              }
            });
            currentBlock.zIndex = maxZIndex;
            break;

          case "to-back":
            newContent.forEach((block) => {
              if (block.zIndex < currentBlock.zIndex) {
                block.zIndex += 1;
              }
            });
            currentBlock.zIndex = minZIndex;
            break;
        }

        set({ content: newContent });
      },
      setLoadingLocalStorage: (loading) =>
        set({ loadingLocalStorage: loading }),
      setContentBlockHeight: ({ height, index, id }) => {
        set((state) => {
          const content = get().content;
          let blockToUpdate = -1;
          if (index !== undefined && content[index]) {
            blockToUpdate = index;
          } else if (id) {
            blockToUpdate = content.findIndex((block) => block.id === id);
          }
          if (blockToUpdate === -1) {
            console.warn("Block not found for height update");
            return {};
          }
          const newContent = [...content];
          newContent[blockToUpdate] = {
            ...newContent[blockToUpdate],
            height: height,
          };
          return { content: newContent };
        });
      },
      setContentBlockPosition: ({ x, y, rotation, index, id }) => {
        set((state) => {
          const content = get().content;
          let blockToUpdate = -1;
          if (index !== undefined && content[index]) {
            blockToUpdate = index;
          } else if (id) {
            blockToUpdate = content.findIndex((block) => block.id === id);
          }
          if (blockToUpdate === -1) {
            console.warn("Block not found for position update");
            return {};
          }
          const newContent = [...content];
          newContent[blockToUpdate] = {
            ...newContent[blockToUpdate],
            x: x,
            y: y,
            rotation: rotation || 0,
          };
          return { content: newContent };
        });
      },
      setContentBlockWidth: ({ width, index, id }) => {
        set(() => {
          const currentContent = get().content;

          let blockIndexToUpdate = -1;
          if (index !== undefined && currentContent[index]) {
            blockIndexToUpdate = index;
          } else if (id) {
            blockIndexToUpdate = currentContent.findIndex(
              (block) => block.id === id
            );
          }
          if (blockIndexToUpdate === -1) {
            return {};
          }
          const newContent = [...currentContent];
          newContent[blockIndexToUpdate] = {
            ...newContent[blockIndexToUpdate],
            width: Math.max(minDesignBlockSizeWidthXHeight, width),
          };
          return { content: newContent };
        });
      },
      setFontSize: ({ fontSize, index, id, mode }) => {
        set((state) => {
          const content = get().content;
          const block =
            content.find((b) => b.id === id) || (index && content[index!]);
          if (block && block.type === "text" && block.textBlock) {
            switch (mode) {
              case "add":
                if (block.textBlock.fontSize + fontSize > maxFontSize) {
                  block.textBlock.fontSize = maxFontSize;
                  break;
                }
                block.textBlock!.fontSize += fontSize;
                break;
              case "subtract":
                if (block.textBlock.fontSize - fontSize < 7) {
                  block.textBlock.fontSize = 7;
                  break;
                }
                block.textBlock!.fontSize -= fontSize;
                break;
              case "set":
                if (fontSize > maxFontSize) {
                  block.textBlock!.fontSize = maxFontSize;
                  break;
                }
                block.textBlock!.fontSize = fontSize;
                break;
            }
          }
          return { content };
        });
      },
      changeTextBlockContent: ({ index, id, content }) => {
        const _content = get().content;
        let blockIndexToUpdate = -1;

        if (index !== undefined && _content[index]) {
          blockIndexToUpdate = index;
        } else if (id) {
          blockIndexToUpdate = _content.findIndex((block) => block.id === id);
        }

        if (blockIndexToUpdate === -1) {
          return {};
        }

        const currentBlock = _content[blockIndexToUpdate];
        const currentTextBlock = currentBlock.textBlock;

        const newContent = [..._content];
        if (content === "") {
          newContent.splice(blockIndexToUpdate, 1);
        } else {
          newContent[blockIndexToUpdate] = {
            ...currentBlock,
            textBlock: {
              fontSize: currentTextBlock?.fontSize ?? 16,
              fontFamily: currentTextBlock?.fontFamily ?? "Arial",
              fontWeight: currentTextBlock?.fontWeight ?? "normal",
              color: currentTextBlock?.color ?? "#000000",
              textAlign: currentTextBlock?.textAlign ?? "left",
              lineHeight: currentTextBlock?.lineHeight ?? 1.2,
              letterSpacing: currentTextBlock?.letterSpacing,
              content: content,
            },
          };
        }
        set({ content: newContent });
      },
      deleteContentBlock: ({ index, id }) => {
        const _content = get().content;
        let blockIndexToDelete = -1;
        if (index !== undefined && _content[index]) {
          blockIndexToDelete = index;
        } else if (id) {
          blockIndexToDelete = _content.findIndex((block) => block.id === id);
        }
        if (blockIndexToDelete !== -1) {
          const newContent = [..._content];
          newContent.splice(blockIndexToDelete, 1);
          set({ content: newContent });
        }
      },
      setIsTextBlockInputActive: (selected) =>
        set({ isTextBlockInputActive: selected }),
      setCurrentDesignTitle: (title) => set({ currentDesignTitle: title }),
      setDpi: (dpi) => set({ dpi }),
      setCanvaWidth: (width) => set({ canvaWidth: width }),
      setIsCanvasSizeLocked: (locked) => set({ isCanvasSizeLocked: locked }),
      setWindowCurrentWidth: (width) => set({ windowCurrentWidth: width }),
      setCanvaHeight: (height) => set({ canvaHeight: height }),
      setZoomPercentage: (percentage) => set({ zoomPercentage: percentage }),
    }),
    {
      name: "design-studio-store",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
