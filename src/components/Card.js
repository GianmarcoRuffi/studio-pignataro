import React from "react";

export default function Card({ description, imageSource, source, date }) {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg ">
        <div style={{ display: "flex" }}>
          <img src={imageSource} alt="" />
        </div>
        <div className="px-6 p-4 ">
          <div className="font-bold text-lg mb-2 break-words sm:max-md:text-sm">
            {description}
          </div>
          <div className="text-md mb-2 break-words card-link sm:max-md:text-sm">
            {source}
          </div>
          <p className="text-gray-700 text-base sm:max-md:text-sm">{date}</p>
        </div>
      </div>
    </>
  );
}
