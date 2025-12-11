import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import LoopTap from "../assets/LoopTap.svg";
import { useViewport } from "../contexts/useViewport";

const Home = () => {
  const { isMobile } = useViewport();

  const [recentEventsPopupOpen, setRecentEventsPopupOpen] = useState(false);
  
  const handleClick = () => setRecentEventsPopupOpen(!recentEventsPopupOpen);

  return (
    <div className="relative w-full h-screen">
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
