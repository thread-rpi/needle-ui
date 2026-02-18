import type { PastEvent } from "../types/eventTypes";
import { PastEventCard } from "../components/PastEventCard";
import { CARD_ASPECT_CLASS, getResponsiveWidth, type CardSize, type GridRow } from "./pastEventGrid";

export function GridRowRenderer({ row }: { row: GridRow }) {
  const rowClass = "flex flex-col md:flex-row md:items-start gap-10 w-full min-w-0";
  const colClass = "flex flex-col items-start gap-[26.67px] min-w-0 overflow-visible";

  const renderCard = ({
    event,
    size,
    extraClass = "",
  }: {
    event: PastEvent;
    size: CardSize;
    extraClass?: string;
  }) => (
    <div
      key={event.id}
      className={`${getResponsiveWidth(size)} ${CARD_ASPECT_CLASS} min-w-0 overflow-visible ${extraClass}`}
    >
      <PastEventCard
        {...event}
      />
    </div>
  );
  if (row.type === "full" || row.type === "half" || row.type === "thirds") {
    return (
      <div className={rowClass}>
        {row.cards.map((card) => renderCard(card))}
      </div>
    );
  }

  // column: 7th 2/3w, 8th+9th 1/3w column (flipped: column on left)
  const [card7, card8, card9] = row.cards;
  const colCardHover = "md:mb-0 md:[&:has(:hover)]:mb-7 md:transition-[margin] md:duration-200 md:delay-80";
  const colCards = (
    <>
      {card8 && renderCard({ ...card8, size: "full", extraClass: colCardHover })}
      {card9 && renderCard({ ...card9, size: "full", extraClass: colCardHover })}
    </>
  );
  const bigCard = card7 && renderCard(card7);

  return (
    <div className={rowClass}>
      {row.flipped ? (
        <>
          <div className={`${getResponsiveWidth("third")} ${colClass}`}>
            {colCards}
          </div>
          <div className={`${getResponsiveWidth("twoThird")} min-w-0`}>
            {bigCard}
          </div>
        </>
      ) : (
        <>
          <div className={`${getResponsiveWidth("twoThird")} min-w-0`}>
            {bigCard}
          </div>
          <div className={`${getResponsiveWidth("third")} ${colClass}`}>
            {colCards}
          </div>
        </>
      )}
    </div>
  );
}
