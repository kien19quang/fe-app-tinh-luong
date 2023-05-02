import ModalSalary from '@/components/ModalSalary/ModalSalary';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { FileSearchOutlined } from '@ant-design/icons';
import { Button, Row, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface SalaryProps {}

interface DataType {
  key: React.Key;
  teacherCode: string;
  teacherName: string;
  className: string;
  numberOfPeriods: number;
  standardTeachingFee: number;
  salary: number;
}

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    teacherCode: `${i}`,
    teacherName: `Vũ Quang Kiên ${i}`,
    className: 'A707',
    numberOfPeriods: i,
    standardTeachingFee: 100000,
    salary: 4000000,
  });
}

function Salary(props: SalaryProps) {
  const [dataSource, setDataSource] = React.useState<DataType[]>(data);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const columns: ColumnsType<DataType> = [
    { title: 'Mã giáo viên', dataIndex: 'teacherCode' },
    { title: 'Tên giáo viên', dataIndex: 'teacherName' },
    { title: 'Tên lớp học', dataIndex: 'className' },
    { title: 'Số tiết dạy', dataIndex: 'numberOfPeriods' },
    { title: 'Tiền dạy chuẩn (Theo giờ)', dataIndex: 'standardTeachingFee' },
    {
      title: 'Tiền lương',
      dataIndex: 'salary',
      render: (salary: number) => (
        <NumericFormat value={salary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '66px',
      render: (text, record, index) => (
        <Tooltip title="Xem chi tiết bảng lương">
          <Button
            type="primary"
            icon={<FileSearchOutlined />}
            style={{ boxShadow: 'none' }}
            onClick={() => setShowModal(true)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Row style={{ width: '100%', flexDirection: 'column' }}>
        <Table bordered columns={columns} dataSource={dataSource} style={{ width: '100%' }} />
      </Row>
      <ModalSalary title="Bảng lương chi tiết" open={showModal} footer={null} width={700} onCancel={() => setShowModal(false)} />
    </>
  );
}

Salary.Layout = MainLayout;

export default Salary;
