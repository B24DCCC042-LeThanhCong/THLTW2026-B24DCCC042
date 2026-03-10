import { useState } from "react";

export default function QuanLyNganHangCauHoi() {

  // Khối kiến thức
  const [khoiKienThuc] = useState(["Tổng quan", "Chuyên sâu"]);

  // Môn học
  const [monHoc] = useState([
    { ma: "WEB101", ten: "Lập trình Web", tinchi: 3 },
  ]);
  const [cauHoi, setCauHoi] = useState<any[]>([]);

  // Đề thi
  const [deThi, setDeThi] = useState<any[]>([]);

  const [searchMon, setSearchMon] = useState("");
  const [searchDoKho, setSearchDoKho] = useState("");
  const [searchKhoi, setSearchKhoi] = useState("");

  const doKhoList = ["Dễ", "Trung bình", "Khó", "Rất khó"];

  // form thêm câu hỏi
  const [ma, setMa] = useState("");
  const [mon, setMon] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [doKho, setDoKho] = useState("");
  const [khoi, setKhoi] = useState("");

  // form tạo đề
  const [monDe, setMonDe] = useState("");
  const [soCauDe, setSoCauDe] = useState(0);
  const [soCauTB, setSoCauTB] = useState(0);
  const [soCauKho, setSoCauKho] = useState(0);

  const themCauHoi = () => {

    const newQuestion = {
      ma,
      mon,
      noiDung,
      doKho,
      khoi
    };

    setCauHoi([...cauHoi, newQuestion]);

    setMa("");
    setMon("");
    setNoiDung("");
    setDoKho("");
    setKhoi("");
  };
  const filtered = cauHoi.filter((q) => {

    return (
      (searchMon === "" || q.mon.includes(searchMon)) &&
      (searchDoKho === "" || q.doKho === searchDoKho) &&
      (searchKhoi === "" || q.khoi === searchKhoi)
    );

  });
// tạo đề thi
const taoDeThi = () => {

  // kiểm tra môn học có tồn tại không
  const monTonTai = cauHoi.some((q) => q.mon === monDe);

  if (!monTonTai) {
    alert("Môn học không tồn tại hoặc chưa có câu hỏi");
    return;
  }

  const de: any[] = [];

  const layCau = (mucDo: string, soLuong: number) => {

    const list = cauHoi.filter(
      (q) => q.mon === monDe && q.doKho === mucDo
    );

    if (list.length < soLuong) {
      alert("Không đủ câu hỏi mức " + mucDo);
      return false;
    }

    for (let i = 0; i < soLuong; i++) {
      de.push(list[i]);
    }

    return true;
  };

  if (!layCau("Dễ", soCauDe)) return;
  if (!layCau("Trung bình", soCauTB)) return;
  if (!layCau("Khó", soCauKho)) return;

  setDeThi(de);
};

  const cellStyle = {
    border: "1px solid black",
    padding: "10px"
  };
  const buttonStyle = {
    background: "red",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px"
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Quản lý ngân hàng câu hỏi</h1>

      <h2>Thêm câu hỏi</h2>

      <input
        placeholder="Mã câu hỏi"
        value={ma}
        onChange={(e) => setMa(e.target.value)}
      />

      <input
        placeholder="Môn học"
        value={mon}
        onChange={(e) => setMon(e.target.value)}
      />

      <input
        placeholder="Nội dung câu hỏi"
        value={noiDung}
        onChange={(e) => setNoiDung(e.target.value)}
      />

      <select
        value={doKho}
        onChange={(e) => setDoKho(e.target.value)}
      >
        <option value="">Chọn độ khó</option>
        {doKhoList.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <input
        placeholder="Khối kiến thức"
        value={khoi}
        onChange={(e) => setKhoi(e.target.value)}
      />

      <button onClick={themCauHoi} style={buttonStyle}>
        Thêm câu hỏi
      </button>

      <h2>Tạo đề thi</h2>

      <input
        placeholder="Môn học"
        value={monDe}
        onChange={(e) => setMonDe(e.target.value)}
      />

      <input
        type="number"
        placeholder="Số câu dễ"
        onChange={(e) => setSoCauDe(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Số câu trung bình"
        onChange={(e) => setSoCauTB(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Số câu khó"
        onChange={(e) => setSoCauKho(Number(e.target.value))}
      />

      <button onClick={taoDeThi} style={buttonStyle}>
        Tạo đề thi
      </button>

      <h2>Tìm kiếm</h2>

      <input
        placeholder="Môn học"
        onChange={(e) => setSearchMon(e.target.value)}
      />

      <select onChange={(e) => setSearchDoKho(e.target.value)}>
        <option value="">Mức độ khó</option>
        {doKhoList.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <input
        placeholder="Khối kiến thức"
        onChange={(e) => setSearchKhoi(e.target.value)}
      />

      <h2>Danh sách câu hỏi</h2>

      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Mã</th>
            <th style={cellStyle}>Môn</th>
            <th style={cellStyle}>Nội dung</th>
            <th style={cellStyle}>Độ khó</th>
            <th style={cellStyle}>Khối kiến thức</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((q, i) => (
            <tr key={i}>
              <td style={cellStyle}>{q.ma}</td>
              <td style={cellStyle}>{q.mon}</td>
              <td style={cellStyle}>{q.noiDung}</td>
              <td style={cellStyle}>{q.doKho}</td>
              <td style={cellStyle}>{q.khoi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Đề thi đã tạo</h2>

      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={cellStyle}>Mã</th>
            <th style={cellStyle}>Nội dung</th>
            <th style={cellStyle}>Độ khó</th>
          </tr>
        </thead>

        <tbody>
          {deThi.map((q, i) => (
            <tr key={i}>
              <td style={cellStyle}>{q.ma}</td>
              <td style={cellStyle}>{q.noiDung}</td>
              <td style={cellStyle}>{q.doKho}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}