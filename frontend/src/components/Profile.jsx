import { React, useState, useEffect } from "react";
import DummyProfile from "../assets/images/telegramhate/dummy.png";
import LogoutButton from "../components/LogoutButton";

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
    <section className="flex flex-col items-center gap-1 w-full justify-center">
      <div className="flex flex-col items-center gap-1">
        <img
          src={profilePic || DummyProfile}
          alt="profile"
          className="rounded-full mx-auto bg-blue-600 w-1/3"
        />
        <h1>{userName}</h1>
      </div>
      <LogoutButton />
    </section>
  );
}

export default Profile;
