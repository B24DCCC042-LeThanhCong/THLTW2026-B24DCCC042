import {
  Card,
  Progress,
  Button,
  Drawer,
  Input,
  Segmented,
  Select,
  DatePicker,
  Popconfirm,
  Row,
  Col
} from "antd";
import { useState } from "react";

export default function Quanlymuctieu() {
  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({});
  const [status, setStatus] = useState("all");

  const filtered = list.filter(g =>
    status === "all" ? true : g.status === status
  );

  const save = () => {
    if (!form.name || !form.target) return alert("Thiếu dữ liệu");

    setList(prev => [
      ...prev,
      {
        ...form,
        id: Date.now(),
        current: 0,
        status: "doing"
      }
    ]);

    setOpen(false);
    setForm({});
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý mục tiêu</h2>

      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm mục tiêu
      </Button>

      <Segmented
        style={{ marginLeft: 20 }}
        options={[
          { label: "Tất cả", value: "all" },
          { label: "Đang làm", value: "doing" },
          { label: "Hoàn thành", value: "done" },
          { label: "Đã hủy", value: "cancel" }
        ]}
        onChange={(v) => setStatus(v as string)}
      />

      <Row gutter={16} style={{ marginTop: 20 }}>
        {filtered.map(g => (
          <Col span={8} key={g.id}>
            <Card
              title={g.name}
              extra={
                <Popconfirm
                  title="Xóa?"
                  onConfirm={() =>
                    setList(list.filter(i => i.id !== g.id))
                  }
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              }
            >
              <p>Loại: {g.type}</p>
              <p>Mục tiêu: {g.target}</p>
              <p>Deadline: {g.deadline}</p>

              <Progress
                percent={Math.round((g.current / g.target) * 100)}
              />

              <Input
                placeholder="Cập nhật tiến độ"
                onChange={e => {
                  const val = Number(e.target.value);

                  setList(prev =>
                    prev.map(item =>
                      item.id === g.id
                        ? {
                            ...item,
                            current: val,
                            status:
                              val >= item.target ? "done" : "doing"
                          }
                        : item
                    )
                  );
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Drawer
        title="Thêm mục tiêu"
        visible={open}
        onClose={() => setOpen(false)}
      >
        <Input
          placeholder="Tên mục tiêu"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <Select
          style={{ width: "100%", marginTop: 10 }}
          placeholder="Loại"
          onChange={v => setForm({ ...form, type: v })}
        >
          <Select.Option value="Giảm cân">Giảm cân</Select.Option>
          <Select.Option value="Tăng cơ">Tăng cơ</Select.Option>
          <Select.Option value="Sức bền">Cải thiện sức bền</Select.Option>
        </Select>

        <Input
          placeholder="Giá trị mục tiêu"
          type="number"
          style={{ marginTop: 10 }}
          onChange={e => setForm({ ...form, target: Number(e.target.value) })}
        />

        <DatePicker
          style={{ width: "100%", marginTop: 10 }}
          onChange={(_, dateString) =>
            setForm({ ...form, deadline: dateString })
          }
        />

        <Button
          type="primary"
          style={{ marginTop: 20 }}
          onClick={save}
        >
          Lưu
        </Button>
      </Drawer>
    </div>
  );
}