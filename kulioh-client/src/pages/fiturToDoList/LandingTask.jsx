import { Container } from "react-bootstrap";
import Navbar from "../../components/ReusableComponents/Navbar";
import CardLandingPpu from "../../components/fiturToDoList/CardLandingPpu";
import CardLandingPbm from "../../components/fiturToDoList/CardLandingPbm"
import CardLandingPk from "../../components/fiturToDoList/CardLandingPK"
import CardLandingPu from "../../components/fiturToDoList/CardLandingPu"
export default function LandingTask() {
  return (
    <>
      <Navbar />
      <div className="mt-3">
        <Container>
          <div className="row">
            <div className="col-md-6">
              <CardLandingPpu />
              <div className="mt-5">
                <CardLandingPbm />
              </div>
            </div>
            <div className="col-md-6">
              <CardLandingPk />
              <div className="mt-5">
                <CardLandingPu />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
