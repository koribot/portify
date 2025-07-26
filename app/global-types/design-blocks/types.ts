export interface ITextBlock {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  color: string;
  textAlign: "left" | "center" | "right" | "justify";
  lineHeight: number;
  letterSpacing?: number;
  content: string;
}

export interface IShapeBlock {
  shapeType: "rectangle" | "circle" | "ellipse" | "polygon" | "custom";
  color: string;
  borderColor: string;
  borderWidth: number;
  radius: number;
}

export interface IDesignBlock {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  opacity: number;
  backgroundColor: string;

  // Optional properties for different block types
  textBlock?: ITextBlock;

  shapeBlock?: IShapeBlock;
}
