import React from "react";
import "../css/QuestionContainer.css";

const QuestionContainer = () => {
  return (
    <div className="question-container">
      <div className="header-container">
        <h3 className="subtes">Soal Penalaran Umum</h3>
        <h3>15 Juli 2022</h3>
      </div>
      <div className="question-answers">
        <p>
          Bulan lalu, sekelompok sales di sebuah perusahaan pengembang software
          menghadiri seminar tentang persuasive speaking. Beberapa minggu
          setelahnya, sales yang menghadiri seminar berhasil melakukan penjualan
          produk lebih banyak dibandingkan dengan sales yang tidak menghadiri
          seminar. Untuk meningkatkan penjualan produk, sales manager berencana
          untuk mewajibkan seluruh sales di perusahaaan tersebut untuk
          menghadiri seminar yang sama di bulan depan. Manakah pernyataan
          dibawah ini yang MENGUATKAN prediksi bahwa akan terjadi peningkatan
          penjualan jika sales di perusahaan tersebut menghadiri seminar tentang
          persuasive speaking ?
        </p>
        <form className="form-container">
          <label>
            <input type="radio" name="radio" />
            Seminar bulan lalu berfokus pada taktik yang relevan dengan
            pekerjaan di perusahaan tertentu.
          </label>
          <label>
            <input type="radio" name="radio" />
            Total penjualan perusahaan bulan lalu lebih tinggi dari penjualan
            dari bulan sebelum seminar.
          </label>
          <label>
            <input type="radio" name="radio" />
            Untuk mempersiapkan seminar, sales yang hadir diharuskan membaca
            buku tentang peningkatan keterampilan komunikasi.
          </label>
          <label>
            <input type="radio" name="radio" />
            Sepanjang bulan lalu, penjualan di perusahaan tersebut lebih besar
            daripada penjualan di perusahaan kompetitor.
          </label>
          <label>
            <input type="radio" name="radio" />
            Undangan seminar bulan lalu tidak diterima hanya oleh sales dengan
            penjualan di atas rata-rata.
          </label>
        </form>
      </div>
      <div className="pagination-container">
        <button className="btn-pagination">1</button>
        <button className="btn-pagination">2</button>
        <button className="btn-pagination">3</button>
        <button className="btn-pagination">4</button>
      </div>
    </div>
  );
};

export default QuestionContainer;
