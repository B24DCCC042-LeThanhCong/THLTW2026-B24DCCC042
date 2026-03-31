import React, { useState } from "react";
import { Table, Button, Modal, Select } from "antd";

export default function Members() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      club: "IT",
      status: "Approved"
    },
    {
      id: 2,
      name: "Trần Văn B",
      email: "b@gmail.com",
      club: "Media",
      status: "Pending"
    }
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [newClub, setNewClub] = useState("");

  const members = data.filter(d => d.status === "Approved");

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "CLB", dataIndex: "club" }
  ];

  const changeClub = () => {
    if (!newClub) return;

    setData(
      data.map(d =>
        selectedRowKeys.includes(d.id)
          ? { ...d, club: newClub }
          : d
      )
    );

    setOpen(false);
    setSelectedRowKeys([]);
    setNewClub("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Đổi CLB ({selectedRowKeys.length})
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={members}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => setSelectedRowKeys(keys)
        }}
      />

      <Modal visible={open} onOk={changeClub} onCancel={() => setOpen(false)}>
        <p>Đổi CLB cho {selectedRowKeys.length} thành viên</p>

        <Select
          placeholder="Chọn CLB"
          onChange={value => setNewClub(value)}
          options={[
            { value: "IT" },
            { value: "Media" },
            { value: "Kinh doanh" }
          ]}
        />
      </Modal>
    </>
  );
}