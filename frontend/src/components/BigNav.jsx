import { React, useState } from "react";
import { Link } from "react-router-dom";
import  Profile from "./Profile";

import MobileNav from "./MobileNav";
import InsideNav from "./InsideNav";

function BigNav(props) {
  return (
    <>
      <header className=" bottom-0 h-screen lg:w-[25%] md:w-[40%] bg-white  max-md:hidden ">
        <InsideNav
          nav_elements={props.nav_elements}
          navHandler={props.navHandler}
        />
        <div className="self-end">
        
        </div>
      </header>
      <MobileNav
        nav_elements={props.nav_elements}
        navHandler={props.navHandler}
      />
   
    </>
  );
}

export default BigNav;
