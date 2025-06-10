import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';

import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import useStores from '../../../store';

const Item = Form.Item;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 17 },
};

const PROCESS_STATE = {
  0: '待处理',
  1: '已处理',
};
const PROCESS_STATEed = {
  HIGH: '高峰',
  LOW: '低峰',
};

function Search() {
  const { accountWrestRecord } = useStores();
  const { loading } = accountWrestRecord;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    accountWrestRecord.getTableList().then(res => {
      // 设置是否退回下拉数据
      setBackPhysicalBillType(res.data.backPhysicalBillTypeList || []);
    });
  }, []);

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      htmlType: 'submit',
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        runInAction(() => {
          accountWrestRecord.searchParams = {
            scanNumLen: 20,
          };
          accountWrestRecord.getTableList();
        });
      },
    },
  ];
  const [form] = Form.useForm();

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  // 数字格式化函数
  const numFormatter = number => {
    return ('' + number).split('.')[0];
  };

  const renderButtons = buttons => {
    return buttons.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          loading={loading}
          className="search-button"
          onClick={() => handleCustomButton(item)}
          style={{
            marginLeft: '10px',
          }}
          htmlType={item.htmlType ?? 'button'}
        >
          {item.title}
        </Button>
      );
    });
  };

  // 处理搜索
  const handleSearch = params => {
    console.log(params);
    if (params.createDateBegin) {
      params['createDateBegin'] = dayjs(params.createDateBegin).format('YYYY-MM-DD');
    }

    if (params.createDateEnd) {
      params['createDateEnd'] = dayjs(params.createDateEnd).format('YYYY-MM-DD');
    }

    // if (typeof params.hasPhysicalBills === 'boolean') {
    //   params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
    // }
    // if (typeof params.addAfterReal === 'boolean') {
    //   params.addAfterReal = params.addAfterReal ? 1 : 0;
    // }
    // if (typeof params.processBack === 'boolean') {
    //   params.processBack = params.processBack ? 'Y' : 'N';
    // }

    params.scanNumLen = 20;
    runInAction(() => {
      accountWrestRecord.searchParams = {
        ...params,
      };
      accountWrestRecord.getTableList();
    });
  };

  const handleFormChange = () => {
    const params = form.getFieldsValue();
    if (params.createDateBegin) {
      params['createDateEnd'] = dayjs(params.createDateBegin).format('YYYY-MM-DD');
    }

    if (params.createDateEnd) {
      params['createDateEnd'] = dayjs(params.createDateEnd).format('YYYY-MM-DD');
    }

    // if (typeof params.hasPhysicalBills === 'boolean') {
    //   params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
    // }
    // if (typeof params.addAfterReal === 'boolean') {
    //   params.addAfterReal = params.addAfterReal ? 1 : 0;
    // }
    // if (typeof params.processBack === 'boolean') {
    //   params.processBack = params.processBack ? 'Y' : 'N';
    // }

    params.scanNumLen = 20;

    runInAction(() => {
      accountWrestRecord.searchParams = {
        ...params,
      };
    });
  };

  return (
    <ProCard style={{ margin: '0px 0' }}>
      <Form
        {...layout}
        form={form}
        onFinish={handleSearch}
        initialValues={{}}
        onValuesChange={handleFormChange}
        // disabled={tableLoading}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="员工工号" className="form-item-label-warp" name="empCode">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="员工LDAP" className="form-item-label-warp" name="userName">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="报账单号" className="form-item-label-warp" name="claimNo">
              <Input allowClear />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="处理状态" className="form-item-label-warp" name="processStatus">
              <Select
                options={Object.keys(PROCESS_STATE).map(item => ({
                  label: PROCESS_STATE[item],
                  value: item,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="创建日期起(含)：" className="form-item-label-warp" name="createDateBegin">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="创建日期止(含)：" className="form-item-label-warp" name="createDateEnd">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="峰时状态：" name="timeInterval">
              <Select
                options={Object.keys(PROCESS_STATEed).map(item => ({
                  label: PROCESS_STATEed[item],
                  value: item,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={6}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
