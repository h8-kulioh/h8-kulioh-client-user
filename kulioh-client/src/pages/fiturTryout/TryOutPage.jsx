import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import QuestionTOContainer from "../../components/fiturTryout/QuestionTOContainer";
// import QuestionDailyCountdown from "../components/QuestionDailyCountdown";

const TryoutPage = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        {/* {isAnswered ? <QuestionDailyCountdown /> : <QuestionContainer />} */}
        <QuestionTOContainer />
      </div>
    </>
  );
};

export default TryoutPage;
