import { useCallback, useEffect, useState } from "react";

export const useWindowSize = () => {
  const isBrowser = typeof window !== "undefined";
  const [device, setDevice] = useState(null);

  const getWindowSize = useCallback(
    () => {
      const width = isBrowser ? window.innerWidth : null;
      const height = isBrowser ? window.innerHeight : null;
      return {
        width,
        height
      };
    },
    [isBrowser]
  );

  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { width, height } = windowSize;

  useEffect(
    () => {
      if (isBrowser) {
        const handleResize = () => {
          setWindowSize(getWindowSize());
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    },
    [isBrowser, getWindowSize]
  );

  useEffect(
    () => {
      if (width < 1025 && width < height) {
        setDevice("tabletPortrait");
      }
      if (width < 1025 && width > height) {
        setDevice("tabletLandscape");
      }
      if (width < 737 && width > height) {
        setDevice("mobileLandscape");
      }
      if (width < 415 && width < height) {
        setDevice("mobilePortrait");
      }
      if (width > 1024) {
        setDevice("desktop");
      }
    },
    [height, width]
  );

  return device;
};
