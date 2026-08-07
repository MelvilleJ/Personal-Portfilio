import { useState } from "react";
import HERO from "../sections/hero";
import NAVBAR from "../components/navbar";
import ABOUT from "../sections/about";
import BACKDROP from "../components/backdrop";
import GLOWFIELD from "../components/glowfield";
import MESSAGE from "../sections/message";
import CONTACT from "../sections/contact";
import "../App.css";

export default function Home() {
  return (
    <>
      <GLOWFIELD className="bg-gradient-to-b from-blue-950 via-slate-950 to-blue-950">
        <BACKDROP />
        <HERO />
        <ABOUT />
      </GLOWFIELD>
      <MESSAGE />
      <CONTACT />
    </>
  );
}
