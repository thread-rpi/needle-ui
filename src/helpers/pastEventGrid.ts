import type { PastEvent, PastEventCardSize } from "../types/eventTypes";

export type GridEvent = {
  event: PastEvent;
  index: number;
  size: PastEventCardSize;
};

// card extends 1.75rem below base on hover - grid reserves this space
export const CARD_EXTENSION = "2.25rem";
export const CARD_ASPECT_CLASS = "aspect-[3/2]";

// row types for desktop pattern (gap-10 = 40px)
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

const SIZE_CLASS_MAP: Record<PastEventCardSize, string> = {
  full: "w-full md:w-full",
  half: "w-full md:flex-[0_0_calc(50%-20px)] md:w-auto",
  third: "w-full md:flex-[0_0_calc(33.333333%-26.667px)] md:w-auto",
  twoThird: "w-full md:flex-[0_0_calc(66.666667%-13.333px)] md:w-auto",
};

/*
 (desktop) pattern: base 2:3 aspect, cards extend 1.75rem on hover
 - card 1: full width
 - cards 2-9, cards 10-17, ...: repeat 2-9 pattern
   - 2-3: 1/2w each (same row)
   - 4-5-6: 1/3w each (same row)
   - 7-8-9: 7th 2/3w, 8th+9th 1/3w column (flipped alternating)
 */
export const generatePastEventGrid = (content: PastEvent[]): GridRow[] => {
  const rows: GridRow[] = [];
  const createCard = (event: PastEvent, index: number, size: PastEventCardSize): GridEvent => ({
    event,
    index,
    size,
  });

  const appendOrCreate = (
    type: "half" | "thirds" | "column",
    maxCards: number,
    card: GridEvent,
    flipped?: boolean
  ) => {
    const lastRow = rows[rows.length - 1];
    if (lastRow?.type === type && lastRow.cards.length < maxCards) {
      lastRow.cards.push(card);
      return;
    }

    if (type === "column") {
      rows.push({ type, cards: [card], flipped: Boolean(flipped) });
      return;
    }

    rows.push({ type, cards: [card] });
  };

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
        cards: [createCard(item, i, "full")],
      });
    } else if (cyclePosition === 2 || cyclePosition === 3) {
      appendOrCreate("half", 2, createCard(item, i, "half"));
    } else if (cyclePosition === 4 || cyclePosition === 5 || cyclePosition === 6) {
      appendOrCreate("thirds", 3, createCard(item, i, "third"));
    } else {
      const size = cyclePosition === 7 ? "twoThird" : "third";
      appendOrCreate("column", 3, createCard(item, i, size), flipped);
    }
  }
  return rows;
};

/**
 converts width classes to responsive versions for mobile and desktop
 for fractional widths, uses flex-basis instead of width for better control in flexbox layout
*/
export const getResponsiveWidth = (size: PastEventCardSize): string => {
  return SIZE_CLASS_MAP[size];
};

