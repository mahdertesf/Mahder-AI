import {React,useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiApps2Line } from "react-icons/ri";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import Logo from '../assets/images/logo.png'


function BigNav(props) {


  
  return (
    <header className="h-screen w-1/6 bg-white z-50 ">
      <nav >
        <div className="flex items-center justify-between  border-b-2 mx-3">
          <div className="flex items-center justify-center gap-3 font-bold text-xl p-2">
            <img src={Logo} alt="logo" className="w-16 h-16" />
            <span>Mahder Ai</span>
          </div>
          <IoChevronBackCircleSharp className="text-3xl mr-2" onClick={props.navHandler}/>
        </div>
        <ul className="flex flex-col pt-7 pl-7 gap-3">
          {props.nav_elements.map((element) => {
            return (
              <li key={element.name} className="flex items-center gap-3">
                <span>{element.icon}</span>
                <Link to={element.path}>{element.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </header>
    
  );
}

export default BigNav;
