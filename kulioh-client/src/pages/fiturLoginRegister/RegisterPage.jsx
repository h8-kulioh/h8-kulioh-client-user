import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
import { showError, showSuccess } from "../../helpers/swal";
import { useNavigate } from "react-router-dom";
import "../../css/LoginPage.css";

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
  const [isAlreadyChooseUniv, setIsAlreadyChooseUniv] = useState(false);
  const { universities, majors } = useSelector((store) => store.univReducer);
  // console.log(universities);
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
        navigate("/");
        showSuccess(`Register Success!`);
        setAdminObj(initialStateObj);
      })
      .catch((err) => {
        showError(err);
      });
  };

  const moveToLogin = async (e) => {
    navigate("/login");
  };

  const chooseUniv = (e) => {
    const univName = document.getElementById("universities").value;
    console.log(univName);
    const univNameArray = universities.map((el) => el.name);
    if (univNameArray.includes(univName)) {
      const univId = document.querySelector(
        "#ChooseUniversities option[value='" + univName + "']"
      ).dataset.value;
      dispatch(actionCreator.fetchMajors(univId)).then(() => {
        setIsAlreadyChooseUniv(true);
      });
    }
  };

  const clear = (e) => {
    e.target.value = "";
    setIsAlreadyChooseUniv(false);
  };
  const clearMajor = (e) => {
    e.target.value = "";
  };

  return (
    <>
      {isLoadingFinish ? (
        <div className="login-container">
          <h1>Kulioh</h1>
          <div className="form-container">
            <form onSubmit={submitHandler} className="form-component">
              <input
                type="email"
                placeholder="EMAIL"
                value={adminObj.email}
                onChange={(e) =>
                  setAdminObj({ ...adminObj, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="NAME"
                value={adminObj.name}
                onChange={(e) =>
                  setAdminObj({ ...adminObj, name: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="PASSWORD"
                value={adminObj.password}
                onChange={(e) =>
                  setAdminObj({ ...adminObj, password: e.target.value })
                }
              />

              <input
                type="text"
                id="universities"
                list="ChooseUniversities"
                placeholder="PILIH UNIVERSITAS"
                onChange={(e) => chooseUniv(e)}
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

              {isAlreadyChooseUniv ? (
                <>
                  <input
                    type="text"
                    id="majors"
                    list="ChooseMajors"
                    placeholder="PILIH JURUSAN"
                    // onChange={(e) => chooseMajor(e)}
                    onClick={clearMajor}
                    onFocus={clearMajor}
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
