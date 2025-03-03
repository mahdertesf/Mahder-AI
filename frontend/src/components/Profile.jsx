import { React, useState, useEffect } from "react";
import DummyProfile from "../assets/images/telegramhate/dummy.png";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "./LoginButton";

function Profile() {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/userprofile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("could not get profile");
      }
      const data = await response.json();
      setProfilePic(data.photo);
      setUserName(data.username);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  return (
    <>
      {token ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={profilePic ? profilePic : DummyProfile}
            alt="profile"
            className="w-24 h-24 rounded-full"
          />
          <span className="text-blue-500 text-lg">{userName}</span>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default Profile;
