import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import OuSelect from '@c/compSelect';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import useStores from '../../../store';
import GroupSelect from './components/accountingGroup';

const Item = Form.Item;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const statusOptions = [
  {
    label: '全部',
    value: 'C',
  },
  {
    label: '未导入',
    value: 'A',
  },
  {
    label: '导入中',
    value: 'H',
  },
  {
    label: '导入失败',
    value: 'B',
  },
  {
    label: '生成发票失败',
    value: 'E',
  },
];
function Search(props) {
  const [form] = Form.useForm();
  const { newInvoiceMonitoring } = useStores();
  const { loading } = newInvoiceMonitoring;

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      onClick: form => {
        const params = { ...form.getFieldsValue(true) };
        if (params.glDate) {
          params.glDateStart = dayjs(params.glDate[0]).format('YYYY-MM-DD');
          params.glDateEnd = dayjs(params.glDate[1]).format('YYYY-MM-DD');
          delete params.glDate;
        }

        if (params.queryDate) {
          params.queryDateFrom = dayjs(params.queryDate[0]).format('YYYY-MM-DD');
          params.queryDateTo = dayjs(params.queryDate[1]).format('YYYY-MM-DD');
          delete params.queryDate;
        }
        runInAction(() => {
          newInvoiceMonitoring.searchParams = params;
          newInvoiceMonitoring.pageIndex = 1;
          newInvoiceMonitoring.getTableData();
        });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        runInAction(() => {
          form.resetFields();
          newInvoiceMonitoring.searchParams = {};
          newInvoiceMonitoring.pageIndex = 1;
          newInvoiceMonitoring.getTableData();
        });
      },
    },
  ];

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const renderButtons = buttons => {
    return buttons.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          className="search-button"
          onClick={() => handleCustomButton(item)}
          loading={loading}
          style={{
            marginLeft: '10px',
          }}
        >
          {item.title}
        </Button>
      );
    });
  };

  return (
    <ProCard className="my-4">
      <Form
        {...layout}
        form={form}
        disabled={loading}
        initialValues={{
          importFlag: 'C',
        }}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Item label="报账单号" name="claimNo" className="form-item-label-warp mb-3">
              <Input placeholder="请输入报账单号" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="发票批" name="invoiceBatchNo" className="form-item-label-warp mb-3">
              <Input placeholder="请输入发票批" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="归属公司" name="ouCode" className="form-item-label-warp mb-3">
              <OuSelect />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="核算小组" name="groupCode" className="form-item-label-warp mb-3">
              <GroupSelect />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="总账期间" name="glDate" className="form-item-label-warp mb-3">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="导入ERP时间" name="queryDate" className="form-item-label-warp mb-3">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="导入状态" name="importFlag" className="form-item-label-warp mb-3">
              <Select placeholder="请选择导入状态" options={statusOptions} allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="会计" name="accountEmpName" className="form-item-label-warp mb-3">
              <Input placeholder="请输入会计" allowClear />
            </Item>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
