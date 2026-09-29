import { lazy, Suspense } from "react";
import HERO from "../sections/hero";
import NAVBAR from "../components/navbar";
import ABOUT from "../sections/about";
import BACKDROP from "../components/backdrop";
import GLOWFIELD from "../components/glowfield";
import MESSAGE from "../sections/message";
import CONTACT from "../sections/contact";
import "../App.css";

// three.js is the bulk of the bundle; let the hero text paint first.
const PARTICLEFIELD = lazy(() => import("../components/particlefield"));

export default function Home() {
  return (
    <>
      <GLOWFIELD className="bg-gradient-to-b from-blue-950 via-slate-950 to-blue-950">
        <BACKDROP />
        <Suspense fallback={null}>
          <PARTICLEFIELD morphTargetId="about" />
        </Suspense>
        <HERO />
        <ABOUT />
      </GLOWFIELD>
      <MESSAGE />
      <CONTACT />
    </>
  );
}
