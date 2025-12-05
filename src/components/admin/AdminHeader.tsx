export default function AdminHeader() {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-[95%] bg-white rounded-[20px] shadow-lg px-6 py-3 flex items-center justify-between">

        <span className="font-gabarito font-extrabold text-[28px] leading-[34px] text-[#AF1E2D] uppercase">
          NEEDLE
        </span>

        <div className="flex flex-row items-center gap-[5px] w-[197px] h-[34px]">

        <span className="font-extrabold text-[26px] leading-[20px]">
            [role]
        </span>

        <span className="font-extrabold text-[26px] leading-[20px] text-[#AF1E2D]">
            [F_NAME]
        </span>

        </div>


      </div>
    </div>
  );
}
