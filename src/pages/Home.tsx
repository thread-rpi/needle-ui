import { useViewport } from "../contexts/useViewport";
import { generatePastEventGrid } from "../helpers/pastEventGrid";
import { GridRowRenderer } from "../helpers/gridRowRenderer";
import { useGetPastEvents } from "../api/queries";
import { MobilePastEventCard } from "../components/MobilePastEventCard";
import type { PastEvent } from "../types/eventTypes";
import { RecentContentThread } from "../components/RecentContentThread";

const MIN_PAST_EVENTS = 6;

const createPlaceholderEvents = (count: number, fallbackCoverPath?: string): PastEvent[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index + 1}`,
    title: "Soon...",
    date: new Date("9999-12-31").toISOString(),
    location: "???",
    type: "internal",
    cover_image_path: fallbackCoverPath ?? "",
  }));

const Home = () => {
  const { isMobile } = useViewport();

  const { 
    isSuccess: isRecentContentSuccess,
    isLoading: isRecentContentLoading,
    isError: isRecentContentError,
    data: recentContentData,
    error: recentContentError,
  } = useGetPastEvents();
  console.log(recentContentData?.past_events || recentContentError?.error);
  const pastEvents = recentContentData?.past_events || [];
  const fallbackCoverPath = pastEvents[0]?.cover_image_path;
  const displayPastEvents =
    pastEvents.length >= MIN_PAST_EVENTS
      ? pastEvents
      : [...pastEvents, ...createPlaceholderEvents(MIN_PAST_EVENTS - pastEvents.length, fallbackCoverPath)];
  const pastEventRows = generatePastEventGrid(displayPastEvents); 
  
  return (
    <div className="relative w-full h-max min-h-dvh flex justify-center">
      {isRecentContentSuccess && (
        <>
        {isMobile && (
          <div className="z-10 flex flex-col gap-5 w-full max-w-7xl h-max mx-auto px-6 pb-6">
            {displayPastEvents.map((event) => (
              <MobilePastEventCard key={event.id} {...event} />
            ))}
          </div>
        )}
        {!isMobile && (
          <div className="z-10 flex flex-col gap-10 w-full max-w-7xl h-max mx-auto px-12 pb-6">
            {pastEventRows.map((row, rowIndex) => (
              <GridRowRenderer key={rowIndex} row={row} />
            ))}
          </div>
        )}
        </>
      )}
      {isRecentContentLoading && (
        <div className="flex max-w-7xl w-full h-full items-center justify-center">
          <div className="w-full h-min text-center text-black text-[8rem] animate-pulse">Loading...</div>
        </div>
      )}
      {isRecentContentError && (
        <div className="flex flex-col max-w-7xl w-full h-full items-center justify-center">
        <div className="w-full h-min text-center text-black text-[5rem] leading-none">Something went wrong...</div>
        <div className="w-full h-min text-center text-black text-[2rem]">Please try again later.</div>
      </div>
      )}
      <div className="absolute inset-0 w-full h-[calc(100%+10rem)] lg:h-[calc(100%+1rem)] -mt-10 md:-mt-12 lg:mt-12 overflow-clip pointer-events-none">
        <RecentContentThread 
          className="z-0 w-[240vw] lg:w-[127vw] 2xl:w-[129vw] max-w-none absolute top-0 left-1/2 -translate-x-1/2 h-auto"
        />
      </div>
    </div>
  );
};

export default Home;
