


export type RecentEvent = {
  title: string;
  date: string;
  type: string;
};

export interface RecentEventCardProps {
  title: string;
  date: string;
  type: string;
}


// Determine if this event is older → use lighter font
function isOlder(date: string) {
  return date.toLowerCase().includes("days ago");
}

const RecentEventCard = ({ title, date, type }: RecentEventCardProps) => {
  const older = isOlder(date);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-3 w-[200px] pl-8">


        <div className="flex flex-col leading-tight text-left">
          <span
            className={`text-[15px] leading-tight ${
              older ? "font-semibold" : "font-bold"
            }`}
          >
            {title}
          </span>

          <span className="text-[11px] opacity-80 leading-tight mt-[2px]">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentEventCard;