import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { SHADOW_PROCESS_STATE } from '@u/constants';
import { Button, Col, DatePicker, Form, Input, Row, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import useStores from '../../../store';

import OuSelect from '../../../components/compSelect';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';

const Item = Form.Item;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};


function Search() {
  const { processed } = useStores();
  const { loading } = processed;

 
  useEffect(() => {
    processed.getLists();
  }, []);

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      disabled: loading,
      onClick: () => {
        const params = form.getFieldsValue(false);


        if (params.glDateEnd) {
          console.log(params.glDateEnd, 'params.glDate',dayjs(params.glDateEnd[0]).format('YYYY-MM'));
          params.glDateStart = dayjs(params.glDateEnd[0]).format('YYYY-MM')+'-01 00:00:00 ';
          params.glDateEnd = dayjs(params.glDateEnd[1]).format('YYYY-MM')+'-31 24:00:00 ';
          // params.glDate=null
        }
       

        if (params.submitTime) {
          params.start_date = dayjs(params.submitTime[0]).format('YYYY-MM-DD');
          params.end_date = dayjs(params.submitTime[1]).format('YYYY-MM-DD');
        }

        params.submitUser = (params.submitUser && typeof params.submitUser === 'boolean') ? 'all' : 'own';
        console.log(params, 123);
        params.scanNumLen=20;
        params.imageStatus=2;
        runInAction(() => {
          processed.searchParams = params;
          processed.getLists();
        });

      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      disabled: loading,
      onClick: () => {
        form.resetFields();
        runInAction(() => {
          processed.searchParams = {
            scanNumLen: 20,
            imageStatus:2
          };
          processed.getLists();
        });
      },
    },
  ];
  const [form] = Form.useForm();

  const filterOption = (input, option) => {
    return (option?.compName ?? '').includes(input);
  };

  const handleCustomButton = item => {
    console.log(item, 'item');
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
          disabled={item.disabled}
          className="search-button"
          onClick={() => handleCustomButton(item)}
          style={{
            marginLeft: '10px',
          }}
        >
          {item.title}
        </Button>
      );
    });
  };
 // 处理搜索
 const handleSearch = params => {
  console.log('params', params);  
  if (params.date) {
    params['start_date'] = dayjs(params.date[0]).format('YYYY-MM-DD');
    params['end_date'] = dayjs(params.date[1]).format('YYYY-MM-DD');
  }

  if (typeof params.hasPhysicalBills === 'boolean') {
    params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
  }
  if (typeof params.addAfterReal === 'boolean') {
    params.addAfterReal = params.addAfterReal ? 1 : 0;
  }
  if (typeof params.processBack === 'boolean') {
    params.processBack = params.processBack ? 'Y' : 'N';
  }

  params.scanNumLen = 20;
  console.log('params', params);  
  runInAction(() => {
    processed.searchParams = {
      ...params,
    };
    processed.getLists();
  });
};

const handleFormChange = () => {
  const params = form.getFieldsValue();
  if (params.date) {
    params['start_date'] = dayjs(params.date[0]).format('YYYY-MM-DD');
    params['end_date'] = dayjs(params.date[1]).format('YYYY-MM-DD');
  }

  if (typeof params.hasPhysicalBills === 'boolean') {
    params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
  }
  if (typeof params.addAfterReal === 'boolean') {
    params.addAfterReal = params.addAfterReal ? 1 : 0;
  }
  if (typeof params.processBack === 'boolean') {
    params.processBack = params.processBack ? 'Y' : 'N';
  }

  params.scanNumLen = 20;

  runInAction(() => {
    processed.searchParams = {
      ...params,
    };
  });
};

  return (
    <ProCard className='mb-4'>
      <Form
        {...layout}
        form={form}      
        onFinish={handleSearch}
        onValuesChange={handleFormChange}
        initialValues={{
          invoiceState: '',
        }}
        // disabled={tableLoading}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Item label="报账单号" name="documentNum">
              <Input placeholder="请输入报账单号" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="归属公司" name="ouCode">
              <OuSelect />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="业务类别" name="expCategoryName">
              <Input placeholder="请输入业务类别" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="扫描号起" name="scanNumStart">
              <Input placeholder="请输入扫描号起" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="扫描号止" name="scanNumEnd">
              <Input placeholder="请输入扫描号止" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="申请人" name="proposer">
              <Input placeholder="请输入申请人" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="申请部门" name="proposerDept">
              <Input placeholder="请输入申请部门" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="流程状态" name="processState">
              <Select
                options={Object.keys(SHADOW_PROCESS_STATE).map(key => {
                  return {
                    value: key,
                    label: SHADOW_PROCESS_STATE[key],
                  };
                }).filter(item => item.label !== '全部')}
              ></Select>
            </Item>
          </Col>

          <Col span={6}>
            <Item label="处理日期" name="submitTime">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="总账期间" name="glDateEnd">
              <RangePicker picker="month" style={{ width: '100%' }} allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="默认显示" name="submitUser">
              <Switch checkedChildren="全部" unCheckedChildren="自己"></Switch>
            </Item>
          </Col>

          <Col span={6} style={{ textAlign: 'right' }}>{renderButtons(buttons)}</Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
