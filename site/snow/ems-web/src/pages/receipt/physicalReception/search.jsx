import useStores from '@/store';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { timeFormat } from '@u/format';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import { observer } from 'mobx-react';

const { Item } = Form;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const STATE_OPTIONS = [
  {
    label: '已邮寄',
    value: 2,
  },
  {
    label: '已接收',
    value: 3,
  },
];

const Search = () => {
  const { physicalReception, globalStore } = useStores();
  const { loading, selectedRowKeys } = physicalReception;
  const [form] = Form.useForm();

  const baseButton = [
    {
      title: '批量接收',
      type: 'primary',
      onClick: () => {
        if (selectedRowKeys.length === 0) {
          return window.$message.warning('请勾选已邮寄状态的单据');
        }
        Modal.confirm({
          title: '确认接收？',
          content: null,
          okText: '确认',
          cancelText: '取消',
          onOk: close => {
            close();
            physicalReception.receiveList(globalStore.userInfo.userName, 1);
          },
          onCancel: close => close(),
        });
      },
    },
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);
        if (params.receiptTime) {
          params.receiveTimeBegin = timeFormat(params.receiptTime[0]);
          params.receiveTimeEnd = timeFormat(params.receiptTime[1]);
        }

        physicalReception.formSearch = params;
        physicalReception.pageCurrent = 1;
        physicalReception.getList({ userName: globalStore.userInfo.userName });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        physicalReception.formSearch = {};
        physicalReception.pageCurrent = 1;
        physicalReception.getList({ userName: globalStore.userInfo.userName });
      },
    },
  ];

  const handleEnter = () => {
    const params = form.getFieldsValue(true);
    physicalReception.formSearch = params;
    physicalReception.pageCurrent = 1;
    physicalReception.getList({ userName: globalStore.userInfo.userName });
  };

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
          className="ml-1"
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
        <Col span={6}>
          <Item label="快递单号" name="expressNo">
            <Input onPressEnter={handleEnter} />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="接收人" name="receiveUserName">
            <Input />
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
            <Select placeholder="请选择单据状态" options={STATE_OPTIONS} />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="发票号码" name="invoiceNo">
            <Input />
          </Item>
        </Col>

        <Col span={6}>
          <Item label="接收日期" name="receiptTime">
            <RangePicker />
          </Item>
        </Col>

        <Col span={6} style={{ textAlign: 'right' }}>
          {renderButtons()}
        </Col>
      </Row>
    </Form>
  );
};

export default observer(Search);
