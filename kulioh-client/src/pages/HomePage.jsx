import React from "react";
import Navbar from "../components/Navbar";
import QuestionContainer from "../components/QuestionContainer";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <QuestionContainer />
      </div>
    </>
  );
};

export default HomePage;
