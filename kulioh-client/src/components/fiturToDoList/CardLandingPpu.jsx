import book from "../../assets/buku.png";
import { useNavigate } from "react-router-dom";
export default function CardLandingPpu({ percentage }) {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    navigate("/tasks/ppu")
  }
  return (
    <div
      onClick={(e) => handleClick(e)}
      className="card-ppu"
      style={{ border: "0.1px solid black", marginRight: "5vw" }}
    >
      <div className="row">
        <div className="col-md-6">
          <img alt="hehe" src={book} style={{ width: 230, height: 230 }} />
        </div>
        <div className="col-md-6">
          <div className="text-landing-text">
            <p style={{ fontSize: 24, fontWeight: 600 }}>PPU</p>
            <p>Pengetahuan dan Pemahaman Umum</p>
            <p>{percentage} %</p>
          </div>
        </div>
      </div>
    </div>
  );
}
