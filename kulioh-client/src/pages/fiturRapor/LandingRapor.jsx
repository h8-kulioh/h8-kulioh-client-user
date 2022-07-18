import React from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import "../../css/LandingRapor.css";
import { useNavigate } from "react-router-dom";

const LandingRapor = () => {
  let navigate = useNavigate();

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="rapor-container">
          <h1 className="title">Rapor Soal Harian</h1>
          <div className="nilai-container">
            <div className="one-container">
              <h1 className="main">50%</h1>
              <h2
                className="lihat-pembahasan"
                onClick={() => handleNavigation("/rapor/soalharian")}
              >
                Lihat Pembahasan
              </h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PPU</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PU</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PBM</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PK</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container">
        <div className="rapor-container">
          <h1 className="title">Rapor Tryout Mingguan</h1>
          <div className="nilai-container">
            <div className="one-container">
              <h1 className="main">50%</h1>
              <h2
                className="lihat-pembahasan"
                onClick={() => handleNavigation("/rapor/tryout")}
              >
                Lihat Pembahasan
              </h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PPU</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PU</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PBM</h2>
            </div>
            <div className="one-container-lain">
              <h1>40%</h1>
              <h2 className="subtes">PK</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingRapor;
