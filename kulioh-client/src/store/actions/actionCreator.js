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
        let majors1 = loginUser.data.majors[0].University.name + `-` + loginUser.data.majors[0].name
        let majors2 = loginUser.data.majors[1].University.name + `-` + loginUser.data.majors[1].name
        localStorage.setItem("accessToken", loginUser.data.access_token);
        localStorage.setItem("major1", majors1);
        localStorage.setItem("major2", majors2);
        localStorage.setItem("name", loginUser.data.name)
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};
