import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import "../../css/LandingRapor.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const LandingRapor = () => {
  let navigate = useNavigate();

  const handleNavigation = (url) => {
    navigate(url);
  };

  const initialStateObj = useMemo(() => {
    return {
      jumlahBenar: 0,
      jumlahSoal: 0,
      perPU: 0,
      perPPU: 0,
      perPK: 0,
      perPBM: 0,
      perAll: 0
    }
  }, [])
  const [dataObj, setDataObj] = useState(initialStateObj)
  const [isLoadingFinish, setIsLoadingFinish] = useState(false)
  const getRaporDaily = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/stat`, {
        headers: {
          access_token: localStorage.getItem("accessToken")
        }
      })
      // console.log(data);
      setDataObj({
        jumlahBenar: data.jumlahBenar,
        jumlahSoal: data.jumlahSoal,
        perPU: data.perPU,
        perPPU: data.perPPU,
        perPK: data.perPK,
        perPBM: data.perPBM,
        perAll: data.perAll
      })
      setIsLoadingFinish(true)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRaporDaily()
  }, [])

  return (
    isLoadingFinish ? (

      <>
        <Navbar />
        <div className="main-container">
          <div className="rapor-container">
            <h1 className="title">Rapor Soal Harian</h1>
            <div className="nilai-container">
              <div className="one-container">
                <h1 className="main">{dataObj.perAll}%</h1>
                <h2
                  className="lihat-pembahasan"
                  onClick={() => handleNavigation("/rapor/soalharian")}
                >
                  Lihat Pembahasan
                </h2>
              </div>
              <div className="one-container-lain">
                <h1>{dataObj.perPPU}%</h1>
                <h2 className="subtes">PPU</h2>
              </div>
              <div className="one-container-lain">
                <h1>{dataObj.perPU}%</h1>
                <h2 className="subtes">PU</h2>
              </div>
              <div className="one-container-lain">
                <h1>{dataObj.perPBM}%</h1>
                <h2 className="subtes">PBM</h2>
              </div>
              <div className="one-container-lain">
                <h1>{dataObj.perPK}%</h1>
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
    ) : <p>loading</p>
  );
};

export default LandingRapor;

