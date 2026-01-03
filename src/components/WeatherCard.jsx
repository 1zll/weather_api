import React from "react";
import "../index.css";

function WeatherCard({ data }) {
  const publicUrl = process.env.PUBLIC_URL;

  const getWeatherInfo = (code) => {
    // 全てのパスに publicUrl を付与
    if ([0, 1].includes(code)) return { icon: `${publicUrl}/Icons/Sunny.png` };
    if ([2, 3].includes(code)) return { icon: `${publicUrl}/Icons/Cloudy.png` };
    if ([45, 48].includes(code)) return { icon: `${publicUrl}/Icons/Fog.png` };
    if ([51, 53, 55].includes(code))
      return { icon: `${publicUrl}/Icons/Drizzle.png` };
    if ([61, 63, 65, 80, 81, 82].includes(code))
      return { icon: `${publicUrl}/Icons/Rainy.png` };
    if ([71, 73, 75, 77, 85, 86].includes(code))
      return { icon: `${publicUrl}/Icons/Snow.png` };
    if ([95, 96, 99].includes(code))
      return { icon: `${publicUrl}/Icons/Thunder.png` };

    console.warn("未対応のweatherCode:", code);
    return { icon: `${publicUrl}/Icons/NA.png` };
  };

  const weather = getWeatherInfo(data.weatherCode);

  const dateObj = new Date(data.date);
  const dayOfMonth = dateObj.getDate();
  const dayOfWeek = dateObj.toLocaleDateString("ja-JP", { weekday: "short" });
  const dayIndex = dateObj.getDay();

  let dateColorClass = "text-base-text";
  if (dayIndex === 0) dateColorClass = "text-calendar-sun";
  if (dayIndex === 6) dateColorClass = "text-calendar-sat";

  const cellStyle =
    "flex items-center justify-center w-full border-base-border";
  const textBaseStyle = "text-sm md:text-base";
  const textDateStyle = "text-base md:text-lg";

  return (
    <div className="weather-column flex flex-col items-center min-w-[90px] md:min-w-0 md:flex-1">
      <div
        className={`${cellStyle} flex-col border-b-[1px] border-base-border h-[70px] md:h-row-date py-2 md:py-4`}
      >
        <span className={`${textDateStyle} font-bold ${dateColorClass}`}>
          {dayOfMonth}
        </span>
        <span className={`text-xs md:text-base ${dateColorClass}`}>
          ({dayOfWeek})
        </span>
      </div>

      <div
        className={`${cellStyle} border-b-[1px] border-base-border h-[100px] md:h-row-icon py-4 md:py-8`}
      >
        <img
          src={weather.icon}
          className="h-[60px] md:h-[100px] w-auto object-contain"
          alt="天気アイコン"
        />
      </div>

      <div
        className={`${cellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
      >
        <span className={`text-temp-max ${textBaseStyle}`}>
          {Math.round(data.maxTemp)}
        </span>
      </div>

      <div
        className={`${cellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
      >
        <span className={`text-temp-min ${textBaseStyle}`}>
          {Math.round(data.minTemp)}
        </span>
      </div>

      <div
        className={`${cellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
      >
        <span className={`text-base-text ${textBaseStyle}`}>
          {data.windSpeed}
        </span>
      </div>

      <div className={`${cellStyle} h-[60px] md:h-row-item py-2`}>
        <span className={`text-base-text ${textBaseStyle}`}>
          {data.rainProbability}
        </span>
      </div>
    </div>
  );
}

export default WeatherCard;
