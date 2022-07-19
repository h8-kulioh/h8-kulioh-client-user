import React from "react";
import Latex from "react-latex";
import "../../css/QuestionContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import * as actionCreator from "../../store/actions/actionCreator";
const url = "http://localhost:3001";

const QuestionContainer = () => {
  let dispatch = useDispatch();
  // const [questions, setQuestions] = useState([]);
  const questions = useSelector((store) => store.dailyQReducer.questions);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);

  console.log(questions);

  let getYear;
  let getMonth;
  let getDay;
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

  const handleSubmit = async () => {
    const arrayQuestionId = questions.map((q) => {
      return q.id;
    });

    console.log(arrayQuestionId);
    try {
      await axios.post(
        `${url}/questions/answers/daily`,
        {
          userAnswer: answers,
          QuestionId: arrayQuestionId,
        },
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );

      dispatch({ type: actionType.DAILY_Q_ISANSWERED });
    } catch (err) {
      console.log(err, `err saat submit`);
    }
  };

  const getAnswersFromDB = async () => {
    try {
      getYear = new Date().getFullYear(); //2022
      getMonth = new Date().getMonth() + 1;
      getDay = new Date().getDate();

      let todayFormat = "";
      todayFormat = todayFormat + getYear;
      if (getMonth.toLocaleString.length < 2) {
        todayFormat += `0${getMonth}`;
      } else {
        todayFormat += getMonth;
      }
      if (getDay.length < 2) {
        todayFormat += `0${getDay}`;
      } else {
        todayFormat += getDay;
      }

      const response = await axios.get(
        `${url}/questions/answers/daily/${todayFormat}`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      ); // YYYYMMDD
      // console.log(response.data.statusCode, `--------`);
      if (!response || response.data.length === 0) {
        //if disini ga kepake, karena dia lgsg throw error
        // console.log(`data gaada--------`);
        dispatch(actionCreator.fetchDailyQ()).then(() =>
          setIsLoadingFinish(true)
        );
      } else {
        console.log(`data ada--------`);
        dispatch({ type: actionType.DAILY_Q_ISANSWERED });
      }
    } catch (err) {
      if (err.response.data.statusCode === 404) {
        console.log(`data gaada--------`);
        dispatch(actionCreator.fetchDailyQ()).then(() =>
          setIsLoadingFinish(true)
        );
      }
      // console.log(err);
    }
  };

  useEffect(() => {
    getAnswersFromDB();
  }, []);

  getYear = new Date().getFullYear(); //2022
  getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    new Date()
  );
  getDay = new Date().getDate();

  return (
    <>
      {isLoadingFinish ? (
        <div className="question-container">
          <div className="header-container">
            <h3 className="subtes">{longName(questions[pageNum].subject)}</h3>
            <h3>
              {getDay} {getMonth} {getYear}
            </h3>
          </div>
          <div className="question-answers">
            {questions[pageNum].question.split("~").map((so, idx) => {
              return <Latex key={idx}>{so}</Latex>;
            })}

            <form className="form-container">
              {questions[pageNum].QuestionKeys.map((el) => (
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

export default QuestionContainer;
