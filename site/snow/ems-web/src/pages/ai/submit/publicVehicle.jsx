import { DatePicker, Form, Input, Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import useStores from '@s';
import Message from './message';
import ProcessList from './processList';
import ProjectSelect from './projectSelect';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { nextToApproveForTravel, submitLocalTravelApply } from '../../../api/ai';
import { openClaim } from '@api/index';

function Index(props) {
  const [form] = Form.useForm();
  const { item } = props;
  const { answer = {}, isHistory, isDisabled } = item;
  const { cellList = [], business_no, cause, dest, devProjectCode, devProjectName, endDate, startDate } = answer;
  const { aiSubmit } = useStores();
  const { initData } = aiSubmit;
  const [showRangerPicker, setShowRangerPicker] = useState(false);
  const loading = useRef(false);
  const nodeId = useRef('');
  const claimId = useRef('');
  const approverId = useRef('');
  const approvers = useRef([]);

  useEffect(() => {
    setShowRangerPicker(endDate !== startDate);
    form.setFieldsValue({
      date: [dayjs(startDate), dayjs(endDate)],
      startDate: dayjs(startDate),
      dest,
      cause,
      devProjectCode: devProjectCode || '无',
      devProjectName,
    });
  }, []);

  // 跳转页面
  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  // 取消选择研发项目
  const projectSelectCancel = () => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question: '不是',
      templateType: 'publicVehicleForm',
    });
    const answerData = {
      ...item.answer,
      devProjectCode: '',
      devProjectName: '',
      isDevProject: 'N',
      isDevSelfProject: '',
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  };
  // 确认选择研发项目
  const projectSelectConfirm = option => {
    if (!(option && option.devProjectCode)) return;
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question: '是',
      templateType: 'publicVehicleForm',
    });
    const answerData = {
      ...item.answer,
      devProjectCode: option.devProjectCode,
      devProjectName: option.devProjectName,
      isDevProject: option.devProjectCode ? 'Y' : 'N',
      isDevSelfProject: option.isDevProject || '',
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  };
  // 编辑研发项目
  const projectSelectChange = (value, option) => {
    const answerData = {
      ...item.answer,
      devProjectCode: option.devProjectCode || '',
      devProjectName: option.devProjectName || '',
      isDevProject: option.devProjectCode ? 'Y' : 'N',
      isDevSelfProject: option.isDevProject || '',
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  };

  // 确认审批人
  const checkPerson = value => {
    if (value) {
      const cellItem = cellList[cellList.length - 1];
      cellItem.isDisabled = true;
      cellList.push({
        id: uuid(),
        question: value.username,
      });
      const answerData = {
        ...item.answer,
        cellList,
      };
      aiSubmit.setMessage(item.id, {
        ...item,
        answer: answerData,
      });
      aiSubmit.saveHistoryJson('0', answerData); // 保存历史
      setTimeout(() => {
        onSubmit(value.ldapid);
      }, 30);
    }
  };

  // 取消提报
  const onCancel = ({ question = '', answer = '' }) => {
    if (!cellList.length) return;
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question,
      answer,
    });
    const answerData = {
      ...item.answer,
      devProjectCode: '',
      devProjectName: '',
      isDevProject: 'N',
      isDevSelfProject: '',
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('1', answerData); // 保存历史
  };

  // 保存
  const onSave = async () => {
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue();
        const { dest, cause } = formData;
        let startDate = '';
        let endDate = '';
        if (showRangerPicker && formData.date) {
          startDate = dayjs(formData.date[0]).format('YYYY-MM-DD');
          endDate = dayjs(formData.date[1]).format('YYYY-MM-DD');
        } else {
          startDate = dayjs(formData.startDate).format('YYYY-MM-DD');
          endDate = dayjs(formData.startDate).format('YYYY-MM-DD');
        }
        const { isDevProject, isDevSelfProject } = answer;

        Modal.info({
          title: '温馨提示',
          content: '出差期间，中基层员工除接送机/站外，不得发生出差地公出用车。',
          closable: false,
          okText: '确认',
          onOk: async () => {
            const params = {
              claimId: '',
              item2Code: '1010',
              travelEndCity: dest,
              remark: cause + '(AI)',
              beginTime: `${startDate} 00:00:00`,
              endTime: `${endDate} 23:59:00`,
              candidateusers: '',
              devProjectCode: devProjectCode || '',
              devProjectName: devProjectName || '',
              isDevProject: devProjectCode ? 'Y' : 'N',
              isDevSelfProject: isDevSelfProject || '',
              orgName: initData.orgName,
              positionId: initData.positionId,
              positionCode: initData.positionCode,
              // isMaster: 1, //0
              userName: initData.userName,
              businessLine: initData.businessLine,
            };
            if (loading.current) return;
            const cellItem = cellList[cellList.length - 1];
            cellItem.isDisabled = true;
            cellList.push({
              id: uuid(),
              question: '确认提报',
            });
            const answerData = {
              ...item.answer,
              // 更新表单数据
              dest,
              cause,
              devProjectCode,
              devProjectName,
              isDevProject,
              isDevSelfProject,
              startDate,
              endDate,
              cellList,
            };
            aiSubmit.setMessage(item.id, {
              ...item,
              answer: answerData,
            });
            aiSubmit.saveHistoryJson('0', answerData); // 保存历史
            setTimeout(async () => {
              cellList.push({
                id: uuid(),
                templateType: 'processList',
                processList: [
                  {
                    loading: true,
                    answer: '正在保存',
                  },
                ],
              });
              aiSubmit.setMessage(item.id, {
                ...item,
                answer: {
                  ...item.answer,
                  cellList,
                },
              });

              try {
                const res = await nextToApproveForTravel(params);
                const data = res.data || {};
                const flowRule = data.flowRule || [];
                let nodeid = '';
                let approverList = [];
                if (flowRule.length) {
                  // 审批人列表
                  approverList = flowRule[0].personlist || [];
                  nodeid = flowRule[0].nodeid || '';
                }
                approvers.current = approverList;
                nodeId.current = nodeid;
                claimId.current = data.clamid;
                const cellItem = cellList[cellList.length - 1];
                cellItem.processList = [
                  {
                    answer: '保存成功',
                    loading: false,
                    showSuccess: true,
                  },
                ];
                if (approverList.length === 0) {
                  cellItem.processList = [
                    ...cellItem.processList,
                    {
                      answer: '提交失败',
                      loading: false,
                      showError: true,
                    },
                    {
                      answer: '该单据缺少审核人员，请联系运维人员维护审核人员，并手工在草稿箱提交。',
                      loading: false,
                    },
                  ];
                  const answerData = {
                    ...item.answer,
                    formDisabled: true,
                    cellList: [...cellList],
                  };
                  aiSubmit.setMessage(item.id, {
                    ...item,
                    answer: answerData,
                  });
                  aiSubmit.saveHistoryJson('1', answerData); // 保存历史
                } else {
                  if (approverList.length > 1) {
                    cellItem.processList.push({
                      answer: '查询到有多个审批人，请选择审批人？',
                      loading: false,
                    });
                    cellItem.showCheckApprover = true;
                  }
                  const answerData = {
                    ...item.answer,
                    formDisabled: true,
                    cellList: [...cellList],
                  };
                  aiSubmit.setMessage(item.id, {
                    ...item,
                    answer: answerData,
                  });
                  aiSubmit.saveHistoryJson('0', answerData); // 保存历史
                  setTimeout(() => {
                    if (approverList.length === 1) {
                      onSubmit(approverList[0].ldapid);
                    }
                  }, 30);
                }
              } catch (error) {
                const cellItem = cellList[cellList.length - 1];
                cellItem.processList = [
                  {
                    answer: '保存失败',
                    loading: false,
                    showError: true,
                  },
                  {
                    answer: error.message || '当前使用人数过多，请稍后再试。',
                    loading: false,
                  },
                ];
                const answerData = {
                  ...item.answer,
                  cellList,
                };
                aiSubmit.setMessage(item.id, {
                  ...item,
                  answer: answerData,
                });
                aiSubmit.saveHistoryJson('1', answerData);
              }
            }, 30);
          },
        });
      })
      .catch(() => {});
  };

  // 提交
  const onSubmit = (v, isResubmit) => {
    if (loading.current) return;
    loading.current = true;
    const approverList = approvers.current || [];
    if (approverList.length > 1) {
      const cellItem = cellList[cellList.length - 1];
      cellItem.isDisabled = true;
      cellList.push({
        id: uuid(),
        templateType: 'processList',
        processList: [
          {
            answer: '正在为您提报，请稍后',
            loading: true,
          },
        ],
      });
      aiSubmit.setMessage(item.id, {
        ...item,
        answer: {
          ...item.answer,
          cellList,
        },
      });
    } else {
      const cellItem = cellList[cellList.length - 1];
      cellItem.processList = cellItem.processList || [];
      cellItem.templateType = 'processList';
      cellItem.processList.push({
        answer: '正在为您提报，请稍后',
        loading: true,
      });
      aiSubmit.setMessage(item.id, {
        ...item,
        answer: {
          ...item.answer,
          cellList,
        },
      });
    }
    const parmas = {
      claimId: claimId.current,
      item2Code: '1010',
      travelEndCity: answer.dest,
      remark: answer.cause,
      beginTime: `${answer.startDate} 00:00:00`,
      endTime: `${answer.endDate} 23:59:00`,
      nextNodeId: nodeId.current || '',
      candidateUsers: [v],
      userName: initData.userName,
      processOpinion: '请审批',
    };
    submitLocalTravelApply(parmas)
      .then(resp => {
        if (resp && resp.ok) {
          setTimeout(() => {
            const cellItem = cellList[cellList.length - 1];
            const processList = cellItem.processList;
            processList[processList.length - 1].answer = '提报成功';
            processList[processList.length - 1].loading = false;
            processList[processList.length - 1].showSuccess = true;
            cellItem.successNumber = resp.data;
            cellItem.claimId = claimId.current;
            const answerData = {
              ...item.answer,
              cellList,
            };
            aiSubmit.setMessage(item.id, {
              ...item,
              answer: answerData,
            });
            // 提报成功-保存历史记录
            aiSubmit.saveHistoryJson('1', answerData);
          }, 30);
        } else {
          throw new Error(resp);
        }
      })
      .catch(error => {
        setTimeout(() => {
          loading.current = false;
          const cellItem = cellList[cellList.length - 1];
          const processList = cellItem.processList;
          processList[processList.length - 1].answer = '提报失败';
          processList[processList.length - 1].loading = false;
          processList[processList.length - 1].showError = true;
          const answerData = {
            ...item.answer,
          };
          // 提报失败允许重试一次
          if (isResubmit) {
            processList.push({
              answer: error.message || '当前使用人数过多，请稍后再试。',
              loading: false,
            });
          } else {
            cellItem.showResubmit = true;
            approverId.current = v; // 记录审批人数据
            processList.push({
              answer: '是否重新提报？',
              loading: false,
            });
          }
          answerData.cellList = cellList;
          aiSubmit.setMessage(item.id, {
            ...item,
            answer: answerData,
          });
          aiSubmit.saveHistoryJson(isResubmit ? '1' : '0', answerData);
        }, 30);
      });
  };

  // 重新提报
  const onResubmit = () => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question: '重新提报',
    });
    onSubmit(approverId.current, true);
  };

  const getProcessListSlot = cellItem => {
    // 查询到有多个审批人
    if (!cellItem.isDisabled && !isHistory && cellItem.showCheckApprover) {
      return (
        <div className="mt-3">
          {approvers.current.map(item => (
            <Button key={item.ldapid} className="mr-2" onClick={() => checkPerson(item)}>
              {item.username}
            </Button>
          ))}
        </div>
      );
    }
    // 重新提报
    if (!cellItem.isDisabled && !isHistory && cellItem.showResubmit) {
      return (
        <div className="mt-4">
          <Button className="mr-2" type="primary" ghost onClick={onResubmit}>
            重新提报
          </Button>
          <Button
            onClick={() =>
              onCancel({
                question: '稍后再试',
                answer: '提报结束，还有什么想和雪宝说的吗？',
              })
            }
          >
            稍后再试
          </Button>
        </div>
      );
    }
    // 提报成功
    if (cellItem.successNumber) {
      return (
        <div className="mt-1">
          雪宝已为您生成提报单号：
          <div>
            <span className="text-[#2c68ff] cursor-pointer" onClick={() => jumpToClaim(cellItem.claimId)}>
              {cellItem.successNumber}
            </span>
            ，点击提报单号，跳转至“事前申请_列表”中查看。
          </div>
        </div>
      );
    }
    return '';
  };

  const validatorDate = () => {
    let startDate = '';
    let endDate = '';
    const formData = form.getFieldsValue();
    if (showRangerPicker) {
      if (formData.date && formData.date.length) {
        startDate = dayjs(formData.date[0]).format('YYYY-MM-DD');
        endDate = dayjs(formData.date[1]).format('YYYY-MM-DD');
      }
    } else if (formData.startDate) {
      startDate = dayjs(formData.startDate).format('YYYY-MM-DD');
      endDate = dayjs(formData.startDate).format('YYYY-MM-DD');
    }
    if (startDate && endDate) {
      // 使用moment解析时间，并检查是否有效
      const isValidStartDate = dayjs(startDate, 'YYYY-MM-DD', true).isValid();
      const isValidEndDate = dayjs(endDate, 'YYYY-MM-DD', true).isValid();
      if (!(isValidStartDate && isValidEndDate)) {
        return Promise.reject(new Error('请选择有效的日期'));
      }
      // 计算两个时间相差的天数
      const startTime = dayjs(startDate);
      const endTime = dayjs(endDate);
      const nowTime = dayjs().format('YYYY-MM-DD');
      // 判断用车日期是否小于今天
      if (startTime.isBefore(nowTime)) {
        return Promise.reject(new Error('出差日期不能小于今天'));
      }
      // 用车日期不能大于30天
      if (startTime.diff(nowTime, 'days') > 29) {
        return Promise.reject(new Error('用车日期不能大于30天'));
      }
      // 开始日期与用车结束日期不能超过30天
      if (endTime.diff(startTime, 'days') > 29) {
        return Promise.reject(new Error('用车开始日期与用车结束日期不能超过30天'));
      }
      const startTimestamp = new Date(`${startDate} 00:00:00`).getTime();
      const endTimestamp = new Date(`${endDate} 23:59:00`).getTime();
      // 判断开始时间是否大于结束时间
      if (startTimestamp > endTimestamp) {
        return Promise.reject(new Error('开始日期不能大于结束日期'));
      }
      return Promise.resolve();
    }
    return Promise.reject(new Error('请选择出差日期'));
  };

  const getPublicVehicleForm = cellItem => {
    if (!isHistory) {
      setTimeout(() => {
        // 触发校验
        form.validateFields();
      }, 500);
    }
    return (
      <Message
        {...cellItem}
        content={
          <div>
            <div>雪宝即将为您提报“公出用车事前申请”。申报信息如下：</div>
            <Form
              className="mt-2 w-[410px]"
              size="middle"
              form={form}
              disabled={isHistory || cellItem.isDisabled}
              labelAlign="left"
              labelCol={{
                span: 8,
              }}
            >
              {showRangerPicker ? (
                <Form.Item
                  label="用车日期"
                  name="date"
                  className="mb-2"
                  rules={[
                    () => ({
                      validator: validatorDate,
                    }),
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: '100%',
                    }}
                  ></DatePicker.RangePicker>
                </Form.Item>
              ) : (
                <Form.Item
                  label="用车日期"
                  name="startDate"
                  className="mb-2"
                  rules={[
                    () => ({
                      validator: validatorDate,
                    }),
                  ]}
                >
                  <DatePicker
                    style={{
                      width: '100%',
                    }}
                  ></DatePicker>
                </Form.Item>
              )}
              <Form.Item
                label="目的地"
                name="dest"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value = '') {
                      value = value.trim();
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('目的地不能为空');
                    },
                  }),
                ]}
              >
                <Input maxLength={30} placeholder="请输入目的地，多个目的地用“，”分隔"></Input>
              </Form.Item>
              <Form.Item
                label="申请事由"
                name="cause"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value = '') {
                      value = value.trim();
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('申请事由不能为空');
                    },
                  }),
                ]}
              >
                <Input maxLength={100} placeholder="请输入申请事由"></Input>
              </Form.Item>
              <Form.Item label="费用所属研发项目" name="devProjectCode" className="mb-2">
                <ProjectSelect
                  isFormItem
                  defaultValue={devProjectCode || '无'}
                  onSelect={projectSelectChange}
                ></ProjectSelect>
              </Form.Item>
            </Form>
            <div className="text-[#FF8C1A] text-base font-normal">是否确认提报？</div>
            {!(isHistory || cellItem.isDisabled) ? (
              <div className="mt-2">
                <Button className="mr-2" type="primary" ghost onClick={onSave}>
                  确认提报
                </Button>
                <Button
                  onClick={() => {
                    onCancel({
                      question: '取消',
                      answer: '取消提报。还有什么想和雪宝交流的吗？',
                    });
                  }}
                >
                  取消
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        }
      />
    );
  };

  return (
    <div>
      {cellList.map((cellItem, key) => {
        return (
          <div key={key}>
            {cellItem.question && <Message {...cellItem} isQuest={true} content={cellItem.question} />}
            {cellItem.answer && <Message {...cellItem} content={cellItem.answer} />}
            {cellItem.templateType === 'projectCheckBox' && (
              <Message
                {...cellItem}
                content={
                  <ProjectSelect
                    hiddenBtn={isHistory || cellItem.isDisabled}
                    onCancel={projectSelectCancel}
                    onConfirm={projectSelectConfirm}
                  ></ProjectSelect>
                }
              />
            )}
            {cellItem.templateType === 'processList' && (
              <Message
                {...cellItem}
                content={
                  <ProcessList list={cellItem.processList || []} slot={getProcessListSlot(cellItem)}></ProcessList>
                }
              />
            )}
            {cellItem.templateType === 'publicVehicleForm' && getPublicVehicleForm(cellItem)}
          </div>
        );
      })}
    </div>
  );
}

export default observer(Index);
