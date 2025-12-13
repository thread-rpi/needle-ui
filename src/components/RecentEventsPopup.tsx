import { useEffect } from "react";
import RecentEventCard, { RecentEventType } from "./RecentEventCard";

export interface RecentEventsPopupProps {
  isOpen: boolean;
  onClose?: () => void;
}

/** Mock data until backend connected */
const MOCK = [
  { id: "1", title: "Mono Businesswear", date: "17 Days Ago", type: "photo" as RecentEventType },
  { id: "2", title: "Fit Wars", date: "8 Days Ago", type: "question" as RecentEventType },
  { id: "3", title: "Ebony Ball", date: "1 Day Ago", type: "party" as RecentEventType },
  { id: "4", title: "Free @ Union", date: "TODAY", type: "photo" as RecentEventType },
  { id: "5", title: "General Body", date: "In 2 Days", type: "meeting" as RecentEventType },
  { id: "6", title: "Student Council @ JEC", date: "In 11 Days", type: "meeting" as RecentEventType },
  { id: "7", title: "Rep Ya Flag", date: "23 Days Ago", type: "question" as RecentEventType },
];

export default function RecentEventsPopup({ isOpen, onClose }: RecentEventsPopupProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-[20px]"
      style={{ top: "289px", right: "62px" }}
      role="dialog"
      aria-label="Recent events"
    >
      {MOCK.map((event, index) => {
        const tone = index === 3 ? "highlight" : index > 3 ? "light" : "dark";
        const size = index === 3 ? "lg" : "sm";

        return (
          <div key={event.id} className={index === 3 ? "" : "mr-[24px]"}>
            <RecentEventCard
              title={event.title}
              date={event.date}
              type={event.type}
              tone={tone}
              size={size}
              onClick={() => {
                // Later: navigate to event page
                // For now: just close if provided
                onClose?.();
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
