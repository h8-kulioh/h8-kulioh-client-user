import React from "react";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div>
      <header className="header">
        <div></div>

        <nav className="main-nav">
          <ul className="main-nav-list">
            <li>
              <span className="main-nav-link active">Soal Harian</span>
            </li>
            <li>
              <span className="main-nav-link"> Tryout Mingguan</span>
            </li>
            <li>
              <span className="main-nav-link">Progress Belajar</span>
            </li>
            <li>
              <span className="main-nav-link">Diskusi</span>
            </li>
            <li>
              <span className="main-nav-link " href="#">
                Profil
              </span>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
