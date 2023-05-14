import { Form, FormInstance, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
import * as React from 'react';

export interface ModalSubjectProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalSubject({ form, ...props }: ModalSubjectProps) {
  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 6 }} initialValues={{subjectCoefficients: 1}} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="id" name="_id" hidden />

        <Form.Item label="Mã môn học" name="subjectCode" rules={[{ required: true, message: 'Vui lòng điền mã môn học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên môn học" name="name" rules={[{ required: true, message: 'Vui lòng điền tên môn học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Số tiết" name="lession" rules={[{ required: true, message: 'Vui lòng điền số tiết cho môn học!' }]}>
          <InputNumber style={{width: '100%'}} />
        </Form.Item>

        <Form.Item
          label="Hệ số môn học"
          name="subjectCoefficients"
          rules={[{ required: true, message: 'Vui lòng chọn hệ số cho môn học!' }]}
        >
          <InputNumber style={{width: '100%'}} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
