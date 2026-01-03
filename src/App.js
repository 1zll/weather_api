import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherPopover from "./components/WeatherPopover";

function App() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      // 取得先URLをserver.jsから移植
      const url = `https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,precipitation_probability_max&forecast_days=7&timezone=Asia/Tokyo`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // server.jsで行っていた整形処理
        const daily = data.daily;
        const formattedForecast = daily.time.map((date, i) => ({
          date,
          weatherCode: daily.weather_code[i],
          maxTemp: daily.temperature_2m_max[i],
          minTemp: daily.temperature_2m_min[i],
          windSpeed: daily.wind_speed_10m_max[i],
          rainProbability: daily.precipitation_probability_max[i],
        }));

        setForecast(formattedForecast);
      } catch (err) {
        console.error("天気データ取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const headerCellStyle =
    "flex flex-col justify-center items-center pl-2 md:pl-4 w-full";
  const labelTitleStyle = "text-sm md:text-base font-bold text-base-text";
  const labelUnitStyle =
    "text-xs md:text-base text-base-text font-normal block";

  return (
    <div className="App bg-base-bg h-screen font-sans px-4 md:px-[96px] pt-[64px] md:pt-[56px] overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-start mb-8 md:mb-8 gap-2">
        <h1 className="text-xl md:text-title text-base-text font-bold">
          週間天気予報(東京)
        </h1>
        <div className="flex items-center">
          <WeatherPopover />
        </div>
      </div>

      <div className="weather-table-container flex w-full overflow-hidden">
        <div className="header-column min-w-[100px] md:min-w-[140px] flex flex-col shrink-0">
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[70px] md:h-row-date py-2 md:py-4`}
          >
            <span className={`${labelTitleStyle} pb-[2px]`}>日</span>
            <span className={labelUnitStyle}>(曜日)</span>
          </div>

          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[100px] md:h-row-icon py-0`}
          >
            <span className={labelTitleStyle}>天気</span>
          </div>

          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最高気温</span>
            <span className={labelUnitStyle}>(℃)</span>
          </div>

          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最低気温</span>
            <span className={labelUnitStyle}>(℃)</span>
          </div>

          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最大風速</span>
            <span className={labelUnitStyle}>(hPa)</span>
          </div>

          <div className={`${headerCellStyle} h-[60px] md:h-row-item py-2`}>
            <span className={labelTitleStyle}>降水確率</span>
            <span className={labelUnitStyle}>(%)</span>
          </div>
        </div>

        <div className="data-columns flex flex-1 overflow-x-auto">
          {loading ? (
            <div className="p-4 text-base-text text-sm md:text-base">
              読み込み中...
            </div>
          ) : forecast.length === 0 ? (
            <div className="p-4 text-base-text text-sm md:text-base">
              データ取得失敗
            </div>
          ) : (
            forecast.map((day, index) => <WeatherCard key={index} data={day} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
