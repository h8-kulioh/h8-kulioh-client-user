import React from "react";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
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
      major: []
    };
  }, []);

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

  const moveToLogin = async (e) => {
    navigate("/login");
  };
  const [adminObj, setAdminObj] = useState(initialStateObj);
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
  );
};

export default RegisterPage;
