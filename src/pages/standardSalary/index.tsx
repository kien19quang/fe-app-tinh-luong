import MainLayout from '@/layouts/MainLayout/MainLayout';
import { EditOutlined } from '@ant-design/icons';
import { Button, Form, InputNumber, Modal, Row, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface StandardSalaryProps {}

interface DataType {
  key: React.Key;
  standardSalary: number;
  updatedAt: moment.Moment;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Mức lương tiêu chuẩn(Theo giờ)',
    dataIndex: 'standardSalary',
    render: (salary: number) => (
      <NumericFormat value={salary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
    ),
  },
  {
    title: 'Ngày thay đổi',
    dataIndex: 'updatedAt',
    render: (date: moment.Moment) => moment(date).format('DD-MM-YYYY'),
  },
];

function StandardSalary(props: StandardSalaryProps) {
  const [dataSource, setDataSource] = React.useState<DataType[]>([
    { key: 'standardSalary', standardSalary: 100000, updatedAt: moment() },
  ]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isLoadingTable, setIsLoadingTable] = React.useState<boolean>(false);

  const handleConfirmModal = () => {
    form
      .validateFields()
      .then((values) => {
        values = { ...values, updatedAt: moment() };
        setDataSource([values]);
        setShowModal(false);
        form.resetFields();
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
    form.setFieldValue('standardSalary', dataSource[0]['standardSalary']);
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
            Thay đổi mức lương
          </Button>
        </Row>

        <Table bordered columns={columns} dataSource={dataSource} loading={isLoadingTable} style={{ width: '100%' }} />
      </Row>

      <Modal
        open={showModal}
        onCancel={handleCancelModal}
        onOk={handleConfirmModal}
        title="Thay đổi lương chuẩn"
        okButtonProps={{ htmlType: 'submit' }}
        cancelText="Huỷ"
        okText="Chỉnh sửa"
      >
        <Form form={form} style={{ marginTop: 24 }}>
          <Form.Item
            label="Tiền lương theo giờ"
            name="standardSalary"
            rules={[{ required: true, message: 'Vui lòng điền mức lương theo giờ!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

StandardSalary.Layout = MainLayout;

export default StandardSalary;
