import React, { useEffect, useState, useCallback } from "react";

export const TotopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return (
    <div className={`to_top ${isVisible ? "fade" : ""}`} onClick={scrollToTop}>
      <i
        id="topIcon"
        className="fa-regular fa-circle-up"
        style={{ color: isVisible ? "#3e6eff" : "transparent" }}
      ></i>
    </div>
  );
};

export default TotopComponent;
