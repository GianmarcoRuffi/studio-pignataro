import React from "react";

export default function Card({ description, imageSourceLeft, imageSourceRight, source, date }) {
  return (
    <>
      <div class="rounded overflow-hidden shadow-lg ">
      <div style={{ display: "flex" }}>
        <img src={imageSourceLeft} alt="" className="w-1/2" />
        <img src={imageSourceRight} alt="" className="w-1/2"/>
        </div>
        <div class="px-6 py-4 ">
          <div class="font-bold text-lg mb-2 break-words">{description}</div>
          <div class="text-md mb-2 break-words">{source}</div>
          <p class="text-gray-700 text-base">{date}</p>
        </div>
      </div>
    </>
  );
}
