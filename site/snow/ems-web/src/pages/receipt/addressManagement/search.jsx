import useStores from '@/store';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { throttle } from 'lodash';
import { observer } from 'mobx-react';

const Item = Form.Item;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Search = props => {
  const { buttons } = props;
  const [form] = Form.useForm();
  const { addressManagement } = useStores();
  const { ouOptions, departmentOptions, loading } = addressManagement;

  const handleDepartmentSearch = throttle(
    keyword => {
      addressManagement.getDepartmentOptions(keyword);
    },
    800,
    { trailing: true, leading: false },
  );

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const handleOuSearch = throttle(
    function (keyword) {
      addressManagement.getOuOptions(keyword);
    },
    800,
    { trailing: true, leading: false },
  );

  const renderButtons = buttons => {
    return buttons.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          className="ml-2"
          onClick={() => handleCustomButton(item)}
          loading={loading}
        >
          {item.title}
        </Button>
      );
    });
  };

  return (
    <Form {...layout} form={form} disabled={loading}>
      <Row gutter={20}>
        <Col span={5}>
          <Item label="公司" name="compCode">
            <Select
              showSearch
              placeholder="请选择公司"
              options={ouOptions}
              filterOption={false}
              onSearch={handleOuSearch}
            />
          </Item>
        </Col>
        <Col span={5}>
          <Item label="部门" name="deptId">
            <Select
              showSearch
              placeholder="请选择部门"
              options={departmentOptions}
              filterOption={false}
              onSearch={handleDepartmentSearch}
            />
          </Item>
        </Col>
        <Col span={5}>
          <Item label="收单柜名称" name="acquirerName" labelCol={{ span: 10 }}>
            <Input placeholder="请输入收单柜名称" />
          </Item>
        </Col>

        <Col sm={{ span: 24 }} xxl={{ span: 9 }} style={{ textAlign: 'right' }}>
          {renderButtons(buttons)}
        </Col>
      </Row>
    </Form>
  );
};

export default observer(Search);
