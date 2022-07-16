import React from "react";
import "../../css/QuestionDailyCountdown.css";
import { useState, useEffect } from "react";
import ClockComponent from "./ClockComponent";

const QuestionDailyCountdown = () => {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();

  let interval;
  useEffect(() => {
    let tomorrow;
    const today = new Date();
    tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(4, 0, 0);
    setAfter(tomorrow);
  }, []);

  const startTimer = () => {
    // const tomorrow = new Date().getDate() + 1
    console.log(after);
    const countDownDate = new Date(after).getTime();
    // const countDownDate = clock
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;
      // console.log(distance);
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        //timer stop
        //ketika component nya ga dipake, clear Interval
        //
        clearInterval(interval);
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    if (after) {
      startTimer();
    }
    return () => {
      clearInterval(interval);
      //nampilin soal
    };
  }, [after, interval]);

  return (
    <ClockComponent
      timerHours={timerHours}
      timerMinutes={timerMinutes}
      timerSeconds={timerSeconds}
    />
  );
};

export default QuestionDailyCountdown;
