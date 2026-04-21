import { useState } from "react";
import { Table, Button, Input, Select, Modal } from "antd";

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [visible, setVisible] = useState(false);

  function save() {
    if (form.id) {
      setPosts(posts.map(p => (p.id === form.id ? form : p)));
    } else {
      setPosts([...posts, { ...form, id: Date.now(), views: 0 }]);
    }
    setVisible(false);
    setForm({});
  }

  function del(id: number) {
    Modal.confirm({
      title: "Xóa bài?",
      onOk: () => setPosts(posts.filter(p => p.id !== id))
    });
  }

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Views", dataIndex: "views" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => { setForm(record); setVisible(true); }}>Edit</Button>
          <Button danger onClick={() => del(record.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin</h2>

      <Button type="primary" onClick={() => setVisible(true)}>
        Thêm bài
      </Button>

      <Table dataSource={posts} columns={columns} rowKey="id" />

      <Modal open={visible} onOk={save} onCancel={() => setVisible(false)}>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <Input.TextArea
          placeholder="Content"
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        <Select
          style={{ width: "100%" }}
          placeholder="Status"
          onChange={val => setForm({ ...form, status: val })}
        >
          <Select.Option value="draft">Nháp</Select.Option>
          <Select.Option value="published">Đã đăng</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}