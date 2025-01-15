import { React, useState } from "react";
import { Link } from "react-router-dom";

import MobileNav from "./MobileNav";
import InsideNav from "./InsideNav";

function BigNav(props) {
  return (
    <>
      <header className=" bottom-0  w-auto bg-white z-50 max-md:hidden ">
      <InsideNav nav_elements={props.nav_elements} navHandler={props.navHandler}  />
        
      </header>
      <MobileNav nav_elements={props.nav_elements} navHandler={props.navHandler}  />
    </>
  );
}

export default BigNav;
