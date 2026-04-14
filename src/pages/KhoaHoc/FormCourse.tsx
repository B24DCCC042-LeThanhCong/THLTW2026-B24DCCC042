import { Modal, Form, Input, Select, InputNumber } from 'antd';

export default ({ open, onCancel, onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={open}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then(values => {
          onSubmit(values);
          form.resetFields();
        });
      }}
    >
      <Form form={form} initialValues={initialValues} layout="vertical">
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Không được để trống' },
            { max: 100 },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="teacher"
          label="Giảng viên"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Phan Quang Thành">Phan Quang Thành</Select.Option>
            <Select.Option value="Nguyễn Văn A">Nguyễn Văn A</Select.Option>
            <Select.Option value="Trần Văn B">Trần Văn B</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="students"
          label="Số học viên"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="OPEN">Đang mở</Select.Option>
            <Select.Option value="CLOSED">Đã kết thúc</Select.Option>
            <Select.Option value="PAUSED">Tạm dừng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};