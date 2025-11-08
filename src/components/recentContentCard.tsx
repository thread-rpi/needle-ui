import { useState } from "react";
import type { EventType } from "../types/eventTypes";
import { Icon } from "@iconify/react";

interface RecentContentCardProps {
  title: string
  type: EventType
  date: string
}

const iconTypes: Record<EventType, string> = {
  shoot: "mage:camera-fill",
  internal: "material-symbols:event",
  external: "uil:globe",
};

export const RecentContentCard = ({ title, type, date }: RecentContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={"w-full h-full  bg-[#818181] rounded-4xl"} 
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}
    >
        <div className={`w-full h-full rounded-4xl mask-t-from-0% mask-t-to-100% bg-black  
          transition-all duration-250 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          flex flex-col justify-end px-15 py-8 text-white`}>
          <div className="flex flex-row justify-start items-center gap-3 w-max h-min overflow-clip">
            <Icon icon={iconTypes[type]} width="36" height="36" color="white" />
            <h3 className="text-[36px] font-bold">{title}</h3>
          </div>
          {/* <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p> */}
        </div>
    </div>
  )
}
