import React from "react";
import "../../css/ClockComponent.css";
import { useState } from "react";

export default function ClockComponent({
  timerHours,
  timerMinutes,
  timerSeconds,
}) {
  const [monthNames, setMonthNames] = useState(["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"])
  let getYear = new Date().getFullYear() //2022
  let getMonth = new Date().getMonth()
  let getDay = new Date().getDate() + 1
  return (
    <div className="timer-container">
      <div className="timer-container-header">Soal Harian {getDay} {monthNames[getMonth]} {getYear}</div>
      <p>akan keluar pada</p>
      <div className="countdown-container">
        <div className="hour-container">
          <p className="big">{timerHours}</p>
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
  );
}
ClockComponent.defaultProps = {
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
