import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import LoopTap from "../assets/LoopTap.svg";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <div className="relative w-full h-screen">
      <button
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

      <RecentEventsPopup isOpen={open} />
    </div>
  );
};

export default Home;
