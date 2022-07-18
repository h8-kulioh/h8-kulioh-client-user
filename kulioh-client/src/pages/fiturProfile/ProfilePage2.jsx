import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
import "../../css/LoginPage.css";
import axios from "axios";

const ProfilePage = () => {
  const initialStateObj = useMemo(() => {
    return {
      email: "",
      name: "",
      univ1: 0,
      univ2: 0,
      major1: 0,
      major2: 0,
      userMajorId1: 0,
      userMajorId2: 0,
    };
  }, []);
  const { universities, majors } = useSelector((store) => store.univReducer);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [adminObj, setAdminObj] = useState(initialStateObj);
  const [listMajor1, setListMajor1] = useState([]);
  const [listMajor2, setListMajor2] = useState([]);

  const dispatch = useDispatch();
  const getUserData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/users/profile`,
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );

        console.log(data);
        setAdminObj({
          email: data.email,
          name: data.name,
          univ1: data.UserMajors[0].Major.University.id,
          univ2: data.UserMajors[1].Major.University.id,
          major1: data.UserMajors[0].Major.id,
          major2: data.UserMajors[1].Major.id,
          userMajorId1: data.UserMajors[0].id,
          userMajorId2: data.UserMajors[1].id,
        });
        resolve({
          univ1: data.UserMajors[0].Major.University.id,
          univ2: data.UserMajors[1].Major.University.id,
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const format = {
        name: adminObj.name,
        major: [
          {
            UserMajorId: adminObj.userMajorId1,
            MajorId: adminObj.major1,
          },
          {
            UserMajorId: adminObj.userMajorId2,
            MajorId: adminObj.major2,
          },
        ],
      };
      console.log(format);
      await axios.put(
        `http://localhost:3001/users/profile`,
        {
          format,
        },
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log("here");
      getUserData();
      console.log(`berhasil edit user`);
    } catch (err) {
      console.log(err);
    }
  };

  const getMajor = async (id1, id2) => {
    try {
      console.log(id1, id2);
      const response1 = await axios.get(
        `http://localhost:3001/majorsroute/major/?UniversityId=${id1}`
      );
      const response2 = await axios.get(
        `http://localhost:3001/majorsroute/major/?UniversityId=${id2}`
      );

      // console.log(response1.data);
      // console.log(response2.data);
      setListMajor1(response1.data);
      setListMajor2(response2.data);
      //   console.log(`masuk`, `funclocal`);
      //   setIsLoadingFinish(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData().then((data) => {
      setIsLoadingFinish(true);
      dispatch(actionCreator.fetchUniv()).then(() => {
        getMajor(data.univ1, data.univ2);
      });
    });
  }, [dispatch]);

  return isLoadingFinish ? (
    <>
      <Navbar />
      <div className="login-container">
        <h1>Kulioh</h1>
        <div className="form-container">
          <form onSubmit={(e) => submitHandler(e)} className="form-component">
            <input
              disabled
              type="email"
              placeholder="EMAIL"
              value={adminObj.email}
              // onChange={(e) =>
              //     setAdminObj({ ...adminObj, email: e.target.value })
              // }
            />
            <input
              type="TEXT"
              placeholder="Name"
              value={adminObj.name}
              onChange={(e) =>
                setAdminObj({ ...adminObj, name: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setAdminObj({ ...adminObj, univ1: e.target.value })
              }
              value={adminObj.univ1}
              className="form-select"
              aria-label="Default select example"
            >
              {universities.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) =>
                setAdminObj({ ...adminObj, major1: e.target.value })
              }
              value={adminObj.major1}
              className="form-select"
              aria-label="Default select example"
            >
              {listMajor1.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setAdminObj({ ...adminObj, univ2: e.target.value })
              }
              value={adminObj.univ2}
              className="form-select"
              aria-label="Default select example"
            >
              {universities.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) =>
                setAdminObj({ ...adminObj, major2: e.target.value })
              }
              value={adminObj.major2}
              className="form-select"
              aria-label="Default select example"
            >
              {listMajor2.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <button className="btn" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <p>loading</p>
  );
};

export default ProfilePage;
