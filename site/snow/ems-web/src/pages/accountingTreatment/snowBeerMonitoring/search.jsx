import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import OuSelect from '../../../components/compSelect';
import useStores from '../../../store';
import { runInAction } from 'mobx';

const Item = Form.Item;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Search() {
  const { snowBeerMonitoring } = useStores();
  const { tableLoading, categoryOptions, activeKey, searchParams } = snowBeerMonitoring;

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      onClick: form => {
        const searchParams = form.getFieldsValue();
        if (searchParams.glDate) {
          searchParams.glDateFrom = dayjs(searchParams.glDate[0]).format('YYYY-MM-DD');
          searchParams.glDateTo = dayjs(searchParams.glDate[1]).format('YYYY-MM-DD');
        }
        if (searchParams.erpDate) {
          searchParams.erpDateFrom = dayjs(searchParams.erpDate[0]).format('YYYY-MM-DD');
          searchParams.erpDateTo = dayjs(searchParams.erpDate[1]).format('YYYY-MM-DD');
        }
        runInAction(() => {
          snowBeerMonitoring.searchParams = {...searchParams};
          snowBeerMonitoring.pageIndex = 1;
          snowBeerMonitoring.getTableData();
        });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        runInAction(() => {
          snowBeerMonitoring.searchParams = {};
          snowBeerMonitoring.pageIndex = 1;
          snowBeerMonitoring.getTableData();
        });
      }
    },
  ];
  const [form] = Form.useForm();

  useEffect(() => {
    if (JSON.stringify(searchParams) === "{}") {
      form.resetFields();
      return;
    }
    form.setFieldsValue({
      ...searchParams
    });
  }, [searchParams]);
  
  const [timeOptions] = useState([
    {
      label: '全部',
      value: '',
    },
    {
      label: '未导入',
      value: '1',
    },
    {
      label: '导入中',
      value: '5',
    },
    {
      label: '导入失败',
      value: '3,6',
    },
  ]);

  const filterOption = (input, option) => {
    return (option?.compName ?? '').includes(input);
  };

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
          loading={tableLoading}
          style={{
            marginLeft: '10px'
          }}
        >
          {item.title}
        </Button>
      );
    });
  };

  return (
    <ProCard className='my-4'>
      <Form
        {...layout}
        form={form}
        initialValues={{
          invoiceState: '',
        }}
        disabled={tableLoading}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Item label="报账单号" name="claimNo">
              <Input placeholder="请输入报账单号" allowClear/>
            </Item>
          </Col>
          <Col span={6}>
            <Item label="归属公司" name="ouCode">
              <OuSelect />
            </Item>
          </Col>
          
          {activeKey !== 'C3' ? (
            <Col span={6}>
              <Item label="导入状态" name="invoiceState">
                <Select placeholder="请选择导入状态" options={timeOptions} allowClear/>
              </Item>
            </Col>
          ) : null}
          <Col span={6}>
            <Item label="业务类别" name="expCategoryName">
              <Select
                showSearch
                placeholder="请选择业务类别"
                optionFilterProp="label"
                filterOption={filterOption}
                options={categoryOptions}
                allowClear
              />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="总账时间" name="glDate">
              <RangePicker style={{ width: '100%' }} allowClear/>
            </Item>
          </Col>
          <Col span={6}>
            <Item label="导入ERP时间" name="erpDate">
              <RangePicker style={{ width: '100%' }} allowClear/>
            </Item>
          </Col>

          <Col span={activeKey !== 'C3' ? 12 : 18} style={{ textAlign: 'right' }}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
