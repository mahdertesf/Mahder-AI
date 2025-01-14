import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <header>
        <nav>
            <ul className='flex flex-col'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/apps'>Apps</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </nav> 
    </header>
  )
}

export default Nav