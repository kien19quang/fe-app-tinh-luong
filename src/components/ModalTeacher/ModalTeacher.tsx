import { DataTypeTeacher } from '@/pages';
import { DatePicker, Form, FormInstance, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
import * as React from 'react';

export interface ModalTeacherProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalTeacher({ form, ...props }: ModalTeacherProps) {
  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="Mã giáo viên" name="_id" hidden />
        <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng điền họ và tên!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng điền địa chỉ!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[{ required: true, message: 'Vui lòng điền số điện thoại!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng điền email!' },
            {
              type: 'email',
              message: 'Bạn chưa nhập đúng định dạng email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Ngày sinh" name="dob" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
          <DatePicker allowClear style={{ width: '100%' }} format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item label="CMND" name="cmnd" rules={[{ required: true, message: 'Vui lòng điền CMND!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Bằng cấp" name="degree" rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}>
          <Select
            allowClear
            options={[
              { label: 'Tốt nghiệp đại học', value: 'graduate' },
              { label: 'Thạc sĩ', value: 'master' },
              { label: 'Tiến sĩ', value: 'docter' },
              { label: 'Phó giáo sư', value: 'associateProfessor' },
              { label: 'Giáo sư', value: 'professor' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
