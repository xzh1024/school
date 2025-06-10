import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import UserSelectByTree from '@c/userSelectByTree';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import useStores from '../../../store';

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Search() {
  const { accountOffSet } = useStores();
  const { loading } = accountOffSet;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    accountOffSet.getTableList().then(res => {
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
          accountOffSet.searchParams = {
            settingDiff: '0',
          };
          accountOffSet.getTableList();
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
    params.settingDiff = '0';

    runInAction(() => {
      accountOffSet.searchParams = {
        ...params,
      };
      accountOffSet.getTableList();
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
    params.settingDiff = '0';

    runInAction(() => {
      accountOffSet.searchParams = {
        ...params,
      };
    });
  };

  return (
    <ProCard style={{ margin: '0px 0' }}>
      <Form {...layout} form={form} onFinish={handleSearch} initialValues={{}} onValuesChange={handleFormChange}>
        <Row gutter={10}>
          <Col span={6}>
            <Form.Item label="员工" name="crewEmpId">
              <UserSelectByTree title="请选择选择员工" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="不在岗时间" name="date">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Form.Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={12}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
