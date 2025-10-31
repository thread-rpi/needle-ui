import { useRecentEvents } from "../api/queries";

// props for recentEventsPopup component
interface RecentEventsPopupProps {
  isOpen: boolean; // check if closed/inactive or open/active
}

// recentEventsPopup component
const RecentEventsPopup = ({ isOpen }: RecentEventsPopupProps) => {
   const {isLoading, isError} = useRecentEvents(isOpen);

  if (!isOpen) {
    return null; 
  }

  if(isLoading){
    //return <div>Loading recent events...</div>
  }
  
  if(isError){
    //return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    </div>
  );
};


export default RecentEventsPopup;



