import { Form, FormInstance, Input, Modal, ModalProps, Select } from 'antd';
import * as React from 'react';

export interface ModalSubjectProps extends ModalProps {
  form: FormInstance<any>;
}

export default function ModalSubject({ form, ...props }: ModalSubjectProps) {
  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="id" name="_id" hidden />

        <Form.Item label="Mã môn học" name="subjectCode" rules={[{ required: true, message: 'Vui lòng điền mã môn học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên môn học" name="name" rules={[{ required: true, message: 'Vui lòng điền tên môn học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Độ khó"
          name="levelOfDifficult"
          rules={[{ required: true, message: 'Vui lòng chọn độ khó môn học!' }]}
        >
          <Select
            allowClear
            options={[
              { label: 'Dễ', value: 'easy' },
              { label: 'Bình thường', value: 'normal' },
              { label: 'Khó', value: 'difficult' },
              { label: 'Nâng cao', value: 'advanced' },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
