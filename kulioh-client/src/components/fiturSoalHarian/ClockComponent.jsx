import React from "react";
import "../../css/ClockComponent.css";
import { useState } from "react";
import waiting from "../../assets/flame-7.png";

export default function ClockComponent({
  timerHours,
  timerMinutes,
  timerSeconds,
}) {
  let getYear = new Date().getFullYear();
  let getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    new Date()
  );
  let getDay = new Date().getDate() + 1;
  return (
    <div className="outer-timer-container">
      <div className="timer-container">
        <div className="timer-container-header">
          Soal Harian {getDay} {getMonth} {getYear}
        </div>
        <div className="countdown-container">
          <div className="hour-container">
            <p className="big">
              {timerHours < 10 ? "0" + String(timerHours) : timerHours}
            </p>
            <p className="small">Jam</p>
          </div>
          <div className="hour-container">
            <p className="big">:</p>
            <p className="small"></p>
          </div>
          <div className="hour-container">
            <p className="big">
              {timerMinutes < 10 ? "0" + String(timerMinutes) : timerMinutes}
            </p>
            <p className="small">Menit</p>
          </div>
          <div className="hour-container">
            <p className="big">:</p>
            <p className="small"></p>
          </div>
          <div className="hour-container">
            <p className="big">
              {" "}
              {timerSeconds < 10 ? "0" + String(timerSeconds) : timerSeconds}
            </p>
            <p className="small">Detik</p>
          </div>
        </div>
      </div>
      <div>
        <img className="image-waiting" src={waiting} alt="" srcset="" />
      </div>
    </div>
  );
}
ClockComponent.defaultProps = {
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
