import { Table, Tag, Button, Modal, Input } from "antd";
import { useState } from "react";

export default function NhatKyChiSo() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({});

  const bmi = (w: number, h: number) => w / ((h / 100) ** 2);

  const tag = (b: number) => {
    if (b < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
    if (b < 25) return <Tag color="green">Bình thường</Tag>;
    if (b < 30) return <Tag color="gold">Thừa cân</Tag>;
    return <Tag color="red">Béo phì</Tag>;
  };

  const save = () => {
    setData([...data, { ...form, id: Date.now() }]);
    setOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpen(true)}>Thêm</Button>

      <Table rowKey="id" dataSource={data} columns={[
        { title: "Ngày", dataIndex: "date" },
        { title: "Cân nặng", dataIndex: "weight" },
        { title: "Chiều cao", dataIndex: "height" },
        {
          title: "BMI",
          render: (r: any) => {
            const b = bmi(r.weight, r.height);
            return <>{b.toFixed(1)} {tag(b)}</>;
          }
        }
      ]} />

      <Modal visible={open} onOk={save} onCancel={() => setOpen(false)}>
        <Input placeholder="Ngày" onChange={e => setForm({ ...form, date: e.target.value })} />
        <Input placeholder="Cân nặng" onChange={e => setForm({ ...form, weight: Number(e.target.value) })} />
        <Input placeholder="Chiều cao" onChange={e => setForm({ ...form, height: Number(e.target.value) })} />
      </Modal>
    </div>
  );
}