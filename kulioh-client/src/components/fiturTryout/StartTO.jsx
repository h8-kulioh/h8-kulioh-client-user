import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../../store/actions/actionType";
import "../../css/StartTO.css";
import start from "../../assets/start.png";

const StartTO = () => {
  const dispatch = useDispatch();
  let getYear = new Date().getFullYear();
  let getMonth = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    new Date()
  );
  let getDay = new Date().getDate();

  const handleClick = () => {
    let now = new Date().getTime();
    localStorage.setItem("startTime", now);
    dispatch({
      type: actionType.WEEKLY_Q_ISSTARTED,
    });
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
