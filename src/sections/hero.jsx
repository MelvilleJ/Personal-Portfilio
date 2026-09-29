import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import { focusHome } from "../components/globefocus";

const TAGLINE = "Let’s Talk Solutions";

function HERO() {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);
  const [homePinned, setHomePinned] = useState(false);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: [TAGLINE],
      typeSpeed: 60,
      backSpeed: 30,
      loop: false,
      smartBackspace: true,
      backDelay: 1500,
      showCursor: true,
    });
    return () => {
      typedInstance.current.destroy();
    };
  }, []);
  const boxRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      {
        y: -200,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => () => focusHome(false), []);

  const toggleHome = () => {
    setHomePinned(!homePinned);
    focusHome(!homePinned);
  };

  return (
    <section className="relative section-home">
      <div
        ref={boxRef}
        className="raleway-sub mx-auto flex flex-col justify-center items-center"
      >
        <h1 className="text-center text-white">
          <span className="block text-3xl sm:text-2xl md:text-7xl">
            Hey, I'm
          </span>
          <span className="block text-5xl md:text-8xl font-bold">
            Joshua Melville,
          </span>
        </h1>
        <p className="text-center text-6xl lg:text-9xl md:text-9xl text-green font-bold">
          <span className="sr-only">{TAGLINE}</span>
          <span ref={typedRef} aria-hidden="true"></span>
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-neongreen px-8 py-3 text-base font-semibold text-main shadow-lg shadow-emerald-500/20 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            Get in touch
          </a>
          <a
            href="/projects"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            View projects
          </a>
        </div>

        <button
          type="button"
          aria-pressed={homePinned}
          onClick={toggleHome}
          onMouseEnter={() => focusHome(true)}
          onMouseLeave={() => focusHome(homePinned)}
          onFocus={() => focusHome(true)}
          onBlur={() => focusHome(homePinned)}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-white"
        >
          <span className="h-2 w-2 rounded-full bg-[#f5d76e] shadow-[0_0_8px_#f5d76e]" />
          Based in Trinidad &amp; Tobago
        </button>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-white/50 transition hover:text-white motion-safe:animate-bounce"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

export default HERO;
