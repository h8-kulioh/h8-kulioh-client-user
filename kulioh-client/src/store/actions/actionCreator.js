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
            access_token: localStorage.getItem("accessToken"),
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
        const loginUser = await axios.post(
          `http://localhost:3001/users/login`,
          {
            email: adminObj.email,
            password: adminObj.password,
          }
        );
        let majors1 =
          loginUser.data.majors[0].University.name +
          `-` +
          loginUser.data.majors[0].name;
        let majors2 =
          loginUser.data.majors[1].University.name +
          `-` +
          loginUser.data.majors[1].name;
        localStorage.setItem("accessToken", loginUser.data.access_token);
        localStorage.setItem("major1", majors1);
        localStorage.setItem("major2", majors2);
        localStorage.setItem("name", loginUser.data.name);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const register = (adminObj) => {
  return () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(adminObj);
        await axios.post(`http://localhost:3001/users/register`, adminObj);

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const fetchUniv = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${url}/universityroute/university`);

        dispatch({
          type: actionType.UNIV_READS,
          payload: response.data,
        });
        // console.log(response.data, `action creator`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const fetchMajors = (univId) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${url}/majorsroute/major/?UniversityId=${univId}`
        );

        // console.log(response.data);

        dispatch({
          type: actionType.UNIV_MAJOR_READS,
          payload: response.data,
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const getUserData = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`${url}/users/profile`, {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        });

        // console.log(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const paymentMidtrans = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(`${url}/users/handlePayment`, {

        }, {
          headers: {
            access_token: localStorage.getItem("accessToken")
          }
        })
        window.snap.pay(response.data.token, {
          onSuccess: async (result) => {
            await axios.patch(`${url}/users/premimm`, {
              role: `Premium`
            },
              {
                headers: {
                  access_token: localStorage.getItem("accessToken")
                }
              })
            console.log(result);

          },
          onPending: async (result) => {
            await axios.patch(`${url}/users/premimm`, {
              role: `Premium`
            },
              {
                headers: {
                  access_token: localStorage.getItem("access_Token")
                }
              })
            console.log(result);

          },
          onError: function (result) {
            console.log(`on Error`);
          },
          onClose: function (result) {
            console.log(`close`);
          }
        })
        resolve()
      }
      catch (err) {
        reject(err)
      }
    })
  }
}
