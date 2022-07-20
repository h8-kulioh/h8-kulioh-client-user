import React from "react";
import Latex from "react-latex";
import "../../css/QuestionContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import * as actionCreator from "../../store/actions/actionCreator";
import QuestionTOTimer from "./QuestionTOTimer";
const url = "http://localhost:3001";

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
    const response = await axios.get(
      "http://localhost:3001/questions-weekly/weekly/20220719",
      {
        headers: {
          access_token: localStorage.getItem("accessToken"),
        },
      }
    );
    // console.log(response.data);
    setQuestions(response.data);
    setIsLoadingFinish(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // questions-weekly/user-answer
    //format nya sama kaya question
    const arrayQuestionId = questions.map((q) => {
      return q.id;
    });
    // console.log(answers);
    // console.log(arrayQuestionId);
    try {
      const response = await axios.post(
        `http://localhost:3001/questions-weekly/user-answer`,
        {
          userAnswer: answers,
          QuestionWeeklyTestId: arrayQuestionId,
        },
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      dispatch({ type: actionType.WEEKLY_Q_ISANSWERED });
      localStorage.removeItem("startTime");
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
    // dispatch({ type: actionType.DAILY_Q_ISANSWERED });
  };
  const longName = (name) => {
    if (name === `PK`) {
      return `Pengetahuan Kuantitatif`;
    } else if (name === `PBM`) {
      return `Pemahaman Bacaan dan Menulis`;
    } else if (name === `PPU`) {
      return `Pengetahuan dan Pemahaman Umum`;
    } else if (name === `PU`) {
      return `Penalaran Umum`;
    }
  };

  useEffect(() => {
    // getAnswersFromDB();
    getSoal();
  }, []);

  return (
    <>
      {isLoadingFinish ? (
        <div className="question-container">
          <div className="header-container">
            <h3 className="subtes">{longName(questions[pageNum].subject)}</h3>
            <QuestionTOTimer handleSubmit={handleSubmit} />
          </div>
          <div className="question-answers">
            {questions[pageNum].question.split("~").map((so, idx) => {
              return <Latex key={idx}>{so}</Latex>;
            })}
            <form className="form-container">
              {questions[pageNum].QuestionKeyWeeklyTests.map((el) => (
                <label
                  key={el.id}
                  className={answers.includes(el.id) ? "active" : null}
                >
                  <input
                    type="radio"
                    name="radio"
                    checked={answers.includes(el.id)}
                    onChange={(e) => saveAnswer(e, el.id)}
                  />
                  <Latex>{el.answer}</Latex>
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
                <button className="btn-submit" onClick={(e) => handleSubmit(e)}>
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
