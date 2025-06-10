import useStores from '@/store';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { timeFormat } from '@u/format';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
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
    label: '可邮寄',
    value: 9,
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
  const { presentationManagement, globalStore } = useStores();
  const { loading, activeKey, formSearch } = presentationManagement;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formSearch);
  }, []);

  const baseButton = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);
        if (params.time) {
          params.sendTimeBegin = timeFormat(params.time[0], 'YYYY-MM-DD');
          params.sendTimeEnd = timeFormat(params.time[1], 'YYYY-MM-DD');
        }
        presentationManagement.formSearch = params;
        presentationManagement.pageCurrent = 1;
        presentationManagement.getList({ userName: globalStore.userInfo.userName });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        presentationManagement.formSearch = {};
        presentationManagement.pageCurrent = 1;
        presentationManagement.getList({ userName: globalStore.userInfo.userName });
      },
    },
  ];

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const handleStatusChange = value => {
    presentationManagement.formSearch.acquiringStatus = value;
    presentationManagement.pageCurrent = 1;
    presentationManagement.getList({ userName: globalStore.userInfo.userName });
  };

  const renderButtons = buttons => {
    buttons = [...buttons, ...baseButton];
    return buttons.map((item, index) => {
      if (item.render) {
        return item.render();
      }
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          className="ml-2"
          onClick={() => handleCustomButton(item)}
          loading={loading}
          disabled={item.disabled}
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
          <Item label="报账单号" name="claimNo">
            <Input />
          </Item>
        </Col>
        <Col span={6}>
          <Item label="单据状态" name="acquiringStatus">
            <Select showSearch placeholder="请选择单据状态" options={STATE_OPTIONS} onChange={handleStatusChange} />
          </Item>
        </Col>
        {activeKey === 'personal' ? (
          <Col span={6}>
            <Item label="邮寄时间" name="time">
              <RangePicker style={{ width: '300px' }} />
            </Item>
          </Col>
        ) : (
          <Col span={6}>
            <Item label="申请人" name="applyEmpName">
              <Input />
            </Item>
          </Col>
        )}

        <Col sm={{ span: 24 }} xxl={{ span: 6 }} style={{ textAlign: 'right' }}>
          {renderButtons(buttons)}
        </Col>
      </Row>
    </Form>
  );
};

export default observer(Search);
