import React from "react";

function renderHellos() {
  const arr = ["hello", "world", "dio", "porco", "infame"];

  return arr.map((item) => {
    return <h2>{item}</h2>;
  });
}

export default function Carousel() {
  return (
    <>
      <h1>Hello World</h1>
      {renderHellos()}
    </>
  );
}
