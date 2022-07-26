import { useCallback, useEffect, useRef, useState } from "react";

export const useSelectorPosition = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(123);
  const [position, setPosition] = useState(0);
  const el = ref.current;

  const handleMouse = useCallback(
    () => {
      const rect = el.getBoundingClientRect();
      setWidth(el.offsetWidth);
      setPosition(rect.left);
    },
    [el]
  );

  useEffect(
    () => {
      if (el) {
        el.addEventListener("mouseover", handleMouse);
        return () => {
          el.removeEventListener("mouseover", handleMouse);
        };
      }
    },
    [ref, el, handleMouse]
  );
  
  return [ref, width, position];
};
