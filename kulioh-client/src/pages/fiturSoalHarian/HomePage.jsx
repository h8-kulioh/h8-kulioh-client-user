import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import QuestionContainer from "../../components/fiturSoalHarian/QuestionContainer";
import QuestionDailyCountdown from "../../components/fiturSoalHarian/QuestionDailyCountdown";
import "../../css/HomePage.css";
import "../../App.css";
import { useSelector } from "react-redux";
import Latex from "react-latex";

const HomePage = () => {
  console.log(new Date());
  const isAnswered = useSelector((store) => store.dailyQReducer.isAnswered);

  return (
    <>
      <Navbar />
      <Latex></Latex>
      <div className="main-container">
        {isAnswered ? <QuestionDailyCountdown /> : <QuestionContainer />}
      </div>
    </>
  );
};

export default HomePage;
