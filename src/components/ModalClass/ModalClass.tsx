import { Form, FormInstance, Input, InputNumber, Modal, ModalProps } from 'antd';
import * as React from 'react';

export interface ModalClassProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalClass({ form, ...props }: ModalClassProps) {
  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="Tên lớp học" name="name" rules={[{ required: true, message: 'Vui lòng điền tên lớp học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Số lượng sinh viên"
          name="numberStudents"
          rules={[{ required: true, message: 'Vui lòng điền số lượng sinh viên!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
