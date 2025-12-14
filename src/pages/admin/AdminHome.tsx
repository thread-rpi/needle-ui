import { useAuth } from "../../contexts/useAuth";
// import AdminUser from "../../types/adminTypes";

const AdminHome = () => {
  const { user } = useAuth();
  
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold text-thread-red">Admin Home</h1>
        {user &&
          (Object.keys(user) as (keyof typeof user)[]).map((key) => (
            <div className="w-max flex flex-col items-center justify-start" key={key as string}>
              <div className="text-2xl font-bold text-thread-red w-max">{key}</div>
              <div className="text-lg text-gray-700 w-max">{String(user[key])}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminHome;

