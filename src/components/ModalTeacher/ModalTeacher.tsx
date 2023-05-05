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
        <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng điền họ và tên!' }]}>
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
              { label: 'Tốt nghiệp đại học', value: 'Tốt nghiệp đại học' },
              { label: 'Thạc sĩ', value: 'Thạc sĩ' },
              { label: 'Tiến sĩ', value: 'Tiến sĩ' },
              { label: 'Phó giáo sư', value: 'Phó giáo sư' },
              { label: 'Giáo sư', value: 'Giáo sư' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Tiền dạy chuẩn"
          name="standardTeachingFee"
          rules={[{ required: true, message: 'Vui lòng điền tiền dạy chuẩn theo giờ!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
