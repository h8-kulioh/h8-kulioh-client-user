import React from "react";
import "../css/ClockComponent.css";

export default function ClockComponent({
  timerHours,
  timerMinutes,
  timerSeconds,
}) {
  console.log(timerHours);
  console.log(timerMinutes);
  console.log(timerSeconds);

  return (
    <div className="timer-container">
      <div className="timer-container-header">Soal Harian 17 Juli 2022</div>
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
