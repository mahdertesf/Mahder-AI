import React from "react";
import { FaCircleChevronRight } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import MobileNav from "./MobileNav";

function SmallNav(props) {
  return (<>
  <header className=" w-[9%] lg:w-[6%] bg-white z-50 transition-transform duration-300 max-md:hidden ">
    <nav >
      <div className="flex flex-col items-center justify-between  border-b-2 py-4 ">
        <img src={props.logo} alt="logo" className="w-16 h-16" />
        <Link><FaCircleChevronRight className="text-2xl " onClick={props.navHandler} /></Link>
      </div>
      <ul className="flex flex-col items-center justify-center pt-7 mx-6 gap-5 ">
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
    <MobileNav nav_elements={props.nav_elements} navHandler={props.navHandler}  />
  </>
    
  );
}

export default SmallNav;
