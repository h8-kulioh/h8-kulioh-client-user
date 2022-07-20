import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import "../../css/QuestionContainer.css";
import Latex from "react-latex";
import { useState, useEffect } from "react";
import axios from "axios";
import SVG from "../../components/ReusableComponents/SVG";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
const url = "http://localhost:3001";
const RaporTryout = () => {
  let dispatch = useDispatch();

  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [userAnswers, setUserAnswer] = useState([]);
  const [keyAnswer, setKeyAnswer] = useState();
  const [date, setDate] = useState([]);
  const [role, setRole] = useState("");
  const [video, setVideo] = useState("");

  console.log(userAnswers);
  // console.log(keyAnswer);

  const movePage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };
  const getAnswersFromDB = async (theRole) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/users/tryOutAllAnswer`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      setUserAnswer(data);

      if (theRole === "Premium") {
        console.log("ini premium kan");
        const response = await axios.get(
          `http://localhost:3001/videos/all-videos`,
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        const videoId = response.data.filter(
          (el) => el.id === data[0].Question.id
        );
        // console.log(videoId[0].videoLink);
        setVideo(videoId[0].videoLink);
      }

      const kunjab = data[
        pageNum
      ].QuestionWeeklyTest.QuestionKeyWeeklyTests.filter(
        (el) => el.correct === true
      );
      setKeyAnswer(kunjab);
      // console.log(kunjab, `kunjab`);
      setIsLoadingFinish(true);
    } catch (err) {
      console.log(err);
    }
  };

  const paymentHandler = () => {
    console.log("INI MASUK KE MIDTRANS DONGGG");
  };

  useEffect(() => {
    dispatch(actionCreator.getUserData()).then((data) => {
      setRole(data.role);
      let theRole = data.role;
      getAnswersFromDB(theRole);
    });
  }, [pageNum]);

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
                          className={`btn-pagination ${
                            pageNum === idx ? "active" : ""
                          } ${
                            q.QuestionKeyWeeklyTest.correct
                              ? "correct"
                              : "wrong"
                          } `}
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
                  {userAnswers[pageNum].QuestionWeeklyTest.question
                    .split("~")
                    .map((so, idx) => {
                      return <Latex key={idx}>{so}</Latex>;
                    })}

                  <form className="form-container-rapor">
                    {userAnswers[
                      pageNum
                    ].QuestionWeeklyTest.QuestionKeyWeeklyTests.map((el) => (
                      <label
                        key={el.id}
                        className={`${
                          userAnswers[pageNum].QuestionKeyWeeklyTest.correct &&
                          userAnswers[pageNum].QuestionKeyWeeklyTest.answer ===
                            el.answer
                            ? "correct"
                            : ""
                        } ${
                          !userAnswers[pageNum].QuestionKeyWeeklyTest.correct &&
                          keyAnswer[0].answer === el.answer
                            ? "theCorrect"
                            : ""
                        } ${
                          !userAnswers[pageNum].QuestionKeyWeeklyTest.correct &&
                          userAnswers[pageNum].QuestionKeyWeeklyTest.answer ===
                            el.answer
                            ? "wrong"
                            : ""
                        } `}
                      >
                        <input
                          type="radio"
                          name="radio"
                          checked={answers.includes(el.id)}
                          //   onChange={(e) => saveAnswer(e, el.id)}
                          className={`input-pembahasan ${
                            userAnswers[pageNum].QuestionKeyWeeklyTest
                              .correct &&
                            userAnswers[pageNum].QuestionKeyWeeklyTest
                              .answer === el.answer
                              ? "correct"
                              : ""
                          } ${
                            !userAnswers[pageNum].QuestionKeyWeeklyTest
                              .correct && keyAnswer[0].answer === el.answer
                              ? "theCorrect"
                              : ""
                          } ${
                            !userAnswers[pageNum].QuestionKeyWeeklyTest
                              .correct &&
                            userAnswers[pageNum].QuestionKeyWeeklyTest
                              .answer === el.answer
                              ? "wrong"
                              : ""
                          } `}
                        />
                        <Latex>{el.answer}</Latex>
                      </label>
                    ))}
                  </form>
                </div>
                <div className="rapor-video-pembahasan">Video Pembahasan</div>
                {role === "Premium" ? (
                  <iframe
                    className="video"
                    width="560"
                    height="315"
                    src={video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                ) : (
                  <div className="premium-button-container">
                    <h2>Ingin Mengakses Video Pembahasan?</h2>
                    <button onClick={() => paymentHandler()}>
                      Berlangganan
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

export default RaporTryout;
