import ModalClass from '@/components/ModalClass/ModalClass';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import { SubjectDto } from '@/models/subjectModel';
import { TeacherDto } from '@/models/teachersModel';
import { createClass, deleteClass, getAllClass, updateClass } from '@/services/classService';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Popconfirm, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import * as React from 'react';

export interface ClassesProps {}

interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  Teacher: TeacherDto;
  Subject: SubjectDto
  studentNumber: number;
  lession: number;
}


function Classes(props: ClassesProps) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [isEditRecord, setIsEditRecord] = React.useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  
  React.useEffect(() => {
    const getClass = async () => {
      setIsLoadingTable(true);
      const response = await getAllClass() as any;
      if (response.success) {
        setDataSource(response.data);
      }
      setIsLoadingTable(false);
    }

    getClass();
  }, [])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên lớp học',
      dataIndex: 'name',
    },
    {
      title: 'Tên môn học',
      dataIndex: 'Subject',
      render: (subject: SubjectDto) => subject ? subject.name : ''
    },
    {
      title: "Giáo viên phụ trách",
      dataIndex: "Teacher",
      render: (teacher: TeacherDto) => teacher ? teacher.name : ''
    },
    {
      title: "Số tiết",
      dataIndex: "lession"
    },
    {
      title: 'Số lượng sinh viên',
      dataIndex: 'studentNumber',
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
              title="Bạn có muốn xoá lớp học này không?"
              okText="Xoá lớp học"
              cancelText="Không"
              onConfirm={() => handleDeleteClass(record._id, index)}
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
        const messageNoti = isEditRecord ? 'Chỉnh sửa thông tin thành công' : 'Thêm mới lớp học thành công';
        if (!isEditRecord) {
          const response = await createClass(values) as any;
          if (response.success) {
            newDatasource = [...dataSource, response.data];
          }
          else {
            message.error('Không thể tạo mới lớp học!')
          }
        } else {
          const response = await updateClass(values) as any
          if (response.success) {
            const indexEdit = newDatasource.findIndex((item) => item._id === values._id);
            newDatasource[indexEdit] = { ...response.data };
          }
          else {
            message.error('Không thể chỉnh sửa lớp học!')
          }
        }
        setDataSource(newDatasource);
        setShowModal(false);
        message.success(messageNoti)
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

  const handleAddClass = () => {
    setShowModal(true);
    setIsEditRecord(false);
  };

  const handleEditClass = (record: DataType, index: number) => {
    setShowModal(true);
    setIsEditRecord(true);
    form.setFieldsValue(record);
  };

  const handleDeleteClass = async (id: string, index: number): Promise<void> => {
    setIsLoadingTable(true);
    const response = await deleteClass(id) as any
    if (response.success) {
      const newDatasource = dataSource.filter((item, idx) => idx !== index && item);
      setDataSource(newDatasource);
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
