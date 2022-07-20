import { useState, useEffect } from "react";
import "../../css/QuestionTOTimer.css";
import axios from "axios";
export default function QuestionTOTimer({ handleSubmit }) {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [startTime, setStartTime] = useState(null);
  let interval;
  useEffect(() => {
    getStartTime();
    startTimer();
  }, [interval]);
  const url = "http://localhost:3001";

  const getStartTime = async () => {
    try {
      const thisday = new Date();
      let year = thisday.getFullYear();
      let month = thisday.getMonth() + 1;
      if (month < 10) {
        month = `0` + month.toLocaleString();
      }
      let date = thisday.getDate();
      // const params = year.toLocaleString() + month + date.toLocaleString()
      const response = await axios.get(
        `${url}/users/tryOut/${year}${month}${date}`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(response, `getStartTime`);
      setStartTime(response.tryoutstart);
    } catch (err) {
      if (err.response.data.statusCode == 404) {
        setStartTime(null);
      }
      // console.log(err);
    }
  };

  const startTimer = () => {
    let finish;

    finish = new Date();
    let today = new Date();

    // const startTime = localStorage.getItem("startTime");

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
