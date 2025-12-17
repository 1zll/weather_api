import React, { useState } from "react";
import { GoQuestion } from "react-icons/go";

const WeatherPopover = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleClick = () => setIsVisible(!isVisible);

  return (
    <div className="relative inline-flex items-center">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="text-base-text hover:text-gray-400 transition-colors flex items-center"
        aria-label="help"
      >
        <GoQuestion className="text-2xl md:text-[28px]" />
      </button>

      {isVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 md:left-full md:translate-x-0 md:top-1/2 md:-translate-y-1/2 mt-2 md:mt-0 md:ml-4 w-[240px] md:w-[300px] p-3 bg-white border border-base-border shadow-xl rounded-md z-50">
          <div className="text-base-text text-xs md:text-[14px] leading-snug space-y-1">
            <p>最高気温：地上2m地点の最大気温</p>
            <p>最低気温：地上2m地点の最低気温</p>
            <p>最大風速：地上10m地点</p>
            <p>降水確率：1日の最大値</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPopover;
