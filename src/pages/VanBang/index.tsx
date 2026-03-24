import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, DatePicker, Card } from 'antd';

export default function VanBang() {
  const [fields, setFields] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    try {
      const f = JSON.parse(localStorage.getItem('fields') || '[]');
      setFields(f);
    } catch {
      setFields([]);
    }
  }, []);

  const formatDate = (date: any) => {
    if (!date) return null;
    try {
      return date.toDate().toISOString().split('T')[0];
    } catch {
      return null;
    }
  };

  const onFinish = (values: any) => {
    try {
      const list = JSON.parse(localStorage.getItem('vanbang') || '[]');
      const so = list.length + 1;
      values.dob = formatDate(values.dob);

      fields.forEach((f) => {
        if (f.type === 'date') {
          values[f.name] = formatDate(values[f.name]);
        }
      });

      const newItem = { ...values, so_vao_so: so };

      localStorage.setItem('vanbang', JSON.stringify([...list, newItem]));

      alert('Đã lưu!');
      form.resetFields();
    } catch (err) {
      console.error(err);
      alert('Lỗi!');
    }
  };

  return (
    <Card title="Quản lý Văn bằng">
      <Form form={form} onFinish={onFinish} layout="vertical">
        
        <Form.Item name="msv" label="MSSV" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="dob" label="Ngày sinh">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="soHieu" label="Số hiệu">
          <Input />
        </Form.Item>

        {fields.map((f, i) => (
          <Form.Item key={i} name={f.name} label={f.name}>
            {f.type === 'string' && <Input />}
            {f.type === 'number' && <InputNumber style={{ width: '100%' }} />}
            {f.type === 'date' && <DatePicker style={{ width: '100%' }} />}
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit">
          Lưu
        </Button>

      </Form>
    </Card>
  );
}