import { Table, Button, Modal, Input, Select, Space } from "antd";
import { useState } from "react";

export default function Nhatkytapluyen() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({});

  const save = () => {
    // 🚨 DEBUG
    console.log("CLICK SAVE", form);

    if (!form.date || !form.type || !form.calo) {
      alert("Nhập thiếu thông tin!");
      return;
    }

    const newItem = {
      id: Date.now(),
      date: form.date,
      type: form.type,
      calo: form.calo,
      status: form.status || "done"
    };

    setData(prev => {
      const newData = [...prev, newItem];
      console.log("DATA AFTER ADD:", newData);
      return newData;
    });

    setOpen(false);
    setForm({});
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Nhật ký tập luyện</h2>

      <Button
        type="primary"
        onClick={() => {
          console.log("OPEN MODAL");
          setOpen(true);
        }}
      >
        Thêm buổi tập
      </Button>

      <Table
        style={{ marginTop: 20 }}
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "Ngày", dataIndex: "date" },
          { title: "Loại", dataIndex: "type" },
          { title: "Calo", dataIndex: "calo" },
          { title: "Trạng thái", dataIndex: "status" }
        ]}
      />

      <Modal
        title="Thêm buổi tập"
        visible={open}
        onOk={save}
        onCancel={() => setOpen(false)}
      >
        <Input
          placeholder="Ngày"
          style={{ marginBottom: 10 }}
          onChange={e =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <Select
          placeholder="Loại"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={v =>
            setForm({ ...form, type: v })
          }
        >
          <Select.Option value="Cardio">Cardio</Select.Option>
          <Select.Option value="Strength">Strength</Select.Option>
        </Select>

        <Input
          placeholder="Calo"
          style={{ marginBottom: 10 }}
          onChange={e =>
            setForm({ ...form, calo: e.target.value })
          }
        />

        <Select
          placeholder="Trạng thái"
          style={{ width: "100%" }}
          onChange={v =>
            setForm({ ...form, status: v })
          }
        >
          <Select.Option value="done">Hoàn thành</Select.Option>
          <Select.Option value="miss">Bỏ lỡ</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}