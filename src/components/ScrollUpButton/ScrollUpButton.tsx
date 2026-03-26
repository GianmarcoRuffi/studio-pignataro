"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./scrollup-button.module.scss";

interface ScrollUpButtonProps {
  scrollContainer?: string;
}

const ScrollUpButton: FC<ScrollUpButtonProps> = ({
  scrollContainer = ".layout-content:not(.homepage)",
}) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const container = document.querySelector(scrollContainer) as HTMLElement;
    const scrollPosition = container
      ? container.scrollTop
      : window.scrollY || document.documentElement.scrollTop;

    setShowButton(scrollPosition > 100);
  }, [scrollContainer]);

  const scrollToTop = () => {
    const container = document.querySelector(scrollContainer) as HTMLElement;

    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setShowButton(false);

    const timeoutId = setTimeout(() => {
      const container = document.querySelector(scrollContainer) as HTMLElement;

      if (container) {
        container.addEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);

      const container = document.querySelector(scrollContainer) as HTMLElement;
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainer, handleScroll]);

  return (
    <button
      type="button"
      className={`${styles.scrollUpButton} ${showButton ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default ScrollUpButton;
