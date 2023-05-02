import ModalTeacher from '@/components/ModalTeacher/ModalTeacher';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export interface DataTypeTeacher {
  key: React.Key;
  teacherCode: string;
  name: string;
  address: string;
  dateOfBirth: moment.Moment;
  cmnd: string;
  degree: string;
  standardTeachingFee: number;
}

const data: DataTypeTeacher[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    teacherCode: 'A43465',
    name: `Vũ Quang Kiên ${i}`,
    address: `Hạ Long, Quảng Ninh ${i}`,
    dateOfBirth: moment(),
    cmnd: '0000',
    degree: 'Tiến sĩ',
    standardTeachingFee: 100000,
  });
}

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataTypeTeacher[]>(data);
  const [isEditTeacher, setIsEditTeacher] = useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [indexEdit, setIndexEdit] = useState<number>(0);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataTypeTeacher> = [
    { title: 'Mã giáo viên', dataIndex: 'teacherCode' },
    { title: 'Họ và tên', dataIndex: 'name' },
    { title: 'Địa chỉ', dataIndex: 'address' },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render: (date: moment.Moment) => moment(date).format('DD-MM-YYYY'),
    },
    { title: 'CMND', dataIndex: 'cmnd' },
    { title: 'Bằng cấp', dataIndex: 'degree' },
    {
      title: 'Tiền dạy chuẩn(Theo giờ)',
      dataIndex: 'standardTeachingFee',
      render: (money: number) => (
        <NumericFormat value={money} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '112px',
      render: (text, record, index) => {
        return (
          <Row style={{ gap: '10px' }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ boxShadow: 'none' }}
              onClick={() => handleEditTeacher(record, index)}
            />
            <Popconfirm
              placement="topRight"
              title="Bạn có muốn xoá giáo viên này không?"
              okText="Xoá giáo viên"
              cancelText="Không"
              onConfirm={() => handleDeleteTeacher(index)}
              okButtonProps={{ style: { boxShadow: 'none' } }}
            >
              <Button type="primary" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Row>
        );
      },
    },
  ];

  const handleConfirmModal = () => {
    form
      .validateFields()
      .then((values) => {
        let newDatasource = [...dataSource]
        const messageNoti = isEditTeacher ? "Chỉnh sửa thông tin thành công" : "Thêm mới giáo viên thành công"
        values = { ...values, teacherCode: 'A43271' };
        if (!isEditTeacher) {
          newDatasource = [values, ...dataSource];
        }
        else {
          newDatasource[indexEdit] = {...values};
        }
        setDataSource(newDatasource);
        setShowModal(false);
        message.success(messageNoti);
        form.resetFields();
      })
      .catch((error) => {
        message.error('Vui lòng điền đầy đủ thông tin');
      });
  };

  const handleAddTeacher = () => {
    setShowModal(true);
    setIsEditTeacher(false);
  };

  const handleEditTeacher = (record: DataTypeTeacher, index: number) => {
    setShowModal(true);
    setIsEditTeacher(true);
    setIndexEdit(index);
    form.setFieldsValue(record);
  };

  const handleDeleteTeacher = (index: number): void => {
    setIsLoadingTable(true);
    const newDatasource = dataSource.filter((item, idx) => idx !== index && item);
    setDataSource(newDatasource);
    setIsLoadingTable(false);
  };

  const handleCancelModel = () => {
    form.resetFields();
    setShowModal(false);
  };

  return (
    <>
      <Row style={{ width: '100%', flexDirection: 'column' }}>
        <Row justify="end" style={{ width: '100%', marginBottom: '30px' }}>
          <Button
            type="primary"
            style={{ boxShadow: 'none', height: 34 }}
            icon={<UserAddOutlined />}
            onClick={handleAddTeacher}
          >
            Thêm giáo viên
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={dataSource} style={{ width: '100%' }} loading={isLoadingTable} />
      </Row>
      <ModalTeacher
        title={!isEditTeacher ? 'Thêm giáo viên' : 'Thay đổi thông tin'}
        open={showModal}
        onCancel={handleCancelModel}
        onOk={handleConfirmModal}
        okButtonProps={{ htmlType: 'submit' }}
        okText={!isEditTeacher ? 'Thêm giáo viên' : 'Chỉnh sửa'}
        cancelText="Huỷ"
        form={form}
      />
    </>
  );
}

Home.Layout = MainLayout;
export default Home;
