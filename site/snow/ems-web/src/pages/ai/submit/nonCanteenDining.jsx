import { Form, Button, Modal, Select, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import useStores from '@s';
import Message from './message';
import ProcessList from './processList';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { throttle } from 'lodash';
import { saveClaim, submitClaim, reimburseInit, queryListByParentId } from '@api/ai';
import { openClaim } from '@api/index';
import NonCanteenDiningProhibit from './nonCanteenDiningProhibit';

function Index(props) {
  const [form] = Form.useForm();
  const { item } = props;
  const { answer = {}, isHistory } = item;
  const { cellList = [], cause, dest, devProjectCode, devProjectName, endDate, startDate } = answer;
  const { aiSubmit } = useStores();
  const { initData, customerTypeList, entertainmentList } = aiSubmit;
  const [imageLists, setImageLists] = useState([]);
  const [serveTypeList, setServeTypeList] = useState([]);
  const [claimbase, setClaimbase] = useState({});
  const loading = useRef(false);
  const nodeId = useRef('');
  const claimId = useRef('');
  const leaderData = useRef({});
  const approvers = useRef([]);

  const customerTypeOptions = useMemo(() => {
    return customerTypeList
      .map(item => {
        return {
          id: item.id,
          name: item.typeName,
          standard: item.standard,
          accoNums: item.accompanyNums,
          enterNums: item.entertainNums,
        };
      })
      .filter(item => {
        if (item.name === '工作餐' || item.name === '加班餐') {
          return false;
        }
        return true;
      });
  }, [customerTypeList]);

  // 跳转页面
  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  const [calculateResult, setCalculateResult] = useState({
    price: 0,
    payNum: 0,
  });

  // 报销标准
  const getCalculate = () => {
    const data = {
      price: 0,
      payNum: 0,
    };
    if (isHistory) {
      data.price = answer.price || 0;
      data.payNum = answer.payNum || 0;
    } else {
      const { escortNum, serveNum, serveTypeCode } = form.getFieldsValue(true);
      if (serveTypeCode) {
        const findData = serveTypeList.find(v => v.id === Number(serveTypeCode));
        if (findData) {
          let standard = findData.standard;
          data.price = standard; // 标准
          data.payNum = ((Number(escortNum) + Number(serveNum)) * Number(standard)).toFixed(2);
        }
      }
    }
    setCalculateResult(data);
    return data;
  };

  useEffect(() => {
    const serveSubType = answer.serveSubType ? Number(answer.serveSubType) : '';
    const formData = {
      date: [dayjs(startDate), dayjs(endDate)],
      startDate: dayjs(startDate),
      extend12: !!answer.extend12,
      origin,
      dest,
      cause,
      remark: answer.remark,
      devProjectCode,
      devProjectName,
      serveSubType,
      serveSubTypeName: answer.serveSubTypeName || '',
      serveType: answer.serveType || '',
      serveTypeCode: answer.serveTypeCode ? Number(answer.serveTypeCode) : '',
      serveNum: answer.serveNum || 0,
      escortNum: answer.escortNum || 0,
      serveObj: answer.serveObj || '',
      serveObjCode: answer.serveObjCode || '',
    };
    if (isHistory) {
      formData.serveTypeCode = answer.serveType || '';
    }
    form.setFieldsValue(formData);

    if (!isHistory) {
      getReimburseInit();
      // 历史数据不需要重新获取招待类型
      if (serveSubType) {
        getListByParentId(serveSubType, true); // 获取招待类型列表
      }
    }
  }, []);

  useEffect(() => {
    getCalculate();
  }, [serveTypeList]);

  const claimbaseInit = data => {
    const claimbase = {};
    Object.keys(data).forEach(v => {
      if (!['claimBaseLines', 'claimBaseWriteOffs'].includes(v)) {
        claimbase[v] = data[v];
      }
      if (v === 'claimBaseLines') {
        claimbase.claim_base_lines = data[v];
      }
    });
    setClaimbase(claimbase);
  };

  // 页面初始化获取数据
  const getReimburseInit = async () => {
    const { orgId, orgName, positionId, userName, businessLine } = initData;
    let params = {
      userId: '',
      accountsId: '',
      claimId: '',
      orgId,
      orgName,
      positionId,
      positionCode: positionId,
      isMaster: 1,
      userName,
      businessLine,
    };
    const res = await reimburseInit(params);
    if (res && res.data) {
      const { reimburseinit } = res.data;
      claimbaseInit(reimburseinit);
      setImageLists(res.claimAttachList || []); // 自动载入附件
    }
  };

  // 获取招待类型列表
  const getListByParentId = async (parentId, isInit) => {
    const { orgId, orgName, positionId, positionCode, userName, businessLine } = initData;
    const res = await queryListByParentId({
      parentId,
      orgId,
      orgName,
      positionId,
      positionCode,
      isMaster: 1,
      userName,
      businessLine,
    });
    if (res) {
      setServeTypeList(res.data || []);
    } else {
      setServeTypeList([]);
    }
    if (isInit) {
      getCalculate();
    }
  };

  // 业务小类改变
  const serveSubTypeChange = (value, option) => {
    form.setFieldsValue({
      serveType: '', // 清除招待类型名称
      serveTypeCode: '', // 清除招待类型
      serveSubTypeName: option.name,
    });
    getListByParentId(value);
  };

  // 招待类型改变
  const serveTypeChange = (value, option) => {
    form.setFieldsValue({
      serveType: option.typeName,
    });
  };
  // 招待对象改变
  const serveObjChange = (value, option) => {
    form.setFieldsValue({
      serveObj: option.dictName,
    });
  };

  // 监听表单字段的变化
  const onValuesChange = (changedValues, allValues) => {
    getCalculate();
  };

  // 确认审批人
  const checkPerson = throttle(value => {
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
        onSubmit(value);
      }, 30);
    }
  }, 500);

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
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('1', answerData); // 保存历史
  };

  // 表单校验结果
  const formValidate = () => {
    const formData = form.getFieldsValue();
    const { serveSubType, serveTypeCode, serveObjCode, serveNum, escortNum } = formData;
    const result = {
      serveSubTypeFlag: false, // 业务小类
      serveTypeFlag: false, // 招待类型
      serveObjFlag: false, // 招待对象
      serveNumFlag: false, // 招待人数
      escortNumFlag: false, // 陪同人数
      escortNum: Infinity,
    };
    if (serveSubType) {
      result.serveSubTypeFlag = true;
    }
    if (serveObjCode) {
      result.serveObjFlag = true;
    }
    if (serveNum && Number.isInteger(serveNum) && serveNum > 0) {
      result.serveNumFlag = true;
    }
    // 招待类型
    if (serveTypeCode) {
      result.serveTypeFlag = true;
      // 其他公务接待
      if ([17, 21].includes(Number(serveTypeCode))) {
        if (serveNum > 10) {
          result.escortNum = Math.floor(serveNum / 3);
          if (escortNum <= serveNum / 3 && Number.isInteger(escortNum)) {
            result.escortNumFlag = true;
          }
        } else {
          result.escortNum = 3;
          if (escortNum <= 3 && Number.isInteger(escortNum)) {
            result.escortNumFlag = true;
          }
        }
      } else {
        if (serveNum > 5) {
          result.escortNum = Math.floor(5 + (serveNum - 5) / 2);
          if (escortNum <= 5 + (serveNum - 5) / 2 && Number.isInteger(escortNum)) {
            result.escortNumFlag = true;
          }
        } else {
          result.escortNum = serveNum;
          if (escortNum <= serveNum && Number.isInteger(escortNum)) {
            result.escortNumFlag = true;
          }
        }
      }
    }
    return result;
  };

  // 确认
  const onConfirm = () => {
    form
      .validateFields()
      .then(() => {
        const validateData = formValidate();
        if (!validateData.serveSubTypeFlag) {
          Modal.error({
            title: '温馨提示',
            content: '请选择业务小类',
          });
          return;
        }
        if (!validateData.serveTypeFlag) {
          Modal.error({
            title: '温馨提示',
            content: '请选择招待类型',
          });
          return;
        }
        if (!validateData.serveObjFlag) {
          Modal.error({
            title: '温馨提示',
            content: '请选择招待对象',
          });
          return;
        }
        if (!validateData.serveNumFlag) {
          Modal.error({
            title: '温馨提示',
            content: '请填写有效招待人数',
          });
          return;
        }
        if (!validateData.escortNumFlag) {
          Modal.error({
            title: '温馨提示',
            content: '请填写有效陪同人数',
          });
          return;
        }
        // if (!claimbase.userid) {
        //   Modal.error({
        //     title: '温馨提示',
        //     content: '未获取到基础信息，请重试',
        //   });
        //   return;
        // }
        onSave('确定提报');
      })
      .catch(() => {});
  };

  // 保存
  const onSave = async question => {
    const { orgId, orgName, businessLine, positionId, userName } = initData;
    const formData = form.getFieldsValue(true);
    const {
      serveSubType, // 业务小类
      serveSubTypeName,
      serveTypeCode, // 招待类型
      serveType, // 招待类型 中文名
      serveNum, // 招待人数
      escortNum, // 陪同人数
      serveObjCode, // 招待对象
      serveObj, // 招待对象 中文名
    } = formData;

    claimbase.attachNum = imageLists.length;
    claimbase.remark = '详见招待明细(AI)';
    claimbase.item2Code = '1002';
    claimbase.item2Name = '业务招待事前申请';
    claimbase.vendorDesc = '';
    claimbase.deptId = claimbase.deptid;
    claimbase.deptName = claimbase.deptname;
    claimbase.userName = claimbase.username;
    const params = {
      claimbase: {
        ...claimbase,
      },
      acquiringBase: {
        hasPhysicalBills: 0,
      },
      // attachFileIds: this.imageLists.map(v => v.imageId),
      claimbaselines: [
        {
          item3Code: '',
          item3Name: '',
          orgId,
          orgName,
          deptId: orgId,
          deptName: orgName,
          hospitalityType: serveSubType, // 业务小类
          hospitalityName: serveSubTypeName, // 业务小类名称
          applyDrinkFlag: 'N', // 是否申请酒水
          applyDrinkDetailList: [],
          extend16: serveTypeCode, // 招待类型
          extend22: serveType, // 招待类型名称
          accompanyNum: escortNum, // 陪同人数
          hospitalityNum: serveNum, // 招待人数
          extend29: serveObj, // 招待对象
          price: calculateResult.price, // 标准
          payNum: calculateResult.payNum, // 报销金额
          remark: serveObj, // 备注
        },
      ],
      businessLine,
      isMaster: 1,
      orgId,
      orgName,
      positionCode: positionId,
      positionId,
      userName,
    };
    if (loading.current) return;
    // if (!loading.current) return; //

    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question,
      // question: '确认提报'
    });
    const answerData = {
      ...item.answer,
      // 更新表单数据
      serveSubType, // 业务小类
      serveSubTypeName,
      serveTypeCode, // 招待类型
      serveType, // 招待类型 中文名
      serveNum, // 招待人数
      escortNum, // 陪同人数
      serveObjCode, // 招待对象
      serveObj, // 招待对象 中文名
      price: calculateResult.price, // 标准
      payNum: calculateResult.payNum, // 标准
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
    setTimeout(() => {
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
    }, 30);

    try {
      const res = await saveClaim(params);
      const data = res.data || {};
      const flowRule = data.flowrule || [];
      let nodeid = '';
      let personList = [];
      if (flowRule.length) {
        // 审批人列表
        personList = flowRule[0].personlist || [];
        nodeid = flowRule[0].nodeid || '';
      }
      approvers.current = personList;
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

      if (personList.length === 0) {
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
          cellList,
        };
        aiSubmit.setMessage(item.id, {
          ...item,
          answer: answerData,
        });
        aiSubmit.saveHistoryJson('1', answerData);
      } else {
        if (personList.length > 1) {
          cellItem.processList.push({
            answer: '查询到有多个审批人，请选择审批人？',
            loading: false,
          });
          cellItem.showCheckApprover = true;
        }
        const answerData = {
          ...item.answer,
          formDisabled: true,
          cellList,
        };
        aiSubmit.setMessage(item.id, {
          ...item,
          answer: answerData,
        });
        aiSubmit.saveHistoryJson('0', answerData);
        setTimeout(() => {
          if (personList.length === 1) {
            onSubmit(personList[0]);
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
  };

  // 提交
  const onSubmit = (leader, isResubmit) => {
    if (loading.current) return;
    loading.current = true;
    const approverList = approvers.current;
    if (approverList && approverList.length > 1) {
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
      nextNodeId: nodeId.current || '',
      todoUnId: '',
      processOpinion: '请审批',
      currentNodeId: '',
      candidateUsers: `${leader.ldapid}/${leader.orgId}`,
      notifyUsersIds: '',
      currentStepId: '',
      nextStepId: nodeId.current || '',
      workItemId: '',
      source: 'emsMobile',
      orgId: initData.orgId,
      orgName: initData.orgName,
      positionId: initData.positionId,
      positionCode: initData.positionCode,
      // isMaster: 1,
      userName: initData.userName,
      businessLine: initData.businessLine,
    };
    submitClaim(parmas)
      .then(resp => {
        if (resp && resp.ok) {
          setTimeout(() => {
            const cellItem = cellList[cellList.length - 1];
            const processList = cellItem.processList || [];
            processList[processList.length - 1].answer = '提报成功';
            processList[processList.length - 1].loading = false;
            processList[processList.length - 1].showSuccess = true;
            cellItem.successNumber = resp.data.claimNo;
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
          const answer = {
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
            leaderData.current = leader;
            processList.push({
              answer: '是否重新提报？',
              loading: false,
            });
          }
          answer.cellList = cellList;
          aiSubmit.setMessage(item.id, {
            ...item,
            answer,
          });
          if (isResubmit) {
            aiSubmit.saveHistoryJson('1', answer);
          } else {
            aiSubmit.saveHistoryJson('0', answer);
          }
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
    onSubmit(leaderData.current, true);
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

  const getFormDom = cellItem => {
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
            <div>雪宝即将为您提报“非食堂用餐事前申请”。申报信息如下：</div>
            <Form
              className="mt-2 w-[420px]"
              size="middle"
              form={form}
              labelAlign="left"
              labelCol={{
                span: 5,
              }}
              disabled={isHistory || cellItem.isDisabled}
              onValuesChange={onValuesChange}
            >
              <Form.Item
                label="业务小类"
                name="serveSubType"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请选择业务小类');
                    },
                  }),
                ]}
              >
                <Select
                  className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
                  style={{
                    color: '#2C68FF',
                  }}
                  filterOption={false}
                  options={customerTypeOptions}
                  placeholder="请选择业务小类"
                  showSearch
                  fieldNames={{
                    value: 'id',
                    label: 'name',
                  }}
                  onChange={serveSubTypeChange}
                ></Select>
              </Form.Item>
              <Form.Item
                label="招待类型"
                name="serveTypeCode"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请选择招待类型');
                    },
                  }),
                ]}
              >
                <Select
                  className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
                  style={{
                    color: '#2C68FF',
                  }}
                  filterOption={false}
                  options={serveTypeList}
                  placeholder="请选择招待类型"
                  showSearch
                  fieldNames={{
                    value: 'id',
                    label: 'typeName',
                  }}
                  onChange={serveTypeChange}
                ></Select>
              </Form.Item>
              <Form.Item
                label="招待人数"
                name="serveNum"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      const validateData = formValidate();
                      if (validateData.serveNumFlag) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请填写有效招待人数');
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={isHistory || cellItem.isDisabled ? -Infinity : 1}
                  max={isHistory || cellItem.isDisabled ? Infinity : 1000}
                  defaultValue={answer.serveNum}
                />
              </Form.Item>
              <Form.Item
                label="陪同人数"
                name="escortNum"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      const validateData = formValidate();
                      if (validateData.escortNumFlag) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请填写有效陪同人数');
                    },
                  }),
                ]}
              >
                <InputNumber
                  min={isHistory || cellItem.isDisabled ? -Infinity : 0}
                  max={isHistory || cellItem.isDisabled ? Infinity : 1000}
                  defaultValue={answer.escortNum}
                />
              </Form.Item>
              <Form.Item
                label="招待对象"
                name="serveObjCode"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('请选择招待对象');
                    },
                  }),
                ]}
              >
                <Select
                  className="border-[#2C68FF] text-[#2C68FF] rounded-md w-min-[210px]"
                  style={{
                    color: '#2C68FF',
                  }}
                  filterOption={false}
                  options={entertainmentList}
                  placeholder="请选择招待类型"
                  showSearch
                  fieldNames={{
                    value: 'dictCode',
                    label: 'dictName',
                  }}
                  onChange={serveObjChange}
                ></Select>
              </Form.Item>
              <Form.Item label="标准" className="mb-2">
                <span className="text-[#a9a9a9]">{calculateResult.price} 元</span>
              </Form.Item>
              <Form.Item label="金额" className="mb-2">
                <span className="text-[#a9a9a9]">{calculateResult.payNum} 元</span>
              </Form.Item>
            </Form>
            <div className="text-[#FF8C1A] text-base font-normal">是否确认提报？</div>
            {!(isHistory || cellItem.isDisabled) ? (
              <div className="mt-2">
                <Button className="mr-2" type="primary" ghost onClick={onConfirm}>
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
            {/* 审批人 */}
            {cellItem.templateType === 'processList' && (
              <Message
                {...cellItem}
                content={
                  <ProcessList
                    isHistory={isHistory}
                    list={cellItem.processList || []}
                    slot={getProcessListSlot(cellItem)}
                  ></ProcessList>
                }
              />
            )}
            {/* 非食堂用餐-继续提报询问 */}
            {cellItem.templateType === 'prohibitCheckBox' && (
              <Message
                {...cellItem}
                content={
                  <NonCanteenDiningProhibit
                    type={2}
                    item={item}
                    isHistory={isHistory}
                    isDisabled={cellItem.isDisabled}
                  />
                }
              ></Message>
            )}
            {cellItem.templateType === 'nonCanteenDiningForm' && getFormDom(cellItem)}
          </div>
        );
      })}
    </div>
  );
}

export default observer(Index);
