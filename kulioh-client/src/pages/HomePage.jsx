import React from "react";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import QuestionDailyCountdown from "../components/QuestionDailyCountdown";
import "../css/HomePage.css";
import "../App.css";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isAnswered = useSelector((store) => store.dailyQReducer.isAnswered);

  return (
    <>
      <Navbar />
      <div className="main-container">
        {isAnswered ? <QuestionDailyCountdown /> : <QuestionContainer />}
      </div>
    </>
  );
};

export default HomePage;
