import { SalaryDto } from '@/models/salaryModel';
import { RulesQualifications } from '@/models/teachersModel';
import { Descriptions, Modal, ModalProps } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface ModalSalaryProps extends ModalProps {
  data: SalaryDto;
}

export default function ModalSalary({ data, ...props }: ModalSalaryProps) {
  return (
    <Modal {...props}>
      <Descriptions style={{ marginTop: 24 }}>
        <Descriptions.Item label="Họ và tên">{data.nameTeacher}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{data.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{data.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">{moment(data.dob).format('DD-MM-YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Bằng cấp">{RulesQualifications[data.degree]}</Descriptions.Item>
        <Descriptions.Item label="Các lớp đã dạy trong kì - Số tiết" span={3}>
          {data.classAndLession
            ? data.classAndLession.map(
                (item, index) =>
                  `${item.class} - ${item.lession}${index !== data.classAndLession.length - 1 ? ',' : ''} `,
              )
            : 'Không có dữ liệu'}
        </Descriptions.Item>
        <Descriptions.Item label="Dạy môn" span={3}>
          {data.listSubject.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Tiền dạy chuẩn (Theo giờ)" span={1}>
          <NumericFormat value={data.standardSalary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
        </Descriptions.Item>
        <Descriptions.Item label="Tiền lương">
          <NumericFormat value={data.salary} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
