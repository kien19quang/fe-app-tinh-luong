import ModalSubject from '@/components/ModalSubject/ModalSubject';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { RulesLevelOfDifficultSubject } from '@/models/subjectModel';
import { createSubject, deleteSubject, getAllSubject, updateSubject } from '@/services/subjectService';
import { DeleteOutlined, EditOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface SubjectsProps {}

interface DataType {
  _id: string;
  subjectCode: string;
  name: string;
  lession: number;
  subjectCoefficients: number;
}

function Subjects(props: SubjectsProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [isEditRecord, setIsEditRecord] = React.useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    const getSubject = async () => {
      setIsLoadingTable(true);
      const response = await getAllSubject() as any;
      if (response.success) {
        setDataSource(response.data);
      }
      setIsLoadingTable(false);
    };

    getSubject();
  }, []);

  const columns: ColumnsType<DataType> = [
    { title: 'Mã môn học', dataIndex: 'subjectCode' },
    { title: 'Tên môn học', dataIndex: 'name' },
    { title: 'Sô tiết', dataIndex: 'lession' },
    { title: 'Hệ số môn học', dataIndex: 'subjectCoefficients' },
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
              title="Bạn có muốn xoá môn học này không?"
              okText="Xoá môn học"
              cancelText="Không"
              onConfirm={() => handleDeleteSubject(record._id, index)}
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
        const messageNoti = isEditRecord ? 'Chỉnh sửa thông tin thành công' : 'Thêm mới môn học thành công';
        if (!isEditRecord) {
          const response = await createSubject(values) as any;
          if (response.success) {
            newDatasource = [...dataSource, response.data];
          }
          else {
            message.error('Không thể thêm mới môn học!')
          }
        } else {
          const response = await updateSubject(values) as any;
          if (response.success) {
            const indexEdit = newDatasource.findIndex((item) => item._id === values._id);
            newDatasource[indexEdit] = { ...response.data };
          } else {
            message.error('Không thể chỉnh sửa thông tin môn học!');
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
    form.setFieldsValue(record);
  };

  const handleDeleteSubject = async (id: string, index: number) => {
    setIsLoadingTable(true);
    const response = await deleteSubject(id) as any;
    if (response.success) {
      const newDatasource = dataSource.filter((item, idx) => idx !== index && item);
      setDataSource(newDatasource);
    }
    else {
      message.error('Không thể xoá môn học này!')
    }
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
