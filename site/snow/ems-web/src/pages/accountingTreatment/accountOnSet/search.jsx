import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import UserSelectByTree from '@c/userSelectByTree';
import GroupSelectByType from '@c/groupSelectByType';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import useStores from '../../../store';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const PROCESS_STATEed = {
  0: '核算会计',
  1: '复核会计',
};

function Search() {
  const { accountOnSet } = useStores();
  const { loading } = accountOnSet;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    accountOnSet.getTableList().then(res => {
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
          accountOnSet.searchParams = {};
          accountOnSet.getTableList();
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
    if (params.date) {
      params['startTime'] = dayjs(params.date[0]).format('YYYY-MM-DD');
      params['endTime'] = dayjs(params.date[1]).format('YYYY-MM-DD');
    }
    delete params.data;

    if (params.crewEmpId) {
      params.crewEmpId = params.crewEmpId[0].empId;
    }

    runInAction(() => {
      accountOnSet.searchParams = {
        ...params,
      };
      accountOnSet.getTableList();
    });
  };

  const handleFormChange = () => {
    const params = form.getFieldsValue();
    if (params.date) {
      params['startTime'] = dayjs(params.date[0]).format('YYYY-MM-DD');
      params['endTime'] = dayjs(params.date[1]).format('YYYY-MM-DD');
    }
    delete params.data;

    if (params.crewEmpId) {
      params.crewEmpId = params.crewEmpId[0].empId;
    }

    runInAction(() => {
      accountOnSet.searchParams = {
        ...params,
      };
    });
  };

  return (
    <ProCard style={{ margin: '0px 0' }}>
      <Form {...layout} form={form} onFinish={handleSearch} initialValues={{}} onValuesChange={handleFormChange}>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="分组类型：" name="groupType">
              <Select
                placeholder="请选择"
                options={Object.keys(PROCESS_STATEed).map(item => ({
                  label: PROCESS_STATEed[item],
                  value: item,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="小组：" name="groupId">
              <GroupSelectByType grouptype="steppool2" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="组员" name="crewEmpId">
              <UserSelectByTree title="请选择选择员工" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="在岗时间" name="date">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Form.Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={24}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
