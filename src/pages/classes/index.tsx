import ModalClass from '@/components/ModalClass/ModalClass';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface ClassesProps {}

interface DataType {
  key: React.Key;
  name: string;
  numberStudents: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Tên lớp học',
    dataIndex: 'name',
  },
  {
    title: 'Số lượng sinh viên',
    dataIndex: 'numberStudents',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `A7${i}`,
    numberStudents: 40,
  });
}

function Classes(props: ClassesProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  };

  const handleConfirmModal = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        message.error('Vui lòng điền đầy đủ thông tin');
      });
  };

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
            Thêm lớp học
          </Button>
        </Row>
  
        <Table bordered columns={columns} dataSource={data} style={{ width: '100%' }} />
      </Row>
      <ModalClass
        title="Thêm lớp học"
        open={showModal}
        onCancel={() => handleShowModal(false)}
        onOk={handleConfirmModal}
        okButtonProps={{ htmlType: 'submit' }}
        okText="Thêm lớp học"
        cancelText="Huỷ"
        form={form}
        width={550}
      />
    </>
  );
}

Classes.Layout = MainLayout;

export default Classes;
