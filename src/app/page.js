import Image from "next/image";
import Header from "../components/Header";
import Link from "next/link";
import React from 'react';
import Slider from '../components/Slider';

const images = [
  '/IMG_02.jpg',
  '/ufficio_01.JPG',
  '/ufficio_02.JPG',
  '/ufficio_03.JPG',
];

export default function Home() {
  return (
<div>

 <Slider images={images} />

     
    </div>
  );
}

