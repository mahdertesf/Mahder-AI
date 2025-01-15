import {useState} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import InsideNav from "./InsideNav";
import { Link } from "react-router-dom";

function MobileNav(props) {
  const [showNav,setShowBigNav]=useState(false)

  const handleClick=()=>{
    setShowBigNav(!showNav)
  }
  
  return (
    <header className="absolute top-0 right-0  z-50 bg-white md:hidden">
      {
        !showNav ? (
          <Link><RxHamburgerMenu onClick={handleClick} nav_elements={props.nav_elements} className='m-3 text-3xl' /></Link>
    
        ) :(
          <InsideNav nav_elements={props.nav_elements} navHandler={handleClick} />
        )
      }
    </header>
  );
}

export default MobileNav;
