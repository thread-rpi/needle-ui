export default function AdminHeader() {
  
  return (
    <div className="w-full fixed top-5.5 left-0 z-200 flex justify-center">
      <div className="w-[93%] h-14 bg-white rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
        <div className="font-extrabold text-2xl text-thread-red uppercase">NEEDLE</div>
        <div className="flex flex-row items-end gap-1.5 w-auto">
          <div className="font-bold text-lg align-text-bottom"> executive director </div>
          <div className="font-extrabold text-2xl text-thread-red"> Pierce </div>
        </div>
      </div>
    </div>
  );
}
