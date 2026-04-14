import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
} from 'antd';
import {
  getCourses,
  deleteCourse,
  addCourse,
  updateCourse,
} from '@/services/course';
import FormCourse from './FormCourse';

export default () => {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const res = await getCourses();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editing) {
        await updateCourse({ ...editing, ...values });
      } else {
        await addCourse(values);
      }
      setOpen(false);
      fetchData();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleDelete = async (record: any) => {
    try {
      await deleteCourse(record.id);
      fetchData();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const filtered = data
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter(c => (teacherFilter ? c.teacher === teacherFilter : true))
    .filter(c => (statusFilter ? c.status === statusFilter : true));

  return (
    <div>
      <h2>Quản lý khóa học</h2>

      
      <div style={{ marginBottom: 10 }}>
        <Input
          placeholder="Tìm kiếm"
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />

        <Select
          placeholder="Giảng viên"
          onChange={setTeacherFilter}
          style={{ width: 150, marginRight: 10 }}
          allowClear
        >
          <Select.Option value="Phan Quang Thành">Phan Quang Thành</Select.Option>
          <Select.Option value="Nguyễn Văn A">Nguyễn Văn A</Select.Option>
          <Select.Option value="Trần Văn B">Trần Văn B</Select.Option>
        </Select>

        <Select
          placeholder="Trạng thái"
          onChange={setStatusFilter}
          style={{ width: 150 }}
          allowClear
        >
          <Select.Option value="OPEN">Đang mở</Select.Option>
          <Select.Option value="CLOSED">Đã kết thúc</Select.Option>
          <Select.Option value="PAUSED">Tạm dừng</Select.Option>
        </Select>

        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Thêm
        </Button>
      </div>

      {/* TABLE */}
      <Table
        dataSource={filtered}
        rowKey="id"
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Giảng viên', dataIndex: 'teacher' },
          {
            title: 'Số học viên',
            dataIndex: 'students',
            sorter: (a, b) => a.students - b.students,
          },
          { title: 'Trạng thái', dataIndex: 'status' },
          {
            title: 'Hành động',
            render: (_, record) => (
              <>
                <Button
                  onClick={() => {
                    setEditing(record);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Popconfirm
                  title="Xóa?"
                  onConfirm={() => handleDelete(record)}
                >
                  <Button danger>Xóa</Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />

      <FormCourse
        open={open}
        initialValues={editing}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};