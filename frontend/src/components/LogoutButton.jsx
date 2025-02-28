import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

function LogoutButton() {
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const handleLogout = async () => {
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:8000/auth/token/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get the response body
        console.error("Logout failed:", response.status, errorText);
        throw new Error(`Logout failed: ${response.status} - ${errorText}`);
      }
      localStorage.removeItem("token");
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <div className=" flex flex-col items-center gap-1">
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white p-2 rounded-3xl flex items-center gap-1"
      >
        <IoMdLogOut />
        <span>Logout</span>
      </button>
      {success && (
        <div className="text-green-500 p-4">
          
          Logout Successful !
        </div>
      )}
    </div>
  );
}

export default LogoutButton;
