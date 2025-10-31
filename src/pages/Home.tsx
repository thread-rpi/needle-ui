import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import LoopTap from "../assets/LoopTap.svg";
import ParentComponent from "../components/buttons/ParentComponent"
const Home = () => {
  const [open, setOpen] = useState(false);
  const [showTheLoop, setTheLoop] = useState(true);
  const handleClick = () => {
    setOpen(!open);
    setTheLoop(true);
  }
  return (
    <div className="relative w-full h-screen">
      <ParentComponent onLoopTapClick = {handleClick}/>
      <RecentEventsPopup isOpen={open} />
    </div>
  );
};

export default Home;
