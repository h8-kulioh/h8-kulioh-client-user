import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
import { showError, showSuccess } from "../../helpers/swal";
import { useNavigate } from "react-router-dom";
import "../../css/LoginPage.css";
import logo from "../../assets/logo.png";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const initialStateObj = useMemo(() => {
    return {
      email: "",
      name: "",
      password: "",
      major: [],
    };
  }, []);
  const [adminObj, setAdminObj] = useState(initialStateObj);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [isAlreadyChooseUniv1, setIsAlreadyChooseUniv1] = useState(false);
  const [isAlreadyChooseUniv2, setIsAlreadyChooseUniv2] = useState(false);
  const [majorId1, setMajorId1] = useState(0);
  const { universities, majors } = useSelector((store) => store.univReducer);
  console.log(universities);
  // console.log(majors);

  useEffect(() => {
    dispatch(actionCreator.fetchUniv()).then(() => {
      setIsLoadingFinish(true);
    });
  }, [dispatch, majors]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(actionCreator.register(adminObj))
      .then(() => {
        navigate("/login");
        showSuccess(`Register Success!`);
        setAdminObj(initialStateObj);
      })
      .catch((err) => {
        showError(err.response.data.message);
      });
  };

  const moveToLogin = async (e) => {
    navigate("/login");
  };

  const chooseUniv1 = (e) => {
    const univName = document.getElementById("universities").value;
    // console.log(univName);
    const univNameArray = universities.map((el) => el.name);
    if (univNameArray.includes(univName)) {
      const univId = document.querySelector(
        "#ChooseUniversities option[value='" + univName + "']"
      ).dataset.value;
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
    setAdminObj({ ...adminObj, major: [majorId1, majorId2] });
  };

  const clear = (e) => {
    e.target.value = "";
    setIsAlreadyChooseUniv1(false);
  };

  const clear2 = (e) => {
    e.target.value = "";
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
      {isLoadingFinish ? (
        <div className="login-container">
          <h1>
            <img className="logo-in-login" src={logo} alt="" srcset="" /> Vinter
          </h1>
          <div className="form-container register">
            <form onSubmit={submitHandler} className="form-component">
              <div className="form-box">
                <label htmlFor="password">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="EMAIL"
                  value={adminObj.email}
                  onChange={(e) =>
                    setAdminObj({ ...adminObj, email: e.target.value })
                  }
                />
              </div>
              <div className="form-box">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="NAME"
                  value={adminObj.name}
                  onChange={(e) =>
                    setAdminObj({ ...adminObj, name: e.target.value })
                  }
                />
              </div>

              <div className="form-box">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="PASSWORD"
                  value={adminObj.password}
                  onChange={(e) =>
                    setAdminObj({ ...adminObj, password: e.target.value })
                  }
                />
              </div>

              <div className="form-box">
                <label htmlFor="password">Pilihan 1</label>
                <input
                  type="text"
                  id="universities"
                  list="ChooseUniversities"
                  placeholder="UNIVERSITAS PILIHAN 1"
                  autoComplete="off"
                  onChange={(e) => chooseUniv1(e)}
                  onClick={clear}
                  onFocus={clear}
                />
                <datalist id="ChooseUniversities">
                  {universities.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              {isAlreadyChooseUniv1 ? (
                <>
                  <div className="form-box">
                    <label htmlFor="password"></label>
                    <input
                      type="text"
                      id="majors"
                      list="ChooseMajors"
                      placeholder="JURUSAN PILIHAN 1"
                      autoComplete="off"
                      onChange={(e) => chooseMajor1(e)}
                      onClick={clearMajor1}
                      onFocus={clearMajor1}
                    />
                    <datalist id="ChooseMajors">
                      {majors.map((el) => {
                        return (
                          <option
                            data-value={el.id}
                            key={el.id}
                            value={el.name}
                          />
                        );
                      })}
                    </datalist>
                  </div>
                </>
              ) : null}

              <div className="form-box">
                <label htmlFor="password">Pilihan 2</label>
                <input
                  type="text"
                  id="universities2"
                  list="ChooseUniversities2"
                  placeholder="UNIVERSITAS PILIHAN 2"
                  autoComplete="off"
                  onChange={(e) => chooseUniv2(e)}
                  onClick={clear2}
                  onFocus={clear2}
                />
                <datalist id="ChooseUniversities2">
                  {universities.map((el) => {
                    return (
                      <option data-value={el.id} key={el.id} value={el.name} />
                    );
                  })}
                </datalist>
              </div>

              {isAlreadyChooseUniv2 ? (
                <>
                  <div className="form-box">
                    <label htmlFor="password"></label>
                    <input
                      type="text"
                      id="majors2"
                      list="ChooseMajors2"
                      placeholder="JURUSAN PILIHAN 2"
                      autoComplete="off"
                      onChange={(e) => chooseMajor2(e)}
                      onClick={clearMajor2}
                      onFocus={clearMajor2}
                    />
                    <datalist id="ChooseMajors2">
                      {majors.map((el) => {
                        return (
                          <option
                            data-value={el.id}
                            key={el.id}
                            value={el.name}
                          />
                        );
                      })}
                    </datalist>
                  </div>
                </>
              ) : null}

              <button className="btn" type="submit">
                REGISTER
              </button>
            </form>

            <p className="text-after-submit">
              Sudah punya akun?
              <span className="link-clear" onClick={moveToLogin}>
                Login
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RegisterPage;
