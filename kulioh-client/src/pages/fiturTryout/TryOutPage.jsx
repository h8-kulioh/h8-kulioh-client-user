import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import QuestionTOContainer from "../../components/fiturTryout/QuestionTOContainer";
import CountdownNextTO from "../../components/fiturTryout/CountdownNextTO";
import StartTO from "../../components/fiturTryout/StartTO";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import * as actionCreator from "../../store/actions/actionCreator";
import axios from "axios";
const url = "http://localhost:3001";

const TryoutPage = () => {
  const dispatch = useDispatch();
  const isAnswered = useSelector((store) => store.weeklyQReducer.isAnswered);
  const isAlreadyStart = useSelector(
    (store) => store.weeklyQReducer.isAlreadyStart
  );
  const startTime = localStorage.getItem("startTime");
  const [isTodayTO, setIsTodayTO] = useState(false);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  let ToIsOnDay = 2;
  const isTodayTOFunc = () => {
    const now = new Date();
    const nowDay = now.getDay();
    if (nowDay === ToIsOnDay) {
      setIsTodayTO(true);
    }
  };

  const getAnswersFromDB = async () => {
    try {
      let getYear = new Date().getFullYear(); //2022
      let getMonth = new Date().getMonth() + 1;
      let getDay = new Date().getDate();

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
        `${url}/questions/answers/weekly/${todayFormat}`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      ); // YYYYMMDD

      console.log(response.data);
      // console.log(response.data.statusCode, `--------`);
      if (!response || response.data.length === 0) {
        //if disini ga kepake, karena dia lgsg throw error
        // console.log(`data gaada--------`);
      } else {
        console.log(`data ada--------`);
        dispatch({ type: actionType.WEEKLY_Q_ISANSWERED });
      }
      setIsLoadingFinish(true);
    } catch (err) {
      // console.log(err);
      setIsLoadingFinish(true);
    }
  };

  let renderElement;
  // console.log(renderElement);
  if (!isTodayTO) {
    renderElement = <CountdownNextTO ToIsOnDay={ToIsOnDay} />;
  } else {
    // console.log(isAnswered);
    if (isAnswered) {
      renderElement = <CountdownNextTO ToIsOnDay={ToIsOnDay} />;
    } else {
      if (startTime !== null) {
        renderElement = <QuestionTOContainer />;
      } else {
        renderElement = <StartTO />;
      }
    }
  }

  useEffect(() => {
    isTodayTOFunc();
    getAnswersFromDB();
  }, [isAlreadyStart]);

  return (
    <>
      <Navbar />
      {isLoadingFinish ? (
        <>
          <div className="main-container">{renderElement}</div>
        </>
      ) : null}
    </>
  );
};

export default TryoutPage;
