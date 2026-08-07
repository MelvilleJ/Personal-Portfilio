import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import gsap from "gsap";

function HERO() {
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: ["Let’s Talk Solutions"],
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
        ease: "fade.in",
      }
    );
  }, []);

  return (
    <section className="relative section-home h-full">
      <div
        ref={boxRef}
        className="raleway-sub my-50 mx-auto flex flex-col justify-center items-center h-full"
      >
        <h1 className="text-center text-3xl sm:text-2xl md:text-7xl  text-white">
          Hey, I'm
        </h1>
        <h1 className="text-center text-5xl md:text-8xl  text-white font-bold">
          Joshua Melville,
        </h1>
        <div className="text-center text-6xl lg:text-9xl md:text-9xl text-green font-bold">
          <span ref={typedRef}></span>
        </div>
      </div>
    </section>
  );
}

export default HERO;
