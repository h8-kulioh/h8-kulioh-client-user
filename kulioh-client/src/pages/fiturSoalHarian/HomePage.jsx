import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import QuestionContainer from "../../components/fiturSoalHarian/QuestionContainer";
import QuestionDailyCountdown from "../../components/fiturSoalHarian/QuestionDailyCountdown";
import "../../css/HomePage.css";
import "../../App.css";
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
