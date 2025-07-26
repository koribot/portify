"use client";
import React from "react";
import TextBlock from "./TextBlock";
import { useStore } from "zustand";
import { designStudioStore } from "@/app/store/state/design-studio/design-studio-store";

const BlockRenderer = () => {
  const { content, canvaHeight, canvaWidth } = useStore(designStudioStore);
  return content.map(
    (block, index) =>
      block.type === "text" && (
        // <div
        //   key={index + block.id}
        //   style={{
        //     width: `${content[index].width}px`,
        //     height: `${content[index].height}px`,
        //     // transform: `translate(${content[index].x}px, ${content[index].y}px)`,
        //     zIndex: content[index].zIndex,
        //   }}
        // >
        <TextBlock key={index + block.id} index={index} />
        // </div>
      )
  );
};

export default BlockRenderer;
