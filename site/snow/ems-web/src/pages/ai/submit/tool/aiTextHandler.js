export const instructHandler = (resData, item) => {
  if (resData.resultType === 'json') {
    try {
      const contentObj = JSON.parse(resData.result);
      const auth = this.authData;
      this.business_no = contentObj.business_no;

      switch (contentObj.business_no) {
        case '2003015':
          if (this.authData.is2003015) {
            item.showUpload = true;
            resData.result = '好的！雪宝将帮助您报销移动通讯费。请上传相关月结发票。';
            this.inputVisible = false;
          } else {
            resData.result =
              '很抱歉，雪宝未查询到您的通讯费标准，请核实原因（如：是否已加入统付）。本次报销结束，再见！';
          }
          break;
        // 事前申请（大类）
        case '1000': {
          // 事前申请（虚拟）
          resData.result =
            '雪宝暂时只支持公出用车、差旅（含辖区）事前申请提报，其他事前申请请使用传统提报，点击可跳“事前申请”';
          if (auth.is1000) {
            if (auth.is1008 && auth.is1010) {
              resData.result = '您要提报哪种类型的事前申请呢？公出用车、出差申请（含辖区）？';
            } else if (auth.is1008) {
              resData.result =
                '您想要提报出差（含辖区）事前申请吗？您可以这样说“7月5号到12号，从成都出发，到深圳、上海、北京出差参加半年会';
            } else if (auth.is1010) {
              resData.result = '您要提报内公出用车事前申请吗？您可以这样说“7月13日 去成都工厂 开会”';
            }
          } else {
            // dataObj.result = '雪宝暂时只支持公出用车、差旅（含辖区）事前申请提报，其他事前申请请使用传统提报，点击可跳“事前申请”'
          }
          break;
        }
        // 事前申请(商旅)
        case '1008': {
          if (auth.is1008) {
            resData.result =
              '您想要提报出差（含辖区）事前申请吗？您可以这样说“7月5号到12号，从成都出发，到深圳、上海、北京出差参加半年会';
          } else {
            resData.result =
              '您需要提报出差（含辖区）事前申请吗？雪宝查询到您无法提报出差（含辖区）事前申请，请联系财务客服';
          }
          break;
        }
        // 公出用车事前申请
        case '1010': {
          if (auth.is1010) {
            resData.result = '您要提报内公出用车事前申请吗？您可以这样说“7月13日 去成都工厂 开会”';
          } else {
            resData.result = '雪宝查询到您无法提报公出用车事前申请，请联系财务客服处理。还有什么想和雪宝交流的吗？';
          }
          break;
        }
        default: {
          resData.result = contentObj.content;
        }
      }
    } catch (error) {
      resData.result = '当前使用人数较多，请稍后再试';
    }
  }
};
