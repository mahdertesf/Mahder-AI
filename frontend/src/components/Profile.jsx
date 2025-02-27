import { React, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import DummyProfile from "../assets/images/telegramhate/dummy.png";

function Profile() {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("mahder");

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
      <button className="bg-blue-500 text-white p-2 rounded-3xl flex items-center gap-1">
        <IoMdLogOut />
        <span>Logout</span>
      </button>
    </section>
  );
}

export default Profile;
