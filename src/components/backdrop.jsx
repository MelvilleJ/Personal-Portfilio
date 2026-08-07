import React from "react";

const DOT_GRID =
  "radial-gradient(circle, rgba(148,163,184,0.18) 1px, transparent 1px)";

const EDGE_FADE =
  "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)";

const GLOWS = [
  "radial-gradient(ellipse 50% 28% at 82% 6%, rgba(30,64,175,0.38), transparent 70%)",
  "radial-gradient(ellipse 45% 22% at 18% 52%, rgba(16,185,129,0.10), transparent 70%)",
  "radial-gradient(ellipse 42% 20% at 88% 86%, rgba(59,130,246,0.12), transparent 70%)",
];

function BACKDROP() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: DOT_GRID,
          backgroundSize: "38px 38px",
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: GLOWS.join(", ") }}
      />
    </div>
  );
}

export default BACKDROP;
