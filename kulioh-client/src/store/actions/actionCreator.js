import axios from "axios";
import * as actionType from "./actionType";
const url = "http://localhost:3000";

export const fetchDailyQ = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
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
