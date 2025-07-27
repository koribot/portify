// Type definitions
export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  rotateAngle: number;
}

export interface Position {
  centerX: number;
  centerY: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Transform {
  rotateAngle: number;
}

export interface NewStyleResult {
  position: Position;
  size: Size;
}

export interface TLToCenterResult {
  position: Position;
  size: Size;
  transform: Transform;
}

export interface CenterToTLResult {
  top: number;
  left: number;
  width: number;
  height: number;
  rotateAngle: number;
}

export interface WidthAndDeltaW {
  width: number;
  deltaW: number;
}

export interface HeightAndDeltaH {
  height: number;
  deltaH: number;
}

export type ResizeType = "right" | "top" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left" | "top-right";
export type CursorDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

// Utility functions
export const getLength = (x: number, y: number): number =>
  Math.sqrt(x * x + y * y);

// export const getAngle = (
//   { x: x1, y: y1 }: Point,
//   { x: x2, y: y2 }: Point
// ): number => {
//   const dot = x1 * x2 + y1 * y2;
//   const det = x1 * y2 - y1 * x2;
//   const angle = (Math.atan2(det, dot) / Math.PI) * 180;
//   return (angle + 360) % 360;
// };
export const getAngle = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
): number => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = (Math.atan2(det, dot) / Math.PI) * 180;
  return (angle);
};

export const degToRadian = (deg: number): number => (deg * Math.PI) / 180;

const cos = (deg: number): number => Math.cos(degToRadian(deg));
const sin = (deg: number): number => Math.sin(degToRadian(deg));

export const setWidthAndDeltaW = (
  width: number,
  deltaW: number,
  minWidth: number
): WidthAndDeltaW => {
  const expectedWidth = width + deltaW;
  if (expectedWidth > minWidth) {
    width = expectedWidth;
  } else {
    deltaW = minWidth - width;
    width = minWidth;
  }
  return { width, deltaW };
};

const setHeightAndDeltaH = (
  height: number,
  deltaH: number,
  minHeight: number
): HeightAndDeltaH => {
  const expectedHeight = height + deltaH;
  if (expectedHeight > minHeight) {
    height = expectedHeight;
  } else {
    deltaH = minHeight - height;
    height = minHeight;
  }
  return { height, deltaH };
};

export const getNewStyle = (
  type: ResizeType,
  rect: Rect,
  deltaW: number,
  deltaH: number,
  ratio: number | null,
  minWidth: number,
  minHeight: number
): NewStyleResult => {
  let { width, height, centerX, centerY, rotateAngle } = rect;
  const widthFlag = width < 0 ? -1 : 1;
  const heightFlag = height < 0 ? -1 : 1;
  width = Math.abs(width);
  height = Math.abs(height);

  switch (type) {
    case "right": {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        deltaH = deltaW / ratio;
        height = width / ratio;
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      } else {
        centerX += (deltaW / 2) * cos(rotateAngle);
        centerY += (deltaW / 2) * sin(rotateAngle);
      }
      break;
    }
    case "top-right": {
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
      }
      centerX +=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
      centerY +=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "bottom-right": {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
      }
      centerX +=
        (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
      centerY +=
        (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "bottom": {
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
        // 左上角固定
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      } else {
        // 上边固定
        centerX -= (deltaH / 2) * sin(rotateAngle);
        centerY += (deltaH / 2) * cos(rotateAngle);
      }
      break;
    }
    case "bottom-left": {
      deltaW = -deltaW;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        height = width / ratio;
        deltaH = deltaW / ratio;
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
      centerY -=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "left": {
      deltaW = -deltaW;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        height = width / ratio;
        deltaH = deltaW / ratio;
        centerX -=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
        centerY -=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      } else {
        centerX -= (deltaW / 2) * cos(rotateAngle);
        centerY -= (deltaW / 2) * sin(rotateAngle);
      }
      break;
    }
    case "top-left": {
      deltaW = -deltaW;
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        width = height * ratio;
        deltaW = deltaH * ratio;
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle);
      centerY -=
        (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle);
      break;
    }
    case "top": {
      deltaH = -deltaH;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        width = height * ratio;
        deltaW = deltaH * ratio;
        // 左下角固定
        centerX +=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle);
        centerY +=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle);
      } else {
        centerX += (deltaH / 2) * sin(rotateAngle);
        centerY -= (deltaH / 2) * cos(rotateAngle);
      }
      break;
    }
  }

  return {
    position: {
      centerX,
      centerY,
    },
    size: {
      width: width * widthFlag,
      height: height * heightFlag,
    },
  };
};

const cursorStartMap: Record<CursorDirection, number> = {
  n: 0,
  ne: 1,
  e: 2,
  se: 3,
  s: 4,
  sw: 5,
  w: 6,
  nw: 7,
};
const cursorDirectionArray: CursorDirection[] = [
  "n",
  "ne",
  "e",
  "se",
  "s",
  "sw",
  "w",
  "nw",
];
const cursorMap: Record<number, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6,
  10: 7,
  11: 8,
};

export const getCursor = (
  rotateAngle: number,
  d: CursorDirection
): CursorDirection => {
  const increment = cursorMap[Math.floor(rotateAngle / 30)];
  const index = cursorStartMap[d];
  const newIndex = (index + increment) % 8;
  return cursorDirectionArray[newIndex];
};

export const centerToTL = ({
  centerX,
  centerY,
  width,
  height,
  rotateAngle,
}: Rect): CenterToTLResult => ({
  top: centerY - height / 2,
  left: centerX - width / 2,
  width,
  height,
  rotateAngle,
});

export const tLToCenter = ({
  top,
  left,
  width,
  height,
  rotateAngle,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
  rotateAngle: number;
}): TLToCenterResult => ({
  position: {
    centerX: left + width / 2,
    centerY: top + height / 2,
  },
  size: {
    width,
    height,
  },
  transform: {
    rotateAngle,
  },
});
