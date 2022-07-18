import { Container } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/ReusableComponents/Navbar";
import CardLandingPpu from "../../components/fiturToDoList/CardLandingPpu";
import CardLandingPbm from "../../components/fiturToDoList/CardLandingPbm"
import CardLandingPk from "../../components/fiturToDoList/CardLandingPK"
import CardLandingPu from "../../components/fiturToDoList/CardLandingPu"
import axios from "axios";
export default function LandingTask() {

  const initialStateObj = useMemo(() => {
    return {
      jumlahtodos: 0,
      jumlahDone: 0,
      perPU: 0,
      perPPU: 0,
      perPK: 0,
      perPBM: 0,
      perAll: 0
    }
  }, [])

  const [dataObj, setDataObj] = useState(initialStateObj)
  const [isLoadingFinish, setIsLoadingFinish] = useState(false)
  const getPercentage = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/users/taskStat`, {
        headers: {
          access_token: localStorage.getItem("accessToken")
        }
      })
      setDataObj({
        jumlahtodos: data.jumlahtodos,
        jumlahDone: data.jumlahDone,
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
    getPercentage()
  }, [])

  return (
    isLoadingFinish ? (
      <>
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
    ) : <p>Loading</p>
  );
}
