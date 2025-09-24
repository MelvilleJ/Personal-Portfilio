import { useState } from "react";
import HERO from "../sections/hero";
import NAVBAR from "../components/navbar";
import ABOUT from "../sections/about";
import MESSAGE from "../sections/message";
import CONTACT from "../sections/contact";
import "../App.css";

export default function Home() {
  return (
    <>
      <HERO />
      <ABOUT />
      <MESSAGE />
      <CONTACT />
    </>
  );
}
