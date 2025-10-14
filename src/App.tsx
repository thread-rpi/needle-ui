import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './AboutUs';
import Root from './Root';
import Features from './Features';
import Publications from "./Publications";
import Calendar from "./Calendar";
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const QUERY_STALE_TIME = 1000 * 60 * 30; // Data is 'fresh' for 30 mins
  const QUERY_GC_TIME = 1000 * 60 * 90; // Unused queries are garbage collected after 90 mins

  // Query client initalization
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME, // Data is considered fresh for 5 minutes
        gcTime: QUERY_GC_TIME, // Inactive queries are garbage collected after 1 hour
        refetchOnWindowFocus: true,
        retry: 2,
      },
      mutations: {
        // Default options for mutations...
      },
    },
  })


  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <BrowserRouter>
        <nav className = "flex justify-end gap-4 p-4">
          <Link to="/aboutUs">About Us </Link>
          <Link to = "/features">Features </Link>
          <Link to = "publications">Publications </Link>
          <Link to = "calendar">Calendar</Link>
        </nav>
        <Routes>
          <Route path="/aboutUs" element={<About />} />
          <Route path="/" element={<Root />} />
          <Route path = "/features" element = {<Features/>}/>
          <Route path = "/publications" element = {<Publications/>}/>
          <Route path = "/calendar" element = {<Calendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;