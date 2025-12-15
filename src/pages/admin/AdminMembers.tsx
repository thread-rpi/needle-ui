import { Icon } from "@iconify/react";

const AdminMembers = () => {
  return (
    <div className="w-full max-w-7xl min-h-dvh pt-27 px-11 mx-auto flex flex-col items-center justify-start">
        <div className="w-full flex flex-row items-center gap-5">
          <div className="text-3xl font-extrabold ml-6">MEMBERS</div>
          <button className="flex items-center gap-[6px] bg-thread-red  text-white font-bold px-4 h-[40px] rounded-2xl shadow-[0px_5px_10px_rgba(0,0,0,0.25)]">
            <Icon icon="gridicons:dropdown" width="24px" height="24px" color='white'/>
            <div className="text-xl font-bold">25 - 26</div>
          </button>
          </div>
      </div>
  );
};

export default AdminMembers;