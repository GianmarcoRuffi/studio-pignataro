"use client";
import { useState, useEffect } from "react";
import PressesCard from "../../components/PressesCard/PressesCard";
import ScrollUpButton from "../../components/ScrollUpButton/ScrollUpButton";
import LinkButton from "../../components/LinkButton/LinkButton";
import pressesData from "../../data/pressesData";
import PressesSkeleton from "../../components/PressesSkeleton/PressesSkeleton";
import MainSkeleton from "../../components/MainSkeleton/MainSkeleton";
import styles from "./presses.module.css";

export default function Presses() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = pressesData.map((press) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = press.imageSource;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  return (
    <div className="presses-container flex-row justify-center ">
      <div className={`${styles.cardBox} p-10 flex flex-col gap-16`}>
        {imagesLoaded ? (
          pressesData.map((press, index) => (
            <PressesCard
              key={index}
              description={press.description}
              imageSource={press.imageSource}
              source={
                press.source ? (
                  <LinkButton
                    href={press.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vai all'articolo
                  </LinkButton>
                ) : (
                  ""
                )
              }
              date={press.date}
            />
          ))
        ) : (
          <MainSkeleton />
        )}
      </div>
      <ScrollUpButton />
    </div>
  );
}
