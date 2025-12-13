// src/components/RecentEventCard.tsx

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

/**
 * RecentEventCard
 * - Supports tones: dark/light/highlight
 * - Supports sizes: sm/lg
 * - Accessible focus styles + aria-label when clickable
 */
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

  const dimensions = size === "lg" ? "h-[80px] w-[275px]" : "h-[50px] w-[250px]";
  const radius = "rounded-[28.59px]";

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

  const subText = tone === "dark" ? "text-[#D9D9D9]" : tone === "highlight" ? "text-white/85" : "text-black/90";

  const titleClass = size === "lg" ? "text-[20px] font-extrabold" : "text-[14px] font-extrabold";
  const dateClass = size === "lg" ? "text-[12px] font-bold" : "text-[8px] font-normal";

  const base = cx(
    "flex items-center gap-[20px] px-[36px] text-left transition",
    dimensions,
    radius,
    surface,
    hover,
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AF1E2D]",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {icon ?? <DefaultIcon type={type} tone={tone} />}
      <span className="min-w-0 leading-none">
        <span className={cx("block truncate", titleClass)}>{title}</span>
        <span className={cx("mt-[6px] block truncate", dateClass, subText)}>{date}</span>
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
