import React from "react";
import "../../css/ClockComponent.css";
import { useState } from "react";

export default function ClockComponentTO({
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  toDay,
}) {
  const theDay = new Date(toDay);
  let getYear = theDay.getFullYear();
  const getMonth = theDay.toLocaleString("id-ID", { month: "long" });
  let getDay = theDay.getDate();
  return (
    <div className="timer-container">
      <div className="timer-container-header">
        Try Out Mingguan {getDay} {getMonth} {getYear}{" "}
      </div>
      <div className="countdown-container">
        {timerDays !== 0 ? (
          <>
            <div className="hour-container">
              <p className="big">
                {timerDays < 10 ? "0" + String(timerDays) : timerDays}
              </p>
              <p className="small">Hari</p>
            </div>
            <div className="hour-container">
              <p className="big">:</p>
              <p className="small"></p>
            </div>
          </>
        ) : null}

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
  );
}
ClockComponentTO.defaultProps = {
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
