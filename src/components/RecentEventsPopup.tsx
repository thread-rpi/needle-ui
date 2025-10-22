import RecentEventCard from './RecentEventCard'
import { useRecentEvents } from "../api/queries";


// props for recentEventsPopup component
interface RecentEventsPopupProps {
  isOpen: boolean; // check if closed/inactive or open/active
}

// recentEventsPopup component
const RecentEventsPopup = ({ isOpen }: RecentEventsPopupProps) => {
   const { data: recentEvents, isLoading, isError, error } = useRecentEvents(isOpen);

  if (!isOpen) {
    return null; 
  }

  if(isLoading){
    return <div>Loading recent events...</div>
  }
  
  if(isError){
    return <div>Error: {error.message}</div>;
  }

  return (
    // render a RecentEventCard component for each recentEvent object retrieved
    <div className="recent-events">
      {recentEvents?.map((recentEvent) => (
        <RecentEventCard
         key={recentEvent.id} 
         title = {recentEvent.title}
         date = {recentEvent.date}
         type = {recentEvent.type} />
      ))}
    </div>
  );
};


export default RecentEventsPopup;