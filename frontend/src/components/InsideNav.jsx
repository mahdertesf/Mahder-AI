import React from "react";
import Logo from "../assets/images/logo.png";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Profile from "./Profile";

function InsideNav(props) {
  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b-2 mx-3">
        <div className="flex items-center justify-center gap-3 font-bold text-xl p-2">
          <img src={Logo} alt="logo" className="w-16 h-16" />
          <span className="protest-guerrilla-regular text-blue-500 text-center">
            Mahder Ai
          </span>
        </div>
        <Link>
          <IoChevronBackCircleSharp
            className="text-3xl mr-2"
            onClick={props.navHandler}
          />
        </Link>
      </div>
      <div className="flex flex-col h-full">
        <ul className="flex flex-col pt-7 pl-7 gap-3 pb-5 flex-1">
          {/* you might remove the pb-5 latter when building the login pages and othres */}
          {props.nav_elements.map((element) => {
            return (
              <li key={element.name} className="flex items-center gap-3">
                <span>{element.icon}</span>
                <Link to={element.path}>{element.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className=" bg-white m-2">
          <Profile />
        </div>
      </div>
    </nav>
  );
}

export default InsideNav;
