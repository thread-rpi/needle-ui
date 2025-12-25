import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import LoopTap from "../assets/LoopTap.svg";
import { useViewport } from "../contexts/useViewport";
import type { EventType } from "../types/eventTypes";
import { generatePastEventGrid, getResponsiveWidth } from "../helpers/pastEventGrid";
// import { RecentContentThread } from "../components/RecentContentThread";
import { useGetPastEvents } from "../api/queries";
import { PastEventCard } from "../components/PastEventCard";

const Home = () => {
  const { isMobile } = useViewport();
  const [recentEventsPopupOpen, setRecentEventsPopupOpen] = useState(false);
  const handleClick = () => setRecentEventsPopupOpen(!recentEventsPopupOpen);

  const { 
    isSuccess: isRecentContentSuccess,
    isLoading: isRecentContentLoading,
    isError: isRecentContentError,
    data: recentContentData,
    error: recentContentError,
  } = useGetPastEvents();
  console.log(recentContentData?.past_events || recentContentError?.error);
  const pastEventRows = generatePastEventGrid(recentContentData?.past_events || []);
  
  return (
    <div className="relative w-full h-screen pt-15 flex justify-center">
      {isRecentContentSuccess && (
        <div className="flex flex-col gap-10 w-full max-w-7xl h-max mx-auto px-8 lg:px-12 pb-6">
          {pastEventRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-10 w-full min-w-0">
              {row.map(({ event, width, height }) => (
                <div key={event.id} className={`${getResponsiveWidth(width)} ${height} min-w-0`}>
                  <PastEventCard 
                    title={event.title} 
                    type={event.type as EventType} 
                    date={event.date} 
                    path={event.path}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
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
     {!isMobile && ( <button
        onClick={handleClick}
        className="absolute cursor-pointer z-10"
        style={{
          right: '0%',
          top: '73.4%',
          height: '23.22vh',
          width: 'auto',
        }}
      >
        <img src={LoopTap} alt="The Loop" className="w-auto h-full" />
      </button>
      )}
      {!isMobile && ( 
      <RecentEventsPopup isOpen={recentEventsPopupOpen} />
      )}
    </div>
  );
};

export default Home;
