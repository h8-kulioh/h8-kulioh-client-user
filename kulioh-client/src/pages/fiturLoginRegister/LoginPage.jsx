import React from "react";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import * as actionCreator from "../../store/actions/actionCreator";
import { showError, showSuccess } from "../../helpers/swal";
import { useNavigate } from "react-router-dom";
import "../../css/LoginPage.css";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const initialStateObj = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const [adminObj, setAdminObj] = useState(initialStateObj);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(actionCreator.login(adminObj))
      .then((data) => {
        // const { username, accessToken } = data;
        // localStorage.setItem("accessToken", accessToken);
        navigate("/");
        showSuccess(`Login Success!`);
        setAdminObj(initialStateObj);
      })
      .catch((err) => {
        showError(err);
      });
  };

  const moveToRegister = async (e) => {
    navigate("/register");
  };
  return (
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
            type="password"
            placeholder="PASSWORD"
            value={adminObj.password}
            onChange={(e) =>
              setAdminObj({ ...adminObj, password: e.target.value })
            }
          />

          <button className="btn" type="submit">
            LOGIN
          </button>
        </form>

        <p className="text-after-submit">
          Belum punya akun?
          <span className="link-clear" onClick={moveToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
