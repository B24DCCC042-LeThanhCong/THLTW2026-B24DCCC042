import { useEffect, useState } from 'react';
import {
  Tabs,
  Table,
  Tag,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Modal,
  Card,
  Statistic,
  Row,
  Col,
  message,
} from 'antd';

const { Option } = Select;

const initialProducts = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
  { id: 7, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', price: 15000000, quantity: 7 },
  { id: 8, name: 'Logitech MX Master 3', category: 'Phụ kiện', price: 2500000, quantity: 25 },
];

const initialOrders = [
  {
    id: 'DH001',
    customerName: 'Nguyễn Văn A',
    phone: '0912345678',
    address: '123 Nguyễn Huệ, Q1, TP.HCM',
    products: [{ productId: 1, productName: 'Laptop Dell XPS 13', quantity: 1, price: 25000000 }],
    totalAmount: 25000000,
    status: 'Chờ xử lý',
    createdAt: '2024-01-15',
  },
];

export default function QuanLyDonHang() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [productForm] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [detailOrder, setDetailOrder] = useState<any>(null);

  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);

  const [searchProduct, setSearchProduct] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatusProduct, setFilterStatusProduct] = useState('');

  const [searchOrder, setSearchOrder] = useState('');
  const [filterOrderStatus, setFilterOrderStatus] = useState('');

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem('products') || 'null') || initialProducts;
    const o = JSON.parse(localStorage.getItem('orders') || 'null') || initialOrders;
    setProducts(p);
    setOrders(o);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [products, orders]);

  const renderStatusProduct = (q: number) => {
    if (q === 0) return <Tag color="red">Hết hàng</Tag>;
    if (q <= 10) return <Tag color="orange">Sắp hết</Tag>;
    return <Tag color="green">Còn hàng</Tag>;
  };

  const totalRevenue = orders
    .filter(o => o.status === 'Hoàn thành')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(searchProduct.toLowerCase());
    const matchCategory = filterCategory ? p.category === filterCategory : true;

    let status = '';
    if (p.quantity === 0) status = 'Hết hàng';
    else if (p.quantity <= 10) status = 'Sắp hết';
    else status = 'Còn hàng';

    const matchStatus = filterStatusProduct ? status === filterStatusProduct : true;

    return matchName && matchCategory && matchStatus;
  });

  const filteredOrders = orders.filter(o => {
    const matchSearch =
      o.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      o.id.toLowerCase().includes(searchOrder.toLowerCase());

    const matchStatus = filterOrderStatus ? o.status === filterOrderStatus : true;

    return matchSearch && matchStatus;
  });

  const onFinishOrder = (values: any) => {
    const selectedProducts = values.products.map((pid: number) => {
      const p = products.find(pr => pr.id === pid);
      return {
        productId: p.id,
        productName: p.name,
        quantity: values[`qty_${p.id}`],
        price: p.price,
      };
    });

    for (let item of selectedProducts) {
      const product = products.find(p => p.id === item.productId);
      if (item.quantity > product.quantity) {
        message.error('Số lượng vượt tồn kho');
        return;
      }
    }

    const totalAmount = selectedProducts.reduce(
      (sum: number, i: any) => sum + i.quantity * i.price,
      0,
    );

    const newOrder = {
      id: `DH${orders.length + 1}`,
      customerName: values.customerName,
      phone: values.phone,
      address: values.address,
      products: selectedProducts,
      totalAmount,
      status: 'Chờ xử lý',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setOrders([...orders, newOrder]);
    message.success('Tạo đơn hàng thành công');
    form.resetFields();
  };

  const updateStatus = (order: any, newStatus: string) => {
    let updatedProducts = [...products];

    if (order.status !== newStatus) {
      if (newStatus === 'Hoàn thành') {
        order.products.forEach((i: any) => {
          updatedProducts = updatedProducts.map(p =>
            p.id === i.productId ? { ...p, quantity: p.quantity - i.quantity } : p,
          );
        });
      }

      if (newStatus === 'Đã hủy') {
        order.products.forEach((i: any) => {
          updatedProducts = updatedProducts.map(p =>
            p.id === i.productId ? { ...p, quantity: p.quantity + i.quantity } : p,
          );
        });
      }
    }

    setProducts(updatedProducts);
    setOrders(orders.map(o => (o.id === order.id ? { ...o, status: newStatus } : o)));
  };

  const productColumns: any = [
    { title: 'STT', render: (_: any, __: any, i: number) => i + 1 },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Danh mục', dataIndex: 'category' },
    { title: 'Giá', dataIndex: 'price' },
    { title: 'Tồn kho', dataIndex: 'quantity' },
    { title: 'Trạng thái', render: (_: any, r: any) => renderStatusProduct(r.quantity) },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Button
          onClick={() => {
            setEditProduct(record);
            productForm.setFieldsValue(record);
            setOpenEditProduct(true);
          }}
        >
          Sửa
        </Button>
      ),
    },
  ];

  const orderColumns: any = [
    { title: 'Mã đơn', dataIndex: 'id' },
    { title: 'Khách hàng', dataIndex: 'customerName' },
    { title: 'Số SP', render: (r: any) => r.products.length },
    { title: 'Tổng tiền', dataIndex: 'totalAmount' },
    { title: 'Ngày', dataIndex: 'createdAt' },
    {
      title: 'Trạng thái',
      render: (_: any, r: any) => (
        <Select value={r.status} onChange={v => updateStatus(r, v)} style={{ width: 120 }}>
          <Option value="Chờ xử lý">Chờ xử lý</Option>
          <Option value="Đang giao">Đang giao</Option>
          <Option value="Hoàn thành">Hoàn thành</Option>
          <Option value="Đã hủy">Đã hủy</Option>
        </Select>
      ),
    },
    {
      title: 'Thao tác',
      render: (_: any, r: any) => (
        <Button onClick={() => { setDetailOrder(r); setOpenModal(true); }}>
          Xem
        </Button>
      ),
    },
  ];

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Dashboard" key="1">
        <Row gutter={16}>
          <Col span={6}><Card><Statistic title="Tổng SP" value={products.length} /></Card></Col>
          <Col span={6}><Card><Statistic title="Giá trị kho" value={totalStockValue} /></Card></Col>
          <Col span={6}><Card><Statistic title="Đơn hàng" value={orders.length} /></Card></Col>
          <Col span={6}><Card><Statistic title="Doanh thu" value={totalRevenue} /></Card></Col>
        </Row>
      </Tabs.TabPane>

      <Tabs.TabPane tab="Quản lý sản phẩm" key="2">
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}><Input placeholder="Tìm tên sản phẩm" onChange={e => setSearchProduct(e.target.value)} /></Col>
          <Col span={6}>
            <Select placeholder="Danh mục" allowClear style={{ width: '100%' }} onChange={v => setFilterCategory(v || '')}>
              <Option value="Laptop">Laptop</Option>
              <Option value="Điện thoại">Điện thoại</Option>
              <Option value="Máy tính bảng">Máy tính bảng</Option>
              <Option value="Phụ kiện">Phụ kiện</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select placeholder="Trạng thái" allowClear style={{ width: '100%' }} onChange={v => setFilterStatusProduct(v || '')}>
              <Option value="Còn hàng">Còn hàng</Option>
              <Option value="Sắp hết">Sắp hết</Option>
              <Option value="Hết hàng">Hết hàng</Option>
            </Select>
          </Col>
        </Row>

        <Table columns={productColumns} dataSource={filteredProducts} rowKey="id" pagination={{ pageSize: 5 }} />

        <Modal visible={openEditProduct} title="Sửa sản phẩm" onCancel={() => setOpenEditProduct(false)} onOk={() => productForm.submit()}>
          <Form form={productForm} layout="vertical" onFinish={(values) => {
            const newProducts = products.map(p =>
              p.id === editProduct.id ? { ...p, ...values } : p
            );
            setProducts(newProducts);
            message.success('Cập nhật sản phẩm thành công');
            setOpenEditProduct(false);
          }}>
            <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
              <Select>
                <Option value="Laptop">Laptop</Option>
                <Option value="Điện thoại">Điện thoại</Option>
                <Option value="Máy tính bảng">Máy tính bảng</Option>
                <Option value="Phụ kiện">Phụ kiện</Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} /></Form.Item>
          </Form>
        </Modal>
      </Tabs.TabPane>

      <Tabs.TabPane tab="Quản lý đơn hàng" key="3">
        <Form form={form} layout="vertical" onFinish={onFinishOrder}>
          <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, pattern: /^\d{10,11}$/ }]}><Input /></Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="products" label="Chọn sản phẩm" rules={[{ required: true }]}>
            <Select mode="multiple">{products.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}</Select>
          </Form.Item>

          {form.getFieldValue('products')?.map((id: number) => {
            const p = products.find(x => x.id === id);
            if (!p) return null;
            return (
              <Form.Item key={id} name={`qty_${id}`} label={`Số lượng ${p.name}`} rules={[{ required: true }]}>
                <InputNumber min={1} max={p.quantity} />
              </Form.Item>
            );
          })}

          <Button type="primary" htmlType="submit">Tạo đơn hàng</Button>
        </Form>

        <Row gutter={16} style={{ margin: '16px 0' }}>
          <Col span={8}><Input placeholder="Tìm khách hàng / mã đơn" onChange={e => setSearchOrder(e.target.value)} /></Col>
          <Col span={6}>
            <Select placeholder="Trạng thái" allowClear style={{ width: '100%' }} onChange={v => setFilterOrderStatus(v || '')}>
              <Option value="Chờ xử lý">Chờ xử lý</Option>
              <Option value="Đang giao">Đang giao</Option>
              <Option value="Hoàn thành">Hoàn thành</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Col>
        </Row>

        <Table columns={orderColumns} dataSource={filteredOrders} rowKey="id" />

        <Modal visible={openModal} footer={null} onCancel={() => setOpenModal(false)}>
          {detailOrder && (
            <>
              <p><b>Khách:</b> {detailOrder.customerName}</p>
              <p><b>SĐT:</b> {detailOrder.phone}</p>
              <p><b>Địa chỉ:</b> {detailOrder.address}</p>
              {detailOrder.products.map((p: any) => (
                <p key={p.productId}>{p.productName} - SL: {p.quantity}</p>
              ))}
            </>
          )}
        </Modal>
      </Tabs.TabPane>
    </Tabs>
  );
}
