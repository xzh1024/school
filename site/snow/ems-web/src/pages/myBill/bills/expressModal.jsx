import { sendExpress } from '@api/myBill/bills';
import { phoneRegExp } from '@u/tools';
import { Cascader, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect } from 'react';
import AREA_DATA from './areaData';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function ExpressModal(props) {
  const { onCancel, expressInfo } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    form.setFieldsValue(expressInfo);
  }, [expressInfo]);

  const handleSubmit = value => {
    console.log(value, 'form');
    const areaData = getAreaLabel(value.area);
    value.senderProvince = areaData[0].label;
    value.senderCity = areaData[1].label;
    value.senderStreet = areaData[2].label;
    value.claimNoList = value.claimNo.split(',');

    setLoading(true);
    sendExpress(value)
      .then(res => {
        window.$message.success(res.message || res.msg);
        onCancel && onCancel();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAreaLabel = (area = []) => {
    let res = [];
    let data = AREA_DATA;

    area.forEach(item => {
      const areaData = data.find(areaData => areaData.value === item);
      res.push(areaData);
      data = areaData ? areaData.children : [];
    });

    return res;
  };

  return (
    <Modal
      open
      onCancel={onCancel}
      title="快递邮寄"
      okText="邮寄"
      width={'60%'}
      onOk={() => form.submit()}
      cancelButtonProps={{
        disabled: loading,
      }}
      okButtonProps={{
        loading,
      }}
    >
      <Form
        form={form}
        // size='small'
        {...layout}
        onFinish={handleSubmit}
      >
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item name="senderName" label="寄件人">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="senderMobile"
              label="联系方式"
              rules={[{ required: true, message: '请输入正确的联系方式', pattern: phoneRegExp }]}
            >
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item name="area" label="寄件人地址" rules={[{ required: true, message: '请选择寄件人地址' }]}>
              <Cascader options={AREA_DATA}></Cascader>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="senderAddressDetail"
              label="详细地址"
              rules={[
                { required: true, message: '请输入寄件人详细地址' },
                { max: 200, message: '长度不超过200个字符' },
              ]}
            >
              <Input className="min-w-96" placeholder="地址填写需精确到门牌号（例**街道*）"></Input>
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item name="senderCompany" label="寄件人公司">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="recipientName" label="收件人">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="recipientMobile" label="联系方式">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="recipientAddress" label="收件人地址">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="recipientAddressDetail" label="详细地址">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="recipientCompany" label="收件人公司">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="claimNo" label="报账单号">
              <Input readOnly></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
