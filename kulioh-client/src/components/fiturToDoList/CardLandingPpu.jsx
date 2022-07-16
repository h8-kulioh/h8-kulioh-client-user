import book from "../../assets/buku.png";
export default function CardLandingPpu() {
  return (
    <div
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
          </div>
        </div>
      </div>
    </div>
  );
}
