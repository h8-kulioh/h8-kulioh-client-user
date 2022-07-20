import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import "../../css/StartTO.css";
import start from "../../assets/start.png";
import axios from "axios";


const StartTO = () => {
  const dispatch = useDispatch();
  let getYear = new Date().getFullYear();
  let getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    new Date()
  );
  let getDay = new Date().getDate();

  const [startTime, setStartTime] = useState(null)
  const postStartTime = async (timeNow) => {
    try {
      const thisday = new Date();
      let year = thisday.getFullYear();
      let month = thisday.getMonth() + 1;
      if (month < 10) {
        month = `0` + month.toLocaleString();
      }
      let date = thisday.getDate();
      const response = await axios.post(`http://localhost:3001/users/tryOut/${year}${month}${date}`, {
        tryoutstart: timeNow
      },
        {
          headers: {
            access_token: localStorage.getItem("accessToken")
          }
        })
      dispatch({
        type: actionType.WEEKLY_Q_ISSTARTED,
      });
      // console.log(response, `response start TO`);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleClick = () => {
    let now = new Date().getTime();
    // localStorage.setItem("startTime", now);
    postStartTime(now)

  };

  return (
    <div className="outer-start-to">
      <div className="start-to-container">
        <h2>
          Tryout Mingguan {getDay} {getMonth} {getYear}
        </h2>
        <button onClick={() => handleClick()}>Mulai</button>
      </div>
      <div>
        <img className="image-start" src={start} alt="" srcset="" />
      </div>
    </div>
  );
};

export default StartTO;
