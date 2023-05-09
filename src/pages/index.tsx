import ModalTeacher from '@/components/ModalTeacher/ModalTeacher';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { RulesQualifications } from '@/models/teachersModel';
import { createTeacher, deleteTeacher, getAllTeacher, updateTeacher } from '@/services/teacherService';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';

export interface DataTypeTeacher {
  _id: string;
  teacherCode: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  dob: Date;
  cmnd: string;
  degree: string;
}

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataTypeTeacher[]>([]);
  const [isEditTeacher, setIsEditTeacher] = useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const getTeacher = async () => {
      setIsLoadingTable(true);
      const response = await getAllTeacher() as any;
      if (response.success && response.data.length > 0) {
        setDataSource(response.data);
      }
      setIsLoadingTable(false);
    };

    getTeacher();
  }, []);

  const columns: ColumnsType<DataTypeTeacher> = [
    { title: 'Mã giáo viên', dataIndex: 'teacherCode', fixed: 'left', width: 150 },
    { title: 'Họ và tên', dataIndex: 'name', fixed: 'left' },
    { title: 'Địa chỉ', dataIndex: 'address' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', width: '150px' },
    { title: 'Email', dataIndex: 'email', width: '220px' },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      render: (date: Date) => moment(date).format('DD-MM-YYYY'),
      width: '150px',
    },
    { title: 'CMND', dataIndex: 'cmnd', width: '150px' },
    {
      title: 'Bằng cấp',
      dataIndex: 'degree',
      width: '180px',
      render: (type: keyof typeof RulesQualifications) => RulesQualifications[type],
    },
    {
      title: 'Action',
      key: 'action',
      width: '112px',
      fixed: 'right',
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
              onConfirm={() => handleDeleteTeacher(record._id, index)}
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
      .then(async (values) => {
        let newDatasource = [...dataSource];
        const messageNoti = isEditTeacher ? 'Chỉnh sửa thông tin thành công' : 'Thêm mới giáo viên thành công';
        if (!isEditTeacher) {
          const response = await createTeacher(values) as any;
          if (response.success) {
            newDatasource = [...dataSource, response.data];
          } else {
            message.error('Không thể thêm giáo viên!');
          }
        } else {
          const response = await updateTeacher(values) as any;
          if (response.success) {
            const indexEdit = newDatasource.findIndex((item) => item._id === values._id);
            newDatasource[indexEdit] = { ...response.data };
          } else {
            message.error('Không thể chỉnh sửa giáo viên!');
          }
        }
        setDataSource(newDatasource);
        setShowModal(false);
        message.success(messageNoti);
        form.resetFields();
      })
      .catch((error) => {
        console.log(error)
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
    const data = { ...record, dob: moment(record.dob) };
    form.setFieldsValue(data);
  };

  const handleDeleteTeacher = async (id: string, index: number) => {
    setIsLoadingTable(true);
    const response = await deleteTeacher(id) as any;
    if (response.success) {
      const newDatasource = dataSource.filter((item, idx) => idx !== index && item);
      setDataSource(newDatasource);
    }
    else {
      message.error('Không thể xoá giáo viên này!')
    }
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

        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          style={{ width: '100%' }}
          loading={isLoadingTable}
          scroll={{ x: 1700 }}
        />
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
