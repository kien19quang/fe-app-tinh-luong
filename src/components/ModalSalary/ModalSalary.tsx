import { Descriptions, Modal, ModalProps } from 'antd';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

export interface ModalSalaryProps extends ModalProps {}

export default function ModalSalary({ ...props }: ModalSalaryProps) {
  return (
    <Modal {...props}>
      <Descriptions style={{ marginTop: 24 }}>
        <Descriptions.Item label="Họ và tên">Vũ Quang Kiên</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">0847972859</Descriptions.Item>
        <Descriptions.Item label="Email">kien19quang@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">Hạ Long, Quảng Ninh</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">08-06-2003</Descriptions.Item>
        <Descriptions.Item label="Bằng cấp">Đã đỗ đại học</Descriptions.Item>
        <Descriptions.Item label="Số giờ làm">140h</Descriptions.Item>
        <Descriptions.Item label="Số tiết dạy" span={2}>60 tiết</Descriptions.Item>
        <Descriptions.Item label="Các lớp đã dạy trong kì này" span={3}>
          A707, A605, A402, A101
        </Descriptions.Item>
        <Descriptions.Item label="Dạy môn" span={3}>
          Lập trình hướng đối tượng, Ngôn ngữ lập trình, Hệ thống thông tin
        </Descriptions.Item>
        <Descriptions.Item label="Tiền lương">
            <NumericFormat value={4000000} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
