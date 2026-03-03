import { useEffect, useState } from "react";
import { Button, Input, Select, Card, Table, Modal } from "antd";

interface Subject {
  id: number;
  name: string;
}

interface StudyLog {
  id: number;
  subjectId: number;
  time: string;
  duration: number;
  content: string;
  note: string;
}

export default function Bai2QuanLyHocTap() {
  // ====== STATE ======
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [logs, setLogs] = useState<StudyLog[]>([]);
  const [goal, setGoal] = useState("");

  const [newSubject, setNewSubject] = useState("");

  const [form, setForm] = useState<any>({
    subjectId: "",
    time: "",
    duration: "",
    content: "",
    note: ""
  });

  // ====== LOAD LOCALSTORAGE ======
  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem("subjects") || "[]"));
    setLogs(JSON.parse(localStorage.getItem("studyLogs") || "[]"));
    setGoal(localStorage.getItem("goal") || "");
  }, []);

  // ====== SAVE ======
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("studyLogs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  // ====== PHẦN 1: QUẢN LÝ MÔN ======
  const addSubject = () => {
    if (!newSubject) return;
    setSubjects([...subjects, { id: Date.now(), name: newSubject }]);
    setNewSubject("");
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setLogs(logs.filter(l => l.subjectId !== id));
  };

  // ====== PHẦN 2: QUẢN LÝ TIẾN ĐỘ ======
  const addLog = () => {
    const newLog: StudyLog = {
      id: Date.now(),
      subjectId: Number(form.subjectId),
      time: form.time,
      duration: Number(form.duration),
      content: form.content,
      note: form.note
    };

    setLogs([...logs, newLog]);
    setForm({ subjectId: "", time: "", duration: "", content: "", note: "" });
  };

  const deleteLog = (id: number) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  // ====== PHẦN 3: MỤC TIÊU ======
  const totalHours = logs.reduce((sum, i) => sum + i.duration, 0);
  const goalNum = Number(goal);

  return (
    <div style={{ padding: 20 }}>
      <Card title="📘 BÀI 2: QUẢN LÝ HỌC TẬP">

        {/* ===== PHẦN 1 ===== */}
        <h2>1️⃣ Quản lý danh mục môn học</h2>
        <Input
          placeholder="Nhập tên môn (Toán, Văn, Anh...)"
          value={newSubject}
          onChange={e => setNewSubject(e.target.value)}
        />
        <Button type="primary" onClick={addSubject} style={{ marginTop: 10 }}>
          Thêm môn
        </Button>

        <ul>
          {subjects.map(s => (
            <li key={s.id}>
              {s.name}
              <Button danger size="small" onClick={() => deleteSubject(s.id)} style={{ marginLeft: 10 }}>
                Xóa
              </Button>
            </li>
          ))}
        </ul>

        <hr />

        {/* ===== PHẦN 2 ===== */}
        <h2>2️⃣ Quản lý tiến độ học tập</h2>

        <Select
          placeholder="Chọn môn học"
          style={{ width: "100%" }}
          value={form.subjectId}
          onChange={v => setForm({ ...form, subjectId: v })}
        >
          {subjects.map(s => (
            <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
          ))}
        </Select><br /><br />

        <Input type="datetime-local" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} /><br /><br />
        <Input placeholder="Thời lượng (giờ)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /><br /><br />
        <Input placeholder="Nội dung học" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /><br /><br />
        <Input placeholder="Ghi chú" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /><br /><br />

        <Button type="primary" onClick={addLog}>Thêm lịch học</Button>

        <Table
          dataSource={logs}
          rowKey="id"
          style={{ marginTop: 20 }}
          columns={[
            {
              title: "Môn",
              render: (r) => subjects.find(s => s.id === r.subjectId)?.name
            },
            { title: "Thời gian", dataIndex: "time" },
            { title: "Giờ học", dataIndex: "duration" },
            { title: "Nội dung", dataIndex: "content" },
            { title: "Ghi chú", dataIndex: "note" },
            {
              title: "Xóa",
              render: (r) => <Button danger onClick={() => deleteLog(r.id)}>Xóa</Button>
            }
          ]}
        />

        <hr />

        {/* ===== PHẦN 3 ===== */}
        <h2>3️⃣ Mục tiêu học tập hàng tháng</h2>

        <Input
          placeholder="Nhập tổng giờ mục tiêu trong tháng"
          value={goal}
          onChange={e => setGoal(e.target.value)}
        />

        <p>
          Tổng giờ đã học: <b>{totalHours}</b>
        </p>

        <p>
          Trạng thái: {totalHours >= goalNum ? "✅ Đã đạt mục tiêu" : "❌ Chưa đạt mục tiêu"}
        </p>

      </Card>
    </div>
  );
}