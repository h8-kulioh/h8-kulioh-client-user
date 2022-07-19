import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import Latex from "react-latex";
import "../../css/QuestionContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import * as actionCreator from "../../store/actions/actionCreator";
const url = "http://localhost:3001";

const RaporSoalHarian = () => {
  let dispatch = useDispatch();
  // const [questions, setQuestions] = useState([]);
  const questions = useSelector((store) => store.dailyQReducer.questions);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [subject, setSubject] = useState("PK")
  const [userAnswers, setUserAnswer] = useState([])
  const [keyAnswer, setKeyAnswer] = useState()


  console.log(isLoadingFinish);

  let getYear;
  let getMonth;
  let getDay;

  const movePage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };

  // const getAnswersFromDB = async () => {
  //   try {
  //     getYear = new Date().getFullYear(); //2022
  //     getMonth = new Date().getMonth() + 1;
  //     getDay = new Date().getDate();

  //     let todayFormat = "";
  //     todayFormat = todayFormat + getYear;
  //     if (getMonth.toLocaleString.length < 2) {
  //       todayFormat += `0${getMonth}`;
  //     } else {
  //       todayFormat += getMonth;
  //     }
  //     if (getDay.length < 2) {
  //       todayFormat += `0${getDay}`;
  //     } else {
  //       todayFormat += getDay;
  //     }

  //     const response = await axios.get(
  //       `${url}/questions/answers/daily/${todayFormat}`,
  //       {
  //         headers: {
  //           access_token: localStorage.getItem("accessToken"),
  //         },
  //       }
  //     );
  //     if (!response || response.data.length === 0) {
  //       dispatch(actionCreator.fetchDailyQ()).then(() =>
  //         setIsLoadingFinish(true)
  //       );
  //     } else {
  //       console.log(`data ada--------`);
  //       dispatch(actionCreator.fetchDailyQ()).then(() =>
  //         setIsLoadingFinish(true)
  //       );
  //     }
  //   } catch (err) {
  //     if (err.response.data.statusCode === 404) {
  //       console.log(`data gaada--------`);
  //       dispatch(actionCreator.fetchDailyQ()).then(() =>
  //         setIsLoadingFinish(true)
  //       );
  //     }
  //   }
  // };

  const getAnswersFromDB = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/allAnswer`, {
        headers: {
          access_token: localStorage.getItem("accessToken")
        }
      })
      // console.log(data);
      const fiteredData = data.filter(el => el.Question.subject === subject)
      console.log(fiteredData);
      setUserAnswer(fiteredData)
      const kunjab = fiteredData[pageNum].Question.QuestionKeys.filter(el => el.correct === true)
      setKeyAnswer(kunjab)
      console.log(kunjab, `kunjab`);
      setIsLoadingFinish(true)
    }
    catch (err) {
      console.log(err);
    }
  }

  const changeSubject = (e) => {
    e.preventDefault()
    // console.log(e.target.value);
    setSubject(e.target.value)
  }

  useEffect(() => {
    getAnswersFromDB();
  }, [subject]);

  // getYear = new Date().getFullYear(); //2022
  // getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
  //   new Date()
  // );
  // getDay = new Date().getDate();
  return (
    <>
      <Navbar />
      <div className="main-container">
        <div>
          <>
            {isLoadingFinish ? (
              <div className="question-container">
                <div className="filter-container">
                  <select onChange={(e) => changeSubject(e)} name="" id="">
                    <option value="PK">PK</option>
                    <option value="PBM">PBM</option>
                    <option value="PU">PU</option>
                    <option value="PPU">PPU</option>
                  </select>
                </div>
                <div className="pagination-container">
                  <div className="num-container">
                    {userAnswers.map((q, idx) => {
                      return (
                        <button
                          key={idx}
                          onClick={(e) => movePage(e, idx)}
                          className={`btn-pagination ${pageNum === idx ? "active" : ""
                            } ${answers[idx] !== "" ? "answered" : ""} `}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                  <h3>{userAnswers[pageNum].createdAt.split("T")[0]}</h3>
                </div>

                <div className="question-answers">
                  {userAnswers[pageNum].Question.question.split("~").map((so, idx) => {
                    return <Latex key={idx}>{so}</Latex>;
                  })}
                  {/* <Latex>{userAnswers[pageNum].Question.question}</Latex> */}

                  <form className="form-container">
                    {userAnswers[pageNum].Question.QuestionKeys.map((el) => (
                      <label
                        key={el.id}
                        className={answers.includes(el.id) ? "active" : null}
                      >
                        <input
                          type="radio"
                          name="radio"
                          checked={answers.includes(el.id)}
                        // onChange={(e) => saveAnswer(e, el.id)}
                        />
                        <Latex>{el.answer}</Latex>
                      </label>
                    ))}
                  </form>
                </div>
                <div>INI PEMBAHASAN</div>
                <h3>Jabawan User: </h3>
                <Latex>{userAnswers[pageNum].QuestionKey.answer}</Latex>
                <h3>Jabawan Benar: </h3>
                <Latex>{keyAnswer[0].answer}</Latex>
              </div>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

export default RaporSoalHarian;
