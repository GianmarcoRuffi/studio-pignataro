import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import React from 'react';
import Slider from '../components/Slider';

const images = [
  '/IMG_26.jpg',
  '/IMG_05.JPG',
  '/IMG_28.JPG',
  '/IMG_22.jpg',
];

export default function Home() {
  return (
<div>

 <Slider images={images} />

     
    </div>
  );
}

