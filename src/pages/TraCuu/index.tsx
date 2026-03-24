import React, { useState } from 'react';
import { Input, Button, Table, message, Card, Space } from 'antd';

export default function TraCuu() {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});

  const search = () => {
    try {
      const values = Object.values(form).filter(v => v && v.toString().trim() !== '');

      if (values.length < 2) {
        message.error('Nhập ít nhất 2 điều kiện');
        return;
      }

      const list = JSON.parse(localStorage.getItem('vanbang') || '[]');

      const result = list.filter((item: any) => {
        return (
          (!form.msv || item.msv?.includes(form.msv)) &&
          (!form.name || item.name?.toLowerCase().includes(form.name.toLowerCase())) &&
          (!form.soHieu || item.soHieu?.includes(form.soHieu)) &&
          (!form.dob || item.dob === form.dob)
        );
      });

      setData(result);

      if (result.length === 0) {
        message.warning('Không tìm thấy kết quả');
      }

    } catch (err) {
      console.error(err);
      message.error('Lỗi tra cứu');
    }
  };

  return (
    <Card title="Tra cứu văn bằng">
      <Space direction="vertical" style={{ width: '100%' }}>
        
        <Input
          placeholder="MSSV"
          onChange={e => setForm({ ...form, msv: e.target.value })}
        />

        <Input
          placeholder="Họ tên"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Số hiệu"
          onChange={e => setForm({ ...form, soHieu: e.target.value })}
        />

        <Input
          placeholder="Ngày sinh (YYYY-MM-DD)"
          onChange={e => setForm({ ...form, dob: e.target.value })}
        />

        <Button type="primary" onClick={search}>
          Tìm
        </Button>

        <Table
          dataSource={data}
          rowKey="so_vao_so"
          columns={[
            { title: 'MSSV', dataIndex: 'msv' },
            { title: 'Họ tên', dataIndex: 'name' },
            { title: 'Số hiệu', dataIndex: 'soHieu' },
            { title: 'Ngày sinh', dataIndex: 'dob' },
            { title: 'Số vào sổ', dataIndex: 'so_vao_so' }
          ]}
        />

      </Space>
    </Card>
  );
}