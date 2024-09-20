import { useState, useEffect } from "react";

export const useMagnifyCursor = (hoverSelector) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = document.querySelector(hoverSelector);

    if (!element) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hoverSelector]);

  useEffect(() => {
    if (isHovered) {
      document.body.style.cursor = "zoom-in"; // Change cursor to magnifying glass
    } else {
      document.body.style.cursor = "default"; // Revert back to default
    }
  }, [isHovered]);
};
