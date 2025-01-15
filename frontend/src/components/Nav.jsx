import {React,useState} from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { RiApps2Line } from "react-icons/ri";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MdOutlineEmail } from "react-icons/md";

import Logo from '../assets/images/logo.png'
import BigNav from './BigNav'
import SmallNav from './SmallNav'




function Nav() {

    const [showBigNav, setShowBigNav] = useState(true);
    
    const navHandler=()=>{
        setShowBigNav(!showBigNav)
    }

  const nav_elements = [
    { name: "Home", path: "/", icon: <AiOutlineHome /> },
    { name: "Apps", path: "/apps", icon: <RiApps2Line /> },
    { name: "About", path: "/about", icon: <RxQuestionMarkCircled /> },
    { name: "Contact", path: "/contact", icon: <MdOutlineEmail /> },
  ];
  return (
    
        showBigNav ?(
           
             <BigNav nav_elements={nav_elements} navHandler={navHandler} />
      
          
        ) :(
            <SmallNav nav_elements={nav_elements} logo={Logo} navHandler={navHandler}/>
        )
   
  );
}

export default Nav;
