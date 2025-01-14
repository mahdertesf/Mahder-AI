import React from "react";
import { FaCircleChevronRight } from "react-icons/fa6";
import {Link} from 'react-router-dom'
function SmallNav(props) {
  return (
    <header className="h-screen w-[5%] bg-white z-50 transition-transform duration-300 ">
    <nav >
      <div className="flex flex-col items-center justify-between  border-b-2 py-4 ">
        <img src={props.logo} alt="logo" className="w-16 h-16" />
        <FaCircleChevronRight className="text-2xl " onClick={props.navHandler} />
      </div>
      <ul className="flex flex-col pt-7 pl-7 gap-5">
        {props.nav_elements.map((element) => {
          return (
            <li key={element.name} className="flex items-center gap-3">
              <Link to={element.path} className="text-xl">{element.icon}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
    </header>
  );
}

export default SmallNav;
