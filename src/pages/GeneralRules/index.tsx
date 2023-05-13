import MainLayout from '@/layouts/MainLayout/MainLayout';
import { createStandardSalary, getStandardSalary } from '@/services/salaryService';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Modal, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';


interface DataType {
  key: React.Key;
  standardSalary: number;
  teacherCoefficient: {
    graduate: number;
    master: number;
    docter: number;
    associateProfessor: number;
    professor: number;
  };
  updatedAt: Date;
}
const listTeacherCoefficient: Array<{key: string, label: string}> = [
  {key: 'graduate', label: 'Tốt nghiệp đại học'},
  {key: 'master', label: 'Thạc sĩ'},
  {key: 'docter', label: 'Tiến sĩ'},
  {key: 'associateProfessor', label: 'Phó giáo sư'},
  {key: 'professor', label: 'Giáo sư'},
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Mức lương tiêu chuẩn(Theo giờ)',
    dataIndex: 'standardSalary',
    render: (salary: number) => (
      <NumericFormat value={salary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
    ),
  },
  {
    title: 'Hệ số giáo viên',
    children: [
      { title: 'Tốt nghiệp đại học', dataIndex: ['teacherCoefficient', 'graduate'] },
      { title: 'Thạc sĩ', dataIndex: ['teacherCoefficient', 'master'] },
      { title: 'Tiến sĩ', dataIndex: ['teacherCoefficient', 'docter'] },
      { title: 'Phó giáo sư', dataIndex: ['teacherCoefficient', 'associateProfessor'] },
      { title: 'Giáo sư', dataIndex: ['teacherCoefficient', 'professor'] },
    ],
  },
  {
    title: 'Ngày thay đổi',
    dataIndex: 'updatedAt',
    render: (date: Date) => moment(date).format('DD-MM-YYYY'),
  },
];

function GeneralRules() {
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getStandardTeacherSalary = async () => {
      setIsLoadingTable(true);
      const response = (await getStandardSalary()) as any;
      console.log(response)
      if (response.success) {
        setDataSource([response.data]);
      }
      setIsLoadingTable(false)
    };

    getStandardTeacherSalary();
  }, []);

  const handleConfirmModal = () => {
    form
      .validateFields()
      .then(async (values) => {
        const response = (await createStandardSalary(values)) as any;
        if (response.success) {
          setDataSource([response.data]);
          message.success('Thay đổi quy định chung thành công');
          setShowModal(false);
          form.resetFields();
        } else {
          message.error('Không thể thay đổi quy định chung!');
        }
      })
      .catch((e) => {
        console.log(e);
        message.error('Vui lòng điền đầy đủ thông tin');
      });
  };

  const handleCancelModal = () => {
    form.resetFields();
    setShowModal(false);
  };

  const handleChangeStandardSalary = () => {
    form.setFieldsValue(dataSource[0])
    setShowModal(true);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Row style={{ flexDirection: 'column', width: '100%' }}>
        <Row justify="end" style={{ width: '100%', marginBottom: '30px' }}>
          <Button
            type="primary"
            style={{ boxShadow: 'none', height: 34 }}
            icon={<EditOutlined />}
            onClick={handleChangeStandardSalary}
          >
            Thay đổi quy định chung
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={dataSource} loading={isLoadingTable} style={{ width: '100%' }} />
      </Row>

      <Modal
        open={showModal}
        onCancel={handleCancelModal}
        onOk={handleConfirmModal}
        title="Thay đổi quy định chung"
        okButtonProps={{ htmlType: 'submit' }}
        cancelText="Huỷ"
        okText="Chỉnh sửa"
        width={600}
      >
        <Form form={form} style={{ marginTop: 24 }} labelCol={{ span: 7 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="Tiền lương theo giờ"
            name="standardSalary"
            rules={[{ required: true, message: 'Vui lòng điền mức lương theo giờ!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Row style={{marginBottom: 18}}>Hệ số giáo viên:</Row>
        
          {listTeacherCoefficient.map((item, index) => {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                name={["teacherCoefficient", `${item.key}`]}
                rules={[{ required: true, message: `Vui lòng điền hệ số ${item.label.toLowerCase()}!` }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            )
          })}
        </Form>
      </Modal>
    </>
  );
}

GeneralRules.Layout = MainLayout;

export default GeneralRules;
