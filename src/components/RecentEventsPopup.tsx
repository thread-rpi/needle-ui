import RecentEventCard from "./RecentEventCard";
import { useRecentEvents } from "../api/queries.ts";
interface RecentEventsPopupProps {
  isOpen: boolean;
}

export default function RecentEventsPopup({ isOpen }: RecentEventsPopupProps) {



   const { data: recentEvents, isLoading, isError, error } = useRecentEvents(isOpen);
  if (!isOpen) return null;
    if (isLoading) return <div>Loading...</div>;
   if (isError) return <div>Error: {error.message}</div>;

  if (!isOpen) return null;

  // Fixed pixel dimensions from Figma
  const totalStackWidth = 275;
  const middleButtonHeight = 80;
  const otherButtonHeight = 50;

  const buttonGap = 26;

  return (
    <div
      className="fixed z-50"
      style={{
        top: "290px",
        right: "80px",
        width: `${totalStackWidth}px`,
      }}
    >
      {recentEvents?.slice(0, 7).map((event, index) => {
        let isMiddle = false;
        let height = otherButtonHeight;

        if (index === 3) {
          isMiddle = true;
          height = middleButtonHeight;
        }

        let scale = 1.2;

        let bgColor = "bg-black";
        let textColor = "text-white";
        let shadowClass = "";

        if (index > 3) {
          bgColor = "bg-white";
          textColor = "text-black";
        }

        if (isMiddle) {
          bgColor = "bg-[#FF0000]";
          textColor = "text-white";
          shadowClass = "shadow-[0px_-1px_6px_1px_rgba(255,0,0,0.91)]";
          scale = 1.3;
        }

        let marginBottom = "0";
        if (index < 6) {
          marginBottom = `${buttonGap}px`;
        }

        return (
          <button
            key={event.id}
            style={{
              width: `${totalStackWidth}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              marginBottom: marginBottom,
            }}
            className={`flex items-center justify-center rounded-[30.5948px] ${bgColor} ${textColor} ${shadowClass}`}
          >
            {/* OPTIONAL: You can render event.title or RecentEventCard here */}
            <RecentEventCard 
            title={event.title}
            date={event.date}
            type={event.type}
          />
          </button>
        );
      })}
    </div>
  );
}
