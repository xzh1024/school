import { dataDictPUT, groupEdit } from '@api/accountingTreatment/accountOffSet';
import { Form, Modal, message, Col, Row, DatePicker } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';
import UserSelectByTree from '@c/userSelectByTree';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function Index() {
  const [form] = Form.useForm();
  const { accountOnSet } = useStores();
  let { currentRecord, modaltitle, currentList } = accountOnSet;
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
    } else if (modaltitle === '批量修改数据') {
      console.log(currentList, 'currentList');
      form.setFieldValue('date', [dayjs(currentList[0].startTime), dayjs(currentList[0].endTime)]);
    }
    setLoading(false);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        let data = [];
        if (modaltitle === '新增数据') {
          data = [
            {
              ...params,
              ...accountOnSet.currentRecord,
              settingDiff: '1',
              operType: '1',
            },
          ];
        } else if (modaltitle === '修改数据') {
          data = [
            {
              ...params,
              ...accountOnSet.currentRecord,
              settingDiff: '1',
              operType: '0',
            },
          ];
        } else if (modaltitle === '批量修改数据') {
          const formObj = form.getFieldsValue();
          let startTime, endTime;
          if (formObj.date) {
            startTime = dayjs(formObj.date[0]).format('YYYY-MM-DD HH:mm');
            endTime = dayjs(formObj.date[1]).format('YYYY-MM-DD HH:mm');
          }
          data = currentList.map(item => {
            return {
              recordId: item.recordId,
              crewEmpId: item.crewEmpId,
              crewEmpCode: item.crewEmpCode,
              crewEmpName: item.crewEmpName,
              orgId: item.orgId,
              orgName: item.orgName,
              startTime,
              endTime,
              settingDiff: '1',
              operType: '0',
            };
          });
        }

        data.modifyTime = undefined;
        data.createTime = undefined;

        setLoading(true);
        dataDictPUT(data)
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              accountOnSet.showModal = false;
              accountOnSet.currentRecord = {};
              accountOnSet.currentList = [];
              accountOnSet.getTableList();
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
      accountOnSet.showModal = false;
    });
  };

  const handleFormChangeed = () => {
    const params = form.getFieldsValue();

    if (params.staff && typeof params.staff === 'object') {
      console.log(params.staff, 'params.staff');
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
      accountOnSet.currentRecord = {
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
              <UserSelectByTree title="请选择选择员工" disabled={modaltitle === '新增数据' ? false : true} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col span={24}>
            <Form.Item label="在岗时间：" name="date" rules={[{ required: true, message: '请输入' }]}>
              <RangePicker
                showTime
                style={{ width: '100%' }}
                allowClear
                disabledDate={current => current && current < dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
