import { DatePicker, Form, Input, Button, Modal, Switch } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState, useRef } from 'react';
import useStores from '@s';
import Message from './message';
import ProcessList from './processList';
import ProjectSelect from './projectSelect';
import MeetingSelect from './meetingSelect';
import CitySelect from './citySelect';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { throttle } from 'lodash';
import { queryCities, travelNextToApprove, submitClaim } from '@api/ai';
import vuePy from '@/utils/vuePy';
import { openClaim } from '@api/index';

function Index(props) {
  const [form] = Form.useForm();
  const { item } = props;
  const { answer = {}, isHistory } = item;
  const { cellList = [], cause, dest, devProjectCode, devProjectName, endDate, startDate, meetingNumber } = answer;
  const { aiSubmit } = useStores();
  const { initData, myMeetingList } = aiSubmit;
  const [defaultVehicle] = useState({
    name: '飞机',
    value: '飞机:经济舱',
    key: '7',
    type: '',
    active: false,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABX5JREFUWEftmH+IVFUUx7/nzq5p7rqrhYi0/8iCuZYx776tlAL7KaRSf7SlhKtJiZnYL+gHEWWEEIQKgfTDyB9lQVaUlBhBa2g/mHveLlbShq4bWQhqu6tr6M7MO3GWNzKuMzvzcm0zPPDYtzP33ft558f3njuEC8ToAuHERdChjtRFj/5vPOp5niWipwDcDGCEiLQmEollqVTqp0IvOSyht9Y+AuAVABX5UCKyMwiCmf8JUM/zniWil0QkJKI16XR6bWVlZRbAHwCOMXPNsIPmIAFkRWRREATvKFQymWwwxmjIDzJz3bCCDoBcGATBuzkga+0bAB4EsIGZ7x820BKQmq9rReSUMeYa51z7sICWgFwRQYoxZpFzbnMxWRu06qdNmzZ6xIgRi0RkAoBuIuoOw7CLiPTqzmQyXYlEoouZjwGQgYvEgFzmnHt9MO0tCtrY2FgXhuHnAK4qQ7y1anv0ZQB0iYi+lH52e1Q4A3My35MlIXX9gqCe500hoh0A6kRkLxG9D6BGRMYS0VgAtQD0b+5+TJG5tLrPGbIg6OTJk6urqqp+BjBRRL4Jw3B2W1ubemowS0yfPr2mr69vrIjU6gslEolaIjqcSqV25lV3bE/mnj3Lo57n1RPRL+ohrUQi2qayUV1dvaOlpSVTRhoUHGKt/ceQg4V+DoCHieg2AIlo5UMAVPs2MvMPcYA9z5tDRJ+KiFZ3WTk5cP5Bqz6ZTE40xiwAsBDAlLyHAwCbwjDc0traergUtLVWn98gIh8GQXB3qfHnpKO+71+rhQFgHoBx0WRpEdlujNnc3d29bd++facKLWKtvQvAxwA+YWa9j22xu6f6+vpLamtr54Zh2AxgNhEZlSAimuec21qIwPf9mSLyFYAWZr4pNmUxeSpnIt/3nxSRlwc2GEVAkyKi6dLKzF4588fK0WITRv3kGgBhfhek433fXywim5k5nXu+sbFxUhiG+wEcYOZJ/wqotXYpgHVRBS9xzr1VQCfvDIJAZa3fpk6dOm7kyJFHAfzJzJcNKaju85lMhmpqarI9PT3Z8ePHhydOnFiQzWbXE5Hm9nJmXpcHqV2Qelm/+4CZ78l919TUlOjo6FAPh8xcWagvKAV/VjFFYdoA4MZiDxPR4845heo3a+3TAFapl/V/IuoDMIGZdf/vN8/zjhNRVW9v75j29vbjpcBK5qi1dm+kmRkROUlEKvh66U6lx4fnmVmLKAf5IoDnospfEobhfCK6VUSWBEHwZt643wBckU6n6/bs2XNwKEC/BXA9gAwRrRaRlcz8V6GJrbV6QHsiGtvsnHvP9/0FIrIJwC5mPh0Va+2Pmq5EdLVzTu9j2Vmht9ZeGh2+dG9WTx4gouXOOW35Tpvnea/q5wD6RGReEAQq6NDcrqioOEREo40x9alUqiMK/W4imkFENzjndseiHExHk8mkb4zRs0wyyruPstnsUt0yFaaysrI3Cvdc59z2/IWttRsBNIvIC0EQrIzy+DMAdwCYw8x6H8tK7UwJ3/dXaPgBVAPYysxN1lo90mrr18PM2pueYclk8hZjzJcA9jNzfQS6BcB8APcxs97HslKg/ZNFStAWwWpntWswUADGWtupjbeqBzPvyjtpPsTMr8WijLOFep73qP5gAODXMAxnGGN+L+bRyIOrADwDYH1FRcWaTCajeanen8XMX5w3UC0sa+33Kpu6OIAHSoBeCUClTg9+eql3z9gI4sCWFfrchNEPW9/ldBXAUWa+vNiC1lode11UjF8fOXJkVmdn58k4gLmxsUAjmVlNRI9Fi7/tnFtcbGHP8+4FsIWIVJtn5+9UcWFjgzY0NFSNGjVKjxW6JTaXWlwVotSYcqBjg5Yz6fkYcxF0qL16wXj0b9n7qEkeJYiBAAAAAElFTkSuQmCC',
    activeIcon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAABVZJREFUWEftmHtsU2UUwH/ndg/DYGyoCSHyD+EPEY1BDBoiCSgIvR2CidOxbgNRJyLBV+IjxgiGkJgQJDEhOl+D9Q4D+IC1HUMSwYDgP2AiEt9omIaEwNhAslfvMd9tt46t3VYZTAwnafql97vn/O4533ncCleJyFXCyTXQoY7UNY/+fzxaGp6KZb2EuveC5ABHyPItZ9O871M95PCEvizyDMo6IOsiKGUftYGZ/w3QYPhVkDWAC/IWsAGxYmjsL6AFJzB6+EGTkDGwluD4Qx5UMHoLqAl5I05g/PCC9oQUWUzIdrqBguEqkCeAapzAo8MH2h9k/LxuQGnDsm4n5P9xeED7gyyNrETYACiWbwk182rSlbX+s768IQ9Xl0BsLMhZ1D0LNEFWE65ZSxP5WU1UzW4B0T5GBgsp1nJC/nf7q73pQUsaxuPrjAK3DqJ4x0CaQRMPYr6tGOj9QIzeZ7KnJwcBaeynBi0PT8K1GkBNBh5D5GMUUzYKwS0EKYivzUcKUM1HUuoaEsjUoA/sGMWo7B9AxyF8zfn2AJ8/aDyVXoq3+sjPH02nW0iHrwA6ChGrAJdTbLH3dd/4LzzZdW9fj5btmojGfvK8bTJRtA7JqqYxt4G9szoHcQxSb7kEyPShD0aKgKeBOYAvYfkkiAO6CSfwXUbAcX07vewe5Jnsrb//rC/ZPY6sznJUFwOTkjfLYUQ30ya1bLNPDQgdDC8GqUb5hNrAQwPuT7Fh8ENJad00xDLAJcCYhK4OkHqI1XDGV0e93ZYSYlF0IZZ+BuzACSy8vKBd2v3RXMbE5iNWBUoAsLwShJTg2NtTQpTVz0TdL0H24tizrgxol5Vg9EXQN+OQPQaMVBQV0SnE9DAiRwjZd1w5UK8/mxFN3T6QwehS8k7UUPVkR7IshScg8itwHCcw4cqABiPLUDZ6xUu1ktqiD/rUSVcWsMWu6/79sV1jaI2dBjmDY18/tKCmz7fmCOTGoDHG5BtdfrlQjvJ+vKPpCpyijd1G41OQGYQFkW2E7Ie7r5mGkJNnPOziBLK9MpWh9M36Ui9M1cCMtLos63lq/AYqLsH6l0HXgnYBtJOXM5aqOc3JPeFzICPJ7cznwwXnMuRM0Z+DkWOJmtkJ2gpiCr4PRFB1seR1QrZJoriUht9A5LVE5leCLgJmg1Ti2O8lQSMngJtAxuPYjUMAGj0IejdKJ8J6WtzV1M2/kFJxMLoO9AVvr2VVEPJvoXxXOW5sM6r7qS1KRiUYPgoyGUtvo6bo6KWDVtaN4IK1BmVlon0ex7JWUOM3I19SyqJvo7oCtB18JTh+U9DBm2FjJ1HNA51IbdFv8eMROQBMB7kHxzbrjCR9ZyqP3IlShTIlofFT2mWZ1zI9mM7ziXDPx7Hrez3EJlRNQ1hFbWC1d60sGkHVRrSIUFEkI8q082iXFpOt1+WtxMUYGwWyHccupviL0eS0mwm/Gcc2s+nFEqy/D9w9Xu0M2RMTHq0FzPkN4gTMOiMZXK8v3TMBafvWgzUeGZG7n78NKM04gb6gq1ZZ/Dztd2/w9lkz2OzfT/JN8ymcwDsZUQ7o0Z7aguFnE38Y/EFu9nTaOv5MCxo/k2uBV7y6K6aLuQfibwYyF8fefflA40X7G2Bq3DiPpw29oVhUdzOW7xioefFr8bzbuxFkQDu40HcpNH9siRxC8cXfkeQ0jn1DWnvByCHgrsT1r8geMZfqWa0Z8HVvzQzUy97IepTnPA0iHxGyl6YHjT4CahLnIO05Abb16FQZ0mYOWrx1JDl5O0HO0Z5dMaBxUyEuAbDreTIHzdATQ7X9GuhQefKqC/0/tV4HSZHDX/wAAAAASUVORK5CYII=',
    text: '飞机:经济舱',
  });

  const [isStartCityDanger, setIsStartCityDanger] = useState(false);
  const [isEndCityDanger, setIsEndCityDanger] = useState(false);
  const [startCityList, setStartCityList] = useState([]);
  const [endCityList, setEndCityList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const loading = useRef(false);
  const nodeId = useRef('');
  const claimId = useRef('');
  const leaderData = useRef({});
  const approvers = useRef([]);

  // 跳转页面
  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  // 初始化用户名(根据中文名得到拼音)
  const getName = () => {
    let name = initData.userName;
    const data = {
      surname: '',
      name: '',
    };
    if (name) {
      // 规则:3字以内的 去的一个姓 以上的取前两个
      data.surname = vuePy
        .chineseToPinYin(name.length <= 3 ? name.substring(0, 1) : name.substring(0, 2))
        .toUpperCase();
      data.name = vuePy.chineseToPinYin(name.length <= 3 ? name.substring(1) : name.substring(2)).toUpperCase();
    }
    return data;
  };

  const doSearchCity = search => {
    return new Promise((resolve, reject) => {
      queryCities({
        search,
        type: 1,
        // deptId: orgId,
        deptId: 0,
        ldapId: null,
        orgId: initData.orgId,
        positionCode: initData.positionCode,
        positionId: initData.positionId,
        userName: initData.userName,
      })
        .then(resp => {
          let city = '';
          if (resp && resp.data && resp.data.length) {
            const findData = resp.data.find(item => item.districtName === search);
            if (findData) {
              city = findData;
            } else {
              city = resp.data[0];
            }
          }
          resolve(city);
        })
        .catch(error => reject(error));
    });
  };

  const setCity = async () => {
    // 出发地
    const startCity = await doSearchCity(answer.origin);
    if (startCity) {
      setStartCityList([
        {
          ...startCity,
          key: startCity.districtId,
        },
      ]);
    } else {
      setIsStartCityDanger(true);
    }
    // 目的地（含中转地）
    const endCityList = [];
    const list = answer.dest.split(',');
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      const data = await doSearchCity(item);
      if (data) {
        endCityList.push({
          ...data,
          key: data.districtId,
        });
      } else {
        setIsEndCityDanger(true);
      }
    }
    setEndCityList(endCityList);
    setShowForm(true);
  };

  useEffect(() => {
    form.setFieldsValue({
      date: [dayjs(startDate), dayjs(endDate)],
      startDate: dayjs(startDate),
      extend12: !!answer.extend12,
      origin,
      dest,
      cause,
      remark: answer.remark,
      // devProjectCode: devProjectCode || '无',
      devProjectCode,
      devProjectName,
      meetingNumber,
    });
    if (!isHistory) {
      // 城市回显
      setCity();
    } else {
      setShowForm(true);
    }
  }, []);

  // 是否是辖区内走访？
  const handleCheckInterview = throttle(value => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    let question = value ? '是' : '不是';
    if (value) {
      cellList.push({
        id: uuid(),
        question,
        templateType: 'businessTripForm',
      });
    } else if (aiSubmit.myProjectList.length) {
      cellList.push({
        id: uuid(),
        question,
        templateType: 'projectCheckBox', // 是否研发项目
      });
    } else {
      cellList.push({
        id: uuid(),
        question,
        templateType: 'businessTripForm',
      });
    }
    const answerData = {
      ...item.answer,
      isInterview: value, // 是否辖区内走访
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  }, 500);

  // 取消选择研发项目
  const projectSelectCancel = () => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    if (myMeetingList.length) {
      cellList.push({
        id: uuid(),
        question: '不是',
        templateType: 'meetingCheckBox', // 是否会议出差
      });
    } else {
      cellList.push({
        id: uuid(),
        question: '不是',
        templateType: 'businessTripForm',
      });
    }
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
    if (myMeetingList.length) {
      cellList.push({
        id: uuid(),
        question: '是',
        templateType: 'meetingCheckBox', // 是否会议出差
      });
    } else {
      cellList.push({
        id: uuid(),
        question: '是',
        templateType: 'businessTripForm',
      });
    }
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
  // 取消选择会议
  const meetingSelectCancel = () => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question: '不是',
      templateType: 'businessTripForm',
    });
    const answerData = {
      ...item.answer,
      meetingNumber: '',
      cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  };
  // 确认选择会议
  const meetingSelectConfirm = option => {
    if (!(option && option.value)) return;
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    cellList.push({
      id: uuid(),
      question: '是',
      templateType: 'businessTripForm',
    });
    const answerData = {
      ...item.answer,
      meetingNumber: option.value || '',
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
  // 编辑会议
  const meetingSelectChange = (value, option) => {
    const answerData = {
      ...item.answer,
      meetingNumber: value || '',
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
  };
  // 是否扣减探亲次数？
  const handleCheckVisit = throttle(value => {
    const cellItem = cellList[cellList.length - 1];
    cellItem.isDisabled = true;
    const answerData = {
      ...item.answer,
      isVisit: value, // 是否探亲
      cellList: cellList,
    };
    aiSubmit.setMessage(item.id, {
      ...item,
      answer: answerData,
    });
    aiSubmit.saveHistoryJson('0', answerData); // 保存历史
    // 调用保存表单的方法
    setTimeout(() => {
      onSave(value ? '是' : '不是');
    }, 30);
  }, 500);

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

  // 确认
  const onCheck = () => {
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue();
        let { date } = formData;
        if (!(date && date.length)) {
          Modal.error({
            title: '温馨提示',
            content: '请选择出差日期',
          });
          return;
        }
        const startTime = dayjs(date[0]);
        const endTime = dayjs(date[1]);
        if (!answer.isInterview && endTime.diff(startTime, 'days') > 60) {
          Modal.confirm({
            title: '温馨提示',
            content: '出差行程日期超过俩个月,请核实.',
            closable: false,
            okText: '确认',
            cancelText: '取消',
            onOk: () => onConfirm(),
            onCancel: () => {},
          });
        } else {
          onConfirm();
        }
      })
      .catch(() => {});
  };
  const onConfirm = () => {
    const formData = form.getFieldsValue();
    let { remark = '' } = formData;
    const startCity = startCityList[0];
    const findCity = endCityList.find(endCityItem => endCityItem.districtName === startCity.districtName);
    // 出发地和目的地（含中转地）相同需要填写原因
    if (findCity && !remark) {
      Modal.error({
        title: '温馨提示',
        content: '请在备注中说明出发地和目的地（含中转地）相同的原因',
      });
      return;
    }
    const userVisitData = aiSubmit.userVisitData || {};
    let showVisitor = false; // 目的地（含中转地）是否包含了探亲地
    if (userVisitData.visitInfo && userVisitData.visitInfo.familyLocation) {
      showVisitor = !!endCityList.find(
        endCityItem => endCityItem.districtName === userVisitData.visitInfo.familyLocation,
      );
    }
    if (aiSubmit.authData.is1012 && showVisitor) {
      const cellItem = cellList[cellList.length - 1];
      cellItem.isDisabled = true;
      cellList.push({
        id: uuid(),
        question: '确定提报',
        templateType: 'visitorCheckBox', // 探亲
      });
    } else {
      onSave('确定提报');
    }
  };

  // 保存
  const onSave = async question => {
    const formData = form.getFieldsValue();
    const startCity = startCityList[0];
    const startDate = dayjs(formData.date[0]).format('YYYY-MM-DD');
    const endDate = dayjs(formData.date[1]).format('YYYY-MM-DD');
    let { cause = '' } = formData;
    const { isDevSelfProject, devProjectCode, devProjectName, meetingNumber } = answer;
    const nameData = getName();
    // 异地21天
    const extend12 = answer.isInterview ? '' : formData.extend12 ? 1 : 0;
    const params = {
      orgId: initData.orgId,
      orgName: initData.orgName,
      positionId: initData.positionId,
      positionCode: initData.positionCode,
      // isMaster: 1,
      userName: initData.userName,
      businessLine: initData.businessLine,
      travelApplyInfo: {
        type: 3,
        head: {
          ouCode: initData.companyCode,
          ouName: initData.companyTaxName,
          extend6: 'Y', // 是否补单 是
          extend23: 1, // 国内国际
          extend11: 0, // 当日往返
          extend12, // 异地21天
          remark: cause + '(AI)',
          extend86: nameData.surname,
          extend87: nameData.name,
          extend73: devProjectCode || '',
          extend74: devProjectName || '',
          extend75: devProjectCode ? 'Y' : 'N',
          extend76: isDevSelfProject || '',
          extend93: answer.isInterview ? '1013' : '', // 辖区内走访
          meetingNumber: meetingNumber ? meetingNumber.split('/')[0] : '', // 会议通知单号
        },
        attach: [],
        lines: [],
      },
    };
    const lines = [];
    endCityList.forEach(endCityItem => {
      lines.push({
        detailStartTime: startDate,
        detailEndTime: endDate,
        startCity,
        endCity: {
          ...endCityItem,
        },
        remark: formData.remark,
        goVehicle: defaultVehicle,
        backVehicle: defaultVehicle,
      });
    });
    params.travelApplyInfo.lines = lines;
    if (loading.current) return;

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
      startDate,
      endDate,
      extend12,
      origin: startCityList.map(item => item.districtName).join(','), // 出发地
      dest: endCityList.map(item => item.districtName).join(','), // 目的地
      remark: formData.remark,
      cause,
      cellList,
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
      const res = await travelNextToApprove(params);
      const data = res.data || {};
      const flowRule = data.flowRule || [];
      let nodeid = '';
      let personList = [];
      if (flowRule.length) {
        // 审批人列表
        personList = flowRule[0].personlist || [];
        nodeid = flowRule[0].nodeid || '';
      }
      approvers.current = personList;
      nodeId.current = nodeid;
      claimId.current = data.claimId;
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
      currentNodeId: '',
      candidateUsers: `${leader.ldapid}/${leader.orgId}`,
      nextNodeId: nodeId.current || '',
      todoUnId: '',
      processOpinion: '请审批',
      notifyUsersIds: '',
      attach: [],
      nextStepId: nodeId.current || '',
      workItemId: '',
      currentStepId: '',
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

  const getBusinessTripForm = cellItem => {
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
            <div>
              {`雪宝即将为您提报“${answer.isInterview ? '辖区内走访事前申请' : '出差商旅事前申请'}”。申报信息如下：`}
            </div>
            <Form
              className="mt-2 w-[420px]"
              size="middle"
              form={form}
              disabled={isHistory || cellItem.isDisabled}
              labelAlign="left"
              labelCol={{
                span: 8,
              }}
            >
              <Form.Item
                label="出差日期"
                name="date"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value && value.length) {
                        const startDate = dayjs(value[0]).format('YYYY-MM-DD');
                        const endDate = dayjs(value[1]).format('YYYY-MM-DD');
                        // 使用moment解析时间，并检查是否有效
                        const isValidStartDate = dayjs(startDate, 'YYYY-MM-DD', true).isValid();
                        const isValidEndDate = dayjs(endDate, 'YYYY-MM-DD', true).isValid();
                        if (!(isValidStartDate && isValidEndDate)) {
                          return Promise.reject(new Error('请选择有效的日期'));
                        }
                        // 计算两个时间相差的天数
                        const startTime = dayjs(startDate);
                        const nowTime = dayjs().format('YYYY-MM-DD');
                        // 判断用车时间是否小于今天
                        if (startTime.isBefore(nowTime)) {
                          return Promise.reject(new Error('出差日期不能小于今天'));
                        }
                        const startTimestamp = new Date(`${startDate} 00:00:00`).getTime();
                        const endTimestamp = new Date(`${endDate} 23:59:00`).getTime();
                        // 判断开始时间是否大于结束时间
                        if (startTimestamp > endTimestamp) {
                          return Promise.reject(new Error('结束日期不能早于开始日期'));
                        }
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('请选择出差日期'));
                    },
                  }),
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                ></DatePicker.RangePicker>
              </Form.Item>
              <Form.Item
                label="出发地"
                name="startCityList"
                className="mb-2"
                rules={[
                  () => ({
                    validator() {
                      if (isStartCityDanger) {
                        return Promise.reject(new Error('请选择正确的出发地'));
                      }
                      if (startCityList.length) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('请选择出发地'));
                    },
                  }),
                ]}
              >
                <CitySelect
                  maxCount={1}
                  isHistory={isHistory}
                  defaultValue={
                    isHistory || cellItem.isDisabled
                      ? answer.origin &&
                        answer.origin.split(',').map(i => {
                          return {
                            districtId: i,
                            districtName: i,
                            key: i,
                          };
                        })
                      : startCityList
                  }
                  onSelect={value => {
                    setIsStartCityDanger(false);
                    setStartCityList(value);
                  }}
                ></CitySelect>
              </Form.Item>
              <Form.Item
                label="目的地（含中转地）"
                name="endCityList"
                className="mb-2"
                rules={[
                  () => ({
                    validator() {
                      if (isEndCityDanger) {
                        return Promise.reject(new Error('请选择正确的目的地（含中转地）'));
                      }
                      if (endCityList.length) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('请选择目的地（含中转地）'));
                    },
                  }),
                ]}
              >
                <CitySelect
                  isHistory={isHistory}
                  defaultValue={
                    isHistory || cellItem.isDisabled
                      ? answer.dest &&
                        answer.dest.split(',').map(i => {
                          return {
                            districtId: i,
                            districtName: i,
                            key: i,
                          };
                        })
                      : endCityList
                  }
                  onSelect={value => {
                    setIsEndCityDanger(false);
                    setEndCityList(value);
                  }}
                ></CitySelect>
              </Form.Item>
              <Form.Item
                label="出差事由"
                name="cause"
                className="mb-2"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('出差事由不能为空');
                    },
                  }),
                ]}
              >
                <Input maxLength={100} placeholder="请输入出差事由"></Input>
              </Form.Item>
              {answer.isInterview ? (
                ''
              ) : (
                <Form.Item label="费用所属研发项目" name="devProjectCode" className="mb-2">
                  <ProjectSelect
                    isFormItem
                    defaultValue={devProjectCode || '无'}
                    onSelect={projectSelectChange}
                  ></ProjectSelect>
                </Form.Item>
              )}
              {answer.isInterview ? (
                ''
              ) : (
                <Form.Item label="会议通知单号" name="meetingNumber" className="mb-2">
                  <MeetingSelect
                    isFormItem
                    defaultValue={meetingNumber || '无'}
                    onSelect={meetingSelectChange}
                  ></MeetingSelect>
                </Form.Item>
              )}
              {answer.isInterview ? (
                ''
              ) : (
                <Form.Item label="属异地调动21天住宿" name="extend12" className="mb-2">
                  <Switch checkedChildren="是" unCheckedChildren="否"></Switch>
                </Form.Item>
              )}

              <Form.Item label="备注" name="remark" className="mb-2">
                <Input maxLength={100} placeholder="请输入备注"></Input>
              </Form.Item>
            </Form>
            <div className="text-[#FF8C1A] text-base font-normal">是否确认提报？</div>
            {!(isHistory || cellItem.isDisabled) ? (
              <div className="mt-2">
                <Button className="mr-2" type="primary" ghost onClick={onCheck}>
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
            {/* 是否辖区内走访 */}
            {cellItem.templateType === 'interviewCheckBox' && (
              <Message
                {...cellItem}
                content={
                  <div>
                    <div>是否是辖区内走访？</div>
                    {isHistory || cellItem.isDisabled ? (
                      ''
                    ) : (
                      <div className="mt-2.5">
                        <Button
                          ghost
                          type="default"
                          className="border-[#2C68FF] text-[#2C68FF] rounded-md mr-2"
                          onClick={() => handleCheckInterview(false)}
                        >
                          不是
                        </Button>
                        <Button
                          type="default"
                          className="border-[#707B8C] text-[#707B8C] rounded-md"
                          onClick={() => handleCheckInterview(true)}
                        >
                          是
                        </Button>
                      </div>
                    )}
                  </div>
                }
              />
            )}
            {/* 是否研发项目 */}
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
            {/* 是否会议出差 */}
            {cellItem.templateType === 'meetingCheckBox' && (
              <Message
                {...cellItem}
                content={
                  <MeetingSelect
                    hiddenBtn={isHistory || cellItem.isDisabled}
                    onCancel={meetingSelectCancel}
                    onConfirm={meetingSelectConfirm}
                  ></MeetingSelect>
                }
              />
            )}
            {/* 是否扣减探亲次数？ */}
            {cellItem.templateType === 'visitorCheckBox' && (
              <Message
                {...cellItem}
                content={
                  <div>
                    <div>是否扣减探亲次数？</div>
                    <div className="text-[#576675]">
                      注意：出差地距离探亲地50KM内，且出差文件未指定住宿酒店，选择是；否则选择否
                    </div>
                    {isHistory || cellItem.isDisabled ? (
                      ''
                    ) : (
                      <div className="button-group mt-2">
                        <Button className="mr-2" type="primary" ghost onClick={() => handleCheckVisit(true)}>
                          是
                        </Button>
                        <Button onClick={() => handleCheckVisit(false)}>否</Button>
                      </div>
                    )}
                  </div>
                }
              />
            )}
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

            {cellItem.templateType === 'businessTripForm' && showForm && getBusinessTripForm(cellItem)}
          </div>
        );
      })}
    </div>
  );
}

export default observer(Index);
