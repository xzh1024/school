import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import {
  aiChat,
  createAccounting,
  getAiSessionHistoryPage,
  ocrTpQueryVerifyResult,
  saveRequestAndAnswer,
  uploadImageFile,
  validateInvoice,
  getProjectOptions,
  getVisitInit,
  getOaMeetingInfo,
  aiVideoUrl,
  queryListByParentId,
  getEntertainment,
} from '../../api/ai';
import chatHandler from '../../pages/ai/submit/tool/chatHandler';
import historyHandler from '../../pages/ai/submit/tool/historyHandler';
import COS from '../../utils/cos';

export default class Store {
  constructor() {
    makeAutoObservable(this);
    this.aiSession = sessionStorage.getItem('aiSession');
    // this.cos = new COS({ type: 'ai' });
  }

  loading = false;

  // 对象存储
  cos = null;

  // 对话触底
  toggleScroll = false;

  aiVideoUrlList = []; // 引导视频列表

  // 当前会话对话列表
  contentList = [];

  // 当前会话
  aiSession = '';

  // 初始化信息
  initData = {};

  // 用户拜访信息
  userVisitData = {};

  // 用户项目列表
  myProjectList = [];

  // 用户会议列表
  myMeetingList = [];

  // 发票文件列表
  fileList = [];

  // 源文件
  sourceFile = [];

  billsList = [];

  imgList = [];

  aiInvoiceDetailList = [];

  accountsId = [];

  reimburseInit = {};

  claimInfo = {};

  // 历史会话
  historyList = [];

  historyIndex = 0;

  business = null;

  inputVisible = true;

  // 业务大类权限
  authData = {};

  // 当前业务大类
  businessNo = '';

  // ai聊天command    意图  默认instruct
  command = 'instruct';

  // 招待类别
  customerTypeList = [];

  // 招待对象
  entertainmentList = [];

  page = {
    num: 0,
    size: 20,
    loading: true,
    hasMore: true,
    moreHint: false,
  };

  lastId = '';

  initCos = () => {
    this.cos = new COS({ type: 'ai' });
  };

  handleClear = () => {
    this.fileList = [];
    this.sourceFile = [];
    this.billsList = [];

    this.loading = false;
    this.inputVisible = true;
  };

  // 取消生成报销单
  cancelReimburse = (id, question = '取消报销') => {
    this.handleClear();
    this.setMessage(id, { isDisabled: true });
    const answer = `雪宝已为您${question}，您可以继续和雪宝聊天。`;
    this.addContent({ id: uuid(), question, answer });
    this.saveHistory({ question, answer });
    this.businessNo = '';
  };

  addContent = data => {
    if (data.answerContentType === 'templateType_processCard') {
      data.answer = {
        ...data,
      };
    }
    this.contentList = [
      ...this.contentList,
      {
        question: '',
        ...data,
      },
    ];
  };

  addProcessContent = (id, data) => {
    const processContentListIndex = this.contentList.findIndex(item => item.id === id);
    if (processContentListIndex === -1) {
      this.addContent({
        id,
        answerContentType: 'templateType_processCard',
        processList: [data],
      });
      return;
    }
    const processContentList = this.contentList[processContentListIndex];

    processContentList.answer.processList.push(data);

    // 强制更新store数据，使页面重新渲染
    this.contentList = [
      ...this.contentList.slice(0, processContentListIndex),
      processContentList,
      ...this.contentList.slice(processContentListIndex + 1),
    ];
  };

  // 处理卡片中的重复发票展示
  handleProcessCardRepeat(
    id,
    { answer = '', loading = false, showError = true, answerParams = {}, contentParams = {} },
  ) {
    const findItem = this.contentList.find(i => i.id === id);
    const processList = (findItem && findItem.answer && findItem.answer.processList) || [];
    if (processList.length) {
      processList[processList.length - 1].answer = answer;
      processList[processList.length - 1].loading = loading;
      processList[processList.length - 1].showError = showError;
    } else {
      processList.push({
        answer,
        loading,
        showError,
      });
    }
    const answerData = {
      ...findItem.answer,
      processList,
      ...answerParams,
    };
    // this.$store.commit('ai/setContent', );
    this.setMessage(id, {
      ...findItem,
      answerContentType: 'templateType_processCard',
      answer: { ...answerData },
      ...contentParams,
    });
    this.saveHistory({
      answerContentType: 'templateType_processCard',
      answer: JSON.stringify(answerData),
    });
  }

  getProcessContentJson = id => {
    const processContentListIndex = this.contentList.findIndex(item => item.id === id);
    if (processContentListIndex === -1) return '';
    return JSON.stringify(this.contentList[processContentListIndex].answer || '');
  };

  updateProcessContent = (id, data) => {
    const processContentListIndex = this.contentList.findIndex(item => item.id === id);
    if (processContentListIndex === -1) return;
    const processContentList = this.contentList[processContentListIndex];
    if (!data.id) {
      Object.keys(data).forEach(key => {
        processContentList.answer[key] = data[key];
      });
      processContentList.answer['processList'] = [...processContentList.answer['processList']];
      return;
    }
    processContentList.answer.processList.findIndex(item => {
      if (item.id === data.id) {
        Object.keys(data).forEach(key => {
          item[key] = data[key];
        });
        return true;
      }
    });
    this.contentList = [...this.contentList]; // 强制更新
  };

  setMessage = (id, options) => {
    this.contentList.forEach(item => {
      if (item.id === id) {
        Object.keys(options).forEach(key => {
          item[key] = options[key];
        });
      }
    });
    this.toggleScroll = !this.toggleScroll;
  };

  disabledBtn = key => {
    this.contentList.forEach(item => {
      if (item[key]) {
        item[key] = false;
      }
    });
  };

  // 与AI对话
  aiChat = (question, options = {}, msgId, fileList) => {
    if (this.loading) {
      window.$message.warning('等机器人回复之后再提问哦！');
      return Promise.reject('等机器人回复之后再提问哦！');
    }
    this.loading = true;

    const answerUuid = msgId || uuid();
    let temp = {
      question,
      // answer: '',
      loading: true,
    };
    if (msgId) {
      this.setMessage(msgId, temp);
    } else {
      temp.id = answerUuid;
      temp.answer = '';
      this.addContent(temp);
    }
    const params = {
      content: question,
      // command: 'instruct',
      command: 'instruct',
      ...options,
    };
    if (this.businessNo && this.businessNo !== '1000') {
      params.command = this.businessNo;
      if (this.business) {
        params.business = this.business;
      }
    }
    return new Promise((resolve, reject) => {
      aiChat(
        {
          ...params,
        },
        {
          sessionId: this.aiSession,
          type: 'ems',
        },
      )
        .then(res => {
          this.loading = false;
          this.inputVisible = true;

          const { data } = res;
          const resData = JSON.parse(data);
          chatHandler.call(this, resData, answerUuid);

          if (resData.result) {
            // resData.result = contentData;
            resolve(resData);
          }
        })
        .catch(() => {
          this.setMessage(answerUuid, {
            loading: false,
            answer: '当前使用人数较多，请稍后再试',
          });
          this.loading = false;
          this.inputVisible = true;
        })
        .finally(() => {
          this.loading = false;
        });
    });
  };

  formatBillList = list => {
    const initData = this.initData;
    const categoryInfos = initData.categoryInfos || [];
    // 移动通讯费（新）- 2003015
    const category = categoryInfos.find(item => item.categoryCode === '2003015');
    // 记录所有成功数据
    let successBillList = [];
    // 记录所有错误数据
    let errorBillList = [];
    if (category) {
      let bills = [];
      list.forEach(item => {
        let result = true;
        // 过滤
        if (item.billList && item.billList.length) {
          const billList = item.billList.filter(billItem => {
            let billResult = true;

            // 过滤重复发票
            if (bills.find(i => i.billNumber === billItem.billNumber)) {
              billResult = false;
              billItem.billRepeatFlag = true;
            } else {
              bills.push(billItem);
            }

            // 过滤有效的报销月份
            const categoryStandard = category.categoryStandards.find(categoryStandard => {
              return billItem.accountPeriod === moment(categoryStandard.periodName).format('YYYY年MM月');
            });
            let userDesc = initData.userDesc || '';
            let companyTaxNo = initData.companyTaxNo || '';
            let companyTaxName = initData.companyTaxName || '';
            companyTaxName = companyTaxName
              .replaceAll('(', '')
              .replaceAll(')', '')
              .replaceAll('（', '')
              .replaceAll('）', '');
            let buyerName = billItem.buyerName || '';
            buyerName = buyerName.trim();
            buyerName = buyerName.replaceAll('(', '').replaceAll(')', '').replaceAll('（', '').replaceAll('）', '');
            let buyerTaxId = billItem.buyerTaxId || '';
            buyerTaxId = buyerTaxId.trim();
            if (!billItem.verifyName) {
              // 是否本人发票
              if (
                !(
                  (userDesc && buyerName.indexOf(userDesc) !== -1) ||
                  (companyTaxName && buyerName === companyTaxName) ||
                  (companyTaxNo && buyerTaxId === companyTaxNo)
                )
              ) {
                billResult = false;
                billItem.notOneself = true;
              }
            }
            // 发票类型-未识别
            if (billItem.billTypeFlag !== '1') {
              billResult = false;
            }
            // 金额-未识别
            if (billItem.totalAmountFlag !== '1') {
              billResult = false;
            }
            // 帐期-未识别
            if (billItem.accountPeriodFlag === '1') {
              // 标准-未获取
              if (!categoryStandard) {
                billResult = false;
                billItem.standardFlag = true;
                // return false
              }
              // 同月校验-是 sameMonthCheck
              // 开票日期与账期为同一个月 或者 提交日期与帐期为同一个月，则不允许报销
              if (
                billItem.billDate.indexOf(billItem.accountPeriod) !== -1 ||
                billItem.accountPeriod.indexOf(moment().format('YYYY年MM月')) !== -1
              ) {
                billItem.sameMonthCheck = true;
                billResult = false;
              }
            } else {
              billResult = false;
            }
            // 包含异常词-是
            if (billItem.abnormalWord) {
              billResult = false;
            }

            if (!billResult) {
              errorBillList.push(billItem);
            }
            return billResult;
          });
          if (billList && billList.length) {
            item.billList = billList;
          } else {
            result = false;
          }
        } else {
          bills = [...bills, item.billList];
          result = false;
        }
        if (result) {
          successBillList.push(item);
        }
      });
      // let bills = []  // 过滤重复发票
      successBillList.forEach(item => {
        // 汇总每个月的金额
        let totalAmount = 0;
        if (item.billList && item.billList.length) {
          // bills = [...bills, ...item.billList]
          totalAmount = item.billList.reduce((total, item) => {
            return new BigNumber(total).plus(item.totalAmount).toString();
          }, 0);
        }
        const categoryStandard = category.categoryStandards.find(categoryStandard => {
          return item.accountPeriod === moment(categoryStandard.periodName).format('YYYY年MM月');
        });
        if (categoryStandard) {
          item.standardAmount = categoryStandard.standardAmount; // 标准
          // 实报金额
          if (totalAmount < categoryStandard.standardAmount) {
            item.actualAmount = totalAmount;
          } else {
            item.actualAmount = categoryStandard.standardAmount;
          }
        }
      });
    } else {
      list.forEach(item => {
        if (item.billList && item.billList.length) {
          errorBillList = [
            ...errorBillList,
            ...item.billList.map(i => {
              return {
                ...i,
                standardFlag: '0',
              };
            }),
          ];
        }
      });
    }
    return {
      successBillList,
      errorBillList,
    };
  };

  // 历史
  getSessionHistoryPage = async once => {
    if (!this.page.hasMore) return;
    if (this.page.loading && !once) return;
    this.page.loading = true;
    getAiSessionHistoryPage({
      pageNum: ++this.page.num,
      pageSize: this.page.size,
      businessType: 'ems',
    })
      .then(res => {
        this.page.loading = false;
        if (res.code === 200 && res.data) {
          const data = res.data;
          let list = data.records || [];
          if (list.length) {
            if (once && this.page.num === 1) {
              // 第一次时清除历史列表的数据
              this.historyList = [];
              // 计算两个时间的小时差
              const hoursDiff = moment().diff(moment(list[0].createTime), 'hours');
              if (hoursDiff >= 5) {
                this.page.moreHint = true;
                // 不处理数据，等待用户下拉加载
                this.page.num = 0;
                return;
              }
              this.page.moreHint = false;
              this.addContent({
                id: uuid(),
                question: '',
                answer: '欢迎回来！雪宝将继续为您服务~',
              });
            }
            // this.page.moreHint = false;
            // 反转顺序
            list.reverse();
            // const auth = this.authData || {};
            // 格式化数据
            list = list.map(item => historyHandler.call(this, item));
            this.lastId = '';
            if (this.historyList.length) {
              this.lastId = this.historyList[0].id;
            }
            this.historyList = [...list, ...this.historyList];
          } else {
            this.page.hasMore = false;
            this.page.moreHint = false;
          }
          if (this.page.num >= data.pages) {
            this.page.hasMore = false;
            this.page.moreHint = false;
          }
        }
      })
      .catch(() => (this.page.loading = false));
  };

  // 保存记录
  saveHistory = async ({
    question = '_notRender',
    answer = '',
    answerType = 'text',
    answerContentType = 'text',
    command,
    finished,
    ...otherOptions
  }) => {
    const params = {
      answer,
      answerContentType,
      answerType,
      // command: 'instruct',
      command: command || this.businessNo || 'instruct',
      businessSubType: this.businessNo,
      businessType: 'ai_finance',
      question,
      questionId: this.business && this.business.requestId,
      sessionId: this.aiSession,
      type: 'ems',
      ...otherOptions,
    };
    if (this.businessNo && this.businessNo !== 'instruct') {
      params.businessSubType = this.businessNo;
    }
    if (finished) {
      params.finished = finished;
    }
    return saveRequestAndAnswer(params);
  };

  // 获取账期标准
  getTelPeriodStander = period => {
    const periodDayjs = dayjs(period.replaceAll('年', '-').replaceAll('月', '-'));
    const categoryInfo =
      this.initData &&
      this.initData.categoryInfos &&
      this.initData.categoryInfos.find(item => item.categoryCode === '2003015');
    if (categoryInfo) {
      const standers = categoryInfo.categoryStandards;
      for (let i = 0; i < standers.length; i++) {
        const standard = standers[i].standardAmount;
        const standardDayjs = dayjs(standers[i].periodName);
        if (periodDayjs.isSame(standardDayjs, 'year') && periodDayjs.isSame(standardDayjs, 'month')) {
          return standard;
        }
      }
    }

    return 0;
  };

  // 上传影像文件
  uploadImage = async data => {
    return uploadImageFile(data);
  };

  // 发票校验
  validateInvoice = data => {
    return validateInvoice(data);
  };

  // 生成消费记账
  createAccounting = async data => {
    return createAccounting(data);
  };

  // 发票验真
  ocrTpQueryVerifyResult = async data => {
    return ocrTpQueryVerifyResult(data);
  };

  formatBusinessNo1000 = isHistory => {
    const startDate = moment().format('M月D日');
    const endDate = moment().add(2, 'days').format('M月D日');
    const data = {
      auth: true,
      text: '目前雪宝还未上线此功能，请通过传统方式提报，后续有新功能上线，雪宝第一时间通知您！',
    };
    const authData = this.authData || {};
    if (authData.is1000) {
      if (authData.is1008 && authData.is1010 && authData.is1002) {
        data.auth = true;
        // data.text =
        //   '请问您需要提报哪类事前申请？目前雪宝仅支持提报公出用车、公务出差（含辖区内）、非食堂用餐事前申请哦~';
        data.text = `如果您要提报公务出差（含辖区内）事前申请，您可以说“${startDate}至${endDate}，从成都出发，到深圳、惠州出差参加培训”。目前雪宝暂时仅支持境内出差申请的提报哦。<br>
            如果您要提报公出用车申请，您可以说“${startDate}，去成都高新税务局办税”或“${startDate}，先去新都工厂开会，再到四川营销中心参加推广活动”。<br>
            如果您要提报非食堂用餐申请，您可以这样说“因商务会谈，招待内地合资合作方，招待4人，陪同2人”。`;
      } else if (authData.is1008 && authData.is1010) {
        data.auth = true;
        // data.text = '请问您需要提报哪类事前申请？目前雪宝仅支持提报公出用车和公务出差（含辖区内）事前申请哦~';
        data.text = `如果您要提报公务出差（含辖区内）事前申请，您可以说“${startDate}至${endDate}，从成都出发，到深圳、惠州出差参加培训”。目前雪宝暂时仅支持境内出差申请的提报哦。<br>
          如果您要提报公出用车申请，您可以说“${startDate}，去成都高新税务局办税”或“${startDate}，先去新都工厂开会，再到四川营销中心参加推广活动”。`;
      } else if (authData.is1002 && authData.is1008) {
        data.auth = true;
        // data.text = '请问您需要提报哪类事前申请？目前雪宝仅支持提报非食堂用餐和公务出差（含辖区内）事前申请哦~';
        data.text = `如果您要提报公务出差（含辖区内）事前申请，您可以说“${startDate}至${endDate}，从成都出发，到深圳、惠州出差参加培训”。目前雪宝暂时仅支持境内出差申请的提报哦。<br>
          如果您要提报非食堂用餐申请，您可以这样说“因商务会谈，招待内地合资合作方，招待4人，陪同2人”。`;
      } else if (authData.is1002 && authData.is1010) {
        data.auth = true;
        // data.text = '请问您需要提报哪类事前申请？目前雪宝仅支持提报非食堂用餐和公出用车事前申请哦~';
        data.text = `如果您要提报公出用车申请，您可以说“${startDate}，去成都高新税务局办税”或“${startDate}，先去新都工厂开会，再到四川营销中心参加推广活动”。<br>
          如果您要提报非食堂用餐申请，您可以这样说“因商务会谈，招待内地合资合作方，招待4人，陪同2人”。`;
      } else if (authData.is1002) {
        data.auth = true;
        data.text = '';
        data.showNonCanteenDiningButton = true;
      } else if (authData.is1008) {
        data.auth = true;
        data.text = `好的，雪宝将为您提报出差（含辖区）事前申请，您可以说“${startDate}至${endDate}，从成都出发，到深圳、惠州出差参加培训”。目前雪宝暂时仅支持境内出差申请的提报哦。`;
      } else if (authData.is1010) {
        data.auth = true;
        data.text = `好的，雪宝将为您提报公出用车事前申请，您可以说“${startDate}，去成都高新税务局办税”或“${startDate}，先去新都工厂开会，再到四川营销中心参加推广活动”。`;
      }
    }
    return data;
  };

  // 处理-非食堂用餐
  formatBusinessNo1002 = isHistory => {
    const data = {
      auth: false,
      text: '目前雪宝还未上线此功能，请通过传统方式提报，后续有新功能上线，雪宝第一时间通知您！',
      audioText: '目前雪宝还未上线此功能，请通过传统方式提报，后续有新功能上线，雪宝第一时间通知您！',
    };
    const authData = this.authData || {};
    if (authData.is1002) {
      data.auth = true;
      data.text = '';
      data.showNonCanteenDiningButton = true;
    } else if (!isHistory) {
      this.businessNo = '';
    }
    return data;
  };

  formatBusinessNo1008 = isHistory => {
    const startDate = moment().format('M月D日');
    const endDate = moment().add(2, 'days').format('M月D日');
    const data = {
      auth: false,
      text: '目前雪宝还未上线此功能，请通过传统方式提报，后续有新功能上线，雪宝第一时间通知您！',
    };
    const authData = this.authData || {};
    if (authData.is1008) {
      data.auth = true;
      data.text = `好的，雪宝将为您提报出差（含辖区）事前申请，您可以说“${startDate}至${endDate}，从成都出发，到深圳、惠州出差参加培训”。目前雪宝暂时仅支持境内出差申请的提报哦。`;
    } else if (!isHistory) {
      this.businessNo = '';
    }
    return data;
  };

  formatBusinessNo1010 = isHistory => {
    const startDate = moment().format('M月D日');
    const data = {
      auth: false,
      text: '目前雪宝还未上线此功能，请通过传统方式提报，后续有新功能上线，雪宝第一时间通知您！',
    };
    const authData = this.authData || {};
    if (authData.is1010) {
      data.auth = true;
      data.text = `好的，雪宝将为您提报公出用车事前申请，您可以说“${startDate}，去成都高新税务局办税”或“${startDate}，先去新都工厂开会，再到四川营销中心参加推广活动”。`;
    } else if (!isHistory) {
      this.businessNo = '';
    }
    return data;
  };

  // 设置-非食堂用餐
  setFinished1002({ item, contentObj, isHistory = false, templateType = 'prohibitCheckBox' }) {
    // 判断是否结束
    if (contentObj.finished === '1') {
      const cellList = [
        {
          id: uuid(),
          question: '',
          answer: '',
          templateType,
        },
      ];
      contentObj.cellList = cellList;
      item.answer = contentObj;
      item.answerContentType = 'templateType_nonCanteenDining';
      !isHistory && (this.inputVisible = false);
      console.log('8899');
    } else {
      const answer = contentObj.content || '';
      item.answer = answer;
    }
  }

  setFinished1008 = (item, contentObj, isHistory = false) => {
    // const contentObj = JSON.parse(item.answer);
    const authData = this.authData;
    // 判断是否结束
    if (contentObj.finished === '1') {
      const cellList = [];
      // 是否是辖区内走访？
      if (authData.is1013) {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'interviewCheckBox',
        });
      } else if (this.myProjectList.length) {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'projectCheckBox',
        });
      } else if (this.myMeetingList.length) {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'meetingCheckBox',
        });
      } else {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'businessTripForm',
        });
      }
      contentObj.cellList = cellList;
      contentObj.extend12 = false; // 异地21天
      item.answer = contentObj;
      item.answerContentType = 'templateType_businessTrip';
      !isHistory && (this.inputVisible = false);
    } else {
      const answer = contentObj.content || '';
      item.answer = answer;
    }
  };

  setFinished1010 = (item, contentObj, isHistory = false) => {
    // const contentObj = JSON.parse(item.answer);
    // 判断是否结束
    if (contentObj.finished === '1') {
      const cellList = [];
      // 是否因研发项目提报事前申请？
      if (this.myProjectList.length) {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'projectCheckBox',
        });
      } else {
        cellList.push({
          id: uuid(),
          question: '',
          answer: '',
          templateType: 'publicVehicleForm',
        });
      }
      // 根据判断开始和结束时间是否相等来设置范围时间
      if (contentObj.startDate !== contentObj.endDate) {
        contentObj.isRangeDate = true;
      }
      contentObj.cellList = cellList;
      item.answer = contentObj;
      item.answerContentType = 'templateType_publicVehicle';
      !isHistory && (this.inputVisible = false);
    } else {
      const answer = contentObj.content || '';
      item.answer = answer;
    }
  };

  // 获取用户拥有的项目列表
  getMyProjectList = ({ ouCode, empCode }) => {
    // const { userCode, companyCode } = this.initData;
    getProjectOptions({
      pageIndex: 1,
      pageSize: 2,
      searchKey: '',
      ouCode,
      empCode,
    })
      .then(res => {
        const data = res.data || {};
        this.myProjectList = data.records || [];
      })
      .catch(() => {
        this.myProjectList = [];
      });
  };

  // 保存历史记录-json
  saveHistoryJson = (finished = '0', answer) => {
    if (finished === '1') {
      this.inputVisible = true;
    }
    setTimeout(() => {
      this.saveHistory({
        answer: JSON.stringify(answer),
        answerType: 'json',
        // command: this.businessNo || 'instruct',
        finished,
      });
      if (finished === '1') {
        this.businessNo = '';
      }
    }, 200);
  };

  // 获取用户拜访信息
  getUserVisitData = () => {
    const { orgId, orgName, businessLine, positionId, positionCode, userName } = this.initData;
    getVisitInit({
      businessLine,
      isMaster: 1,
      orgId,
      orgName,
      positionCode,
      positionId,
      userName,
    }).then(res => {
      if (res.data) {
        this.userVisitData = res.data;
      }
    });
  };

  // 获取用户的会议列表
  getMyMeetingList = () => {
    const { orgId, orgName, businessLine, positionId, positionCode, userName } = this.initData;
    getOaMeetingInfo({
      // word: '1',
      word: '',
      categoryCode: '1008',
      isMaster: 1,
      orgId,
      orgName,
      positionId,
      positionCode,
      userName,
      businessLine,
    })
      .then(res => {
        const data = res.data || [];
        this.myMeetingList = data;
      })
      .catch(() => {
        this.myMeetingList = [];
      });
  };

  // 获取引导视频
  getAiVideoUrl = () => {
    aiVideoUrl()
      .then(res => {
        const data = res.data || [];
        this.aiVideoUrlList = data
          .filter(item => item.url)
          .map(item => {
            const path = item.path.toLowerCase(); // 转小写后再判断
            if (path.indexOf('.pdf') > -1) {
              item.fileType = 'pdf';
            } else {
              item.fileType = 'video';
            }
            return item;
          });
      })
      .catch(() => (this.aiVideoUrlList = []));
  };
  // 获取业务小类
  getCustomerTypeList = () => {
    const { orgId, orgName, businessLine, positionId, positionCode, userName } = this.initData;
    queryListByParentId({
      parentId: 0,
      orgId: orgId,
      orgName: orgName,
      positionId: positionId,
      positionCode: positionCode,
      isMaster: 1,
      userName: userName,
      businessLine: businessLine,
    })
      .then(res => {
        this.customerTypeList = res.data || [];
      })
      .catch(() => (this.customerTypeList = []));
  };
  // 获取招待对象
  getEntertainmentList = () => {
    const { orgId, orgName, businessLine, positionId, positionCode, userName } = this.initData;
    getEntertainment({
      orgId: orgId,
      orgName: orgName,
      positionId: positionId,
      positionCode: positionCode,
      isMaster: 1,
      userName: userName,
      businessLine: businessLine,
    })
      .then(res => {
        this.entertainmentList = res.data || [];
      })
      .catch(() => (this.entertainmentList = []));
  };
}
