import MainLayout from '@/layouts/MainLayout/MainLayout';
import { Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

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

const columns: ColumnsType<DataType> = [
  {
    title: 'Mã giáo viên',
    dataIndex: 'teacherCode',
  },
  {
    title: 'Tên giáo viên',
    dataIndex: 'teacherName',
  },
  {
    title: 'Tên lớp học',
    dataIndex: 'className',
  },
  {
    title: 'Số tiết dạy',
    dataIndex: 'numberOfPeriods',
  },
  {
    title: 'Tiền dạy chuẩn (Theo giờ)',
    dataIndex: 'standardTeachingFee',
  },
  {
    title: 'Tiền lương',
    dataIndex: 'salary',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
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
  return (
    <Row style={{ width: '100%', flexDirection: 'column' }}>
      <Table bordered columns={columns} dataSource={data} style={{ width: '100%' }} />
    </Row>
  );
}

Salary.Layout = MainLayout;

export default Salary;
