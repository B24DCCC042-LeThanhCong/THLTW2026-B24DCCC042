import React, { useEffect, useState } from "react";

export default function NhanVien() {
  const [ds, setDs] = useState<any[]>([]);
  const [ten, setTen] = useState("");
  const [maxKhach, setMaxKhach] = useState(5);
  const [gioBD, setGioBD] = useState("09:00");
  const [gioKT, setGioKT] = useState("17:00");

  useEffect(() => {
    setDs(JSON.parse(localStorage.getItem("nhanVien") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("nhanVien", JSON.stringify(ds));
  }, [ds]);

  const them = () => {
    if (!ten) return;

    setDs([
      ...ds,
      {
        id: Date.now(),
        ten,
        maxKhach,
        gioBD,
        gioKT,
      },
    ]);

    setTen("");
  };

  
  const xoa = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xoá?")) {
      setDs(ds.filter((nv) => nv.id !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Nhân viên</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          placeholder="Tên"
          value={ten}
          onChange={(e) => setTen(e.target.value)}
        />
        <input
          type="number"
          value={maxKhach}
          onChange={(e) => setMaxKhach(Number(e.target.value))}
        />
        <input
          type="time"
          value={gioBD}
          onChange={(e) => setGioBD(e.target.value)}
        />
        <input
          type="time"
          value={gioKT}
          onChange={(e) => setGioKT(e.target.value)}
        />

        <button onClick={them}>Thêm</button>
      </div>

     
      {ds.map((nv) => (
        <div
          key={nv.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <b>{nv.ten}</b> | {nv.gioBD} - {nv.gioKT} | Max: {nv.maxKhach}
          </div>

          
          <button
            style={{ background: "red", color: "#fff" }}
            onClick={() => xoa(nv.id)}
          >
            Xoá
          </button>
        </div>
      ))}
    </div>
  );
}