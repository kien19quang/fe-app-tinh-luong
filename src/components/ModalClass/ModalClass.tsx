import { SubjectDto } from '@/models/subjectModel';
import { TeacherDto } from '@/models/teachersModel';
import { getAllSubject } from '@/services/subjectService';
import { getAllTeacher } from '@/services/teacherService';
import { Form, FormInstance, Input, InputNumber, Modal, ModalProps, Select } from 'antd';
import * as React from 'react';

export interface ModalClassProps extends ModalProps {
  form: FormInstance<any>;
}

interface OptionType {
  value: string;
  label: string;
}

export default function ModalClass({ form, ...props }: ModalClassProps) {
  const [listOptionTeacher, setListOptionTeacher] = React.useState<OptionType[]>([]);
  const [listOptionSubject, setListOptionSubject] = React.useState<OptionType[]>([]);

  React.useEffect(() => {
    const getTeacher = async () => {
      const response = await getAllTeacher() as any;
      if (response.success && response.data.length > 0) {
        const newListOptionTeacher: OptionType[] = response.data.map((item: TeacherDto) => ({
          value: item._id,
          label: item.name,
        }));
        setListOptionTeacher(newListOptionTeacher);
      }
    };

    getTeacher();
  }, []);

  React.useEffect(() => {
    const getSubject = async () => {
      const response = await getAllSubject() as any;
      if (response.success && response.data.length > 0) {
        const newListOptionSubject: OptionType[] = response.data.map((item: SubjectDto) => ({
          value: item._id,
          label: item.name,
        }));
        setListOptionSubject(newListOptionSubject)
      }
    };

    getSubject();
  }, []);

  return (
    <Modal {...props}>
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 20 }} style={{ marginTop: 24 }}>
        <Form.Item label="id" name="_id" hidden />

        <Form.Item label="Tên lớp học" name="name" rules={[{ required: true, message: 'Vui lòng điền tên lớp học!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Môn học" name={["Subject", '_id']} rules={[{ required: true, message: 'Vui lòng chọn môn học!' }]}>
          <Select
            options={listOptionSubject}
          />
        </Form.Item>

        <Form.Item
          label="Giáo viên phụ trách"
          name={["Teacher", "_id"]}
          rules={[{ required: true, message: 'Vui lòng chọn giáo viên phụ trách!' }]}
        >
          <Select
            options={listOptionTeacher}
          />
        </Form.Item>
        
        <Form.Item
          label="Số lượng sinh viên"
          name="studentNumber"
          rules={[{ required: true, message: 'Vui lòng điền số lượng sinh viên!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
