import { useState } from "react";
import RecentEventsPopup from "../components/RecentEventsPopup";

export default function Recent() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-200 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold">Recent Events (Demo)</h1>
        <button
          className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:bg-neutral-900"
          onClick={() => setOpen(true)}
        >
          Open Popup
        </button>

        <RecentEventsPopup isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
