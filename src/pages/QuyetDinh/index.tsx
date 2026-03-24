import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Card } from 'antd';

export default function QuyetDinh() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('quyetdinh') || '[]');
      setData(list);
    } catch {
      setData([]);
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
      const list = JSON.parse(localStorage.getItem('quyetdinh') || '[]');

      const newItem = {
        ...values,
        ngay: formatDate(values.ngay), 
        id: Date.now(),
        view: 0,
      };

      const newList = [...list, newItem];

      localStorage.setItem('quyetdinh', JSON.stringify(newList));
      setData(newList);

      setOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card title="Quản lý Quyết định">
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm
      </Button>

      <Table
        style={{ marginTop: 16 }}
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'Số QĐ', dataIndex: 'soQD' },
          { title: 'Ngày', dataIndex: 'ngay' },
          { title: 'Trích yếu', dataIndex: 'trichYeu' },
          { title: 'Lượt tra cứu', dataIndex: 'view' }
        ]}
      />

      <Modal
        visible={open} 
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        title="Thêm quyết định"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          
          <Form.Item
            name="soQD"
            label="Số QĐ"
            rules={[{ required: true, message: 'Nhập số quyết định' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="ngay"
            label="Ngày"
            rules={[{ required: true, message: 'Chọn ngày' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="trichYeu" label="Trích yếu">
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </Card>
  );
}