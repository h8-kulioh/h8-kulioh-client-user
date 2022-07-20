import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/HomePage.css";
import "../../css/LandingRapor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SVG from "../../components/ReusableComponents/SVG";
import loading from "../../assets/loading2.gif";
import ReactTooltip from "react-tooltip";
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
      perAll: 0,
    };
  }, []);

  const initialStateWeekObj = useMemo(() => {
    return {
      jumlahBenar: 0,
      jumlahSoal: 0,
      perPU: 0,
      perPPU: 0,
      perPK: 0,
      perPBM: 0,
      perAll: 0,
    };
  }, []);

  const [dataObj, setDataObj] = useState(initialStateObj);
  const [dataWeekObj, setDataWeekObj] = useState(initialStateWeekObj);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const getRaporDaily = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/stat`, {
        headers: {
          access_token: localStorage.getItem("accessToken"),
        },
      });

      const response = await axios.get(
        `http://localhost:3001/users/tryOutStat`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(response);
      setDataObj({
        jumlahBenar: data.jumlahBenar,
        jumlahSoal: data.jumlahSoal,
        perPU: data.perPU,
        perPPU: data.perPPU,
        perPK: data.perPK,
        perPBM: data.perPBM,
        perAll: data.perAll,
      });

      setDataWeekObj({
        jumlahBenar: response.data.jumlahBenar,
        jumlahSoal: response.data.jumlahSoal,
        perPU: response.data.perPU,
        perPPU: response.data.perPPU,
        perPK: response.data.perPK,
        perPBM: response.data.perPBM,
        perAll: response.data.perAll,
      });

      setIsLoadingFinish(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRaporDaily();
  }, []);

  console.log(dataWeekObj);

  return (
    <>
      <Navbar />
      <div className="main-container">
        {isLoadingFinish ? (
          <div className="rapor-container">
            <h1 className="title">Rapor Soal Harian</h1>
            <div className="nilai-container">
              <div className="one-container">
                <SVG theData={dataObj.perAll} theClass={"svg-container"} />
                <h2
                  className="lihat-pembahasan"
                  onClick={() => handleNavigation("/rapor/soalharian")}
                >
                  Lihat Pembahasan
                </h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataObj.perPPU}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes">PPU</h2>
              </div>
              <div className="one-container-lain">
                <SVG theData={dataObj.perPU} theClass={"svg-container-small"} />
                <h2 className="subtes">PU</h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataObj.perPBM}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes">PBM</h2>
              </div>
              <div className="one-container-lain">
                <SVG theData={dataObj.perPK} theClass={"svg-container-small"} />
                <h2 className="subtes">PK</h2>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={loading} alt="" />
          </div>
        )}
      </div>
      <div className="main-container">
        {isLoadingFinish ? (
          <div className="rapor-container">
            <h1 className="title">Rapor Tryout Mingguan</h1>
            <div className="nilai-container">
              <div className="one-container">
                <SVG theData={dataWeekObj.perAll} theClass={"svg-container"} />
                <h2
                  className="lihat-pembahasan"
                  onClick={() => handleNavigation("/rapor/tryout")}
                >
                  Lihat Pembahasan
                </h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataWeekObj.perPPU}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes rapor">PPU</h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataWeekObj.perPU}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes rapor">PU </h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataWeekObj.perPBM}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes rapor">PBM</h2>
              </div>
              <div className="one-container-lain">
                <SVG
                  theData={dataWeekObj.perPK}
                  theClass={"svg-container-small"}
                />
                <h2 className="subtes rapor">PK</h2>
              </div>
            </div>
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

export default LandingRapor;
