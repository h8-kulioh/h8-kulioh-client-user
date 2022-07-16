import React from "react";
import "../../css/Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let { pathname: pathName } = useLocation();

  const handleNavigation = (url) => {
    navigate(url);
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
            <li>
              <span className="main-nav-link">Profil</span>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
