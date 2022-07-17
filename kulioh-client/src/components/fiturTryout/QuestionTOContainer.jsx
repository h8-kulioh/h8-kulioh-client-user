import React from "react";
import "../../css/QuestionContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import QuestionTOCountdown from "./QuestionTOCountdown";

const QuestionTOContainer = () => {
  let dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const saveAnswer = (_, answer) => {
    const newAnswers = answers.map((el, index) => {
      if (index === pageNum) return answer;
      return el;
    });
    setAnswers(newAnswers);
  };

  const movePage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };

  const getSoal = async () => {
    const response = await axios.get("http://localhost:3000/Tryout");
    setQuestions(response.data);
    setIsLoadingFinish(true);
  };

  const handleSubmit = () => {
    console.log(answers);
    // dispatch({ type: actionType.DAILY_Q_ISANSWERED });
  };

  useEffect(() => {
    getSoal();
  }, []);

  return (
    <>
      {isLoadingFinish ? (
        <div className="question-container">
          <QuestionTOCountdown handleSubmit={handleSubmit} />
          <div className="header-container">
            <h3 className="subtes">Soal Penalaran Umum</h3>
            <h3>15 Juli 2022</h3>
          </div>
          <div className="question-answers">
            <p>{questions[pageNum].Question.split("~")[0]}</p>
            <p>{questions[pageNum].Question.split("~")[1]}</p>
            <form className="form-container">
              {questions[pageNum].answers.map((el) => (
                <label
                  key={el.option}
                  className={answers.includes(el.option) ? "active" : null}
                >
                  <input
                    type="radio"
                    name="radio"
                    checked={answers.includes(el.option)}
                    onChange={(e) => saveAnswer(e, el.option)}
                  />
                  {el.option}
                </label>
              ))}
            </form>
          </div>
          <div className="pagination-container">
            <div className="num-container">
              {questions.map((q, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={(e) => movePage(e, idx)}
                    className={`btn-pagination ${
                      pageNum === idx ? "active" : ""
                    } ${answers[idx] !== "" ? "answered" : ""} `}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div>
              {pageNum + 1 === questions.length ? (
                <button className="btn-submit" onClick={handleSubmit}>
                  Submit
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuestionTOContainer;
