import { useEffect, useState, useMemo } from "react";
import "../../css/HomePage.css";
import "../../css/LandingRapor.css";
import "../../css/LandingTask.css";
import Navbar from "../../components/ReusableComponents/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js"
import { Doughnut } from 'react-chartjs-2'
export default function LandingTask() {
  const navigate = useNavigate();
  Chart.register(Tooltip, Title, ArcElement, Legend)
  const handleNavigation = (url) => {
    navigate(url);
  };

  const initialStateObj = useMemo(() => {
    return {
      jumlahtodos: 0,
      jumlahDone: 0,
      perPU: 0,
      perPPU: 0,
      perPK: 0,
      perPBM: 0,
      perAll: 0,
    };
  }, []);

  const [dataObj, setDataObj] = useState(initialStateObj);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const getPercentage = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/taskStat`, {
        headers: {
          access_token: localStorage.getItem("accessToken"),
        },
      });
      setDataObj({
        jumlahtodos: data.jumlahtodos,
        jumlahDone: data.jumlahDone,
        perPU: data.perPU,
        perPPU: data.perPPU,
        perPK: data.perPK,
        perPBM: data.perPBM,
        perAll: data.perAll,
      });
      setIsLoadingFinish(true);
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    getPercentage();
  }, []);

  return isLoadingFinish ? (
    <>
      <Navbar />

      <div className="main-container">
        <div className="rapor-container">
          <h1 className="title">Progress Belajar</h1>
          <div className="nilai-container">
            <div className="one-container">
              <h1 className="main">{Math.floor(dataObj.perAll)}%</h1>
              <h2 className="lihat-pembahasan">Semua Subtes</h2>
              {/* <div style={{ width: '10%' }}> */}
              <Doughnut
                data={{
                  datasets: [{
                    label: `Percentage PK`,
                    data: [(dataObj.perAll), (100 - (dataObj.perAll))],
                    backgroundColor: [
                      'red',
                      'blue',
                    ]
                  }
                  ],

                }
                }
              />
              {/* </div> */}
            </div>
            <div className="one-container-lain">
              <h1>{Math.floor(dataObj.perPPU)}%</h1>
              <h2
                onClick={() => handleNavigation("/tasks/ppu")}
                className="subtes"
              >
                PPU
              </h2>
            </div>
            <div className="one-container-lain">
              <h1>{Math.floor(dataObj.perPU)}%</h1>
              <h2
                onClick={() => handleNavigation("/tasks/pu")}
                className="subtes"
              >
                PU
              </h2>
            </div>
            <div className="one-container-lain">
              <h1>{Math.floor(dataObj.perPK)}%</h1>
              <h2
                onClick={() => handleNavigation("/tasks/pbm")}
                className="subtes"
              >
                PBM
              </h2>
            </div>
            <div className="one-container-lain">
              <h1>{Math.floor(dataObj.perPK)}%</h1>
              <h2
                onClick={() => handleNavigation("/tasks/pk")}
                className="subtes"
              >
                PK
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Loading</p>
  );
}

/*

 <Navbar />
        <div className="mt-3">
          <Container>
            <div className="row">
              <div className="col-md-6">
                <CardLandingPpu percentage={dataObj.perPPU} />
                <div className="mt-5">
                  <CardLandingPbm percentage={dataObj.perPBM} />
                </div>
              </div>
              <div className="col-md-6">
                <CardLandingPk percentage={dataObj.perPK} />
                <div className="mt-5">
                  <CardLandingPu percentage={dataObj.perPU} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
*/
