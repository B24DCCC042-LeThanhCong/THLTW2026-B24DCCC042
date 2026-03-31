import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Switch,
  Image
} from "antd";
import dayjs from "dayjs";

export default function Clubs() {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      name: "CLB IT",
      leader: "Nguyễn A",
      date: "2020-01-01",
      description: "<b>CLB công nghệ</b>",
      active: true,
      image: "https://anh "
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [

    {
      title: "Tên CLB",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: "Ngày TL",
      dataIndex: "date",
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (html: string) => (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )
    },
    {
      title: "Chủ nhiệm",
      dataIndex: "leader"
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      render: (val: boolean) => (val ? "Có" : "Không")
    },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => edit(record)}>Sửa</Button>
          <Button danger onClick={() => remove(record.id)}>Xóa</Button>
          <Button onClick={() => viewMembers(record)}>Members</Button>
        </>
      )
    }
  ];

  const edit = (record: any) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date)
    });
    setOpen(true);
  };

  const remove = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const viewMembers = (club: any) => {
    Modal.info({
      title: `Thành viên của ${club.name}`,
      content: "Demo: chưa nối dữ liệu"
    });
  };

  const submit = () => {
    form.validateFields().then(values => {
      const newItem = {
        ...values,
        id: editing ? editing.id : Date.now(),
        date: values.date.format("YYYY-MM-DD")
      };

      if (editing) {
        setData(prev =>
          prev.map(item => (item.id === editing.id ? newItem : item))
        );
      } else {
        setData(prev => [...prev, newItem]);
      }

      setOpen(false);
      setEditing(null);
      form.resetFields();
    });
  };

  return (
    <>
      <Input
        placeholder="Tìm kiếm CLB"
        style={{ width: 200, marginBottom: 10 }}
        onChange={e => setSearch(e.target.value)}
      />

      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm CLB
      </Button>

      <Table rowKey="id" columns={columns} dataSource={filteredData} />

      <Modal
        visible={open}
        onOk={submit}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên CLB" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="leader" label="Chủ nhiệm">
            <Input />
          </Form.Item>

          <Form.Item name="date" label="Ngày thành lập">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="image" label="Link ảnh">
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả (HTML)">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="active" label="Hoạt động" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}