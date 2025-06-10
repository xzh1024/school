import { dataDictPUT, groupEdit } from '@api/accountingTreatment/accountOffSet';
import UserSelectByTree from '@c/userSelectByTree';
import { Col, DatePicker, Form, Input, Modal, Row, message } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function Index() {
  const [form] = Form.useForm();
  const { accountOffSet } = useStores();
  let { currentRecord, modaltitle } = accountOffSet;
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});

  useEffect(() => {
    if (modaltitle === '修改数据') {
      groupEdit({ recordId: currentRecord.recordId, orgId: currentRecord.orgId }).then(res => {
        setParams({
          recordId: currentRecord.recordId,
          crewEmpId: res.data.crewEmpId,
          crewEmpCode: res.data.crewEmpCode,
          crewEmpName: res.data.crewEmpName,
          orgId: res.data.orgId,
          orgName: res.data.orgName,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
        });
        form.setFieldValue('date', [dayjs(res.data.startTime), dayjs(res.data.endTime)]);
      });
    }
    setLoading(false);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        let data = {
          // ...values,
          ...params,
          ...accountOffSet.currentRecord,
          settingDiff: '0',
        };
        if (modaltitle === '新增数据') {
          data.operType = '1';
        } else {
          data.operType = '0';
        }
        data.modifyTime = undefined;
        data.createTime = undefined;
        setLoading(true);
        dataDictPUT([data])
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              accountOffSet.showModal = false;
              accountOffSet.currentRecord = {};
              accountOffSet.getTableList();
            });
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        console.log('到这里', err);
      });
  };

  const handleCancel = () => {
    runInAction(() => {
      accountOffSet.showModal = false;
    });
  };

  const handleFormChangeed = () => {
    const params = form.getFieldsValue();

    if (params.staff && typeof params.staff === 'object') {
      params.crewEmpId = params.staff[0].empId;
      params.crewEmpCode = params.staff[0].userId;
      params.crewEmpName = params.staff[0].title;
      params.orgId = params.staff[0].orgId;
      params.orgName = params.staff[0].orgName;
    }
    delete params.staff;

    if (params.date) {
      params['startTime'] = dayjs(params.date[0]).format('YYYY-MM-DD HH:mm');
      params['endTime'] = dayjs(params.date[1]).format('YYYY-MM-DD HH:mm');
    }
    delete params.date;

    runInAction(() => {
      accountOffSet.currentRecord = {
        ...params,
      };
    });
  };

  return (
    <Modal
      title={modaltitle}
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width={700}
    >
      <Form form={form} {...layout} className="pt-6" initialValues={currentRecord} onValuesChange={handleFormChangeed}>
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item label="员工：" name="staff" rules={[{ required: true, message: '请选择' }]}>
              <UserSelectByTree title="请选择选择员工" disabled={modaltitle === '修改数据' ? true : false} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col span={24}>
            <Form.Item label="不在岗时间：" name="date" rules={[{ required: true, message: '请输入' }]}>
              <RangePicker
                showTime
                style={{ width: '100%' }}
                allowClear
                disabledDate={current => current && dayjs(current).endOf('day') < dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col span={24}>
            <Form.Item
              label="不在岗原因："
              name="reason"
              rules={[
                { required: false, message: '请输入' },
                { max: 100, message: '最大长度为100' },
              ]}
            >
              <Input.TextArea allowClear style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
