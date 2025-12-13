import { useEffect } from "react";
import RecentEventCard, { RecentEventType } from "./RecentEventCard";

/**
 * Props for the RecentEventsPopup.
 *
 * `isOpen` controls whether the popup is rendered.
 * `onClose` is called when the user dismisses the popup (e.g., Escape key or clicking an item).
 */
export interface RecentEventsPopupProps {
  /** Whether the popup should be visible. */
  isOpen: boolean;

  /** Called when the popup should close (Escape, item click, etc.). */
  onClose?: () => void;
}

/**
 * Temporary mock data until the backend is connected.
 *
 * Notes:
 * - `RecentEventType` is asserted to keep strict typing even with hard-coded data.
 * - This matches the “stacked rail” layout from the Figma mock.
 * - Replace this with fetched data when an endpoint is available.
 */
const MOCK: Array<{ id: string; title: string; date: string; type: RecentEventType }> = [
  { id: "1", title: "Mono Businesswear", date: "17 Days Ago", type: "photo" },
  { id: "2", title: "Fit Wars", date: "8 Days Ago", type: "question" },
  { id: "3", title: "Ebony Ball", date: "1 Day Ago", type: "party" },
  { id: "4", title: "Free @ Union", date: "TODAY", type: "photo" },
  { id: "5", title: "General Body", date: "In 2 Days", type: "meeting" },
  { id: "6", title: "Student Council @ JEC", date: "In 11 Days", type: "meeting" },
  { id: "7", title: "Rep Ya Flag", date: "23 Days Ago", type: "question" },
];

/**
 * RecentEventsPopup
 *
 * Renders a “recent events” rail (bottom-right) matching the Figma layout:
 * - First 3 cards are dark
 * - 4th card is highlighted + larger
 * - Remaining cards are light
 *
 * Accessibility:
 * - Uses `role="dialog"` and closes on Escape.
 *
 * Future work:
 * - Replace MOCK with backend data.
 * - Add click-outside / backdrop support.
 * - Add real navigation on card click.
 */
export default function RecentEventsPopup({ isOpen, onClose }: RecentEventsPopupProps) {
  /**
   * Close the popup on Escape key.
   *
   * We only attach the event listener while `isOpen` is true to avoid:
   * - unnecessary listeners
   * - unintended closures when the popup is not visible
   */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // When closed, render nothing (keeps DOM clean and prevents focus issues).
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-[20px]"
      // Hard-coded positioning to match the Figma export.
      // This can be made responsive later.
      style={{ top: "289px", right: "62px" }}
      role="dialog"
      aria-label="Recent events"
    >
      {MOCK.map((event, index) => {
        /**
         * Figma styling rules:
         * - index 0..2 => dark
         * - index 3    => highlight + large
         * - index 4..  => light
         */
        const tone = index === 3 ? "highlight" : index > 3 ? "light" : "dark";
        const size = index === 3 ? "lg" : "sm";

        // Slight horizontal offset on non-highlight cards (matches mock alignment).
        const offsetClass = index === 3 ? "" : "mr-[24px]";

        return (
          <div key={event.id} className={offsetClass}>
            <RecentEventCard
              title={event.title}
              date={event.date}
              type={event.type}
              tone={tone}
              size={size}
              onClick={() => {
                /**
                 * Placeholder behavior:
                 * - Later: navigate to a detail view / calendar entry
                 * - For now: clicking a card closes the popup (if provided)
                 */
                onClose?.();
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
