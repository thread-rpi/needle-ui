import type { PastEvent } from "../types/eventTypes";

export type GridEvent = {
  event: PastEvent;
  index: number;
  // aspect-[3/2] for 2:3 height:width ratio
  width: string;
  height: string;
};

/** Row types for desktop pattern (gap-10 = 40px) */
export type GridRowFull = { type: "full"; cards: GridEvent[] };
export type GridRowHalf = { type: "half"; cards: GridEvent[] };
export type GridRowThirds = { type: "thirds"; cards: GridEvent[] };
export type GridRowColumn = {
  type: "column";
  cards: GridEvent[];
  flipped: boolean;
};
export type GridRow =
  | GridRowFull
  | GridRowHalf
  | GridRowThirds
  | GridRowColumn;

/*
 Desktop pattern (all cards 2:3 aspect ratio):
 - Card 1 only: Full width
 - Cards 2-9, 10-17, ...: Repeat 2-9 pattern
   - 2-3: 1/2w each (same row)
   - 4-5-6: 1/3w each (same row)
   - 7-8-9: 7th 2/3w, 8th+9th 1/3w column (flipped alternating)
 */
export const generatePastEventGrid = (content: PastEvent[]): GridRow[] => {
  const rows: GridRow[] = [];
  const aspectRatio = "aspect-[3/2]";

  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    const cardIndex = i + 1;
    const cyclePosition =
      cardIndex === 1 ? 1 : ((cardIndex - 2) % 8) + 2; // 1 for first card, then 2-9 repeat
    const cycleIndex = cardIndex <= 1 ? 0 : Math.floor((cardIndex - 2) / 8);
    const flipped = cycleIndex % 2 === 1;

    if (cardIndex === 1) {
      rows.push({
        type: "full",
        cards: [
          {
            event: item,
            index: i,
            width: "w-full",
            height: aspectRatio,
          },
        ],
      });
    } else if (cyclePosition === 2 || cyclePosition === 3) {
      const width = "w-[calc(50%-20px)]"; // 1/2w minus half of gap
      const lastRow = rows[rows.length - 1];
      if (lastRow?.type === "half" && lastRow.cards.length < 2) {
        lastRow.cards.push({ event: item, index: i, width, height: aspectRatio });
      } else {
        rows.push({
          type: "half",
          cards: [{ event: item, index: i, width, height: aspectRatio }],
        });
      }
    } else if (cyclePosition === 4 || cyclePosition === 5 || cyclePosition === 6) {
      const width = "w-[calc(33.333333%-26.667px)]"; // 1/3w
      const lastRow = rows[rows.length - 1];
      if (lastRow?.type === "thirds" && lastRow.cards.length < 3) {
        lastRow.cards.push({ event: item, index: i, width, height: aspectRatio });
      } else {
        rows.push({
          type: "thirds",
          cards: [{ event: item, index: i, width, height: aspectRatio }],
        });
      }
    } else {
      // 7, 8, 9
      const width =
        cyclePosition === 7
          ? "w-[calc(66.666667%-13.333px)]" // 2/3w (fills rest when column is thirds-width)
          : "w-[calc(33.333333%-26.667px)]"; // 1/3w (same as gridRowThirds)
      const lastRow = rows[rows.length - 1];
      if (
        lastRow?.type === "column" &&
        lastRow.cards.length < 3
      ) {
        lastRow.cards.push({
          event: item,
          index: i,
          width,
          height: aspectRatio,
        });
      } else {
        rows.push({
          type: "column",
          cards: [
            {
              event: item,
              index: i,
              width,
              height: aspectRatio,
            },
          ],
          flipped,
        });
      }
    }
  }
  return rows;
};

/**
 * Converts width classes to responsive versions for mobile and desktop.
 * For fractional widths, uses flex-basis instead of width for better control in flexbox layouts.
 */
export const getResponsiveWidth = (width: string): string => {
  if (width.includes("50%")) {
    // 2-card rows (1/2): calc(50%-20px)
    return "w-full md:flex-[0_0_calc(50%-20px)] md:w-auto";
  }
  if (width.includes("33.333") && width.includes("26.667")) {
    // 3-card rows: calc(33.333333%-26.667px)
    return "w-full md:flex-[0_0_calc(33.333333%-26.667px)] md:w-auto";
  }
  if (width.includes("33.333") && width.includes("13.333")) {
    // 2/3+1/3 rows (1/3): calc(33.333333%-13.333px)
    return "w-full md:flex-[0_0_calc(33.333333%-13.333px)] md:w-auto";
  }
  if (width.includes("66.667") && width.includes("13.333")) {
    // column layout (2/3): calc(66.666667%-13.333px)
    return "w-full md:flex-[0_0_calc(66.666667%-13.333px)] md:w-auto";
  }
  if (width.includes("66.667")) {
    return "w-full md:flex-[0_0_calc(66.666667%-26.667px)] md:w-auto";
  }
  if (width.startsWith("w-[")) {
    const value = width.substring(2);
    return `w-full md:w-${value}`;
  }
  const mdWidth = width.replace("w-", "md:w-");
  return `w-full ${mdWidth}`;
};

