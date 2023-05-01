import { DatePicker, Form, FormInstance, Input, Modal, ModalProps, Select } from 'antd';
import * as React from 'react';

export interface ModalTeacherProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalTeacher(props: ModalTeacherProps) {
  const [form] = Form.useForm();

  return (
    <Modal {...props}>
      <Form
        form={props.form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        style={{ marginTop: 24 }}
        initialValues={{ degree: 1.3 }}
      >
        <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng điền họ và tên!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng điền địa chỉ!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
        >
          <DatePicker allowClear style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="CMND" name="cmnd" rules={[{ required: true, message: 'Vui lòng điền CMND!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Bằng cấp" name="degree" rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}>
          <Select
            allowClear
            options={[
              { label: 'Tốt nghiệp đại học', value: 1.3 },
              { label: 'Thạc sĩ', value: 1.4 },
              { label: 'Tiến sĩ', value: 1.5 },
              { label: 'Phó giáo sư', value: 1.6 },
              { label: 'Giáo sư', value: 1.7 },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
