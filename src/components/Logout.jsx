import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex items-center space-x-2 text-red-400 bg-gray-700 px-4 py-2 rounded-lg"
    >
      <span>Logout</span>
    </button>
  );
};

export default Logout;
