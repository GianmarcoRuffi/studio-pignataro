"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./scrollup-button.module.scss";
import {
  DEFAULT_SCROLL_CONTAINER_SELECTOR,
  getScrollEventTarget,
  getScrollTop,
  scrollToPosition,
} from "../../utils/scroll";

interface ScrollUpButtonProps {
  scrollContainer?: string;
}

const ScrollUpButton: FC<ScrollUpButtonProps> = ({
  scrollContainer = DEFAULT_SCROLL_CONTAINER_SELECTOR,
}) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    setShowButton(getScrollTop(scrollContainer) > 100);
  }, [scrollContainer]);

  const scrollToTop = () => {
    scrollToPosition({ top: 0, selector: scrollContainer });
  };

  useEffect(() => {
    setShowButton(false);

    const timeoutId = setTimeout(() => {
      const eventTarget = getScrollEventTarget(scrollContainer);

      if (eventTarget) {
        eventTarget.addEventListener("scroll", handleScroll);
      }

      handleScroll();
    }, 100);

    return () => {
      clearTimeout(timeoutId);

      const eventTarget = getScrollEventTarget(scrollContainer);
      if (eventTarget) {
        eventTarget.removeEventListener("scroll", handleScroll);
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
