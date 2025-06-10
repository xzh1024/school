import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { observer } from 'mobx-react';
import useStores from '../../../store';

import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { useEffect } from 'react';
import OuSelect from '../../../components/compSelect';

const Item = Form.Item;
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Search() {
  const { tapeScanning } = useStores();
  const { loading } = tapeScanning;

  useEffect(() => {
    tapeScanning.getLists();
  }, []);

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      disabled: loading,
      onClick: () => {
        const params = form.getFieldsValue(true);

        if (params.date) {
          params.start_date = dayjs(params.date[0]).format('YYYY-MM-DD');
          params.end_date = dayjs(params.date[1]).format('YYYY-MM-DD');
        }

        console.log(params, 123);

        runInAction(() => {
          tapeScanning.searchParams = params;
          tapeScanning.getLists();
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
          tapeScanning.searchParams = {};
          tapeScanning.getLists();
        });
      },
    },
  ];
  const [form] = Form.useForm();

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

  return (
    <ProCard className='mb-4'>
      <Form
        {...layout}
        form={form}
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
            <Item label="归属公司" name="compName">
              <OuSelect />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="业务类别" name="expCategoryName">
              <Input placeholder="请输入业务类别" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="申请日期" name="date">
              <RangePicker style={{ width: '100%' }} allowClear />
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
