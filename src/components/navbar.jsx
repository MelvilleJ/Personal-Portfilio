import logo1 from "../assets/jm.png";
import logo2 from "../assets/jm-black.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NAVBAR({ name }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const currentPath = window.location.pathname;
  const controlNavbar = () => {
    const currentScroll = window.scrollY;
    setAtTop(currentScroll === 0);

    if (currentScroll > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setLastScrollY(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full max-w-screen z-50 transition-all duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        atTop
          ? "bg-transparent"
          : "bg-black bg-opacity-80 shadow-2xl  backdrop-blur"
      }`}
    >
      <div className="container mx-auto p-4 flex justify-between items-center">
        <a href="/home">
          <img src={logo1} alt="Logo" className="h-10 w-10 rounded-full" />
        </a>
        <ul className={`flex gap-6 text-white`}>
          <li>
            <a
              href="#about"
              className={
                currentPath === "/projects"
                  ? "hidden disabled"
                  : "hover:underline"
              }
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className={
                currentPath === "/projects" ? "hidden" : "hover:underline"
              }
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={
                currentPath === "/projects" ? "hidden" : "hover:underline"
              }
            >
              Contact
            </a>
          </li>
          {/* <li>
            <a
              href="/leslie"
              className={
                "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              }
            >
              Meet Leslie!
            </a>
          </li> */}
          <li>
            <a
              href="/PersonalResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NAVBAR;
