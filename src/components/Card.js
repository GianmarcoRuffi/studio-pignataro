import React from "react";

export default function Card({ description, imageSource, source, date }) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg ">
      <div style={{ display: "flex" }}>
        <img src={imageSource} alt=""/>

        </div>
        <div className="px-6 py-4 ">
          <div className="font-bold text-lg mb-2 break-words">{description}</div>
          <div className="text-md mb-2 break-words">{source}</div>
          <p className="text-gray-700 text-base">{date}</p>
        </div>
      </div>
    </>
  );
}
