import { useRecentEvents2 } from "../api/queries";

interface RecentEventsPopupProps {
  isOpen: boolean;
}

export default function RecentEventsPopup({ isOpen }: RecentEventsPopupProps) {
  const { data: recentEvents, isLoading, isError, error } = useRecentEvents2(isOpen);

  if (!isOpen) return null;
  if (isLoading) return <div >Loading...</div>;
  if (isError) return <div >Error: {error.message}</div>;

  // Base dimensions from Figma
  const totalStackWidth = 275; // px
  const middleButtonHeight = 80; // px
  const otherButtonHeight = 50; // px
  const buttonGap = 5; // px

  return (
    <div
      className="fixed flex flex-col z-50"
      style={{
        top: "27.1vh",           // scales with screen height
        right: "1vw",            // small offset from right
        gap: `${(buttonGap / 500) * 100}vh`, // gap scaling
      }}
    >
      {recentEvents?.slice(0, 7).map((event, index) => {
        // Width scales with viewport width
        const widthVW = (totalStackWidth / 1440) * 100; // vw percentage
        const heightVH =
          index === 3
            ? (middleButtonHeight / 900) * 100
            : (otherButtonHeight / 900) * 100;

        // Colors & text
        let bgColor = "bg-black";
        let hoverColor = "hover:bg-gray-800";
        let textColor = "text-white";

        if (index > 3) {
          bgColor = "bg-white";
          hoverColor = "hover:bg-gray-200";
          textColor = "text-black";
        } else if (index === 3) {
          bgColor = "bg-[#FF0000]";
          hoverColor = "hover:bg-[#CC0000]";
          textColor = "text-white";
        }

        return (
          <button
            key={event.id}
            style={{ width: `${widthVW}vw`, height: `${heightVH}vh` }}
            className={`
              flex items-center justify-center
              rounded-full
              ${bgColor} ${hoverColor} ${textColor}
            `}
          >
          </button>
        );
      })}
    </div>
  );
}
