import { Form, FormInstance, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
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

        <Form.Item label="Môn học" name="subjectCode" rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
          <Select
            options={[
              { label: 'Ngôn ngữ lập trình', value: "0" },
              { label: 'Lập trình hướng đối tượng', value: "1" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Giáo viên phụ trách" name="teacherCode" rules={[{ required: true, message: 'Vui lòng chọn giáo viên phụ trách!' }]}>
          <Select
            options={[
              { label: 'Vũ Quang Kiên', value: "A43465" },
              { label: 'Nguyễn Thị Minh Anh', value: "A43271" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Số tiết" name="periods" rules={[{ required: true, message: 'Vui lòng điền số tiết!' }]}>
          <InputNumber style={{width: "100%"}}/>
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
