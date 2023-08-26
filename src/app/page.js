import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import React from "react";
import Slider from "../components/Slider";
import projects from "../data/data";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Slider projects={projects} />
    </div>
  );
}
