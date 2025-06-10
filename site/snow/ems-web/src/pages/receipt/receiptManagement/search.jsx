import useStores from '@/store';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { throttle } from 'lodash';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const { Item } = Form;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const STATE_OPTIONS = [
  {
    label: '已交单',
    value: 1,
  },
  {
    label: '已邮寄',
    value: 2,
  },
  {
    label: '已接收',
    value: 3,
  },
];

const Search = props => {
  const { buttons } = props;
  const { receiptManagement, globalStore } = useStores();
  const { loading, receiptCabinetOptions } = receiptManagement;
  const [form] = Form.useForm();

  useEffect(() => {
    receiptManagement.getAcquirerList(globalStore.userInfo.userName);
  }, []);

  const baseButton = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);
        if (params.acquiringTime) {
          params.acquiringTimeBegin = params.acquiringTime[0].format('YYYY-MM-DD');
          params.acquiringTimeEnd = params.acquiringTime[1].format('YYYY-MM-DD');
          delete params.acquiringTime;
        }
        receiptManagement.formSearch = params;
        receiptManagement.pageCurrent = 1;
        receiptManagement.getList({ userName: globalStore.userInfo.userName });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        receiptManagement.formSearch = {};
        receiptManagement.pageCurrent = 1;
        receiptManagement.getList({ userName: globalStore.userInfo.userName });
      },
    },
  ];

  const handleSearch = throttle(
    function (keyword) {
      receiptManagement.getAcquirerList(globalStore.userInfo.userName, keyword);
    },
    800,
    { trailing: true, leading: false },
  );

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const renderButtons = buttons => {
    buttons = [...buttons, ...baseButton];
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
    <Form
      {...layout}
      form={form}
      disabled={loading}
      initialValues={{
        acquiringStatus: 1,
      }}
    >
      <Row gutter={20}>
        <Col span={6}>
          <Item label="收单柜名称" name="acquirerId">
            <Select
              showSearch
              placeholder="请选择收单柜名称"
              filterOption={false}
              options={receiptCabinetOptions}
              onSearch={handleSearch}
            />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="报账单号" name="claimNo">
            <Input />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="申请人" name="applyEmpName">
            <Input />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="单据状态" name="acquiringStatus">
            <Select showSearch placeholder="请选择单据状态" options={STATE_OPTIONS} />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="交单时日期" name="acquiringTime">
            <RangePicker />
          </Item>
        </Col>

        <Col span={6}>
          <Item label="申请部门" name="applyDeptName">
            <Input />
          </Item>
        </Col>

        <Col span={12} style={{ textAlign: 'right' }}>
          {renderButtons(buttons)}
        </Col>
      </Row>
    </Form>
  );
};

export default observer(Search);
