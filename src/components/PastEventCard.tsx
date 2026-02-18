import { useState } from "react";
import type { EventType, PastEvent } from "../types/eventTypes";
import { Icon } from "@iconify/react";
import { useViewport } from "../contexts/useViewport";
import { CARD_EXTENSION } from "../helpers/pastEventGrid";

type PastEventCardProps = PastEvent;

const iconTypes: Record<EventType, string> = {
  shoot: "mage:camera-fill",
  internal: "material-symbols:event",
  external: "uil:globe",
};

export const PastEventCard = ({ title, type, date, cover_image_path, location }: PastEventCardProps) => {
  const { isMobile } = useViewport();
  const [isHovered, setIsHovered] = useState(false);
  const showHovered = isMobile ? true : isHovered;
  const coverImageUrl = import.meta.env.VITE_CLOUDFRONT_HOST + cover_image_path;
  return (
    <div
      className={`relative w-full flex flex-col bg-black rounded-4xl overflow-hidden 
        transition-all ease-in-out ${showHovered ? `h-[calc(100%+${CARD_EXTENSION})] duration-200 delay-80` : `h-[calc(100%+0rem)] duration-300 delay-0`} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image: 2:3 ratio */}
      <div className="absolute top-0 left-0 w-full aspect-[3/2] shrink-0">
        <img
          src={coverImageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-t-4xl"
        />
      </div>
      {/* Mask overlay: bottom 50% of image + 40px details area (mask ~42% = 50% of image) */}
      <div
        className={`z-10 absolute w-full aspect-[3/2] shrink-0 bg-black
        [mask-image:linear-gradient(to_bottom,transparent_0%_60%,black_100%)]
        [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%_60%,black_100%)]
        transition-all ${showHovered ? "opacity-100 duration-300 delay-0" : "opacity-0 pointer-events-none duration-200 delay-80"}`}
      />
      {/* Details area: 40px below image */}
      <div 
        className={`relative z-10 shrink-0 h-full flex justify-start items-end px-8 py-5 md:px-15
        transition-all ${showHovered ? "opacity-100 duration-300 delay-0" : "opacity-0 pointer-events-none duration-200 delay-80"}`}
      >
         <div className="flex flex-row justify-start items-center gap-2 text-4xl text-white md:text-[36px]">
          <Icon icon={iconTypes[type.toLowerCase() as EventType]} inline={true} />
          <div className="flex flex-col justify-center items-start gap-0 overflow-clip text-white">
            <h3 className="w-full font-bold text-lg truncate">{title}</h3>
            <p className="text-[10px] md:text-xs text-gray-600 mt-[-0.15rem] md:mt-[-0.24rem]">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {` @ ${location}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
