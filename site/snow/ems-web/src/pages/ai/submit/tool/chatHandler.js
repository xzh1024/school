const case2003015 = ({ item, that }) => {
  if (that.authData.is2003015) {
    item.showUpload = true;
    item.answer = '好的！雪宝将帮助您报销移动通讯费。请上传相关月结发票。';
    that.inputVisible = false;
  } else {
    that.businessNo = '';
    item.answer = '很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！';
  }
};

// 通讯费识别发票逻辑
const billHandler = ({ resData, item, answerUuid, that }) => {
  const resBillList = JSON.parse(resData.result || '{}');
  if (resBillList && resBillList.length) {
    const { successBillList, errorBillList } = that.formatBillList(resBillList);
    let bills = [];
    successBillList.forEach(item => {
      if (item.billList && item.billList.length) {
        bills = [...bills, ...item.billList];
      }
    });
    const billsList = [...that.billsList];
    const newBillsList = bills.map(item => {
      const billData = {
        ...item,
      };
      const findData = billsList.find(i => i.cosKey === item.cosKey);
      if (findData) {
        billData.file = findData.file;
      }
      return billData;
    });
    that.billsList = [...newBillsList];

    const newItem = {
      ...item,
      loading: false,
      // answer: resData.result,
      // answerType: resData.resultType,
      // command: 'bill',
      answerContentType: 'templateType_reimburseDetail',
      successBillList: successBillList,
      errorBillList: errorBillList,
    };
    that.setMessage(answerUuid, newItem);
    if (successBillList.length) {
      that.inputVisible = false;
    } else {
      that.businessNo = '';
    }
  } else {
    that.businessNo = '';
    // 反馈失败原因
    that.setMessage(answerUuid, {
      ...item,
      loading: false,
      answer: '雪宝：很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！',
    });
    that.saveHistory({
      answer: '雪宝：很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！',
    });
  }
};

const nonsupportHandler = item => {
  // resData.result = 'PC端暂未开放该业务，请通过移动端或者传统方式申请。';
  item.answer = 'PC端暂未开放该业务，请通过移动端或者传统方式申请。';
};

const chatHandler = function (resData, answerUuid) {
  if (resData && resData.business && resData.business.requestId) {
    this.business = resData.business;
  }
  const { result } = resData;
  const contentData = JSON.parse(result);

  const item = this.contentList.find(i => i.id === answerUuid);
  item.answer = resData.result;
  item.answerType = resData.resultType;
  item.command = resData.command;

  switch (item.command) {
    case 'instruct': {
      if (resData.resultType === 'json') {
        try {
          const contentObj = JSON.parse(resData.result);
          // const auth = this.authData;
          this.businessNo = contentObj.business_no;

          switch (contentObj.business_no) {
            case '2003015':
              case2003015({
                item,
                // resData,
                that: this,
              });
              break;
            // 事前申请（大类）
            case '1000': {
              // 事前申请（虚拟）
              // nonsupportHandler(resData);
              this.businessNo = '';
              // 事前申请（虚拟）
              const data1000 = this.formatBusinessNo1000();
              item.answer = data1000.text;
              if (data1000.showNonCanteenDiningButton) {
                item.showNonCanteenDiningButton = true;
                this.inputVisible = false;
              }
              break;
            }
            // 事前申请-非食堂用餐
            case '1002': {
              const data1002 = this.formatBusinessNo1002();
              if (contentObj.form) {
                if (data1002.auth) {
                  this.setFinished1002({
                    item,
                    contentObj: {
                      ...contentObj.form,
                    },
                  });
                } else {
                  item.answer = data1002.text;
                }
              } else {
                if (data1002.showNonCanteenDiningButton) {
                  item.showNonCanteenDiningButton = true;
                  this.inputVisible = false;
                }
                item.answer = data1002.text;
              }
              break;
            }
            // 事前申请-出差商旅
            case '1008': {
              const data1008 = this.formatBusinessNo1008();
              if (contentObj.form) {
                if (data1008.auth) {
                  this.setFinished1008(item, {
                    ...contentObj.form,
                  });
                } else {
                  item.answer = data1008.text;
                }
              } else {
                item.answer = data1008.text;
              }
              break;
            }
            // 事前申请-公出用车
            case '1010': {
              const data1010 = this.formatBusinessNo1010();
              if (contentObj.form) {
                if (data1010.auth) {
                  this.setFinished1010(item, {
                    ...contentObj.form,
                  });
                } else {
                  item.answer = data1010.text;
                }
              } else {
                // nonsupportHandler(resData);
                // const data1010 = this.formatBusinessNo1010();
                // if (!data1010.auth) {
                // if (!this.authData.is1010) {
                //   this.businessNo = '';
                // }
                item.answer = data1010.text;
              }
              break;
            }
            default: {
              this.businessNo = '';
              item.answer = contentObj.content;
            }
          }
        } catch (error) {
          this.businessNo = '';
          item.answer = '当前使用人数较多，请稍后再试';
        }
      }
      this.setMessage(answerUuid, {
        ...item,
        loading: false,
      });
      break;
    }
    case '2003015':
    case 'bill': {
      billHandler({
        resData,
        item,
        answerUuid,
        that: this,
      });
      break;
    }
    // 事前申请-非食堂用餐
    case '1002': {
      if (item.answerType === 'json') {
        const contentObj = JSON.parse(item.answer);
        this.setFinished1002({
          item,
          contentObj: {
            ...contentObj,
          },
          templateType: 'nonCanteenDiningForm',
        });
      }
      this.setMessage(answerUuid, {
        ...item,
        loading: false,
      });
      break;
    }
    // 事前申请-出差商旅
    case '1008': {
      if (item.answerType === 'json') {
        const contentObj = JSON.parse(item.answer);
        // 确认意图是否切换
        // if (contentObj.business_no === item.command) {
        this.setFinished1008(item, contentObj);
        // } else {
        // 切换意图
        // this.switchBusiness(item);
        // }
      }
      this.setMessage(answerUuid, {
        ...item,
        loading: false,
      });
      break;
    }
    // 事前申请-公出用车
    case '1010': {
      if (item.answerType === 'json') {
        const contentObj = JSON.parse(item.answer);
        // if (contentObj.business_no === item.command) {
        this.setFinished1010(item, contentObj);
        // } else {
        // 切换意图
        // this.switchBusiness(item);
        // }
      }
      this.setMessage(answerUuid, {
        ...item,
        loading: false,
      });
      break;
    }
  }
};

export default chatHandler;
