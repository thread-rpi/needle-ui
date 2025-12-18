import RecentEventCard from './RecentEventCard'
import { useEventOverview } from "../api/queries";


// props for recentEventsPopup component
interface RecentEventsPopupProps {
  isOpen: boolean; // check if closed/inactive or open/active
}

// recentEventsPopup component
const RecentEventsPopup = ({ isOpen }: RecentEventsPopupProps) => {
   const { data: eventOverview, isLoading, isError, error } = useEventOverview(isOpen);

  if (!isOpen) {
    return null; 
  }

  if(isLoading){
    return <div>Loading event overview...</div>
  }
  
  if(isError){
    return <div>Error: {error.error}</div>;
  }

  return (
    // render a RecentEventCard component for each event object retrieved
    <div className="recent-events">
      {eventOverview?.map((event) => (
        <RecentEventCard
         key={event.id} 
         title = {event.title}
         date = {event.date}
         type = {event.type} />
      ))}
    </div>
  );
};


export default RecentEventsPopup;