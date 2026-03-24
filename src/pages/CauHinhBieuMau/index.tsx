import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Card, Popconfirm } from 'antd';

export default function CauHinh() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem('fields');

    if (!stored) {
      const defaultFields = [
        { id: 1, name: 'Dân tộc', type: 'string' },
        { id: 2, name: 'Nơi sinh', type: 'string' },
        { id: 3, name: 'Điểm trung bình', type: 'number' },
        { id: 4, name: 'Ngày nhập học', type: 'date' },
      ];
      localStorage.setItem('fields', JSON.stringify(defaultFields));
      setData(defaultFields);
    } else {
      setData(JSON.parse(stored));
    }
  }, []);

  const onFinish = (values: any) => {
    let list = JSON.parse(localStorage.getItem('fields') || '[]');

    if (editing) {
      list = list.map((item: any) =>
        item.id === editing.id ? { ...item, ...values } : item
      );
    } else {
      const newItem = {
        ...values,
        id: Date.now(),
      };
      list.push(newItem);
    }

    localStorage.setItem('fields', JSON.stringify(list));
    setData(list);

    setOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    const list = data.filter((item) => item.id !== id);
    localStorage.setItem('fields', JSON.stringify(list));
    setData(list);
  };

  return (
    <Card title="Cấu hình biểu mẫu">
      <Button
        type="primary"
        onClick={() => {
          setEditing(null);
          form.resetFields();
          setOpen(true);
        }}
      >
        Thêm field
      </Button>

      <Table
        style={{ marginTop: 16 }}
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Kiểu', dataIndex: 'type' },
          {
            title: 'Hành động',
            render: (_, record) => (
              <>
                <Button onClick={() => handleEdit(record)}>Sửa</Button>
                <Popconfirm
                  title="Xóa?"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button danger style={{ marginLeft: 8 }}>
                    Xóa
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />

      <Modal
        visible={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        title={editing ? 'Sửa field' : 'Thêm field'}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Nhập tên field' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Kiểu dữ liệu"
            rules={[{ required: true, message: 'Chọn kiểu dữ liệu' }]}
          >
            <Select
              options={[
                { label: 'String', value: 'string' },
                { label: 'Number', value: 'number' },
                { label: 'Date', value: 'date' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}