import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";
import ParentComponent from "../components/buttons/ParentComponent"
const Home = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <div className="relative w-full h-screen bg-blue-500">
      <ParentComponent onLoopTapClick = {handleClick}/>
      <RecentEventsPopup isOpen={open} />
    </div>
  );
};

export default Home;
