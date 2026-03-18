import type { PastEvent, PastEventCardSize } from "../types/eventTypes";
import { PastEventCard } from "../components/PastEventCard";
import { CARD_ASPECT_CLASS, getResponsiveWidth, type GridRow } from "./pastEventGrid";

export function GridRowRenderer({ row }: { row: GridRow }) {
  const rowClass = "flex flex-col md:flex-row md:items-start gap-10 w-full min-w-0";
  const colClass = "flex flex-col items-start gap-[26.67px] min-w-0 overflow-visible";

  const renderCard = ({
    event,
    containerSize,
    cardDisplaySize: cardSize,
    extraClass = "",
  }: {
    event: PastEvent;
    containerSize: PastEventCardSize;
    cardDisplaySize?: PastEventCardSize;
    extraClass?: string;
  }) => (
    <div
      key={event.id}
      className={`${getResponsiveWidth(containerSize)} ${CARD_ASPECT_CLASS} min-w-0 overflow-visible ${extraClass}`}
    >
      <PastEventCard
        {...event}
        cardSize={cardSize ?? containerSize}
      />
    </div>
  );
  if (row.type === "full" || row.type === "half" || row.type === "thirds") {
    return (
      <div className={rowClass}>
        {row.cards.map((card) => renderCard({ event: card.event, containerSize: card.size }))}
      </div>
    );
  }

  // column: 7th 2/3w, 8th+9th 1/3w column (flipped: column on left)
  const [card7, card8, card9] = row.cards;
  const colCardHover = "md:mb-0 md:[&:has(:hover)]:mb-7 md:transition-[margin] md:duration-200 md:delay-80";
  const colCards = (
    <>
      {card8 && renderCard({ event: card8.event, containerSize: "full", cardDisplaySize: "third", extraClass: colCardHover })}
      {card9 && renderCard({ event: card9.event, containerSize: "full", cardDisplaySize: "third", extraClass: colCardHover })}
    </>
  );
  const bigCard = card7 && renderCard({ event: card7.event, containerSize: card7.size });

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
