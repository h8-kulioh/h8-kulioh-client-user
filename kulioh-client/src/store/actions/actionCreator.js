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
            access_token: localStorage.getItem("accessToken")
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
        const loginUser = await axios.post(`http://localhost:3001/users/login`, {
          email: adminObj.email,
          password: adminObj.password
        })
        // console.log(loginUser, `data login`);
        localStorage.setItem("accessToken", loginUser.data.access_token);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};
