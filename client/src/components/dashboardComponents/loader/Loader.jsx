import React from "react";
import "./loader.css";

const Loader = ({ isWorking }) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-16 h-12">
        <svg width="64px" height="48px" viewBox="0 0 64 48">
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            className="fill-none stroke-[#ff4d5033] stroke-[3] stroke-linecap-round stroke-linejoin-round"
          />
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            className={`fill-none stroke-[#ff4d4f] stroke-[3] stroke-linecap-round stroke-linejoin-round ${
              isWorking ? "animate-dash" : ""
            }`}
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
