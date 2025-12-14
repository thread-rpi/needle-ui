import { useAuth } from "../../contexts/useAuth";
// import AdminUser from "../../types/adminTypes";

const AdminHome = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen w-full bg-thread-off-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold text-thread-red">Admin Portal</h1>
        <p className="text-lg text-gray-700">Welcome to the admin dashboard</p>
        {user &&
          (Object.keys(user) as (keyof typeof user)[]).map((key) => (
            <div key={key as string}>
              <h2 className="text-2xl font-bold text-thread-red">{key}</h2>
              <p className="text-lg text-gray-700">{String(user[key])}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminHome;

