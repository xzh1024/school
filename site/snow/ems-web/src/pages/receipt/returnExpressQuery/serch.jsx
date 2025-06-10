import useStores from '@/store';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Search = () => {
  const { returnExpressWithoutEdit, globalStore } = useStores();
  const { loading, acquiringList } = returnExpressWithoutEdit;
  const [form] = Form.useForm();

  const baseButton = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      onClick: form => {
        const params = form.getFieldsValue(true);

        returnExpressWithoutEdit.formSearch = params;
        returnExpressWithoutEdit.pageCurrent = 1;
        returnExpressWithoutEdit.getList({ userName: globalStore.userInfo.userName });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        returnExpressWithoutEdit.formSearch = {};
        returnExpressWithoutEdit.pageCurrent = 1;
        returnExpressWithoutEdit.getList({ userName: globalStore.userInfo.userName });
      },
    },
  ];

  useEffect(() => {
    returnExpressWithoutEdit.getAcquirerList(globalStore.userInfo.userName);
  }, []);

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const renderButtons = () => {
    return baseButton.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          className="ml-2"
          onClick={() => handleCustomButton(item)}
          disabled={item.disabled}
          loading={loading}
        >
          {item.title}
        </Button>
      );
    });
  };

  return (
    <>
      <Form form={form} disabled={loading}>
        <Row gutter={20}>
          <Col span={6}>
            <Item label="报账单号" name="claimNo">
              <Input allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="申请人" name="applyEmpName">
              <Input allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="快递单号" name="expressNo">
              <Input allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="收单柜" name="acquirerId">
              <Select options={acquiringList} allowClear />
            </Item>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            {renderButtons()}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default observer(Search);
