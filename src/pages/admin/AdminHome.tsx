import { Icon } from "@iconify/react";

const AdminHome = () => {
  return (
    <div className="w-full max-w-7xl min-h-dvh pt-18 md:pt-27 px-6 md:px-11 mx-auto flex flex-col items-center justify-start">
      <div className="w-full flex flex-row items-center gap-5 lg:pt-27">
        <div className="text-3xl font-extrabold ml-3.5 md:ml-6">EVENTS</div>
        <button className="flex items-center gap-1 bg-thread-red  text-white font-bold px-4 h-[40px] rounded-2xl shadow-[0px_5px_10px_rgba(0,0,0,0.25)]">
          <Icon icon="gridicons:dropdown" width="24px" height="24px" color='white'/>
          <div className="text-xl font-bold whitespace-nowrap">F25</div>
        </button>
      </div>
    </div>
  );
};

export default AdminHome;