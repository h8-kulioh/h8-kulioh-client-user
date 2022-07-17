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
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBlbWFpbC5jb20iLCJyb2xlIjoiUmVndWxhciIsImlhdCI6MTY1ODAzODUyNn0.QatiHgXbzrVaO7blhoFzgym6VeKtxpjdIVmEtwDNx7w",
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
