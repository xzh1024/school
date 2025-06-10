/*
注如果使用到this  这里的this代表aiSubmit 这个Store
*/

// 通讯费
// const handlePhoneBill = (item, that) => {
//   item.answer = that.authData.is2003015
//     ? '好的！雪宝将帮助您报销移动通讯费。请上传相关月结发票。'
//     : '很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！';
//   if (that.authData.is2003015) {
//     item.showUpload = true;
//   }
// };

const handleBill = (item, that) => {
  item.answerContentType = 'templateType_reimburseDetail';
  if (that.authData.is2003015) {
    item.showUpload = true;
    item.answer = '好的！雪宝将帮助您报销移动通讯费。请上传相关月结发票。';
  } else {
    item.answer = '很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！';
  }
  try {
    const { successBillList, errorBillList } = that.formatBillList(JSON.parse(item.answer) || []);
    item.successBillList = successBillList;
    item.errorBillList = errorBillList;
  } catch (error) {
    item.answer = item.answer || '当前使用人数较多，请稍后再试';
    that.businessNo = '';
  }
};

// 事前申请（虚拟）
const handleBusinessNo1000 = (item, that) => {
  const data1000 = that.formatBusinessNo1000(true);
  item.answer = data1000.text;
};

// 非食堂用餐
const handleBusinessNo1002 = (item, that) => {
  const data1002 = that.formatBusinessNo1002(true);
  // if (data1002.showNonCanteenDiningButton) {
  //   item.showNonCanteenDiningButton = true;
  // }
  item.answer = data1002.text;
};

// 出差商旅
const handleBusinessNo1008 = (item, that) => {
  const data1008 = that.formatBusinessNo1008(true);
  item.answer = data1008.text;
};

// 公出用车
const handleBusinessNo1010 = (item, that) => {
  const data1008 = that.formatBusinessNo1010(true);
  item.answer = data1008.text;
};

const nonsupportHandler = item => {
  item.answer = 'PC端暂不支持展示该信息，请通过移动端查看。';
};

const historyHandler = function (item) {
  if (item.request) {
    item.fileList = [...item.request];
  }
  item.isHistory = true;
  switch (item.command) {
    case 'instruct': {
      try {
        if (item.answerType === 'json') {
          const contentObj = JSON.parse(item.answer);
          switch (contentObj.business_no) {
            // 移动通讯费用报销
            case '2003015':
            case 'bill': {
              handleBill(item, this);
              break;
            }
            // 事前申请（大类）
            case '1000': {
              handleBusinessNo1000(item, this);
              break;
            }
            // 非食堂用餐
            case '1002': {
              // nonsupportHandler(item, this);
              handleBusinessNo1002(item, this);
              break;
            }
            // 出差商旅
            case '1008': {
              if (contentObj.form) {
                item.answer = '';
              } else {
                handleBusinessNo1008(item, this);
              }
              break;
            }
            // 公出用车
            case '1010': {
              if (contentObj.form) {
                item.answer = '';
              } else {
                handleBusinessNo1010(item, this);
              }
              break;
            }
            // 其他
            default: {
              item.answer = contentObj.content;
              break;
            }
          }
        } else if (item.answerContentType === 'templateType_processCard') {
          const contentObj = JSON.parse(item.answer);
          item.answer = contentObj;
        }
      } catch (error) {
        item.answer = item.answer || '当前使用人数较多，请稍后再试';
      }
      break;
    }
    // 通讯费
    case '2003015':
    case 'bill': {
      try {
        if (item.answerType === 'json') {
          item.answerContentType = 'templateType_reimburseDetail';
          const { successBillList, errorBillList } = this.formatBillList(JSON.parse(item.answer) || []);
          item.successBillList = successBillList;
          item.errorBillList = errorBillList;
        } else if (item.answerContentType === 'templateType_processCard') {
          const contentObj = JSON.parse(item.answer);
          item.answer = contentObj;
          // 兼容数据
          if (contentObj.question) {
            item.question = contentObj.question;
          }
        }
      } catch (error) {
        item.answer = item.answer || '当前使用人数较多，请稍后再试';
      }
      break;
    }
    // 事前申请
    // case '1000': {
    //   break
    // }
    // 非食堂用餐
    case '1002': {
      if (item.answerType === 'json') {
        try {
          const contentObj = JSON.parse(item.answer);
          if (contentObj.business_no === '1002') {
            // 判断是否结束
            if (contentObj.finished === '1') {
              item.answer = contentObj;
              item.answerContentType = 'templateType_nonCanteenDining';
            } else {
              item.answer = contentObj.content || '';
            }
          }
        } catch (error) {
          item.answer = '当前使用人数较多，请稍后再试';
        }
      }
      break;
    }
    // 出差商旅
    case '1008': {
      if (item.answerType === 'json') {
        try {
          const contentObj = JSON.parse(item.answer);
          if (contentObj.business_no === '1008') {
            // 判断是否结束
            if (contentObj.finished === '1') {
              item.answer = contentObj;
              item.answerContentType = 'templateType_businessTrip';
            } else {
              item.answer = contentObj.content || '';
            }
          } else {
            // this.switchBusiness(item, true);
          }
        } catch (error) {
          item.answer = '当前使用人数较多，请稍后再试';
        }
      }
      break;
    }
    // 公出用车
    case '1010': {
      if (item.answerType === 'json') {
        try {
          const contentObj = JSON.parse(item.answer);
          /* {"date":"08月15日","business_no":"1010","cause":"开会","finished":"1","dest":"成都"} */
          // if (contentObj.business_no !== '1010') {
          if (contentObj.business_no === '1010') {
            // 判断是否结束
            if (contentObj.finished === '1') {
              // 是否因研发项目提报事前申请？
              item.answer = contentObj;
              item.answerContentType = 'templateType_publicVehicle';
            } else {
              item.answer = contentObj.content || '';
            }
          } else {
            // this.switchBusiness(item, true);
          }
        } catch (error) {
          item.answer = '当前使用人数较多，请稍后再试';
        }
      }
      break;
    }
    default: {
      if (item.answerType === 'json') {
        try {
          const contentObj = JSON.parse(item.answer);
          item.answer = contentObj.content || '';
        } catch (error) {
          item.answer = '当前使用人数较多，请稍后再试';
        }
      }
      break;
    }
  }
  return item;
};

export default historyHandler;
