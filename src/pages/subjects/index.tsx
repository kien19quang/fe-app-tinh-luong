import ModalSubject from '@/components/ModalSubject/ModalSubject';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface SubjectsProps {}

interface DataType {
  key: React.Key;
  subjectCode: string;
  name: string;
  levelOfDifficult: number;
}

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    subjectCode: `${i}`,
    name: `Toán ${i}`,
    levelOfDifficult: 1.3,
  });
}

function Subjects(props: SubjectsProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<DataType[]>(data);
  const [isEditRecord, setIsEditRecord] = React.useState<boolean>(false);
  const [indexEdit, setIndexEdit] = React.useState<number>(0);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    { title: 'Mã môn học', dataIndex: 'subjectCode' },
    { title: 'Tên môn học', dataIndex: 'name' },
    { title: 'Độ khó', dataIndex: 'levelOfDifficult' },
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
              onClick={() => handleEditSubject(record, index)}
            />
            <Popconfirm
              placement="topRight"
              title="Bạn có muốn xoá giáo viên này không?"
              okText="Xoá giáo viên"
              cancelText="Không"
              onConfirm={() => handleDeleteSubject(index)}
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

  const handleAddSubject = () => {
    setShowModal(true);
    setIsEditRecord(false);
  };

  const handleEditSubject = (record: DataType, index: number) => {
    setShowModal(true);
    setIsEditRecord(true);
    setIndexEdit(index);
    form.setFieldsValue(record);
  };

  const handleDeleteSubject = (index: number): void => {
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
            onClick={handleAddSubject}
          >
            Thêm môn học
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={dataSource} style={{ width: '100%' }} loading={isLoadingTable} />
      </Row>
      <ModalSubject
        title={!isEditRecord ? 'Thêm môn học' : 'Thay đổi thông tin'}
        open={showModal}
        onCancel={handleCancelModel}
        onOk={handleConfirmModal}
        okButtonProps={{ htmlType: 'submit' }}
        okText={!isEditRecord ? 'Thêm môn học' : 'Chỉnh sửa'}
        cancelText="Huỷ"
        form={form}
      />
    </>
  );
}

Subjects.Layout = MainLayout;

export default Subjects;
