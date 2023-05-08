import ModalSalary from '@/components/ModalSalary/ModalSalary';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { ClassAndLession, SalaryDto } from '@/models/salaryModel';
import { RulesQualifications } from '@/models/teachersModel';
import { getListTeacherSalary } from '@/services/salaryService';
import { FileSearchOutlined } from '@ant-design/icons';
import { Button, Row, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface SalaryProps {}

interface DataType {
  key: React.Key;
  teacherCode: string;
  nameTeacher: string;
  phoneNumber: string;
  email: string;
  address: string;
  dob: string;
  degree: keyof typeof RulesQualifications;
  listSubject: string[];
  classAndLession: ClassAndLession[];
  standardSalary: number;
  salary: number;
}

function Salary(props: SalaryProps) {
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [dataDetailSalary, setDataDetailSalary] = React.useState<SalaryDto>();

  React.useEffect(() => {
    const getTeacherSalary = async () => {
      const response = await getListTeacherSalary();
      if (response.success) {
        setDataSource(response.data);
      }
    };

    getTeacherSalary();
  }, []);

  const handleShowDetailSalary = (data: DataType) => {
    setDataDetailSalary(data);
    setShowModal(true);
  };

  const columns: ColumnsType<DataType> = [
    { title: 'Mã giáo viên', dataIndex: 'teacherCode', fixed: 'left', width: 200 },
    { title: 'Tên giáo viên', dataIndex: 'nameTeacher', fixed: 'left', width: 200 },
    {
      title: 'Tên lớp - Số tiết',
      width: 350,
      dataIndex: 'classAndLession',
      render: (data: ClassAndLession[]) =>
        data
          ? data.map((item, index) => `${item.class} - ${item.lession}${index !== data.length - 1 ? ',' : ''} `)
          : 'Không có dữ liệu',
    },
    {
      title: 'Tiền dạy chuẩn (Theo giờ)',
      dataIndex: 'standardSalary',
      width: 200,
      render: (money: number) => (
        <NumericFormat value={money} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
      ),
    },
    {
      title: 'Tiền lương',
      dataIndex: 'salary',
      width: 150,
      render: (salary: number) => (
        <NumericFormat value={salary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: '66px',
      render: (text, record, index) => (
        <Tooltip title="Xem chi tiết bảng lương">
          <Button
            type="primary"
            icon={<FileSearchOutlined />}
            style={{ boxShadow: 'none' }}
            onClick={() => handleShowDetailSalary(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Row style={{ width: '100%', flexDirection: 'column' }}>
        <Table bordered columns={columns} dataSource={dataSource} style={{ width: '100%' }} scroll={{ x: 1400 }} />
      </Row>
      {dataDetailSalary && (
        <ModalSalary
          title="Bảng lương chi tiết"
          open={showModal}
          footer={null}
          width={850}
          onCancel={() => setShowModal(false)}
          data={dataDetailSalary as SalaryDto}
        />
      )}
    </>
  );
}

Salary.Layout = MainLayout;

export default Salary;
