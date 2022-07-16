import React from "react";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import ClockComponent from "../components/ClockComponent";
import "../css/HomePage.css";
import "../App.css";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();

  const [sudahMengerjakan, setSudahMengerjakan] = useState(false);

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
  }, [after]);

  return (
    <>
      <Navbar />
      <div className="main-container">
        {sudahMengerjakan ? (
          <div className="countdown-daily">
            <ClockComponent
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
            />
          </div>
        ) : (
          <QuestionContainer />
        )}
      </div>
    </>
  );
};

export default HomePage;
