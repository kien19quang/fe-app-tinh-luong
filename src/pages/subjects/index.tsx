import ModalSubject from '@/components/ModalSubject/ModalSubject';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface SubjectsProps {}

interface DataType {
  key: React.Key;
  subjectCode: string;
  name: string;
  levelOfDifficult: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Mã môn học',
    dataIndex: 'subjectCode',
  },
  {
    title: 'Tên môn học',
    dataIndex: 'name',
  },
  {
    title: 'Độ khó',
    dataIndex: 'levelOfDifficult',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    subjectCode: `${i}`,
    name: `Toán ${i}`,
    levelOfDifficult: 1.3,
  });
}

function Subjects(props: SubjectsProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleConfirmModal = () => {
    form.validateFields()
      .then((values) => {
        console.log(values)
      })
      .catch((error) => {
        message.error('Vui lòng điền đầy đủ thông tin')
      })
  }

  return (
    <>
      <Row style={{ width: '100%', flexDirection: 'column' }}>
        <Row justify="end" style={{ width: '100%', marginBottom: '30px' }}>
          <Button
            type="primary"
            style={{ boxShadow: 'none', height: 34 }}
            icon={<PlusOutlined />}
            onClick={() => handleShowModal(true)}
          >
            Thêm môn học
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={data} style={{ width: '100%' }} />
      </Row>
      <ModalSubject
        title="Thêm môn học"
        open={showModal}
        onCancel={() => handleShowModal(false)}
        onOk={handleConfirmModal}
        okButtonProps={{ htmlType: 'submit' }}
        okText="Thêm môn học"
        cancelText="Huỷ"
        form={form}
        width={550}
      />
    </>
  );
}

Subjects.Layout = MainLayout;

export default Subjects;
