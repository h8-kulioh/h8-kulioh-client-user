import React from "react";
import "../../css/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let { pathname: pathName } = useLocation();

  const handleNavigation = (url) => {
    navigate(url);
  };

  const logoutHandler = () => {
    localStorage.clear();
    handleNavigation("/login");
  };

  return (
    <div>
      <header className="header">
        <div></div>

        <nav className="main-nav">
          <ul className="main-nav-list">
            <li onClick={() => handleNavigation("/")}>
              <span
                className={`main-nav-link ${
                  pathName === "/" ? "active" : null
                }`}
              >
                Soal Harian
              </span>
            </li>
            <li onClick={() => handleNavigation("/tryout")}>
              <span
                className={`main-nav-link ${
                  pathName === "/tryout" ? "active" : null
                }`}
              >
                {" "}
                Tryout Mingguan
              </span>
            </li>
            <li onClick={() => handleNavigation("/rapor")}>
              <span
                className={`main-nav-link ${
                  pathName === `/rapor` ? "active" : null
                } ${pathName === `/rapor/soalharian` ? "active" : null} ${
                  pathName === `/rapor/soaltryout` ? "active" : null
                }`}
              >
                {" "}
                Rapor Siswa
              </span>
            </li>
            <li onClick={() => handleNavigation("/tasks")}>
              <span
                className={`main-nav-link ${
                  pathName === "/tasks" ? "active" : null
                }`}
              >
                Progress Belajar
              </span>
            </li>
            <li onClick={() => handleNavigation("/chat")}>
              <span
                className={`main-nav-link ${
                  pathName === "/chat" ? "active" : null
                }`}
              >
                Diskusi
              </span>
            </li>
            <li className="dropdown">
              <span
                className={`main-nav-link ${
                  pathName === "/profile" ? "active" : null
                }`}
              >
                Profile
              </span>
              <ul className="isi-dropdown">
                <li onClick={() => handleNavigation("/profile")}>
                  <span>Edit Profile</span>
                </li>
                <li onClick={() => logoutHandler()}>
                  <span>Logout</span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
