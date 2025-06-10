import {
  accountDetail,
  checkInvoice,
  checkInvoiceTaxNo,
  reimburseInit,
  saveClaim,
  submitClaim,
  validateInvoiceNumberConsecutive,
  validateInvoiceNumberSensitive,
} from '@api/ai';
import { Button, Image } from 'antd';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import IconPicture from 'public/images/ai/icon_picture.png';
import useStores from '@s';

let uuids = uuid();
let processUuid = uuid();

// 移动通讯费
function Index(props) {
  const { answer, isDisabled, isHistory, id } = props;
  const datas = answer || {};
  const { answerContentType, successBillList } = answer;
  const { aiSubmit } = useStores();
  const { initData } = aiSubmit;
  const { userId, orgId, positionCode, positionId, userName, businessLine } = initData;

  useEffect(() => {
    uuids = uuid();
  }, []);

  const getStrander = accountPeriod => {
    return aiSubmit.getTelPeriodStander(accountPeriod);
  };

  // 上传影像发票
  const handleSubmit = async () => {
    aiSubmit.disabledBtn('claimBtn');
    const files = aiSubmit.billsList;
    aiSubmit.loading = true;
    aiSubmit.setMessage(id, {
      isDisabled: true,
    });
    const uuids = uuid();
    aiSubmit.addContent({
      id: processUuid,
      question: '确定生成',
      answerContentType: 'templateType_processCard',
      processList: [
        {
          id: uuids,
          answer: '正在上传影像文件，请稍等',
          loading: true,
          showSuccess: false,
          showError: false,
        },
      ],
    });
    // aiSubmit.saveHistory({ question: '确定生成' });
    const errorList = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i].file.file;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('userName', userName);

      try {
        const res = await aiSubmit.uploadImage(formData);
        aiSubmit.billsList[i].ocrInfo = res.data[0];
      } catch (error) {
        errorList.push(error);
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          answer: '影像文件上传失败',
          showError: true,
          showSuccess: false,
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        processUuid = uuid();

        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;
        aiSubmit.businessNo = '';
        return false;
      }
    }

    if (errorList.length === 0) {
      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        loading: false,
        answer: '影像文件上传完成',
        showError: false,
        showSuccess: true,
      });
      // aiSubmit.saveHistory({ answer: '影像文件上传完成' });
      validateInvoiceList();
    }
  };

  // 发票重复校验
  const validateInvoiceList = async () => {
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      // question: '',
      loading: true,
      answer: '正在进行发票重复报销检查，请稍等',
    });

    const data = aiSubmit.billsList.map((item, index) => {
      return {
        invoiceCode: item.billCode,
        invoiceNum: item.billNumber,
        invoiceTypeCode: item.ocrInfo.invoiceTypeCode,
      };
    });
    try {
      const res = await aiSubmit.validateInvoice({
        validateParams: data,
        validateName: 'invoiceDuplicationCheck',
      });
      if (res && res.data) {
        const list = res.data;
        if (list.length === 0) {
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showSuccess: true,
            showError: false,
            answer: '发票重复报销检查校验成功',
          });
          validatePeriod();
        }
        // 重复发票
        if (list.length) {
          // 重复报销发票
          const errorList = [];
          let amountTotal = 0; // 实报金额合计
          let accountPeriodList = [];
          const newBillsList = aiSubmit.billsList.filter(item => {
            const findData = list.find(i => i.invoiceNum === item.billNumber);
            if (findData) {
              errorList.push({
                billNumber: findData.invoiceNum,
                claimNo: findData.claimNo,
              });
              return false;
            } else {
              return true;
            }
          });
          /** 处理一个帐期出现多个发票时的实报金额 **/
          const billsMap = {};
          newBillsList.forEach(item => {
            if (billsMap[item.accountPeriod]) {
              billsMap[item.accountPeriod].push(item);
            } else {
              billsMap[item.accountPeriod] = [item];
            }
          });
          Object.keys(billsMap).forEach(key => {
            let stander = getStrander(key);
            stander = parseFloat(stander);
            const accountBillList = billsMap[key];
            accountBillList.forEach(item => {
              const totalAmount = parseFloat(item.totalAmount);
              if (totalAmount > stander) {
                amountTotal = new BigNumber(amountTotal).plus(stander).toString();
                stander = 0;
              } else {
                amountTotal = new BigNumber(amountTotal).plus(totalAmount).toString();
                stander = new BigNumber(stander).minus(totalAmount);
              }
            });
          });
          aiSubmit.billsList = newBillsList;
          accountPeriodList = [...Object.keys(billsMap)];
          if (accountPeriodList.length) {
            aiSubmit.inputVisible = false; // 隐藏输入框
          } else {
            aiSubmit.loading = false;
            aiSubmit.inputVisible = true;
            aiSubmit.businessNo = '';
          }
          setTimeout(() => {
            aiSubmit.handleProcessCardRepeat(processUuid, {
              answer: '发票重复报销检查校验失败',
              answerParams: {
                answerContentType: 'templateType_billRepeat',
                errorList,
                accountPeriodList: accountPeriodList.length ? accountPeriodList : null,
                amountTotal,
              },
              contentParams: {
                loading: false,
                isDisabled: !accountPeriodList.length,
              },
            });
            aiSubmit.businessNo = '';
            processUuid = uuid();
          }, 500);
        }
      } else {
        throw new Error('发票重复报销检查校验失败');
      }
    } catch (error) {
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;
      aiSubmit.updateProcessContent(processUuid, {
        id: uuid,
        loading: false,
        showSuccess: false,
        showError: true,
        answer: '发票重复报销检查校验失败',
      });
      aiSubmit.saveHistory({
        answer: aiSubmit.getProcessContentJson(processUuid),
        answerContentType: 'templateType_processCard',
      });
      aiSubmit.businessNo = '';
      processUuid = uuid();
    }
  };

  // 校验账期
  const validatePeriod = async () => {
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      loading: true,
      answer: '正在进行账期重复检查，请稍等',
    });

    const params = {
      validateName: 'communicationPeriodCheck',
      validateParams: Array.from(
        new Set(aiSubmit.billsList.map(item => item.accountPeriod.replaceAll('年', '-').replaceAll('月', ''))),
      ),
    };
    aiSubmit
      .validateInvoice(params)
      .then(res => {
        if (res && res.data.length === 0) {
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            showSuccess: true,
            showError: false,
            loading: false,
            answer: '账期重复检查校验成功',
          });
          createAccounting();
        } else if (res && res.data && res.data.length) {
          // 重复帐期
          const list = res.data;
          const periodNameList = list.map(item => {
            return {
              periodName: moment(item.periodName).format('YYYY年MM月'),
              claimNo: item.claimNo,
            };
          });
          const errorList = [];
          let amountTotal = 0; // 实报金额合计
          let accountPeriodList = [];
          const newBillsList = aiSubmit.billsList.filter(item => {
            const findData = periodNameList.find(i => i.periodName === item.accountPeriod);
            if (findData) {
              const obj = errorList.find(errItem => errItem.accountPeriod === item.accountPeriod);
              if (obj) {
                obj.billNumberList.push(item.billNumber);
              } else {
                errorList.push({
                  // billNumber: item.billNumber,
                  billNumberList: [item.billNumber],
                  accountPeriod: item.accountPeriod, // 帐期
                  claimNo: findData.claimNo, // 报账单号DSFY****
                });
              }
              return false;
            } else {
              return true;
            }
          });
          /** 处理一个帐期出现多个发票时的实报金额 **/
          const billsMap = {};
          newBillsList.forEach(item => {
            if (billsMap[item.accountPeriod]) {
              billsMap[item.accountPeriod].push(item);
            } else {
              billsMap[item.accountPeriod] = [item];
            }
          });
          Object.keys(billsMap).forEach(key => {
            let stander = getStrander(key);
            stander = Number(stander);
            const accountBillList = billsMap[key];
            accountBillList.forEach(item => {
              const totalAmount = parseFloat(item.totalAmount);
              if (totalAmount > stander) {
                amountTotal = new BigNumber(amountTotal).plus(stander).toString();
                stander = 0;
              } else {
                amountTotal = new BigNumber(amountTotal).plus(totalAmount).toString();
                stander = new BigNumber(stander).minus(totalAmount);
              }
            });
          });

          aiSubmit.billsList = newBillsList;
          accountPeriodList = [...Object.keys(billsMap)];
          if (accountPeriodList.length) {
            aiSubmit.inputVisible = false; // 隐藏输入框
          } else {
            aiSubmit.loading = false;
            aiSubmit.inputVisible = true;
            aiSubmit.businessNo = '';
          }
          setTimeout(() => {
            aiSubmit.handleProcessCardRepeat(processUuid, {
              answer: '账期重复检查校验失败',
              answerParams: {
                answerContentType: 'templateType_periodRepeat',
                errorList,
                accountPeriodList: accountPeriodList.length ? accountPeriodList : null,
                amountTotal,
              },
              contentParams: {
                loading: false,
                isDisabled: !accountPeriodList.length,
              },
            });
            processUuid = uuid();
          }, 500);
        } else {
          aiSubmit.loading = false;
          aiSubmit.inputVisible = true;
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showSuccess: false,
            showError: true,
          });
          aiSubmit.addProcessContent(processUuid, {
            loading: false,
            answer: '当前使用人数较多，请稍后再试',
          });
          aiSubmit.saveHistory({
            answer: aiSubmit.getProcessContentJson(processUuid),
            answerContentType: 'templateType_processCard',
          });
          aiSubmit.businessNo = '';
          processUuid = uuid();
        }
      })
      .catch(() => {
        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;

        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          showSuccess: false,
          showError: true,
        });
        aiSubmit.addProcessContent(processUuid, {
          loading: false,
          answer: '当前使用人数较多，请稍后再试',
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
      });
  };

  // 生成消费记账
  const createAccounting = async () => {
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      question: '',
      loading: true,
      answer: '正在获取报账单基本信息，请稍等',
    });

    const { userId, orgId, orgName, positionCode, positionId, userName } = aiSubmit.initData;

    // 合并发票
    const billsMap = {};
    aiSubmit.billsList.forEach(item => {
      if (billsMap[item.accountPeriod]) {
        billsMap[item.accountPeriod].push(item);
      } else {
        billsMap[item.accountPeriod] = [item];
      }
    });
    const paramsList = [];
    Object.keys(billsMap).forEach(key => {
      let stander = getStrander(key);
      stander = Number(stander);
      const accountBillList = billsMap[key];
      accountBillList.forEach(item => {
        if (item.ocrInfo) {
          item.ocrInfo.invoiceRegion = item.ocrInfo.region.join(',');
          item.ocrInfo.sumAmount = new BigNumber(item.ocrInfo.priceAmount).plus(item.ocrInfo.taxAmount).toString();
          item.ocrInfo.outTaxAmountStatus = false;
          item.ocrInfo.outTaxAmount = 0;
          item.ocrInfo.invoiceStatus = 0;
          item.ocrInfo.invoiceType = item.ocrInfo.invoiceTypeCode;
          item.ocrInfo.reimbursementAmountStatus = true;

          const totalAmount = parseFloat(item.totalAmount);
          item.ocrInfo.reimbursementAmount = totalAmount > stander ? stander : totalAmount;
          stander = totalAmount > stander ? 0 : new BigNumber(stander).minus(totalAmount);
        }
      });

      const item = accountBillList[0];
      paramsList.push({
        data: [
          {
            attachNum: '',
            expSubCategoryCode: '2003015_200034',
            expSubCategoryName: '移动通讯费（新）_移动通讯费',
            consumerAddress: '',
            attendancePlace: '',
            attendancePlaceDest: '',
            remark: 'ai移动通讯费',
            applyEmpId: userId,
            guestNum: '',
            dinIngNum: '',
            refpreOrderId: '',
            refPreOrderCode: '',
            consumerdate: item.billDate.replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
            startDate: '1970-01-01',
            endDate: '1970-01-01',
            priceAmount: '',
            sumAmount: '',
            taxAmount: '',
            customTypeCode: '',
            customTypeName: '',
            projectCode: '',
            projectName: '',
            aiFlag: 'Y',
            // 1-1 1-2
            // invoiceList: [item.ocrInfo, '1-2'],
            invoiceList: accountBillList.map(i => i.ocrInfo),
            accountsId: '',
            amortizeBeginDate: '',
            amortizeEndDate: '',
            amortizeFlag: 0,
            refClaimNo: '',
            refLineId: '',
            applyMonth: item.accountPeriod.replaceAll('年', '-').replaceAll('月', '-') + '01',
            carNumber: '',
            asistantSegmentCode: '',
            asistantSegmentName: '',
            businessItemCode: '',
            businessItemName: '',
            belongPeriod: '',
            ouCode: '',
            ouName: '',
            vendorCode: '',
            vendorName: '',
            vendorType: '',
            amountTotal: accountBillList.reduce((total, item) => {
              if (item.ocrInfo) {
                return total + Number(item.ocrInfo.reimbursementAmount);
              }
              return total;
            }, 0),
            imageIds: '',
            extend6: orgId,
            orgId: orgId,
            deptId: orgId,
            orgName: orgName,
            deptName: orgName,
            consumerDate: item.accountPeriod.replaceAll('年', '-').replaceAll('月', '-') + '01',
          },
        ],
        ldapId: null,
        orgId: orgId,
        deptId: 0,
        userName: userName,
        positionCode: positionCode,
        positionId: positionId,
      });
    });

    let accountsId = [];
    for (let i = 0; i < paramsList.length; i++) {
      const item = paramsList[i];
      let res = null;
      try {
        res = await aiSubmit.createAccounting(item);
      } catch (error) {
        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          answer: '因生成消费记账异常导致本次报销失败，您可稍后再试或者选择传统报销。',
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
        return false;
      }
      const ids = res.data.accountId[0];
      try {
        const details = await getAccountingDetail(ids);
        accountsId = [...accountsId, details.data];
      } catch (error) {
        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;
        const answer = '因获取消费记账详情异常导致本次报销失败，您可稍后再试或者选择传统报销。';
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          answer,
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
        return false;
      }
    }

    aiSubmit.accountsId = accountsId;
    aiSubmit.updateProcessContent(processUuid, {
      id: uuids,
      showSuccess: true,
      showError: false,
      loading: false,
      answer: '报账单基本信息获取成功',
    });
    getReimburseInit();
    handleVerifyResult();
  };

  // 获取消费记账详情
  const getAccountingDetail = async accountsId => {
    const params = {
      ldapid: userId,
      accountsId: accountsId,
      orgId: orgId,
      org_id: orgId,
      userId: userId,
      userName: userName,
      businessLine: businessLine,
      positionCode: positionCode,
    };
    return accountDetail(params);
  };

  // 验真
  const handleVerifyResult = () => {
    let count = 0;
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      loading: true,
      answer: '正在为您进行发票验真，请稍等',
    });
    const invoiceIdList = [];
    aiSubmit.accountsId.forEach(item => {
      if (item.invoiceList) {
        item.invoiceList.forEach(invoice => {
          invoiceIdList.push(invoice.invoiceId);
        });
      }
    });

    if (aiSubmit.accountsId.length > 0) {
      const params = {
        invoiceIdList: invoiceIdList,
        ldapId: null,
        orgId: orgId,
        deptId: 0,
        userName: userName,
        positionCode: positionCode,
        positionId: positionId,
      };

      let interval = setInterval(async () => {
        if (count > 6) {
          return clearInterval(interval);
        }
        count++;
        const res = await aiSubmit.ocrTpQueryVerifyResult(params);
        const passInvoices = (res.data || []).filter(item => {
          return item.invoiceStatus === '2';
        });
        let errInvoices = [];
        if (count > 6) {
          errInvoices = (res.data || []).filter(item => {
            return item.invoiceStatus !== '2';
          });
        } else {
          errInvoices = (res.data || []).filter(item => {
            return item.invoiceStatus === '3';
          });
        }

        if (count > 6 && passInvoices.length === 0) {
          aiSubmit.loading = false;
          aiSubmit.inputVisible = true;
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showError: true,
            showSuccess: false,
            answer: '发票验真失败。若为报销当日开具发票，税务系统可能暂未获取开票信息，请隔天再试。',
          });
          aiSubmit.saveHistory({
            answer: aiSubmit.getProcessContentJson(processUuid),
            answerContentType: 'templateType_processCard',
          });
          aiSubmit.businessNo = '';
          processUuid = uuid();
          return clearInterval(interval);
        }

        if (count > 6 && passInvoices.length !== invoiceIdList.length) {
          aiSubmit.loading = false;
          aiSubmit.inputVisible = true;
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showError: true,
            showSuccess: false,
            answer: '发票验真失败。若为报销当日开具发票，税务系统可能暂未获取开票信息，请隔天再试。',
          });
          aiSubmit.saveHistory({
            answer: aiSubmit.getProcessContentJson(processUuid),
            answerContentType: 'templateType_processCard',
          });
          aiSubmit.businessNo = '';
          processUuid = uuid();
          return clearInterval(interval);
        }

        if (errInvoices.length === invoiceIdList.length) {
          aiSubmit.loading = false;
          aiSubmit.inputVisible = true;
          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showError: true,
            showSuccess: false,
            answer: '发票验真失败。若为报销当日开具发票，税务系统可能暂未获取开票信息，请隔天再试。',
          });
          aiSubmit.saveHistory({
            answer: aiSubmit.getProcessContentJson(processUuid),
            answerContentType: 'templateType_processCard',
          });
          aiSubmit.businessNo = '';
          processUuid = uuid();
          return clearInterval(interval);
        }

        // 更新发票状态
        if (passInvoices.length === invoiceIdList.length) {
          passInvoices.forEach(item => {
            aiSubmit.accountsId.forEach(accounting => {
              if (String(accounting.accountsId) === String(item.accountsId)) {
                accounting.invoiceList.forEach(invoice => {
                  if (String(item.invoiceId) === String(invoice.invoiceId)) {
                    invoice.invoiceStatus = item.invoiceStatus;
                  }
                });
              }
            });
          });

          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            loading: false,
            showError: false,
            showSuccess: true,
            answer: '发票验真成功',
          });
          checkTaxNo();
          return clearInterval(interval);
        }
      }, 10000);
    }
  };

  // 税号校验
  const checkTaxNo = async () => {
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      answer: '正在为您生成报账单，请稍等',
      loading: true,
    });

    if (!aiSubmit.reimburseInit) {
      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        answer: '您生成报账单失败',
        loading: false,
        showError: true,
        showSuccess: false,
      });

      return;
    }

    const { reimburseinit } = aiSubmit.reimburseInit;
    const { ouCode } = reimburseinit;

    const params = {
      ouCode: ouCode,
      accountIds: aiSubmit.accountsId.map(item => item.accountsId).join(','),
      checkUuid: uuids + userName,
      ldapId: null,
      orgId: orgId,
      deptId: 0,
      userName: userName,
      positionCode: positionCode,
      positionId: positionId,
    };
    checkInvoiceTaxNo(params)
      .then(res => {
        if (!res.data) {
          createClaim(uuids);
        } else {
          aiSubmit.loading = false;
          aiSubmit.inputVisible = true;

          aiSubmit.updateProcessContent(processUuid, {
            id: uuids,
            question: '',
            loading: false,
            showError: true,
            showSuccess: false,
            answer: '生成报账单失败',
          });
          aiSubmit.saveHistory({
            answer: aiSubmit.getProcessContentJson(processUuid),
            answerContentType: 'templateType_processCard',
          });
          aiSubmit.businessNo = '';
          processUuid = uuid();
        }
      })
      .catch(error => {
        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          question: '',
          loading: false,
          showError: true,
          showSuccess: false,
          answer: '很抱歉，您的报账单生成失败！请仔细阅读失败原因并进行修改。',
        });
        const errMsg = error.message || '生成报账单失败';

        aiSubmit.addProcessContent(processUuid, {
          id: uuid(),
          question: '',
          loading: false,
          answer: errMsg,
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
      });
  };

  // 报账单初始化
  const getReimburseInit = () => {
    const params = {
      userId: String(userId),
      accountsId: aiSubmit.accountsId.map(item => item.accountsId).join(','),
      isRefresh: 'false',
      claimId: '',
      orgId: orgId,
      org_id: orgId,
      ldapid: userId,
      userName: userName,
      businessLine: businessLine,
      positionCode: positionId,
    };
    reimburseInit(params)
      .then(res => {
        aiSubmit.reimburseInit = res.data;
      })
      .catch(e => {});
  };

  // 生成报账单
  const createClaim = async uuids => {
    const { reimburseinit, accountslist } = aiSubmit.reimburseInit;
    const {
      deptid,
      deptname,
      ouCode,
      ouName,
      // priceAmount,
      // sumAmount,
      // taxAmount,
      vendorSiteCode,
      vendorAccountNo,
      vendorBankName,
      vendorAccountName,
      currency,
      vendorCode,
      vendorName,
    } = reimburseinit;

    let imageInfoFileIds = [];

    let totalPriceAmount = new BigNumber(0);
    let totalOutTaxAmount = new BigNumber(0);
    let totalTaxAmount = new BigNumber(0);
    let totalSumAmount = new BigNumber(0);

    aiSubmit.accountsId.forEach(item => {
      imageInfoFileIds = [...imageInfoFileIds, ...(item.invoiceList || [])];
    });

    imageInfoFileIds.forEach(item => {
      totalPriceAmount = totalPriceAmount.plus(item.priceAmount);
      totalOutTaxAmount = totalPriceAmount.plus(item.outTaxAmount);
      totalTaxAmount = totalPriceAmount.plus(item.taxAmount);
      totalSumAmount = totalPriceAmount.plus(item.sumAmount);
    });

    const claimtravelinfodetails = aiSubmit.accountsId.map(item => {
      return {
        ...item,
        consumerdate: item.consumerDate,
        expSubCategoryCode: item.subCategoryCode,
        expSubCategoryName: item.subCategoryName,
      };
    });

    const params = {
      claimbase: {
        userid: userId,
        username: userName,
        deptid: deptid,
        claimId: '',
        deptname: deptname,
        ouCode: ouCode,
        ouName: ouName,
        currency: currency,
        vendorCode: vendorCode,
        vendorName: vendorName,
        item2Code: aiSubmit.accountsId[0].subCategoryCode.split('_')[0],
        item2Name: aiSubmit.accountsId[0].subCategoryName,
        refpreorderid: '',
        refpreordercode: '',
        attachNum: imageInfoFileIds.length,
        consumerdate: dayjs().format('YYYY-MM-DD'),
        remark: '报销移动通讯费（AI提单）',
        priceAmount: totalPriceAmount.toString(),
        sumAmount: totalPriceAmount.toString(),
        taxAmount: totalTaxAmount.toString(),
        curWriteOffAmount: '0.00',
        payAmount: totalPriceAmount.plus(totalTaxAmount).minus(totalOutTaxAmount).toString(),
        vendorSiteCode: vendorSiteCode,
        vendorAccountNo: vendorAccountNo,
        vendorAccountName: vendorAccountName,
        vendorBankName: vendorBankName,
        imageMode: '',
        devProjectCode: '',
        devProjectName: '',
        vendorSiteName: 'OFFICE',
        imageInfoFileIds: imageInfoFileIds.map(item => item.invoiceImageFileId),
        attachFileIds: [],
        VendorSiteName: '',
        vendorDesc: `开户行：${vendorBankName}  户名：${vendorAccountName}  银行账号：${vendorAccountNo}`,
        clamid: '',
        outTaxAmount: '0.00',
        asistantSegmentName: '',
        belongPeriod: '',
        businessItemName: '',
        businessItemCode: '',
        deptId: deptid,
        deptName: deptname,
        userId: userId,
        userName: userName,
      },
      claimbaselines: [
        {
          costdeptcode: '',
          costdeptname: '',
          bizclasscode: '',
          bizclassname: '',
          projectName: '',
          projectCode: '',
          customertype: '',
          reeatarea: '',
          diningnum: '',
          guestnum: '',
          applyAmount: '',
          summary: '',
          isAccrued: '',
          isinvoice: '',
        },
      ],
      travelinfos: [
        {
          travelinfoid: '',
          startdate: '',
          enddate: '',
          gotransport: '',
          goapplylevel: '',
          goapplyname: '',
          goTransportAmount: '',
          backtransport: '',
          backapplylevel: '',
          backapplyname: '',
          backTransportAmount: '',
          deptId: '',
          deptName: '',
          subcategorycode: '',
          subcategoryname: '',
        },
      ],
      claimtravelinfodetails: claimtravelinfodetails,
      claimBaseWriteOffs: [],
      preOrderClaims: [
        {
          asistantSegmentName: '',
          belongPeriod: '',
          businessItemName: '',
          businessItemCode: '',
          asistantSegmentCode: '',
        },
      ],
      imageIds: imageInfoFileIds.map(item => item.invoiceImageFileId),
      attachFileIds: [],
      acquiringBase: {
        hasPhysicalBills: 0,
      },
      checkUuid: uuid,
      orgId: orgId,
      org_id: orgId,
      ldapid: userId,
      userId: userId,
      userName: userName,
      businessLine: businessLine,
      positionCode: positionCode,
    };

    saveClaim(params)
      .then(res => {
        aiSubmit.claimInfo = res.data;
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          showSuccess: true,
          showError: false,
          answer: '报账单已生成',
        });
        sensitive();
      })
      .catch(error => {
        aiSubmit.loading = false;
        aiSubmit.inputVisible = true;

        const answer = error.message || '报账单生成失败';
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          loading: false,
          showError: true,
          showSuccess: false,
          answer,
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
      });
  };

  //敏感词校验
  const sensitive = async () => {
    const uuids = uuid();
    aiSubmit.addProcessContent(processUuid, {
      id: uuids,
      loading: true,
      answer: '正在为您提交报账单，请稍等',
    });
    const { clamid } = aiSubmit.claimInfo;
    const params = {
      claimId: clamid,
      userName: userName,
      ldapId: null,
      orgId: orgId,
      deptId: 0,
      positionCode: positionId,
      positionId: positionId,
    };

    const res = await validateInvoiceNumberSensitive(params);
    if (res.data.isOk || (!res.data.isOk && res.data.continue)) {
      consecutive(uuids);
      return;
    }

    if (!res.data.isOk && !res.data.continue) {
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;

      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        showError: true,
        loading: false,
        answer: '报账单生成失败，请仔细阅读失败原因并稍后重试',
      });
      const answer = '失败原因：' + res.data.errorMessage;
      aiSubmit.addProcessContent(processUuid, {
        id: uuid(),
        answer,
      });
      aiSubmit.saveHistory({
        answer: aiSubmit.getProcessContentJson(processUuid),
        answerContentType: 'templateType_processCard',
      });
      aiSubmit.businessNo = '';
      processUuid = uuid();
    }
  };

  //连号校验
  const consecutive = async uuids => {
    const { clamid } = aiSubmit.claimInfo;
    const params = {
      claimId: clamid,
      userName: userName,
      ldapId: null,
      orgId: orgId,
      deptId: 0,
      positionCode: positionId,
      positionId: positionId,
    };

    const res = await validateInvoiceNumberConsecutive(params);

    if (res.data.isOk || (!res.data.isOk && res.data.continue)) {
      checkInvoiceRept(uuids);
      return;
    }

    if (!res.data.isOk && !res.data.continue) {
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;

      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        loading: false,
        showError: true,
        showSuccess: false,
        answer: '报账单生成失败，请仔细阅读失败原因并稍后重试',
      });
      const answer = '失败原因：' + res.data.errorMessage;
      aiSubmit.addProcessContent(processUuid, {
        id: uuid(),
        answer,
      });
      aiSubmit.saveHistory({
        answer: aiSubmit.getProcessContentJson(processUuid),
        answerContentType: 'templateType_processCard',
      });
      aiSubmit.businessNo = '';
      processUuid = uuid();
    }
  };

  //发票重复校验
  const checkInvoiceRept = async uuids => {
    const { clamid } = aiSubmit.claimInfo;
    let invoiceList = [];

    aiSubmit.accountsId.forEach(item => {
      invoiceList = [...invoiceList, ...(item.invoiceList || [])];
    });
    const params = {
      claimId: clamid,
      invoiceList: invoiceList.map(item => {
        return {
          ...item,
          claimId: clamid,
        };
      }),
      orgId: orgId,
      org_id: orgId,
      ldapid: userId,
      userId: userId,
      userName: userName,
      businessLine: businessLine,
      positionCode: positionId,
    };

    const res = await checkInvoice(params);
    const { selfList, forceList, resultList } = res.data;
    if (selfList.length > 0 || forceList.length > 0) {
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;

      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        showError: true,
        showSuccess: false,
        loading: false,
        answer: '报账单生成失败，请仔细阅读失败原因并稍后重试',
      });
      aiSubmit.addProcessContent(processUuid, {
        id: uuid(),
        answer: '失败原因：发票存在重复报销的情况，不允许提单',
      });
      aiSubmit.saveHistory({
        answer: aiSubmit.getProcessContentJson(processUuid),
        answerContentType: 'templateType_processCard',
      });
      aiSubmit.businessNo = '';
      processUuid = uuid();
      return;
    }
    submit(uuids);
  };

  // 提交报账单
  const submit = async uuids => {
    const { clamid, flowrule } = aiSubmit.claimInfo;

    let invoiceList = [];

    aiSubmit.accountsId.forEach(item => {
      invoiceList = [...invoiceList, ...(item.invoiceList || [])];
    });
    const params = {
      workItemId: '',
      processopinion: '',
      currentStepId: '',
      candidateusers: '',
      notifyUsersIds: '',
      source: 'emsMobile',
      imageInfoFileIds: invoiceList.map(item => item.invoiceImageFileId),
      claimId: clamid,
      nextStepId: flowrule[0].nodeid,
      processOpinion: '请审批',
      candidateUsers:
        flowrule[0].nodename === '共享支持专员'
          ? (flowrule[0].personlist || []).map(item => item.ldapid + '/' + item.orgId).join(',')
          : `${flowrule[0].personlist[0].ldapid}/${flowrule[0].personlist[0].orgId}`,
      orgId: orgId,
      org_id: orgId,
      ldapid: userId,
      userId: userId,
      userName: userName,
      businessLine: businessLine,
      positionCode: positionId,
    };
    try {
      const res = await submitClaim(params);
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;
      if (res) {
        let amountTotal = 0; // 实报金额合计
        let accountPeriodList = [];
        /** 处理一个帐期出现多个发票时的实报金额 **/
        const billsMap = {};
        aiSubmit.billsList.forEach(item => {
          if (billsMap[item.accountPeriod]) {
            billsMap[item.accountPeriod].push(item);
          } else {
            billsMap[item.accountPeriod] = [item];
          }
        });
        Object.keys(billsMap).forEach(key => {
          let stander = getStrander(key);
          stander = parseFloat(stander);
          const accountBillList = billsMap[key];
          accountBillList.forEach(item => {
            const totalAmount = parseFloat(item.totalAmount);
            if (totalAmount > stander) {
              amountTotal = new BigNumber(amountTotal).plus(stander).toString();
              stander = 0;
            } else {
              amountTotal = new BigNumber(amountTotal).plus(totalAmount).toString();
              stander = new BigNumber(stander).minus(totalAmount);
            }
          });
        });
        accountPeriodList = [...Object.keys(billsMap)];
        // const answer =
        //   '提交成功！雪宝已为您生成报账单DSFY****，点击报账单号即可跳转至“我的报销-已提交”中查看详情。'
        const answerJson = JSON.stringify({
          claimId: res.data.claimId,
          claimNo: res.data.claimNo,
          reimburseNumber: res.data.claimNo,
          accountPeriodList: accountPeriodList.length ? accountPeriodList : null,
          amountTotal,
        });
        aiSubmit.updateProcessContent(processUuid, {
          id: uuids,
          answer: '报账单提交成功',
          loading: false,
          showSuccess: true,
          showError: false,
        });
        aiSubmit.updateProcessContent(processUuid, {
          phoneBillSuccess: JSON.parse(answerJson),
        });
        aiSubmit.saveHistory({
          answer: aiSubmit.getProcessContentJson(processUuid),
          answerContentType: 'templateType_processCard',
        });
        aiSubmit.businessNo = '';
        processUuid = uuid();
      }
    } catch (error) {
      aiSubmit.loading = false;
      aiSubmit.inputVisible = true;
      const errMsg = error.message || '提交报账单失败，您可稍后再试或者选择传统报销。';
      aiSubmit.updateProcessContent(processUuid, {
        id: uuids,
        loading: false,
        answer: errMsg,
      });
      aiSubmit.saveHistory({
        answer: aiSubmit.getProcessContentJson(processUuid),
        answerContentType: 'templateType_processCard',
      });
      aiSubmit.businessNo = '';
      processUuid = uuid();
    }
  };

  // 剔除重复报账发票后-确认生成
  const confirmCreateBillRepeat = () => {
    aiSubmit.inputVisible = true;
    aiSubmit.loading = true;
    aiSubmit.setMessage(id, {
      isDisabled: true,
    });
    aiSubmit.addContent({
      id: uuid(),
      question: '确定生成',
    });
    aiSubmit.saveHistory({
      question: '确定生成',
    });
    validatePeriod();
  };
  // 剔除重复报账帐期后-确认生成
  const confirmCreatePeriodRepeat = () => {
    aiSubmit.inputVisible = true;
    aiSubmit.loading = true;
    aiSubmit.setMessage(id, {
      isDisabled: true,
    });
    aiSubmit.addContent({
      id: uuid(),
      question: '确定生成',
    });
    aiSubmit.saveHistory({
      question: '确定生成',
    });
    // 生成消费记账
    createAccounting();
  };

  const getDom = () => {
    if (answerContentType === 'templateType_reimburseDetail') {
      return (
        <div className="">
          <div className="text-base font-normal leading-6 text-[#0B0D0F]">您将报销的费用如下：</div>
          {successBillList.map((item, index) => (
            <div key={index}>
              <div className="flex items-center pt-4">
                <div className="text-[#1A1C27] leading-6 text-base font-medium">账期 {item.accountPeriod}</div>
                <div className="text-[#8A99A8] font-normal text-xs leading-5 pl-4 flex items-center">
                  <span>标准金额（CYN）：</span>
                  {/* <span className="text-[#1A1C27]">CYN {getStrander(item.accountPeriod)}</span> */}
                  <span className="text-[#1A1C27]">{item.standardAmount}</span>
                </div>
                <div className="text-[#8A99A8] font-normal text-xs leading-5 pl-4 flex items-center">
                  <span>实报金额：</span>
                  <span className="text-[#FF8C1A] text-[17px] font-bold leading-[22px]">
                    {/* CYN {getTotalAmount(item.accountPeriod)} */}
                    {item.actualAmount}
                  </span>
                </div>
              </div>
              <div className="gap-[10px]">
                {item.billList.map((bill, billIndex) => {
                  return (
                    <div key={billIndex} className="bg-[#E6F2FF] rounded-[6px] p-2 w-[450px] mt-2">
                      <div className="text-[#333333] font-semibold leading-[22px] text-sm flex items-center">
                        <div className="flex-1 break-all">{bill.billNumber}</div>
                        {bill.billUrl && bill.billUrl.split('.').pop().toLocaleLowerCase() !== 'pdf' ? (
                          <Image
                            key={index}
                            src={IconPicture}
                            style={{
                              width: '16px',
                              height: '16px',
                              cursor: 'pointer',
                              marginLeft: '8px',
                              marginBottom: '3px',
                            }}
                            preview={{
                              src: bill.billUrl,
                              mask: null,
                            }}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="flex justify-between pt-2">
                        <div className="text-[#999999] text-sm font-normal leading-[22px]">
                          <div className="inline-block">发票类型：</div>
                          <div className="inline-block text-[#333333]">{bill.billType}</div>
                        </div>
                        <div className="text-[#999999] text-sm font-normal leading-[22px]">
                          <div className="inline-block">金额（CYN）：</div>
                          <div className="inline-block text-[#333333]">{bill.totalAmount}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {!(isHistory || isDisabled) ? (
            <div>
              <div className="text-[#f75f5f] font-medium text-sm leading-5 mb-2">我确认以上报账信息准确无误</div>
              <Button ghost type="primary" className="rounded-md" onClick={handleSubmit}>
                确定生成
              </Button>
              <Button
                ghost
                type="default"
                className="border-[#707B8C] text-[#707B8C] rounded-md ml-2"
                onClick={() => aiSubmit.cancelReimburse(props.id, '取消生成')}
              >
                取消
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }
    // 发票重复
    if (answerContentType === 'templateType_billRepeat') {
      return (
        <div className="">
          {(datas.errorList || []).map((errItem, errIndex) => (
            <div className="box" key={errIndex}>
              <div>
                {errItem.billNumber}
                发票重复，重复单号
                {errItem.claimNo}
              </div>
            </div>
          ))}
          {datas.accountPeriodList && (
            <React.Fragment>
              <div>可为您生成如下报销单：</div>
              <div className="rounded-xl mt-3 p-4 gap-2 border border-solid border-[#d3d9e6] max-w-[431px]">
                <div className="mb-4 relative overflow-hidden">
                  <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">报账账期</div>
                  <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                    {datas.accountPeriodList.join('、')}
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[150px] left-0">
                    实报金额合计（CNY）
                  </div>
                  <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                    {datas.amountTotal}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {!(isHistory || isDisabled) ? (
            <div className="mt-3">
              <Button ghost type="primary" className="rounded-md" onClick={confirmCreateBillRepeat}>
                确定生成
              </Button>
              <Button
                ghost
                type="default"
                className="border-[#707B8C] text-[#707B8C] rounded-md ml-2"
                onClick={() => aiSubmit.cancelReimburse(props.id, '取消生成')}
              >
                取消
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }
    // 帐期重复
    if (answerContentType === 'templateType_periodRepeat') {
      return (
        <div className="">
          {(datas.errorList || []).map((errItem, errIndex) => (
            <div className="box" key={errIndex}>
              <div>
                {errItem.accountPeriod}
                账期已被占用，占用单号
                {errItem.claimNo}
                ，发票
                {errItem.billNumberList.join('、')}
                已自动剔除。
              </div>
            </div>
          ))}
          {datas.accountPeriodList && (
            <React.Fragment>
              <div>可为您生成如下报销单：</div>
              <div className="rounded-xl mt-3 p-4 gap-2 border border-solid border-[#d3d9e6] max-w-[431px]">
                <div className="mb-4 relative overflow-hidden">
                  <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[100px] left-0">报账账期</div>
                  <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                    {datas.accountPeriodList.join('、')}
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute flex-1 text-[#999999] text-sm leading-[22px] w-[150px] left-0">
                    实报金额合计（CNY）
                  </div>
                  <div className="text-right pl-[100px] flex-none text-[#333333] text-sm leading-[22px]">
                    {datas.amountTotal}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {!(isHistory || isDisabled) ? (
            <div className="mt-3">
              <Button ghost type="primary" className="rounded-md" onClick={confirmCreatePeriodRepeat}>
                确定生成
              </Button>
              <Button
                ghost
                type="default"
                className="border-[#707B8C] text-[#707B8C] rounded-md ml-2"
                onClick={() => aiSubmit.cancelReimburse(props.id, '取消生成')}
              >
                取消
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }
  };

  return getDom();
}

export default observer(Index);
