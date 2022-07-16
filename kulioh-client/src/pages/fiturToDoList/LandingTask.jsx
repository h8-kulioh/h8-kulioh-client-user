import { Container } from "react-bootstrap";
import Navbar from "../../components/ReusableComponents/Navbar";
import CardLandingPpu from "../../components/fiturToDoList/CardLandingPpu";
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
                <CardLandingPpu />
              </div>
            </div>
            <div className="col-md-6">
              <CardLandingPpu />
              <div className="mt-5">
                <CardLandingPpu />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
