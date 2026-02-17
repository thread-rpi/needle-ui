import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import LoopTap from "../assets/LoopTap.svg";
import { useViewport } from "../contexts/useViewport";
import { generatePastEventGrid } from "../helpers/pastEventGrid";
import { GridRowRenderer } from "../helpers/gridRowRenderer";
import { useGetPastEvents } from "../api/queries";

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
  const pastEvents = recentContentData?.past_events || [];
  const pastEventRows = generatePastEventGrid(Array(17).fill(pastEvents).flat());
  
  return (
    <div className="relative w-full h-max min-h-dvh flex justify-center">
      {isRecentContentSuccess && (
        <div className="flex flex-col gap-10 w-full max-w-7xl h-max mx-auto px-8 lg:px-12 pb-6">
          {pastEventRows.map((row, rowIndex) => (
            <GridRowRenderer key={rowIndex} row={row} />
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
