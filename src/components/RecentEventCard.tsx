import React from "react";

/** Allowed event types (drives icon/styling). */
export type RecentEventType = "photo" | "question" | "party" | "meeting";

/** Visual tone variants (matches Figma: black cards, white cards, red highlight). */
export type RecentEventTone = "dark" | "light" | "highlight";

/** Size variants (Figma uses 50px rows and one 80px row). */
export type RecentEventSize = "sm" | "lg";

export interface RecentEventCardProps {
  /** Primary label shown on the card. */
  title: string;
  /** Secondary label, e.g. "17 Days Ago", "TODAY", "In 2 Days". */
  date: string;
  /** Event type (used for icon + semantics). */
  type: RecentEventType;

  /** Optional visual variants. */
  tone?: RecentEventTone;
  size?: RecentEventSize;

  /** Interaction. If set, renders a button. */
  onClick?: () => void;
  disabled?: boolean;

  /** Styling escape hatch. */
  className?: string;

  /** Override icon. */
  icon?: React.ReactNode;
}

function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

function DefaultIcon({ type, tone }: { type: RecentEventType; tone: RecentEventTone }) {
  const glyph = type === "photo" ? "📷" : type === "meeting" ? "🗓️" : type === "question" ? "❓" : "🎉";
  return (
    <span
      aria-hidden
      className={cx(
        "grid h-[35px] w-[35px] place-items-center rounded-[10px]",
        tone === "light" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {glyph}
    </span>
  );
}



// src/components/RecentEventCard.tsx

export type RecentEventType = "photo" | "question" | "party" | "meeting";
export type RecentEventTone = "dark" | "light" | "highlight";
export type RecentEventSize = "sm" | "lg";

export interface RecentEventCardProps {
  /** Primary label shown on the card */



export type RecentEvent = {
  title: string;
  date: string;
  type: string;
};

export interface RecentEventCardProps {
  title: string;
  /** Secondary label (e.g. "17 Days Ago", "TODAY", "In 2 Days") */
  date: string;
  /** What kind of event this is (drives icon selection) */
  type: RecentEventType;

  /** Visual variant */
  tone?: RecentEventTone;
  size?: RecentEventSize;

  /** Click behavior */
  onClick?: () => void;
  disabled?: boolean;

  /** Styling escape hatch */
  className?: string;

  /** Override the icon */
  icon?: React.ReactNode;
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function DefaultIcon({ type, tone }: { type: RecentEventType; tone: RecentEventTone }) {
  // simple emoji placeholders—swap with SVG later
  const glyph = type === "photo" ? "📷" : type === "meeting" ? "🗓️" : type === "question" ? "❓" : "🎉";

  // this approximates that with a rounded square container.
  return (
    <span
      aria-hidden
      className={cx(
        "grid h-[35px] w-[35px] place-items-center rounded-[10px]",
        tone === "dark" || tone === "highlight" ? "bg-white/95 text-black" : "bg-black text-white"
      )}
    >
      {glyph}
    </span>
  );
}

export default function RecentEventCard({
  title,
  date,
  type,
  tone = "dark",
  size = "sm",
  onClick,
  disabled = false,
  className,
  icon,
}: RecentEventCardProps) {
  const isButton = typeof onClick === "function";

  const heightClass = size === "lg" ? "h-[80px] w-[275px]" : "h-[50px] w-[250px]";
  const radiusClass = "rounded-[28.59px]";

  const surface =
    tone === "highlight"
      ? "bg-[linear-gradient(90deg,rgba(255,0,0,0.73)_32%,rgba(255,255,255,0.73)_100%)] bg-red-600 text-white shadow-[0_-1px_6px_1px_rgba(255,0,0,0.91)]"
      : tone === "dark"
      ? "bg-black text-white"
      : "bg-white text-black";

  const hover =
    disabled
      ? ""
      : tone === "highlight"
      ? "hover:brightness-95"
      : tone === "dark"
      ? "hover:bg-neutral-900"
      : "hover:bg-neutral-100";

  const subText =
    tone === "dark" ? "text-[#D9D9D9]" : tone === "highlight" ? "text-white/85" : "text-black/90";

  const titleSize = size === "lg" ? "text-[20px] font-extrabold" : "text-[14px] font-extrabold";
  const dateSize = size === "lg" ? "text-[12px] font-bold" : "text-[8px] font-normal";

  const base = cx(
    "flex items-center gap-[20px] px-[36px] text-left",
    heightClass,
    radiusClass,
    surface,
    hover,
    "transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AF1E2D]",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {icon ?? <DefaultIcon type={type} tone={tone} />}
      <span className="min-w-0 leading-none">
        <span className={cx("block truncate", titleSize)}>{title}</span>
        <span className={cx("mt-[6px] block truncate", dateSize, subText)}>{date}</span>
      </span>
    </>
  );

  if (isButton) {
    return (
      <button
        type="button"
        className={base}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label={`${title} — ${date}`}
      >
        {content}
      </button>
    );
  }

  return <div className={base}>{content}</div>;
}

// Determine if this event is older → use lighter  font
function isOlder(date: string) {
  return date.toLowerCase().includes("days ago");
}

const RecentEventCard = ({ title, date }: RecentEventCardProps) => {
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