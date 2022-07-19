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
const RaporTryout = () => {
  let dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [userAnswers, setUserAnswer] = useState([])
  const [keyAnswer, setKeyAnswer] = useState()
  let getYear;
  let getMonth;
  let getDay;

  const movePage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };
  const getAnswersFromDB = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/tryOutAllAnswer`, {
        headers: {
          access_token: localStorage.getItem("accessToken")
        }
      })
      // console.log(data);
      // const fiteredData = data.filter(el => el.Question.subject === subject)
      console.log(data);
      setUserAnswer(data)
      const kunjab = data[pageNum].QuestionWeeklyTest.QuestionKeyWeeklyTests.filter(el => el.correct === true)
      setKeyAnswer(kunjab)
      console.log(kunjab, `kunjab`);
      setIsLoadingFinish(true)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAnswersFromDB()
  }, [pageNum]);

  getYear = new Date().getFullYear(); //2022
  getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    new Date()
  );
  getDay = new Date().getDate();

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div>
          <>
            {isLoadingFinish ? (
              <div className="question-container">
                <div className="filter-container">
                  <select name="" id="">
                    <option value="">TO 01</option>
                    <option value="">TO 02</option>
                    <option value="">TO 03</option>
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
                  {/* <h3>INI GATAU APA</h3> */}
                  <h3>{userAnswers[pageNum].createdAt.split("T")[0]}</h3>
                </div>

                <div className="question-answers">
                  {userAnswers[pageNum].QuestionWeeklyTest.question.split("~").map((so, idx) => {
                    return <Latex key={idx}>{so}</Latex>;
                  })}

                  <form className="form-container">
                    {userAnswers[pageNum].QuestionWeeklyTest.QuestionKeyWeeklyTests.map((el) => (
                      <label
                        key={el.id}
                        className={answers.includes(el.id) ? "active" : null}
                      >
                        <input
                          type="radio"
                          name="radio"
                          checked={answers.includes(el.id)}
                        //   onChange={(e) => saveAnswer(e, el.id)}
                        />
                        <Latex>{el.answer}</Latex>
                      </label>
                    ))}
                  </form>
                </div>
                <div>INI PEMBAHASAN</div>
                <h3>Jabawan User: </h3>
                <Latex>{userAnswers[pageNum].QuestionKeyWeeklyTest.answer}</Latex>
                <h3>Jabawan Benar: </h3>
                <Latex>{keyAnswer[0].answer}</Latex>
              </div>
            ) : null}
          </>
        </div>
        ;
      </div>
    </>
  );
};

export default RaporTryout;
