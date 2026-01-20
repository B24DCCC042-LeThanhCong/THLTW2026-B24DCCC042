import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
} from 'antd';

const { Search } = Input;

const ProductPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  // 🔍 tìm kiếm
  const [keyword, setKeyword] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = (values: any) => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), ...values },
    ]);
    message.success('Thêm sản phẩm thành công');
    form.resetFields();
    setVisible(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    message.success('Xóa sản phẩm thành công');
  };

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (v: number) => v.toLocaleString() + ' đ',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <PageContainer>
      <div style={{ background: '#fff', padding: 24 }}>
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Thêm sản phẩm
        </Button>

        {/* 🔍 Tìm kiếm */}
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          style={{ width: 300, marginBottom: 16, marginLeft: 16 }}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
        />

        <Modal
          title="Thêm sản phẩm"
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddProduct}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Nhập tên sản phẩm' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[
                { required: true, message: 'Nhập giá' },
                { type: 'number', min: 1 },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                { required: true, message: 'Nhập số lượng' },
                { type: 'number', min: 1 },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Thêm sản phẩm
            </Button>
          </Form>
        </Modal>
      </div>
    </PageContainer>
  );
};

export default ProductPage;
