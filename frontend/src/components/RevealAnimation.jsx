import React from "react";
import useRevealAnimation from "../hooks/useRevealAnimation";

const RevealAnimation = ({
  children,
  className = "",
  animationType = "fadeInUp",
  delay = 0,
  duration = 600,
  once = true,
  threshold = 0.1,
}) => {
  const [elementRef, isVisible] = useRevealAnimation({
    once,
    threshold,
    rootMargin: "0px 0px -50px 0px",
  });

  const getAnimationClass = () => {
    switch (animationType) {
      case "fadeInUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "fadeInDown":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8";
      case "fadeInLeft":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8";
      case "fadeInRight":
        return isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8";
      case "fadeIn":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
      case "slideInUp":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16";
      case "zoomIn":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75";
      case "rotateIn":
        return isVisible ? "opacity-100 rotate-0" : "opacity-0 rotate-12";
      default:
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`
        transition-all ease-out transform
        ${getAnimationClass()}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default RevealAnimation;
