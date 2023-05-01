import ModalTeacher from '@/components/ModalTeacher/ModalTeacher';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Row, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

interface DataType {
  key: React.Key;
  teacherCode: string,
  name: string;
  address: string;
  dateOfBirth: string;
  cmnd: string;
  degree: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã giáo viên",
    dataIndex: "teacherCode"
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dateOfBirth',
  },
  {
    title: 'CMND',
    dataIndex: 'cmnd',
  },
  {
    title: 'Bằng cấp',
    dataIndex: 'degree',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    teacherCode: "A43465",
    name: `Vũ Quang Kiên ${i}`,
    address: `Hạ Long, Quảng Ninh ${i}`,
    dateOfBirth: '08-06-2003',
    cmnd: '0000',
    degree: 'Tiến sĩ',
  });
}

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const [form] = Form.useForm();

  return (
    <>
      <Row style={{ width: '100%', flexDirection: "column" }}>
        <Row justify="end" style={{ width: '100%', marginBottom: '30px' }}>
          <Button
            type="primary"
            style={{ boxShadow: 'none', height: 34 }}
            icon={<UserAddOutlined />}
            onClick={() => handleShowModal(true)}
          >
            Thêm giáo viên
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={data} style={{ width: '100%' }} />
      </Row>
      <ModalTeacher
        title="Thêm giáo viên"
        open={showModal}
        onCancel={() => handleShowModal(false)}
        onOk={handleConfirmModal}
        okButtonProps={{htmlType: 'submit'}}
        okText="Thêm giáo viên"
        cancelText="Huỷ"
        form={form}
      />
    </>
  );
}

Home.Layout = MainLayout;
export default Home;
