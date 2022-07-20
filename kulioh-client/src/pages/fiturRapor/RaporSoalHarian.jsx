import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import "../../css/QuestionContainer.css";
import Latex from "react-latex";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SVG from "../../components/ReusableComponents/SVG";
import * as actionCreator from "../../store/actions/actionCreator";
const url = "http://localhost:3001";

const RaporSoalHarian = () => {
  let dispatch = useDispatch();
  // const [questions, setQuestions] = useState([]);
  const questions = useSelector((store) => store.dailyQReducer.questions);
  const [pageNum, setPageNum] = useState(0);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [subject, setSubject] = useState("PK");
  const [userAnswers, setUserAnswer] = useState([]);
  const [keyAnswer, setKeyAnswer] = useState();
  const [video, setVideo] = useState("");
  const [date, setDate] = useState([]);
  const [role, setRole] = useState("");

  const movePage = (e, page) => {
    e.preventDefault();
    setPageNum(page);
  };

  // console.log(date);
  console.log(userAnswers);

  const getAnswersFromDB = async (theRole) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/users/allAnswer`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );

      const fiteredData = data
        .filter((el) => el.Question.subject === subject)
        .sort((a, b) => a.QuestionId < b.QuestionId);
      // console.log(fiteredData);
      setUserAnswer(fiteredData);
      // console.log(fiteredData);

      // console.log(data);
      console.log(theRole);
      if (theRole === "Premium") {
        console.log("ini premium kan");
        const response = await axios.get(
          `http://localhost:3001/videos/daily`,
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        const videoId = response.data.filter(
          (el) => el.id === fiteredData[0].Question.id
        );
        // console.log(videoId[0].videoLink);
        setVideo(videoId[0].videoLink);
      }

      const dateArray = fiteredData.map((el) => {
        const theDate = new Date(el.createdAt);
        let getYear = theDate.getFullYear();
        const getMonth = theDate.toLocaleString("id-ID", { month: "long" });
        let getDay = theDate.getDate();
        return `${getDay} ${getMonth} ${getYear}`;
      });

      setDate(dateArray);

      const kunjab = fiteredData[pageNum].Question.QuestionKeys.filter(
        (el) => el.correct === true
      );

      setKeyAnswer(kunjab);
      // console.log(kunjab, `kunjab`);
      setIsLoadingFinish(true);

      // console.log(theDate);
    } catch (err) {
      console.log(err);
    }
  };

  const paymentHandler = async () => {
    // console.log("INI MASUK KE MIDTRANS DONGGG");
    try {
      const response = await axios.post(`${url}/users/handlePayment`, {

      }, {
        headers: {
          access_token: localStorage.getItem("accessToken")
        }
      })
      console.log(response.data.TokenPayment);
      window.snap.pay(response.data.TokenPayment, {
        onSuccess: async (result) => {
          await axios.patch(`${url}/users/premium`, {
            role: `Premium`
          },
            {
              headers: {
                access_token: localStorage.getItem("accessToken")
              }
            })
          console.log(result);
          setRole("Premium")
        },
        onPending: async (result) => {
          await axios.patch(`${url}/users/premium`, {
            role: `Premium`
          },
            {
              headers: {
                access_token: localStorage.getItem("access_Token")
              }
            })
          console.log(result);
          setRole("Premium")

        },
        onError: function (result) {
          console.log(`on Error`);
        },
        onClose: function (result) {
          console.log(`close`);
        }
      })

    }
    catch (err) {
      console.log(err);
    }
  };

  const changeSubject = (e) => {
    e.preventDefault();
    setSubject(e.target.value);
  };

  useEffect(() => {
    dispatch(actionCreator.getUserData()).then((data) => {
      setRole(data.role);
      let theRole = data.role;
      getAnswersFromDB(theRole);
    });
  }, [subject, pageNum, role]);

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
                          key={q.id}
                          onClick={(e) => movePage(e, idx)}
                          className={`btn-pagination ${pageNum === idx ? "active" : ""
                            } ${q.QuestionKey.correct ? "correct" : "wrong"} `}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                  <h3>Soal Harian {date[pageNum]}</h3>
                  {/* <h3>{getDate}</h3> */}
                </div>

                <div className="question-answers">
                  {userAnswers[pageNum].Question.question
                    .split("~")
                    .map((so, idx) => {
                      return <Latex key={idx}>{so}</Latex>;
                    })}
                  {/* <Latex>{userAnswers[pageNum].Question.question}</Latex> */}

                  <form className="form-container-rapor">
                    {userAnswers[pageNum].Question.QuestionKeys.map((el) => (
                      <label
                        key={el.id}
                        className={`${userAnswers[pageNum].QuestionKey.correct &&
                          userAnswers[pageNum].QuestionKey.answer === el.answer
                          ? "correct"
                          : ""
                          } ${!userAnswers[pageNum].QuestionKey.correct &&
                            keyAnswer[0].answer === el.answer
                            ? "theCorrect"
                            : ""
                          } ${!userAnswers[pageNum].QuestionKey.correct &&
                            userAnswers[pageNum].QuestionKey.answer === el.answer
                            ? "wrong"
                            : ""
                          } `}
                      >
                        <input
                          className={`input-pembahasan ${userAnswers[pageNum].QuestionKey.correct &&
                            userAnswers[pageNum].QuestionKey.answer ===
                            el.answer
                            ? "correct"
                            : ""
                            } ${!userAnswers[pageNum].QuestionKey.correct &&
                              keyAnswer[0].answer === el.answer
                              ? "theCorrect"
                              : ""
                            } ${!userAnswers[pageNum].QuestionKey.correct &&
                              userAnswers[pageNum].QuestionKey.answer ===
                              el.answer
                              ? "wrong"
                              : ""
                            } `}
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

export default RaporSoalHarian;