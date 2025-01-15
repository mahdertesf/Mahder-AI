import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import MahderAI from "../components/MahderAI";
import { CgWebsite } from "react-icons/cg";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Contact() {

  const contacts=[
    {
      icon:<CgWebsite />,
      text:'Portfolio-Website',
      link:'https://mahder-tesfaye.netlify.app',
      color:'text-blue-500'
    },
    {
      icon:<MdOutlineMailOutline />,
      text:'Email',
      link:'mailto:mahdertesfaye11@gmail.com',
      color:'text-red-500'
    },
    
    {
      icon: <FaGithub />,
      text: 'Github',
      link: 'https://github.com/mahdertesf',
      color:'text-black'
    },
    {
      icon: <FaLinkedin />,
      text: 'LinkedIn',
      link: 'https://www.linkedin.com/in/mahder-tesfaye-abebe-396095327/',
      color:'text-blue-800'
    },
    {
      icon: <FaXTwitter />,
      text: 'X',
      link: 'https://x.com/mahtesfayeabebe',
      color:'text-black-500'
    }

  ]
  return (

    <main className="w-[100vw] h-full flex flex-col items-center justify-center mt-4 bg-blue-100">
      <section className="felx felx-col justify-center items-center m-3 mt-10 gap-10 border-2 w-full h-auto p-5 ">
        <MahderAI />
        <div className="text-center font-bold text-4xl my-4 pt-4 ">
          Get in Touch
        </div>
        <div className="text-center italic text-lg ">
          {" "}
          Have questions or suggestions I would love to hear from you.
        </div>
        <div className="flex felx-col justify-center items-center mt-12 ">
          <form className="flex flex-col gap-5 bg-white rounded-lg p-9 w-full h-auto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlfor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="What is it about?"
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlfor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Your message here ..."
                className="border p-2 rounded-lg"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <button type="submit" className="bg-yellow-500 rounded-lg p-3">
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap m-7 gap-16 justify-center items-center ">
          {contacts.map((contact)=>{
            return(
              <div className=" flex text-center flex-col gap-5 items-center justify-center w-60 h-44 border-2 p-5  bg-white rounded-xl hover:shadow-2xl">
              <div className={`${contact.color}`}><a href={contact.link}>{contact.icon}</a></div>
            
              <div><a href={contact.link}>{contact.text}</a></div>
              </div>
            )
          })}

        </div>
      </section>
    </main>
  );
}

export default Contact;
