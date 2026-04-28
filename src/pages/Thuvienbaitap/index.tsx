import {
  Card,
  Input,
  Select,
  Tag,
  Modal,
  Button,
  Row,
  Col,
  Popconfirm
} from "antd";
import { useState } from "react";

export default function Thuvienbaitap() {
  const [list, setList] = useState<any[]>([
    {
      id: 1,
      name: "Push Up",
      muscle: "Chest",
      level: "Dễ",
      desc: "Hít đất cơ bản",
      calo: 300
    }
  ]);

  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("");
  const [level, setLevel] = useState("");
  const [detail, setDetail] = useState<any>(null);

  const filtered = list.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (muscle ? e.muscle === muscle : true) &&
    (level ? e.level === level : true)
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Thư viện bài tập</h2>

      <Input
        placeholder="Tìm kiếm"
        onChange={e => setSearch(e.target.value)}
      />

      <Select
        placeholder="Nhóm cơ"
        style={{ width: 150, marginTop: 10 }}
        onChange={setMuscle}
        allowClear
      >
        <Select.Option value="Chest">Chest</Select.Option>
        <Select.Option value="Back">Back</Select.Option>
        <Select.Option value="Legs">Legs</Select.Option>
      </Select>

      <Select
        placeholder="Độ khó"
        style={{ width: 150, marginLeft: 10 }}
        onChange={setLevel}
        allowClear
      >
        <Select.Option value="Dễ">Dễ</Select.Option>
        <Select.Option value="Trung bình">Trung bình</Select.Option>
        <Select.Option value="Khó">Khó</Select.Option>
      </Select>

      <Row gutter={16} style={{ marginTop: 20 }}>
        {filtered.map(e => (
          <Col span={8} key={e.id}>
            <Card
              title={e.name}
              onClick={() => setDetail(e)}
              extra={
                <Popconfirm
                  title="Xóa?"
                  onConfirm={() =>
                    setList(list.filter(i => i.id !== e.id))
                  }
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              }
            >
              <p>{e.muscle}</p>
              <Tag color={
                e.level === "Dễ"
                  ? "green"
                  : e.level === "Trung bình"
                  ? "orange"
                  : "red"
              }>
                {e.level}
              </Tag>
              <p>{e.desc}</p>
              <p>{e.calo} calo/giờ</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        visible={!!detail}
        onCancel={() => setDetail(null)}
        footer={null}
      >
        {detail && (
          <>
            <h2>{detail.name}</h2>
            <p>Nhóm cơ: {detail.muscle}</p>
            <p>Độ khó: {detail.level}</p>
            <p>{detail.desc}</p>
            <p>{detail.calo} calo/giờ</p>
          </>
        )}
      </Modal>
    </div>
  );
}