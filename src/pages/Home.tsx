<<<<<<< Updated upstream
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
=======
import { useNavigate } from 'react-router-dom';
import '../index.css'
import landingPage from '../assets/landingPage.png'
import { useState } from 'react';

// props for recentEventsPopup component
interface recentEventsPopupProps {
  name: string;
  date: string;
  isOpen: boolean; // check if closed/inactive or open/active
}

// recentEventsPopup component
const RecentEventsPopup = ({ name, date, isOpen }: recentEventsPopupProps) => {
  if (!isOpen) {
    return null; // Don't render component if it's not open
  }
  return (
    <div>
      <h1>{name}</h1>
      <h2>{date}</h2>
      <div style={{ border: '1px solid black', top: '905px', left: '1700px' }}>
              This is the box!
      </div>
    </div>
  )
}



function Home() {
  const navigate = useNavigate();
  const aboutUs = () => {
    navigate('/aboutUs')
  }
  const featured = () => {
    navigate('/features')
  }
  const calendar = () => {
    navigate('calendar')
  }
  const publications = () => {
    navigate('publications')
  }


  const [open, setOpen] = useState(false); // recently button is initially "closed"

  const handleClick = () => {
    console.log("Button clicked");
    setOpen(!open);
  }

  return (
    <>
    <RecentEventsPopup 
      name="Sample Event" 
      date="2025-10-14" 
      isOpen={open}
    />

    <div 
    className = "w-full h-screen bg-cover bg-center"
    style = {{backgroundImage: `url(${landingPage})`}}
    >
    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "33px", left:"1180px", opacity: 0}}
    onClick = {aboutUs}
    >Click me!</button>

    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "36px", left:"1330px", opacity: 0}}
    onClick = {featured}
    >Click me!</button>

    <button
    className = "absolute text-2xl cursor-pointer"
    style = {{top: "33px", left:"1480px", opacity: 0}}
    onClick = {calendar}
    >Click me!</button>

    <button
    className = "absolute text-3xl cursor-pointer"
    style = {{top: "29px", left:"1640px", transform: 'rotate(6deg)', opacity: 0}}
    onClick = {publications}
    >Click me!</button>

    <button
    className = "absolute text-3xl cursor-pointer"
    style = {{top: "905px", left:"1770px", transform: 'rotate(90deg)', opacity: 0}}
    onClick = {handleClick}
    >Click me!</button>


    
    </div>
    </>
  )
}
>>>>>>> Stashed changes

export default Home;
