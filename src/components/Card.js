import React from "react";

export default function Card({ description, imageSource, source, date }) {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <div style={{ display: "flex" }}>
        <img src={imageSource} alt="" />
      </div>
      <div className="presses-box px-6 p-4">
        <div
          className="font-bold mb-2 break-words text-sm md:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="mb-2 break-words card-link text-xs md:text-base">
          {source}
        </div>
        <p className="text-gray-700 text-xs md:text-base">{date}</p>
      </div>
    </div>
  );
}
