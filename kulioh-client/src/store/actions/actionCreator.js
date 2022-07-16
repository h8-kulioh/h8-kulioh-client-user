import axios from "axios";
import * as actionType from "./actionType";
const url = "http://localhost:3001";

export const fetchDailyQ = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("here action creator");
        const response = await axios.get(`${url}/questions/daily`, {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyMkBlbWFpbC5jb20iLCJyb2xlIjoiUmVndWxhciIsImlhdCI6MTY1Nzk4MDY1M30.3g2HLtM6L86jzhb0Elhjc5j82pZKiJg7edUWofg6o4A",
          },
        });

        dispatch({
          type: actionType.DAILY_Q_READ,
          payload: response.data,
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const login = (adminObj) => {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        // const response = await axios.post(`${url}/login`, adminObj);
        localStorage.setItem("accessToken", "iniAccessTokenDummy");
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};
