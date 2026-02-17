import type { EventType, PastEvent } from "../types/eventTypes";
import { PastEventCard } from "../components/PastEventCard";
import { getEventId } from "../utils/eventId";
import { getResponsiveWidth, type GridRow } from "./pastEventGrid";

export function GridRowRenderer({ row }: { row: GridRow }) {
  const renderCard = ({
    event,
    width,
    height,
  }: {
    event: PastEvent;
    width: string;
    height: string;
  }) => (
    <div
      key={getEventId(event)}
      className={`${getResponsiveWidth(width)} ${height} min-w-0`}
    >
      <PastEventCard
        title={event.title}
        type={event.type as EventType}
        date={event.date}
        cover_image_path={event.cover_image_path}
      />
    </div>
  );

  if (row.type === "full" || row.type === "half" || row.type === "thirds") {
    return (
      <div className="flex flex-col md:flex-row gap-10 w-full min-w-0">
        {row.cards.map((card) => renderCard(card))}
      </div>
    );
  }

  // column: 7th 2/3w, 8th+9th 1/3w column (flipped: column on left)
  const [card7, card8, card9] = row.cards;
  const colClass = "flex flex-col gap-[26.67px] min-w-0"; // matches card 7 height (2:3 aspect)
  const colCards = (
    <>
      {card8 && renderCard(card8)}
      {card9 && renderCard(card9)}
    </>
  );
  const bigCard = card7 && renderCard(card7);

  const colWidth = "w-[calc(33.333333%-26.667px)]"; // same as gridRowThirds
  const bigWidth = "w-[calc(66.666667%-13.333px)]"; // fills rest (100% - gap - colWidth)

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full min-w-0">
      {row.flipped ? (
        <>
          <div className={`${getResponsiveWidth(colWidth)} ${colClass}`}>
            {colCards}
          </div>
          <div className={`${getResponsiveWidth(bigWidth)} min-w-0`}>
            {bigCard}
          </div>
        </>
      ) : (
        <>
          <div className={`${getResponsiveWidth(bigWidth)} min-w-0`}>
            {bigCard}
          </div>
          <div className={`${getResponsiveWidth(colWidth)} ${colClass}`}>
            {colCards}
          </div>
        </>
      )}
    </div>
  );
}
