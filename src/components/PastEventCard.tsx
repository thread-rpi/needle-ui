import { useState } from "react";
import type { EventType } from "../types/eventTypes";
import { Icon } from "@iconify/react";

interface PastEventCardProps {
  title: string;
  type: EventType;
  date: string;
  cover_image_path: string;
}

const iconTypes: Record<EventType, string> = {
  shoot: "mage:camera-fill",
  internal: "material-symbols:event",
  external: "uil:globe",
};

export const PastEventCard = ({ title, type, date, cover_image_path }: PastEventCardProps) => {
  const [isHovered, setIsHovered] = useState(true);
  const coverImageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + cover_image_path;
  console.log(coverImageUrl);
  return (
    <div className={"relative w-full h-full bg-[#818181] rounded-4xl overflow-hidden"} 
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}
    >
      <img src={coverImageUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover rounded-4xl" />
      <div className={`z-10 w-full h-full rounded-4xl mask-t-from-0% mask-t-to-100% bg-black  
        transition-all duration-250 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        flex flex-col justify-end px-12 py-6 text-white
        md:px-15 md:py-8 `}>
        <div className="flex flex-col justify-center items-start gap-1 w-max h-min overflow-clip">
          <div className="flex flex-row justify-start items-center gap-2 text-xl md:text-[36px]">
            <Icon icon={iconTypes[type.toLowerCase() as EventType]} inline={true}/>
            <h3 className="font-bold">
              {title}
            </h3>
          </div>
          {/* <div className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center text-[90px]">
            <Icon icon={iconTypes[type.toLowerCase() as EventType]} inline={true}/>
          </div> */}
          <div className="flex flex-col justify-start items-start gap-1">
            {/* <h3 className="text-xl md:text-[36px] font-bold">{title}</h3> */}
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
