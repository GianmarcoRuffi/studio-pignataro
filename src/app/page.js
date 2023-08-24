import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import React from 'react';
import Slider from '../components/Slider';
import projects from '../data/data';


export default function Home() {
  return (
<div>


  <div className="">

 <Slider projects={projects} />

 </div>
    </div>
  );
}

