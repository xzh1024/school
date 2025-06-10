import { dataDictPUT, getEmployeeByOrgId, groupEdit } from '@api/accountingTreatment/groupInfo';

import { Col, Form, Input, message, Modal, Row, Select, Transfer } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import CategorySelect from '@c/departmentSelectByTree';
import UserSelect from '@c/userSelectByTree';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

function Index() {
  const [form] = Form.useForm();
  const { groupInfo } = useStores();
  let { currentRecord, modaltitle, comModalOpen } = groupInfo;
  const [groupLeaderId, setgroupLeaderId] = useState('');
  const [deptId, setdeptId] = useState('');

  const [loading, setLoading] = useState(false);

  const options = [
    { label: '1603_T', value: '1603_T' },
    // ... 其他选项
  ];
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const getMock = (currentRecord, type) => {
    let data = {
      deptIds: [currentRecord.groupDeptId],
    };
    getEmployeeByOrgId(data).then(res => {
      let needdata = res.data.map(item => {
        return {
          key: item.employeeId,
          title: item.employeeName + '-' + item.userName,
          description: item.name,
          employeeName: item.employeeName,
          userName: item.userName,
        };
      });
      let tempMockData = currentRecord.crews.map(item => {
        return {
          key: item.crewEmpId,
          title: item.crewEmpName,
          description: item.name,
          employeeName: item.employeeName,
          userName: item.userName,
        };
      });
      const mergedData = [...needdata, ...tempMockData];
      const uniqueData = mergedData.reduce((accumulator, currentItem) => {
        // 如果 accumulator 中没有当前项的 key，则添加该项
        if (!accumulator.some(item => item.key === currentItem.key)) {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);
      setMockData(uniqueData);
      setTargetKeys(tempMockData.map(item => item.key));
    });
  };
  const getMocked = (groupDeptId, type) => {
    let data = {
      deptIds: [groupDeptId],
    };
    // 获取选中的数据
    const selectedData = mockData.filter(item => targetKeys.includes(item.key));
    getEmployeeByOrgId(data).then(res => {
      let needdata = res.data.map(item => {
        return {
          key: item.employeeId,
          title: item.employeeName + '-' + item.userName,
          description: item.name,
          employeeName: item.employeeName,
          userName: item.userName,
        };
      });
      const mergedData = [...needdata, ...selectedData];
      const uniqueData = mergedData.reduce((accumulator, currentItem) => {
        // 如果 accumulator 中没有当前项的 key，则添加该项
        if (!accumulator.some(item => item.key === currentItem.key)) {
          accumulator.push(currentItem);
        }
        return accumulator;
      }, []);
      setMockData(uniqueData);
    });
  };

  const filterOption = (inputValue, option) => {
    return (option.title || '').indexOf(inputValue) > -1;
  };
  const handleChange = newTargetKeys => {
    setTargetKeys(newTargetKeys);
  };
  const handleSearch = (dir, value) => {};
  useEffect(() => {
    if (modaltitle === '修改数据') {
      groupEdit(currentRecord.groupId).then(res => {
        currentRecord = res.data;
        setgroupLeaderId(currentRecord.groupLeaderIdStr);
        setdeptId(currentRecord.groupDeptId);
        getMock(currentRecord); // 获取数据
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
          // ...groupInfo.currentRecord,
        };
        if (modaltitle === '新增数据') {
          data = {
            groupId: currentRecord.groupId,
            ...values,
            deptId: deptId,
            groupLeaderId: groupLeaderId,

            groupMembers: targetKeys.join(','),
          };
        } else {
          data = {
            groupId: currentRecord.groupId,
            ...values,
            deptId: deptId,
            groupLeaderId: groupLeaderId,

            groupMembers: targetKeys.join(','),
          };
        }
        setLoading(true);
        // let undatacode = modaltitle === '新增数据' ? dataDict : dataDictPUT;//新增修改一个值
        dataDictPUT(data)
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              groupInfo.showModal = false;
              groupInfo.currentRecord = {};
              groupInfo.getTableList();
            });
          })
          .catch(err => {
            setLoading(false);
          });
      })
      .catch(err => {});
  };

  const handleCancel = () => {
    runInAction(() => {
      groupInfo.showModal = false;
    });
  };

  const handleSelectChange = (value, options) => {
    // 在这里执行你想要的操作，比如更新组件的状态或触发其他逻辑
    let groupLeaderId = options.map(item => `${item.parentOrgId}/${item.userId}`).join(',');
    setgroupLeaderId(groupLeaderId);
    form.setFieldValue('groupLeaderId', groupLeaderId);
    form.setFieldValue('groupLeaderName', groupLeaderId);
  };
  const handleSelectChangeed = (value, options) => {
    setdeptId(value[0]);
    getMocked(value[0]);
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
      width={1300}
    >
      <Form form={form} {...layout} className="pt-6" initialValues={currentRecord}>
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Form.Item label="分组类型：" name="groupType" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" style={{ width: 260 }}>
                <Select.Option value="0">核算会计</Select.Option>
                <Select.Option value="1">复核会计</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="小组：" name="groupName" rules={[{ required: true, message: '请输入' }]}>
              <Input allowClear style={{ width: 260 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* groupDeptName groupDeptId */}
            <Form.Item label="所属部门：" name="groupDeptName" rules={[{ required: true, message: '请选择' }]}>
              <CategorySelect multiple onChange={handleSelectChangeed} mun={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="组长：" name="groupLeaderName" rules={[{ required: true, message: '请选择' }]}>
              <UserSelect onSelected={handleSelectChange} multiple />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="是否启用：" name="delFlg" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" style={{ width: 260 }}>
                <Select.Option value="0">是</Select.Option>
                <Select.Option value="1">否</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="组员分工上限："
              name="memberTasks"
              style={{ width: 860 }}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input allowClear style={{ width: 260 }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="审核会计列表："
              name="groupMembers"
              labelCol={{
                span: 2,
              }}
              wrapperCol={{
                span: 22,
              }}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Transfer
                dataSource={mockData}
                showSearch
                listStyle={{
                  width: 1000,
                  height: 300,
                }}
                filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={handleChange}
                onSearch={handleSearch}
                render={item => item.title}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
