import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";

export default function Applications() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      gender: "Nam",
      address: "HN",
      skill: "Code",
      club: "IT",
      reason: "Đam mê",
      status: "Pending",
      note: "",
      history: []
    }
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [current, setCurrent] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [form] = Form.useForm();

  const now = () => new Date().toLocaleString();

  const addHistory = (item: any, action: string, note = "") => {
    return {
      ...item,
      history: [
        ...(item.history || []),
        `${action} lúc ${now()} ${note && "- " + note}`
      ]
    };
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "CLB", dataIndex: "club" },
    { title: "Trạng thái", dataIndex: "status" },
    {
      title: "Action",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => view(record)}>Xem</Button>
          <Button onClick={() => edit(record)}>Sửa</Button>
          <Button onClick={() => approve(record.id)}>Duyệt</Button>
          <Button danger onClick={() => openRejectOne(record)}>
            Từ chối
          </Button>
          <Button danger onClick={() => remove(record.id)}>Xóa</Button>
        </>
      )
    }
  ];

  const view = (record: any) => {
    setCurrent(record);
    setOpenDetail(true);
  };

  const edit = (record: any) => {
    setCurrent(record);
    form.setFieldsValue(record);
    setOpenForm(true);
  };

  const remove = (id: number) => {
    setData(data.filter(d => d.id !== id));
  };

  const approve = (id: number) => {
    setData(
      data.map(d =>
        d.id === id
          ? addHistory({ ...d, status: "Approved", note: "" }, "Approved")
          : d
      )
    );
  };

  const openRejectOne = (record: any) => {
    setCurrent(record);
    setOpenReject(true);
  };

  const confirmReject = () => {
    if (!reason) return;

    setData(
      data.map(d =>
        d.id === current.id
          ? addHistory(
              { ...d, status: "Rejected", note: reason },
              "Rejected",
              reason
            )
          : d
      )
    );

    setReason("");
    setOpenReject(false);
  };

  const submit = () => {
    form.validateFields().then(values => {
      if (current) {
        setData(
          data.map(d => (d.id === current.id ? { ...d, ...values } : d))
        );
      } else {
        setData([...data, { ...values, id: Date.now(), status: "Pending" }]);
      }
      setOpenForm(false);
      setCurrent(null);
      form.resetFields();
    });
  };

  const approveMany = () => {
    setData(
      data.map(d =>
        selectedRowKeys.includes(d.id)
          ? addHistory({ ...d, status: "Approved", note: "" }, "Approved")
          : d
      )
    );
    setSelectedRowKeys([]);
  };

  const rejectMany = () => {
    setOpenReject(true);
  };

  const confirmRejectMany = () => {
    if (!reason) return;

    setData(
      data.map(d =>
        selectedRowKeys.includes(d.id)
          ? addHistory(
              { ...d, status: "Rejected", note: reason },
              "Rejected",
              reason
            )
          : d
      )
    );

    setSelectedRowKeys([]);
    setReason("");
    setOpenReject(false);
  };

  return (
    <>
      <Button onClick={() => setOpenForm(true)}>Thêm</Button>

      <Button onClick={approveMany}>
        Duyệt {selectedRowKeys.length}
      </Button>

      <Button danger onClick={rejectMany}>
        Từ chối {selectedRowKeys.length}
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => setSelectedRowKeys(keys)
        }}
      />

      <Modal visible={openForm} onOk={submit} onCancel={() => setOpenForm(false)}>
        <Form form={form}>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="club">
            <Select
              options={[
                { value: "IT" },
                { value: "Media" }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={openReject}
        onOk={selectedRowKeys.length ? confirmRejectMany : confirmReject}
        onCancel={() => setOpenReject(false)}
      >
        <Input
          placeholder="Nhập lý do từ chối"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
      </Modal>

      <Modal
        visible={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={null}
      >
        {current && (
          <>
            <p>{current.name}</p>
            <p>{current.email}</p>
            <p>{current.status}</p>

            <h4>Lịch sử:</h4>
            {(current.history || []).map((h: string, i: number) => (
              <p key={i}>{h}</p>
            ))}
          </>
        )}
      </Modal>
    </>
  );
}