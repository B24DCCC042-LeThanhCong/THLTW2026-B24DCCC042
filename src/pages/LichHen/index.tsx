import React, { useEffect, useState } from "react";

export default function LichHen() {
  const [ds, setDs] = useState<any[]>([]);
  const [nhanVien, setNhanVien] = useState<any[]>([]);
  const [dichVu, setDichVu] = useState<any[]>([]);

  const [tenKhach, setTenKhach] = useState("");
  const [ngay, setNgay] = useState("");
  const [gio, setGio] = useState("");
  const [nvId, setNvId] = useState("");
  const [dvId, setDvId] = useState("");

  useEffect(() => {
    setDs(JSON.parse(localStorage.getItem("lichHen") || "[]"));
    setNhanVien(JSON.parse(localStorage.getItem("nhanVien") || "[]"));
    setDichVu(JSON.parse(localStorage.getItem("dichVu") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("lichHen", JSON.stringify(ds));
  }, [ds]);

  const datLich = () => {
    if (!tenKhach || !ngay || !gio) return;

    const trung = ds.some(
      (l) => l.ngay === ngay && l.gio === gio && l.nvId === nvId
    );
    if (trung) return alert("Trùng lịch!");

    // check max khách
    const count = ds.filter(
      (l) => l.ngay === ngay && l.nvId === nvId
    ).length;

    const nv = nhanVien.find((n) => n.id == nvId);
    if (nv && count >= nv.maxKhach) {
      return alert("Nhân viên full lịch!");
    }

    setDs([
      ...ds,
      {
        id: Date.now(),
        tenKhach,
        ngay,
        gio,
        nvId,
        dvId,
        trangThai: "CHO_DUYET",
      },
    ]);
  };

  const capNhat = (id: number, status: string) => {
    setDs(ds.map((l) => (l.id === id ? { ...l, trangThai: status } : l)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lịch hẹn</h2>

      <input placeholder="Tên khách" onChange={(e) => setTenKhach(e.target.value)} />
      <input type="date" onChange={(e) => setNgay(e.target.value)} />
      <input type="time" onChange={(e) => setGio(e.target.value)} />

      <select onChange={(e) => setNvId(e.target.value)}>
        <option>Chọn NV</option>
        {nhanVien.map((nv) => (
          <option key={nv.id} value={nv.id}>{nv.ten}</option>
        ))}
      </select>

      <select onChange={(e) => setDvId(e.target.value)}>
        <option>Chọn DV</option>
        {dichVu.map((dv) => (
          <option key={dv.id} value={dv.id}>{dv.ten}</option>
        ))}
      </select>

      <button onClick={datLich}>Đặt</button>

      <ul>
        {ds.map((l) => (
          <li key={l.id}>
            {l.tenKhach} - {l.ngay} {l.gio} - {l.trangThai}
            <button onClick={() => capNhat(l.id, "HOAN_THANH")}>✔</button>
          </li>
        ))}
      </ul>
    </div>
  );
}