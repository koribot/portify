import React from "react";

const Logo = () => {
  return (
    <svg viewBox="0 0 150 150" className="w-full h-full">
      {/* Star shape with retro gradient */}
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="retroShadow">
          <feDropShadow
            dx="3"
            dy="3"
            stdDeviation="2"
            floodColor="#7c2d12"
            floodOpacity="0.6"
          />
        </filter>
      </defs>

      {/* Star path - scaled up */}
      <path
        d="M75 7.5 L91.5 52.5 L138 52.5 L103.5 82.5 L120 127.5 L75 97.5 L30 127.5 L46.5 82.5 L12 52.5 L58.5 52.5 Z"
        fill="url(#starGradient)"
        stroke="#7c2d12"
        strokeWidth="3"
        filter="url(#retroShadow)"
      />

      {/* Letter P inside star - scaled up */}
      <text
        x="75"
        y="87"
        textAnchor="middle"
        fontSize="48"
        fontWeight="900"
        fill="#fef3c7"
        stroke="#7c2d12"
        strokeWidth="1.5"
        fontFamily="Arial, sans-serif"
        style={{
          textShadow: "1.5px 1.5px 0px #7c2d12",
          transform: "skew(-5deg, 0deg)",
          transformOrigin: "75px 87px",
        }}
      >
        P
      </text>
    </svg>
  );
};

export default Logo;
