import AdminHeader from "../../components/admin/AdminHeader";
import dropdown from "../../assets/dropdown.svg"
export default function AdminHome() {
  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <AdminHeader />

      <div className="px-10 pt-10">
        <div className="flex items-center gap-5 ml-10">
          <h1 className="font-gabarito font-weight: 900 text-[26px] font-extrabold ml-6">EVENTS</h1>
      <button
        className="
            flex items-center gap-[6px]
            bg-[#AF1E2D]
            text-white font-bold
            px-4 h-[40px]
            rounded-full
            shadow-[0px_5px_10px_rgba(0,0,0,0.25)]
        "
        >
        <img 
            src={dropdown} 
            alt="dropdown"
            className="w-[24px] h-[24px]"
        />

        <span className="font-gabarito font-weight: 700 text-[20px]">F25</span>
        </button>



        </div>
      </div>
    </div>
  );
}
