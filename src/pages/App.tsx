import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './AboutUs';
import Root from './Root';
import Features from './Features';
import Publications from "./Publications"
import Calendar from "./Calendar"
import '../index.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/aboutUs" element={<About />} />
          <Route path="/" element={<Root />} />
          <Route path = "/features" element = {<Features/>}/>
          <Route path = "/publications" element = {<Publications/>}/>
          <Route path = "/calendar" element = {<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;