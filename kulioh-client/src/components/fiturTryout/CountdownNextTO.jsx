import React from "react";
import "../../css/QuestionDailyCountdown.css";
import { useState, useEffect } from "react";
import ClockComponentTO from "./ClockComponentTO";

const QuestionNextTo = ({ ToIsOnDay }) => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();

  let interval;

  useEffect(() => {
    const hariApa = ToIsOnDay;
    let now = new Date();
    let d = new Date();
    d.setDate(d.getDate() + ((hariApa + (7 - d.getDay())) % 7));
    if (d.getDay() === now.getDay()) {
      // console.log("hari nya sama nih");
      d.setDate(d.getDate() + 7);
    }
    d.setHours(0, 0, 0, 0);
    setAfter(d);
  }, []);

  const startTimer = () => {
    // const tomorrow = new Date().getDate() + 1
    console.log(after);
    const countDownDate = new Date(after).getTime();
    // const countDownDate = clock
    interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      // get total seconds between the times
      let delta = Math.abs(countDownDate - now) / 1000;

      // calculate (and subtract) whole days
      let days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      let seconds = Math.floor(delta % 60);

      if (distance < 0) {
        //timer stop
        //ketika component nya ga dipake, clear Interval
        //
        clearInterval(interval);
      } else {
        setTimerDays(days);
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
    <ClockComponentTO
      timerDays={timerDays}
      timerHours={timerHours}
      timerMinutes={timerMinutes}
      timerSeconds={timerSeconds}
      toDay={after}
    />
  );
};

export default QuestionNextTo;
