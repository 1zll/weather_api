import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherPopover from "./components/WeatherPopover";

function App() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setForecast(data.forecast);
      } catch (err) {
        console.error("天気データ取得エラー:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  // 左側の項目列の共通スタイル
  const headerCellStyle =
    "flex flex-col justify-center items-center pl-2 md:pl-4 w-full";
  const labelTitleStyle = "text-sm md:text-base font-bold text-base-text";
  const labelUnitStyle =
    "text-xs md:text-base text-base-text font-normal block";

  return (
    // 全体
    <div className="App bg-base-bg h-screen font-sans px-4 md:px-[96px] pt-[64px] md:pt-[56px] overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-start mb-8 md:mb-8 gap-2">
        <h1 className="text-xl md:text-title text-base-text font-bold">
          週間天気予報(東京)
        </h1>
        <div className="flex items-center">
          <WeatherPopover />
        </div>
      </div>

      {/* テーブル全体のコンテナ */}
      <div className="weather-table-container flex w-full border-t-[1px] border-base-border overflow-hidden">
        {/* 左端：項目ヘッダー列 */}
        {/* 幅を調整 */}
        <div className="header-column min-w-[100px] md:min-w-[140px] flex flex-col shrink-0">
          {/* 日付 */}
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[70px] md:h-row-date py-2 md:py-4`}
          >
            <span className={`${labelTitleStyle} pb-[2px]`}>日</span>
            <span className={labelUnitStyle}>(曜日)</span>
          </div>

          {/* 天気 */}
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[100px] md:h-row-icon py-0`}
          >
            <span className={labelTitleStyle}>天気</span>
          </div>

          {/* 最高気温 */}
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最高気温</span>
            <span className={labelUnitStyle}>(℃)</span>
          </div>

          {/* 最低気温 */}
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最低気温</span>
            <span className={labelUnitStyle}>(℃)</span>
          </div>

          {/* 最大風速 */}
          <div
            className={`${headerCellStyle} border-b-[1px] border-base-border h-[60px] md:h-row-item py-2`}
          >
            <span className={labelTitleStyle}>最大風速</span>
            <span className={labelUnitStyle}>(hPa)</span>
          </div>

          {/* 降水確率 */}
          <div className={`${headerCellStyle} h-[60px] md:h-row-item py-2`}>
            <span className={labelTitleStyle}>降水確率</span>
            <span className={labelUnitStyle}>(%)</span>
          </div>
        </div>

        {/* 右側：データ列 */}
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
