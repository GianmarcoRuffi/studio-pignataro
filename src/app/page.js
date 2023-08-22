import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import React from 'react';
import Slider from '../components/Slider';

const images = [
  '/IMG_02.jpg',
  '/ufficio_01.JPG',
  '/ufficio_02.JPG',
];

export default function Home() {
  return (
<div>
      <h1>Image Slider</h1>

 <Slider images={images} />

     
    </div>
  );
}

