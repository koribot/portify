// imports
import { IPaperSize } from "../global-types/paper-size/types"




// Primitives
export const portifyGithubLink = "https://github.com/koribot/portify"
export const grapeJsGithubLink = "https://github.com/GrapesJS/grapesjs"
export const minPaperSizeWidthInpixels = 70
export const minPaperSizeHeightInpixels = 70
export const maxPaperSizeWidthInpixels = 3125
export const maxPaperSizeHeightInpixels = 8000
export const maxFontSize = 500
export const minFontSize = 7
export const minDesignBlockSizeWidthXHeight= 40




// Objects and arrays
export const PAPER_SIZES: IPaperSize[] = [
  // A Series (72 DPI for web)
  { name: "A0", width: 2383.98, height: 3370.39, category: "A Series" },
  { name: "A1", width: 1683.78, height: 2383.98, category: "A Series" },
  { name: "A2", width: 1190.55, height: 1683.78, category: "A Series" },
  { name: "A3", width: 841.89, height: 1190.55, category: "A Series" },
  { name: "A4", width: 595.44, height: 841.68, category: "A Series" },
  { name: "A5", width: 419.53, height: 595.44, category: "A Series" },
  { name: "A6", width: 297.72, height: 419.53, category: "A Series" },
  { name: "A7", width: 209.76, height: 297.72, category: "A Series" },
  { name: "A8", width: 147.4, height: 209.76, category: "A Series" },
  { name: "A9", width: 104.88, height: 147.4, category: "A Series" },
  { name: "A10", width: 73.7, height: 104.88, category: "A Series" },

  // US Paper (72 DPI for web)
  { name: "Letter", width: 612.0, height: 792.0, category: "US Paper" }, // 8.5 x 11 in
  { name: "Legal", width: 612.0, height: 1008.0, category: "US Paper" }, // 8.5 x 14 in
  { name: "Tabloid", width: 792.0, height: 1224.0, category: "US Paper" }, // 11 x 17 in

  // Web & Screen Sizes
  { name: "Desktop HD", width: 1920, height: 1080, category: "Screen" },
  { name: "Desktop 4K", width: 3840, height: 2160, category: "Screen" },
  { name: "Laptop", width: 1366, height: 768, category: "Screen" },
  { name: "Tablet Portrait", width: 768, height: 1024, category: "Screen" },
  { name: "Tablet Landscape", width: 1024, height: 768, category: "Screen" },
  { name: "Mobile Portrait", width: 375, height: 667, category: "Screen" },
  { name: "Mobile Landscape", width: 667, height: 375, category: "Screen" },

  // Web Design Common
  { name: "Web Banner", width: 728, height: 90, category: "Web" },
  { name: "Leaderboard", width: 728, height: 90, category: "Web" },
  { name: "Medium Rectangle", width: 300, height: 250, category: "Web" },
  { name: "Skyscraper", width: 160, height: 600, category: "Web" },
  { name: "Large Rectangle", width: 336, height: 280, category: "Web" },

  // Social Media
  { name: "Instagram Post", width: 1080, height: 1080, category: "Social" },
  { name: "Instagram Story", width: 1080, height: 1920, category: "Social" },
  { name: "Facebook Cover", width: 1200, height: 630, category: "Social" },
  { name: "Facebook Post", width: 1200, height: 630, category: "Social" },
  { name: "Twitter Header", width: 1500, height: 500, category: "Social" },
  { name: "Twitter Post", width: 1200, height: 675, category: "Social" },
  { name: "LinkedIn Banner", width: 1584, height: 396, category: "Social" },
  { name: "YouTube Thumbnail", width: 1280, height: 720, category: "Social" },

  // Print for Web Preview (72 DPI)
  { name: "Business Card", width: 252, height: 144, category: "Print Preview" }, // 3.5 x 2 in
  { name: "Postcard", width: 432, height: 288, category: "Print Preview" }, // 6 x 4 in
  { name: "Flyer", width: 612, height: 792, category: "Print Preview" }, // Letter size
  { name: "Poster", width: 864, height: 1296, category: "Print Preview" }, // 12 x 18 in
];


