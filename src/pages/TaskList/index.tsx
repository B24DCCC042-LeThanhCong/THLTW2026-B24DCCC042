import React, { useEffect, useState } from 'react';
import {
  Table, Button, Input, Select, Modal,
  Form, DatePicker, Tag, Space
} from 'antd';
import dayjs from 'dayjs';

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('TASKS') || '[]');
    setTasks(data);
    setFiltered(data);
  }, []);

  const save = (data: any[]) => {
    setTasks(data);
    setFiltered(data);
    localStorage.setItem('TASKS', JSON.stringify(data));
  };

  const handleSubmit = (values: any) => {
    const newTask = {
      id: editing ? editing.id : Date.now().toString(),
      ...values,
      deadline: values.deadline.format('YYYY-MM-DD'),
      status: editing ? editing.status : 'todo'
    };

    const newData = editing
      ? tasks.map(t => (t.id === editing.id ? newTask : t))
      : [...tasks, newTask];

    save(newData);
    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    setOpen(true);
    form.setFieldsValue({
      ...record,
      deadline: dayjs(record.deadline)
    });
  };

  const updateStatus = (record: any, newStatus: string) => {
    const newData = tasks.map(t =>
      t.id === record.id ? { ...t, status: newStatus } : t
    );
    save(newData);
  };

  const statusText: any = {
    todo: 'Cần làm',
    inprogress: 'Đang làm',
    done: 'Hoàn thành'
  };

  const columns = [
    { title: 'Tên', dataIndex: 'title' },
    { title: 'Mô tả', dataIndex: 'description' },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: (a: any, b: any) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (p: string) => (
        <Tag color={p === 'high' ? 'red' : p === 'medium' ? 'orange' : 'green'}>
          {p}
        </Tag>
      )
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (tags: string[]) => tags?.map(t => <Tag key={t}>{t}</Tag>)
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (s: string) => (
        <Tag
          color={
            s === 'todo'
              ? 'blue'
              : s === 'inprogress'
              ? 'orange'
              : 'green'
          }
        >
          {statusText[s]}
        </Tag>
      )
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>

          {record.status === 'todo' && (
            <Button onClick={() => updateStatus(record, 'inprogress')}>
              → Đang làm
            </Button>
          )}

          {record.status === 'inprogress' && (
            <Button onClick={() => updateStatus(record, 'done')}>
              → Hoàn thành
            </Button>
          )}

          {record.status === 'done' && (
            <Button onClick={() => updateStatus(record, 'todo')}>
              ↺ Làm lại
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div>
      <Space style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          + Thêm Task
        </Button>

        <Input.Search
          placeholder="Tìm..."
          onSearch={val =>
            setFiltered(
              tasks.filter(t =>
                t.title.toLowerCase().includes(val.toLowerCase())
              )
            )
          }
        />

        <Select
          placeholder="Filter"
          allowClear
          onChange={(val) =>
            val
              ? setFiltered(tasks.filter(t => t.status === val))
              : setFiltered(tasks)
          }
        >
          <Select.Option value="todo">Cần làm</Select.Option>
          <Select.Option value="inprogress">Đang làm</Select.Option>
          <Select.Option value="done">Hoàn thành</Select.Option>
        </Select>
      </Space>

      <Table rowKey="id" columns={columns} dataSource={filtered} />

      <Modal visible={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Tên task" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input />
          </Form.Item>

          <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="priority" label="Priority">
            <Select>
              <Select.Option value="high">Cao</Select.Option>
              <Select.Option value="medium">Trung bình</Select.Option>
              <Select.Option value="low">Thấp</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Select mode="tags" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}