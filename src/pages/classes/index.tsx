import ModalClass from '@/components/ModalClass/ModalClass';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface ClassesProps {}

interface DataType {
  key: React.Key;
  name: string;
  numberStudents: number;
}

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `A7${i}`,
    numberStudents: 40,
  });
}

function Classes(props: ClassesProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<DataType[]>(data);
  const [isEditRecord, setIsEditRecord] = React.useState<boolean>(false)
  const [indexEdit, setIndexEdit] = React.useState<number>(0);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên lớp học',
      dataIndex: 'name',
    },
    {
      title: 'Số lượng sinh viên',
      dataIndex: 'numberStudents',
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
              onClick={() => handleEditClass(record, index)}
            />
            <Popconfirm
              placement="topRight"
              title="Bạn có muốn xoá giáo viên này không?"
              okText="Xoá giáo viên"
              cancelText="Không"
              onConfirm={() => handleDeleteClass(index)}
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
        let newDatasource = [...dataSource];
        if (!isEditRecord) {
          newDatasource = [values, ...dataSource];
        } else {
          newDatasource[indexEdit] = { ...values };
        }
        setDataSource(newDatasource);
        setShowModal(false);
        form.resetFields();
      })
      .catch((error) => {
        message.error('Vui lòng điền đầy đủ thông tin');
      });
  };

  const handleCancelModel = () => {
    form.resetFields();
    setShowModal(false);
  };

  const handleAddClass = () => {
    setShowModal(true);
    setIsEditRecord(false);
  };

  const handleEditClass = (record: DataType, index: number) => {
    setShowModal(true);
    setIsEditRecord(true);
    setIndexEdit(index);
    form.setFieldsValue(record);
  };

  const handleDeleteClass = (index: number): void => {
    setIsLoadingTable(true);
    const newDatasource = dataSource.filter((item, idx) => idx !== index && item);
    setDataSource(newDatasource);
    setIsLoadingTable(false);
  };

  return (
    <>
      <Row style={{ width: '100%', flexDirection: 'column' }}>
        <Row justify="end" style={{ width: '100%', marginBottom: '30px' }}>
          <Button
            type="primary"
            style={{ boxShadow: 'none', height: 34 }}
            icon={<PlusOutlined />}
            onClick={handleAddClass}
          >
            Thêm lớp học
          </Button>
        </Row>
  
        <Table bordered columns={columns} dataSource={dataSource} loading={isLoadingTable} style={{ width: '100%' }} />
      </Row>
      <ModalClass
        title={!isEditRecord ? 'Thêm lớp học' : 'Thay đổi thông tin'}
        open={showModal}
        onCancel={handleCancelModel}
        onOk={handleConfirmModal}
        okButtonProps={{ htmlType: 'submit' }}
        okText={!isEditRecord ? 'Thêm lớp học' : 'Chỉnh sửa'}
        cancelText="Huỷ"
        form={form}
        width={550}
      />
    </>
  );
}

Classes.Layout = MainLayout;

export default Classes;
