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
  const { subsidyCalendar } = useStores();
  const { loading } = subsidyCalendar;

  useEffect(() => {
    subsidyCalendar.getLists();
    if (Object.keys(subsidyCalendar.searchParams).length > 0) {
      form.setFieldsValue(subsidyCalendar.searchParams);
    }
  }, []);

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      disabled: loading,
      onClick: () => {
        const params = {...form.getFieldsValue(true)};
        console.log(params.date, 28282281);
        if (params.date) {
          params.startDate = dayjs(params.date[0]).format('YYYY-MM-DD');
          params.endDate = dayjs(params.date[1]).format('YYYY-MM-DD');
        }

        console.log(params, 2828228);

        runInAction(() => {
          subsidyCalendar.searchParams = params;
          subsidyCalendar.getLists();
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
          subsidyCalendar.searchParams = {};
          subsidyCalendar.getLists();
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
    <ProCard style={{ marginBottom: '16px' }} >
      <Form
        {...layout}
        form={form}
        initialValues={{
          invoiceState: '',
        }}
        // disabled={tableLoading}
      >
        <Row gutter={20} align="middle">

          <Col span={6}>
            <Item label="起止日期" name="date" style={{margin: '0', padding: '12px 0'}}>
              <RangePicker style={{ width: '100%' }} />
            </Item>
          </Col>

          <Col span={18} style={{ textAlign: 'right' }}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
