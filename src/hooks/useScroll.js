import { useEffect, useState } from "react";

export const useScroll = scrollY => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(
    () => {
      const handleScroll = () => {
        if (window.scrollY > scrollY) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [isScrolled, scrollY]
  );
  return isScrolled;
};
