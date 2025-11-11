import recentContent from "./recentContent.json";

export type CardItem = typeof recentContent[0];

export type GridCard = {
  item: CardItem;
  index: number;
  width: string;
  height: string;
};

export type GridRow = GridCard[];

/*
 Pattern:
 - Card 1: Full width, height h (first cycle) or 1/2h (subsequent cycles)
 - Cards 2-3: 1/3w and 2/3w, height h (first cycle) or 1/2h (subsequent cycles)
 - Card 4: Full width, 1/2h
 - Cards 5-6: 2/3w and 1/3w, 1/2h
 - Cards 7-9: Three 1/3w cards, 1/2h
 - Card 10: Full width, 1/2h
 after first cycle all cards use 1/2h height
 */
export const generateCardGrid = (content: typeof recentContent): GridRow[] => {
  const rows: GridRow[] = [];
  
  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    const cardIndex = i + 1; // 1-indexed
    const cyclePosition = ((cardIndex - 1) % 10) + 1;
    const isFirstCycle = cardIndex <= 10;
    
    let width: string;
    let height: string;
    let shouldStartNewRow = false;
    
    if (cyclePosition === 1) {
      // Card 1, 11, 21, etc.
      width = "w-full";
      height = isFirstCycle ? "h-[500px]" : "h-[250px]"; // h and 1/2h
      shouldStartNewRow = true;
    } else if (cyclePosition === 2 || cyclePosition === 3) {
      // Cards 2-3, 12-13, 22-23, etc.
      if (cyclePosition === 2) {
        width = "w-[calc(33.333333%-13.333px)]"; // 1/3w minus proportional gap (40px * 1/3)
        shouldStartNewRow = true;
      } else {
        width = "w-[calc(66.666667%-26.667px)]"; // 2/3w minus proportional gap (40px * 2/3)
      }
      height = isFirstCycle ? "h-[500px]" : "h-[200px]";
    } else if (cyclePosition === 4) {
      // Card 4, 14, 24, etc.
      width = "w-full";
      height = "h-[250px]"; // 1/2h
      shouldStartNewRow = true;
    } else if (cyclePosition === 5 || cyclePosition === 6) {
      // Cards 5-6, 15-16, 25-26, etc.
      if (cyclePosition === 5) {
        width = "w-[calc(66.666667%-26.667px)]"; // 2/3w minus proportional gap (40px * 2/3)
        shouldStartNewRow = true;
      } else {
        width = "w-[calc(33.333333%-13.333px)]"; // 1/3w minus proportional gap (40px * 1/3)
      }
      height = "h-[250px]"; // 1/2h
    } else if (cyclePosition >= 7 && cyclePosition <= 9) {
      // Cards 7-9, 17-19, 27-29, etc.
      if (cyclePosition === 7) {
        shouldStartNewRow = true;
      }
      width = "w-[calc(33.333333%-26.667px)]"; // 1/3w minus proportional gap (80px total / 3 cards = 26.667px each)
      height = "h-[250px]"; // 1/2h
    } else if (cyclePosition === 10) {
      // Card 10, 20, 30, etc.
      width = "w-full";
      height = "h-[250px]"; // 1/2h
      shouldStartNewRow = true;
    } else {
      width = "w-full";
      height = "h-[200px]";
      shouldStartNewRow = true;
    }
    
    if (shouldStartNewRow) {
      rows.push([]);
    }
    
    rows[rows.length - 1].push({ item, index: i, width, height });
  }
  
  return rows;
};

/**
 * Converts width classes to responsive versions for mobile and desktop.
 * For fractional widths, uses flex-basis instead of width for better control in flexbox layouts.
 */
export const getResponsiveWidth = (width: string): string => {
  // For fractional widths, use flex-basis instead of width for better control
  // Use the exact width value from grid builder to preserve gap calculations
  if (width.includes('33.333') && width.includes('26.667')) {
    // 3-card rows: calc(33.333333%-26.667px)
    return 'w-full md:flex-[0_0_calc(33.333333%-26.667px)] md:w-auto';
  } else if (width.includes('33.333') && width.includes('13.333')) {
    // 2-card rows (1/3): calc(33.333333%-13.333px)
    return 'w-full md:flex-[0_0_calc(33.333333%-13.333px)] md:w-auto';
  } else if (width.includes('66.667')) {
    // 2-card rows (2/3): calc(66.666667%-26.667px)
    return 'w-full md:flex-[0_0_calc(66.666667%-26.667px)] md:w-auto';
  } else if (width.startsWith('w-[')) {
    // Other arbitrary values
    const value = width.substring(2);
    return `w-full md:w-${value}`;
  } else {
    // Regular class: w-full
    const mdWidth = width.replace('w-', 'md:w-');
    return `w-full ${mdWidth}`;
  }
};

