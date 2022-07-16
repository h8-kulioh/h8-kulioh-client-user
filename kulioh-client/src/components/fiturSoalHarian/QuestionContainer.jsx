import React from "react";
import "../../css/QuestionContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import * as actionCreator from "../../store/actions/actionCreator";
const url = "http://localhost:3000";

const QuestionContainer = () => {
  let dispatch = useDispatch();
  // const [questions, setQuestions] = useState([]);
  const questions = useSelector((store) => store.dailyQReducer.questions);
  const isAnswered = useSelector((store) => store.dailyQReducer.isAnswered);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);

  console.log(questions);

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

  const handleSubmit = async () => {
    const arrayQuestionId = questions.map((q) => {
      return q.id;
    });

    console.log(arrayQuestionId);

    await axios.post(`${url}/Answers`, {
      answers,
      questionId: arrayQuestionId,
      date: new Date(),
    });

    dispatch({ type: actionType.DAILY_Q_ISANSWERED });
  };

  const getAnswersFromDB = async () => {
    try {
      const response = await axios.get(`${url}/Answers`);

      if (!response || response.data.length === 0) {
        dispatch(actionCreator.fetchDailyQ()).then(() =>
          setIsLoadingFinish(true)
        );
      } else {
        dispatch({ type: actionType.DAILY_Q_ISANSWERED });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("here get soal");
    getAnswersFromDB();
  }, []);

  return (
    <>
      {isLoadingFinish ? (
        <div className="question-container">
          <div className="header-container">
            <h3 className="subtes">Soal Penalaran Umum</h3>
            <h3>15 Juli 2022</h3>
          </div>
          <div className="question-answers">
            <p>{questions[pageNum].question.split("~")[0]}</p>
            <p>{questions[pageNum].question.split("~")[1]}</p>
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
                  {el.answer}
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
