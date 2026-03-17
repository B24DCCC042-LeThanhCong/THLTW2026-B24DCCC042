import React, { useEffect, useState } from "react";
import { Table, Select, Input, InputNumber, Button, Card } from "antd";

export default function DanhGia() {
  const [ds, setDs] = useState<any[]>([]);
  const [nv, setNv] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [lichHen, setLichHen] = useState<any[]>([]);
  const [dichVu, setDichVu] = useState<any[]>([]);

  useEffect(() => {
    setDs(JSON.parse(localStorage.getItem("danhGia") || "[]"));
    setNv(JSON.parse(localStorage.getItem("nhanVien") || "[]"));
    setLichHen(JSON.parse(localStorage.getItem("lichHen") || "[]"));
    setDichVu(JSON.parse(localStorage.getItem("dichVu") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("danhGia", JSON.stringify(ds));
  }, [ds]);

  const them = () => {
    setDs([...ds, { ...form, id: Date.now() }]);
  };

  const tongLich = lichHen.length;

  const hoanThanh = lichHen.filter(
    (l) => l.trangThai === "HOAN_THANH"
  ).length;

  const doanhThu = lichHen
    .filter((l) => l.trangThai === "HOAN_THANH")
    .reduce((sum, l) => {
      const dv = dichVu.find((d) => d.id == l.dvId);
      return sum + (dv?.gia || 0);
    }, 0);

  return (
    <Card title="Đánh giá & Thống kê">
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Select
          style={{ width: 150 }}
          placeholder="Chọn NV"
          onChange={(v) => setForm({ ...form, nvId: v })}
        >
          {nv.map((n) => (
            <Select.Option key={n.id} value={n.id}>
              {n.ten}
            </Select.Option>
          ))}
        </Select>

        <Input
          placeholder="Nội dung"
          onChange={(e) => setForm({ ...form, nd: e.target.value })}
        />

        <InputNumber
          min={1}
          max={5}
          placeholder="Sao"
          onChange={(v) => setForm({ ...form, sao: v })}
        />

        <Button type="primary" onClick={them}>
          Gửi
        </Button>
      </div>

      <Table
        dataSource={ds}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "Nhân viên",
            render: (_, r) => {
              const nvObj = nv.find((n) => n.id == r.nvId);
              return nvObj?.ten || "Không rõ";
            },
          },
          { title: "Nội dung", dataIndex: "nd" },
          { title: "⭐", dataIndex: "sao" },
        ]}
      />

      <Card title="📊 Thống kê" style={{ marginTop: 20 }}>
        <p>📅 Tổng số lịch: <b>{tongLich}</b></p>
        <p>✅ Đã hoàn thành: <b>{hoanThanh}</b></p>
        <p>💰 Doanh thu: <b>{doanhThu.toLocaleString()} đ</b></p>
      </Card>
    </Card>
  );
}