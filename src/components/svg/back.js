import React from "react";

const BackArrow = ({ className }) => {
  return (
    <svg
      className={className}
      style={{
        width: 24,
        height: 24
      }}
      viewBox="0 0 24 24"
    >
      <path
        d="M2 12A10 10 0 0112 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12m16-1h-8l3.5-3.5-1.42-1.42L6.16 12l5.92 5.92 1.42-1.42L10 13h8v-2z"
      />
    </svg>
  );
};

export default BackArrow;
