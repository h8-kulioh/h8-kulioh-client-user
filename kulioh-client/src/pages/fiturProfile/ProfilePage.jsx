import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
import { showError, showSuccess } from "../../helpers/swal";
import { useNavigate } from "react-router-dom";
import loading from "../../assets/loading2.gif";
import "../../css/ProfilePage.css";
import axios from "axios";
import logo from "../../assets/logo.png";

const ProfilePage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const initialStateObj = useMemo(() => {
    return {
      name: "",
      email: "",
      univ1: 0,
      univ1Name: "",
      univ2: 0,
      univ2Name: "",
      major1: 0,
      major1Name: "",
      major2: 0,
      major2Name: "",
      userMajorId1: 0,
      userMajorId2: 0,
    };
  }, []);
  const [adminObj, setAdminObj] = useState(initialStateObj);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [isAlreadyChooseUniv1, setIsAlreadyChooseUniv1] = useState(false);
  const [isAlreadyChooseUniv2, setIsAlreadyChooseUniv2] = useState(false);
  const [majorId1, setMajorId1] = useState(0);
  const { universities, majors } = useSelector((store) => store.univReducer);
  //   console.log(universities);
  // console.log(majors);

  useEffect(() => {
    dispatch(actionCreator.getUserData())
      .then((data) => {
        // console.log("here use effect");
        if (adminObj.name === "") {
          setAdminObj({
            name: data.name,
            email: data.email,
            univ1: data.UserMajors[0].Major.University.id,
            univ1Name: data.UserMajors[0].Major.University.name,
            univ2: data.UserMajors[1].Major.University.id,
            univ2Name: data.UserMajors[1].Major.University.name,
            major1: data.UserMajors[0].Major.id,
            major1Name: data.UserMajors[0].Major.name,
            major2: data.UserMajors[1].Major.id,
            major2Name: data.UserMajors[1].Major.name,
            userMajorId1: data.UserMajors[0].id,
            userMajorId2: data.UserMajors[1].id,
          });
        }

        dispatch(actionCreator.fetchUniv());
      })
      .then(() => {
        setIsLoadingFinish(true);
      });
  }, [dispatch, majors, adminObj.name]);

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

      await axios.put(`http://localhost:3001/users/profile`, format, {
        headers: {
          access_token: localStorage.getItem("accessToken"),
        },
      });
      dispatch(actionCreator.getUserData());
      console.log(`berhasil edit user`);

      let localMajor1 = adminObj.univ1Name + "-" + adminObj.major1Name;
      let localMajor2 = adminObj.univ2Name + "-" + adminObj.major2Name;

      localStorage.setItem("major1", localMajor1);
      localStorage.setItem("major2", localMajor2);

      showSuccess("Sukses Edit Profil");
    } catch (err) {
      // console.log(err);
      showError(err.reponse.data.message);
    }
  };

  const chooseUniv1 = (e) => {
    const univName = document.getElementById("universities").value;
    // console.log(univName);
    const univNameArray = universities.map((el) => el.name);
    if (univNameArray.includes(univName)) {
      const univId = document.querySelector(
        "#ChooseUniversities option[value='" + univName + "']"
      ).dataset.value;
      setAdminObj({
        ...adminObj,
        major1: 0,
        major1Name: "",
        univ1: univId,
        univ1Name: univName,
      });
      dispatch(actionCreator.fetchMajors(univId)).then(() => {
        setIsAlreadyChooseUniv1(true);
      });
    }
  };

  const chooseUniv2 = (e) => {
    const univName = document.getElementById("universities2").value;
    // console.log(univName);
    const univNameArray = universities.map((el) => el.name);
    if (univNameArray.includes(univName)) {
      const univId = document.querySelector(
        "#ChooseUniversities2 option[value='" + univName + "']"
      ).dataset.value;
      setAdminObj({
        ...adminObj,
        major2: 0,
        major2Name: "",
        univ2: univId,
        univ2Name: univName,
      });
      dispatch(actionCreator.fetchMajors(univId)).then(() => {
        setIsAlreadyChooseUniv2(true);
      });
    }
  };

  const chooseMajor1 = (e) => {
    const majorName = document.getElementById("majors").value;
    // console.log(majorName);
    const majorNameArray = majors.map((el) => el.name);
    if (majorNameArray.includes(majorName)) {
      const majorId = document.querySelector(
        "#ChooseMajors option[value='" + majorName + "']"
      ).dataset.value;
      setAdminObj({
        ...adminObj,
        major1: majorId,
        major1Name: majorName,
      });
      setMajorId1(majorId);
    }
  };

  const chooseMajor2 = (e) => {
    const majorName = document.getElementById("majors2").value;
    // console.log(majorName);
    const majorNameArray = majors.map((el) => el.name);
    let majorId2;
    if (majorNameArray.includes(majorName)) {
      majorId2 = document.querySelector(
        "#ChooseMajors2 option[value='" + majorName + "']"
      ).dataset.value;
    }
    setAdminObj({
      ...adminObj,
      major2: majorId2,
      major2Name: majorName,
    });
  };

  const clear = (e) => {
    e.target.value = "";
    setAdminObj({
      ...adminObj,
      univ1: 0,
      univ1Name: "",
      major1: 0,
      major1Name: "",
    });
    setIsAlreadyChooseUniv1(false);
  };

  const clear2 = (e) => {
    e.target.value = "";
    setAdminObj({
      ...adminObj,
      univ2: 0,
      univ2Name: "",
      major2: 0,
      major2Name: "",
    });
    setIsAlreadyChooseUniv2(false);
  };
  const clearMajor1 = (e) => {
    e.target.value = "";
    chooseUniv1();
  };

  const clearMajor2 = (e) => {
    e.target.value = "";
    chooseUniv2();
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {isLoadingFinish ? (
          <div className="form-container">
            <form onSubmit={submitHandler} className="form-component">
              <div className="form-box">
                <label htmlFor="password">Name</label>
                <input
                  type="text"
                  value={adminObj.name}
                  onChange={(e) =>
                    setAdminObj({ ...adminObj, name: e.target.value })
                  }
                />
              </div>

              <div className="form-box">
                <label htmlFor="password">Universitas Pilihan 1</label>
                <input
                  type="text"
                  id="universities"
                  list="ChooseUniversities"
                  autoComplete="off"
                  onChange={(e) => chooseUniv1(e)}
                  onClick={clear}
                  onFocus={clear}
                  value={`${adminObj.univ1Name}`}
                />
                <datalist id="ChooseUniversities">
                  {universities.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              <div className="form-box">
                <label htmlFor="password">Jurusan Pilihan 1</label>{" "}
                <input
                  type="text"
                  id="majors"
                  list="ChooseMajors"
                  autoComplete="off"
                  onChange={(e) => chooseMajor1(e)}
                  onClick={clearMajor1}
                  onFocus={clearMajor1}
                  value={adminObj.major1Name}
                />
                <datalist id="ChooseMajors">
                  {majors.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              <div className="form-box">
                <label htmlFor="password">Universitas Pilihan 2</label>
                <input
                  type="text"
                  id="universities2"
                  list="ChooseUniversities2"
                  autoComplete="off"
                  onChange={(e) => chooseUniv2(e)}
                  onClick={clear2}
                  onFocus={clear2}
                  value={`${adminObj.univ2Name}`}
                />
                <datalist id="ChooseUniversities2">
                  {universities.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              <div className="form-box">
                <label htmlFor="password">Jurusan Pilihan 2</label>

                <input
                  type="text"
                  id="majors2"
                  list="ChooseMajors2"
                  autoComplete="off"
                  onChange={(e) => chooseMajor2(e)}
                  onClick={clearMajor2}
                  onFocus={clearMajor2}
                  value={adminObj.major2Name}
                />
                <datalist id="ChooseMajors2">
                  {majors.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              <button className="btn" type="submit">
                Edit Profil
              </button>
            </form>
          </div>
        ) : (
          <div>
            <img src={loading} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
