import React from "react";
import { Table, Card } from "antd";

export default function Reports() {
  const data = [
    { club: "IT", pending: 2, approved: 5, rejected: 1 },
    { club: "Marketing", pending: 3, approved: 2, rejected: 2 }
  ];

  const columns = [
    { title: "CLB", dataIndex: "club" },
    { title: "Pending", dataIndex: "pending" },
    { title: "Approved", dataIndex: "approved" },
    { title: "Rejected", dataIndex: "rejected" }
  ];

  return (
    <Card title="Thống kê đơn đăng ký">
      <Table rowKey="club" columns={columns} dataSource={data} />
    </Card>
  );
}