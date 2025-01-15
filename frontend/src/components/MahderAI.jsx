import React from 'react'
import Logo from '../assets/images/logo.png'

function MahderAI() {
  return (
    <section className='flex flex-col pb-28 max-sm:pb-12 bg-gradient-to-t from-yellow-100 to to-blue-100'>
        <img src={Logo} alt="logo" className="w-60 h-60 max-sm:w-20 max-sm:h-20 max-md: "  />
        <h1 className='font-extrabold text-9xl max-sm:text-4xl max-md:text-7xl protest-guerrilla-regular  text-center text-blue-500'>Mahder AI</h1>
    </section>
  )
}

export default MahderAI