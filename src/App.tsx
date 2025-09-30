import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './AboutUs';
import Root from './Root';
import Features from './Features';
import Publications from "./Publications"
import Calendar from "./Calendar"
import './App.css';

function App() {
  return (
    <div className = "bg-blue-500">
      <BrowserRouter>
        <nav>
          <Link to="/aboutUs">About Us </Link>
          <Link to="/root">Root </Link>
          <Link to = "/features">Features </Link>
          <Link to = "publications">Publications </Link>
          <Link to = "calendar">Calendar</Link>
        </nav>
        <Routes>
          <Route path="/aboutUs" element={<About />} />
          <Route path="/root" element={<Root />} />
          <Route path = "/features" element = {<Features/>}/>
          <Route path = "/publications" element = {<Publications/>}/>
          <Route path = "/calendar" element = {<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;