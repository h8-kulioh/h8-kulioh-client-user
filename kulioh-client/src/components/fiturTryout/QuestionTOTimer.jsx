import { useState, useEffect } from "react";
import "../../css/QuestionTOTimer.css";

export default function QuestionTOTimer({ handleSubmit }) {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [clicked, setClicked] = useState(false);

  let interval;
  useEffect(() => {
    startTimer();
  }, [interval]);

  const startTimer = () => {
    let finish;

    finish = new Date();
    let today = new Date();

    const startTime = localStorage.getItem("startTime");
    if (startTime) {
      today = new Date(Number(startTime));
      console.log(today, "INI MULAI");
    }

    finish.setDate(today.getDate());
    finish.setMinutes(today.getMinutes() + 30);
    finish.setSeconds(today.getSeconds());
    console.log(finish, `INI SELESAI`);

    setAfter(finish);

    const countDownDate = new Date(finish).getTime();
    interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = Math.abs(countDownDate - now);
      let seconds = Math.floor(distance / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = minutes % 60;

      if (distance < 0) {
        clearInterval(interval);
        handleSubmit();
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        setIsLoadingFinish(true);
      }
    });
  };

  return (
    <>
      {isLoadingFinish ? (
        <p className="timer">
          {"Waktu tersisa: "}{" "}
          {timerMinutes < 10 ? "0" + String(timerMinutes) : timerMinutes}{" "}
          {" : "}
          {timerSeconds < 10 ? "0" + String(timerSeconds) : timerSeconds}{" "}
        </p>
      ) : null}
    </>
  );
}