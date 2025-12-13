// src/components/RecentEventCard.tsx

import React from "react";

/**
 * RecentEventCard types
 *
 * These are intentionally small unions so:
 * - styling / icon behavior stays predictable
 * - TypeScript catches invalid values early
 * - backend integration can be validated against a known contract
 */

/** Allowed event types (drives icon + semantics). */
export type RecentEventType = "photo" | "question" | "party" | "meeting";

/**
 * Visual tone variants (matches Figma):
 * - dark: black background with white text
 * - light: white background with black text
 * - highlight: red gradient treatment for “TODAY” / featured item
 */
export type RecentEventTone = "dark" | "light" | "highlight";

/**
 * Size variants (Figma uses two row heights):
 * - sm: 250×50
 * - lg: 275×80 (featured row)
 */
export type RecentEventSize = "sm" | "lg";

/**
 * Props for the RecentEventCard component.
 *
 * The card supports both “display-only” and “clickable” modes:
 * - If `onClick` is provided, it renders a <button> (accessible)
 * - Otherwise it renders a <div>
 */
export interface RecentEventCardProps {
  /** Primary label shown on the card. */
  title: string;

  /** Secondary label (relative time / status), e.g. "17 Days Ago", "TODAY". */
  date: string;

  /** Event type (used for icon selection + future semantics). */
  type: RecentEventType;

  /** Optional visual variants. */
  tone?: RecentEventTone;
  size?: RecentEventSize;

  /**
   * Interaction:
   * If set, the card becomes a <button> and can be keyboard focused/activated.
   */
  onClick?: () => void;

  /** Disables hover/click + dims the card. */
  disabled?: boolean;

  /** Styling escape hatch for one-off tweaks. */
  className?: string;

  /** Override the icon node (useful when swapping emoji placeholders for SVG). */
  icon?: React.ReactNode;
}

/**
 * Tiny className helper.
 * Keeps JSX readable for Tailwind-heavy components.
 */
function cx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * DefaultIcon
 *
 * Placeholder icon implementation:
 * - currently uses emoji glyphs
 * - later can be replaced with SVG components without changing card logic
 *
 * The tone controls the icon container colors to match the card contrast.
 */
function DefaultIcon({ type, tone }: { type: RecentEventType; tone: RecentEventTone }) {
  const glyph = type === "photo" ? "📷" : type === "meeting" ? "🗓️" : type === "question" ? "❓" : "🎉";

  return (
    <span
      aria-hidden
      className={cx(
        // Rounded square icon block like the Figma export
        "grid h-[35px] w-[35px] place-items-center rounded-[10px]",
        // Contrast: light cards get dark icon block; dark/highlight cards get light icon block
        tone === "light" ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {glyph}
    </span>
  );
}

/**
 * RecentEventCard
 *
 * Summary:
 * - Supports tones: dark / light / highlight
 * - Supports sizes: sm / lg
 * - If clickable, renders as <button> with an aria-label
 *
 * Accessibility:
 * - focus-visible ring for keyboard users
 * - button semantics when interactive
 *
 * Notes:
 * - Dimensions and radius are hard-coded to match the Figma mock precisely.
 * - Later, these can be moved into shared design tokens (CSS vars/constants).
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
  /**
   * If an onClick is provided, we treat this as an interactive control.
   * Otherwise it’s purely presentational.
   */
  const isButton = typeof onClick === "function";

  /**
   * Figma sizing:
   * - sm => 250×50
   * - lg => 275×80
   */
  const dimensions = size === "lg" ? "h-[80px] w-[275px]" : "h-[50px] w-[250px]";

  /** Exact radius pulled from Figma export. */
  const radius = "rounded-[28.59px]";

  /**
   * Background + shadow styles:
   * - highlight uses a gradient + red glow (matches the featured row)
   * - dark/light are plain fills
   */
  const surface =
    tone === "highlight"
      ? "bg-[linear-gradient(90deg,rgba(255,0,0,0.73)_32%,rgba(255,255,255,0.73)_100%)] bg-red-600 text-white shadow-[0_-1px_6px_1px_rgba(255,0,0,0.91)]"
      : tone === "dark"
      ? "bg-black text-white"
      : "bg-white text-black";

  /**
   * Hover interactions:
   * Disabled cards do not apply hover styles.
   * (This keeps hover state aligned with the disabled cursor/opacity.)
   */
  const hover =
    disabled
      ? ""
      : tone === "highlight"
      ? "hover:brightness-95"
      : tone === "dark"
      ? "hover:bg-neutral-900"
      : "hover:bg-neutral-100";

  /**
   * Subtext color per tone.
   * - dark: grey subtitle
   * - highlight: white w/ opacity
   * - light: black w/ opacity
   */
  const subText =
    tone === "dark" ? "text-[#D9D9D9]" : tone === "highlight" ? "text-white/85" : "text-black/90";

  /** Title/subtitle typography follows mock: lg is bigger and bolder. */
  const titleClass = size === "lg" ? "text-[20px] font-extrabold" : "text-[14px] font-extrabold";
  const dateClass = size === "lg" ? "text-[12px] font-bold" : "text-[8px] font-normal";

  /**
   * Base layout:
   * - spacing/px values mirror the mock
   * - focus-visible outline makes keyboard navigation obvious
   */
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

  /**
   * Shared content for both button and div variants.
   * `truncate` prevents long titles from breaking the layout.
   */
  const content = (
    <>
      {icon ?? <DefaultIcon type={type} tone={tone} />}
      <span className="min-w-0 leading-none">
        <span className={cx("block truncate", titleClass)}>{title}</span>
        <span className={cx("mt-[6px] block truncate", dateClass, subText)}>{date}</span>
      </span>
    </>
  );

  // Interactive variant => button semantics + aria-label for screen readers.
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

  // Non-interactive variant => render a div for layout-only display.
  return <div className={base}>{content}</div>;
}
