import { React, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiApps2Line } from "react-icons/ri";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdOutlineEmail } from "react-icons/md";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import Logo from "../assets/images/logo.png";
import MobileNav from "./MobileNav";
import InsideNav from "./InsideNav";

function BigNav(props) {
  return (
    <>
      <header className="h-screen w-auto bg-white z-50 max-md:hidden">
      <InsideNav nav_elements={props.nav_elements} navHandler={props.navHandler}  />
        
      </header>
      <MobileNav nav_elements={props.nav_elements} navHandler={props.navHandler}  />
    </>
  );
}

export default BigNav;
