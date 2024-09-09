import React from "react";
import Slider from "../components/Slider";
import projects from "../data/data";

export default function Home() {
  return (
    <div>
      <Slider projects={projects} />
    </div>
  );
}
