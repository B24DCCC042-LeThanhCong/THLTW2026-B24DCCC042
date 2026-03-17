import React, { useEffect, useState } from "react";

export default function DichVu() {
  const [ds, setDs] = useState<any[]>([]);
  const [ten, setTen] = useState("");
  const [gia, setGia] = useState(0);

  useEffect(() => {
    setDs(JSON.parse(localStorage.getItem("dichVu") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("dichVu", JSON.stringify(ds));
  }, [ds]);

  const them = () => {
    if (!ten || gia <= 0) return;

    setDs([
      ...ds,
      { id: Date.now(), ten, gia },
    ]);

    setTen("");
    setGia(0);
  };

  const xoa = (id: number) => {
    setDs(ds.filter((dv) => dv.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dịch vụ</h2>

      <input
        placeholder="Tên DV"
        value={ten}
        onChange={(e) => setTen(e.target.value)}
      />

      <input
        type="number"
        placeholder="Giá"
        value={gia}
        onChange={(e) => setGia(Number(e.target.value))}
      />

      <button onClick={them}>Thêm</button>

      <ul>
        {ds.map((dv) => (
          <li key={dv.id}>
            {dv.ten} - {dv.gia}đ
            <button onClick={() => xoa(dv.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}