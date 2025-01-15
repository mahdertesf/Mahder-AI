import React from 'react'
import Logo from '../assets/images/logo.png'
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function InsideNav(props) {
  return (
    <nav className="">
          <div className="flex items-center justify-between border-b-2 mx-3">
            <div className="flex items-center justify-center gap-3 font-bold text-xl p-2">
              <img src={Logo} alt="logo" className="w-16 h-16" />
              <span className='protest-guerrilla-regular text-blue-500'>Mahder Ai</span>
            </div>
            <Link><IoChevronBackCircleSharp
              className="text-3xl mr-2"
              onClick={props.navHandler}
            /></Link>
          </div>
          <ul className="flex flex-col pt-7 pl-7 gap-3 pb-5">  
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
        </nav>
  )
}

export default InsideNav