
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-white/35 backdrop-blur-sm">
      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-thread-red/25 border-t-thread-red"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
