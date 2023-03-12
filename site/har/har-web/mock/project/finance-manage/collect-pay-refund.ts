import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/cbd-api-project/mis/payment_refund/pageList',
    method: 'get',
    response: resData(
      mockList(
        {
          id: '@id',
          projectId: '@id', // 项目id
          projectName: '@ctitle', // 项目名称
          refundCode: '@id', // 退款单编号
          payMethodId: '@id', // 退款方式
          merchantId: '@id', // 商户id
          merchantName: '@ctitle', // 商户名称
          contractCode: '@id', // 合同编号
          storeId: '@id',
          storeName: '@ctitle',
          refundAmount: '@integer(2545,178454)', // 退款金额
          refundAt: '@datetime', // 退款日期
          auditStat: '@pick([1,2,3,4,5])',
          businessStat: '@pick([0,1,2])',
          invoiceStat: '@pick([0,1])',
          cancelStat: '@pick([0,1])',
          billStartAt: '@date("yyyy-MM-dd")', // 账单费用开始日期
          billEndAt: '@date("yyyy-MM-dd")' // 账单费用结束日期
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/mis/payment_refund/amountCount',
    method: 'get',
    response: resData({
      totalRefundAmount: '@integer(1000,6000)', // 总退款金额
      totalRefundCount: '@integer(0,100)', // 总退款笔数
      inAuditRefundAmount: '@integer(1000,6000)', // 审核中退款金额
      inAuditRefundCount: '@integer(0,100)', // 审核中退款笔数
      passedRefundAmount: '@integer(1000,6000)', // 已通过退款金额
      passedRefundCount: '@integer(0,100)' // 已通过退款笔数
    })
  },
  {
    url: '/cbd-api-project/mis/payment_refund/export',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/confirm',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/detail',
    method: 'get',
    response: resData({
      billOutput: {
        id: '@id', // 业务主键
        billNum: '@id', // 账单编号
        billType: '@pick([1,2])', // 账单类型1收款单2付款单,@seeBillTypeEnum
        projectId: '@id', // 项目id
        projectName: '@ctitle', // 项目名字
        merchantId: '@id', // 商户id
        merchantName: '@ctitle', // 商户名字
        storeId: '@id', // 店铺id
        storeName: '@ctitle', // 店铺名字
        expenseItemsId: '@id', // 费用项目id
        expenseItemsName: '@ctitle', // 费用项目名称
        contractCode: '@id', // 合同编号
        billSourceType: '@pick([1,2])', // 账单来源1合同2手工录入,,@seeBillSourceTypeEnum
        businessStat: '@pick([0,1,2,3,4,5])', // 业务状态0草稿1待确认2未支付3已作废4部分支付5已结清,@seeBusinessStatEnum
        paymentDays: '@date("yyyy-MM-dd")', // 账期
        expensePeriod: '@date()~@date()', // 费用期间
        startAt: '@date("yyyy-MM-dd")', // 费用开始日期
        endAt: '@date("yyyy-MM-dd")', // 费用结束日期
        billCreateAt: '@date("yyyy-MM-dd")', // 账单生成日期(应收日)
        rebateAmount: '@integer(1000,6000)', // 返款金额
        advanceAmount: '@integer(1000,6000)', // 预付款
        feeAmount: '@integer(100,1000)', // 手续费
        receivableAmount: '@integer(1000,6000)', // 应收金额
        deductionAmount: '@integer(100,1000)', // 抵扣金额
        collectionAndPaymentAmount: '@integer(1000,6000)', // 已收已付金额
        amountNotReceived: '@integer(100,1000)' // 未收金额
      },
      paymentInfo: {
        id: '@id', // 收付款单id
        paymentNum: '@id', // 收付款单编号
        expenseItemName: '@ctitle', // 费用项目名字
        paymentDays: '@date("yyyy-MM-dd")', // 账期
        amount: '@integer(1000,6000)', // 金额
        payDay: '@date("yyyy-MM-dd")', // 到账日期
        payMethodStr: '@ctitle', // 支付方式
        updateBy: '@cname', // 操作人
        updateTime: '@date("yyyy-MM-dd")' // 操作时间
      },
      refundDetail: {
        id: '@id',
        refundCode: '@id',
        expenseItemId: '@id',
        expenseItemName: '@ctitle',
        refundAmount: '@integer(1000,6000)',
        refundAt: '@date("yyyy-MM-dd")',
        payMethodId: '@pick([1,2,3])',
        payMethodName: '@ctitle',
        updateBy: '@cname',
        updateTime: '@date("yyyy-MM-dd")',
        remark: '@ctitle',
        refundAbleAmount: '@integer(1000,6000)'
      },
      resourceFilesRespList: {
        id: '@id',
        name: '@ctitle', // 名称
        type: '@ctitle', // 类型
        format: '@ctitle', // 格式
        size: '@integer', // 文件大小（字节B）
        previewAddress: '@image' // 预览地址
      },
      payAccountId: '@id', // 付款方id(1收款单=商铺id,2付款单=收款账户id)
      payBankName: '@ctitle', // 付款账户银行(独立编辑)
      payAccountNum: '@id', // 付款银行卡号
      payNum: '@id', // 付款凭证
      receiptAccountId: '@id', // 收款方id(收款单=收款账户id,付款单=商铺id)
      receiptBankName: '@ctitle', // 收款银行
      receiptAccountNum: '@id', // 收款银行卡号
      receiptNum: '@id', // 收款凭证
      paymentType: '@pick([1,2])', // 收付款类型1收款2付款
      paymentNum: '@id', // 收付款类型1收款2付款
      amount: '@integer(1000,6000)', // 收付款金额=收付款记录总和+抵扣总和(收款有此项,付款为0)
      businessStat: '@pick([0,1,2,3])', // 业务状态0草稿1待确认2已确认3已作废,@seeEnumCbdMisPayment.BusinessStat
      auditStat: '@pick([1,2,3,4,5])', // 审核状态1未提交2审批中3已通过4已驳回5已撤销,@seeEnumCbdMisPayment.AuditStat
      invoiceId: '@id', // 发票id
      projectId: '@id', // 项目id
      merchantId: '@id', // 商户id
      storeId: '@id', // 店铺id
      contractId: '@id', // 合同id
      billId: '@id', // 账单id
      refundAmount: '@id', // 退款金额
      flowId: '@id', // 流程id
      payRemark: '@csentence', // 付款备注
      receiptRemark: '@csentence', // 收款备注
      resourceCode: '@id', // 资源编号
      payAccountName: '@cname', // 付款方账户名字
      receiptAccountName: '@cname', // 收款方账户名字
      overdueFineAmount: '@integer(1000,6000)', // 滞纳金(为空表示未生成滞纳金)
      clientId: '@id', // 集团客户id
      contractCode: '@id', // 合同编号
      paymentDays: '@date("yyyy-MM-dd")', // 账期
      billAmount: '@integer(1000,6000)', // 账单应收金额(快照)
      billHandleAmount: '@integer(1000,6000)', // 账单实收金额(快照)
      refundAbleAmount: '@integer(1000,6000)', // 可退款金额
      outTradeNo: '@id', // 流水号(外部订单号32位)
      billBackAmount: '@integer(1000,6000)', // 返款金额
      billFeeAmount: '@integer(1000,6000)', // 账单手续费
      billTurnPreAmount: '@integer(1000,6000)', // 转预付款金额
      id: '@id',
      deleteFlag: '@datetime', // 删除标识时间戳
      createBy: '@cname', // 创建人
      createTime: '@date("yyyy-MM-dd")', // 创建时间
      updateBy: '@cname', // 更新人
      updateTime: '@date("yyyy-MM-dd")' // 更新人
    })
  },
  {
    url: '/cbd-api-project/mis/payment_refund/modify',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/delete',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/cancel',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/get_list_before_add',
    method: 'get',
    response: resData(
      mockList(
        {
          'billId|1-5': 5, // 账单id
          'paymentId': '@id', // 收付款单id
          'paymentNum': '@id', // 收付款单编号
          'expenseItemName': '@ctitle', // 费用项目名字
          'paymentDays': '@date', // 账期
          'expensePeriod': '@date' + '~' + '@date', // 费用期间
          'amount': '@integer(1000,6000)', // 已收金额
          'refundAmount': '@integer(1000,6000)', // 已退金额
          'refundAbleAmount': '@integer(1000,6000)', // 可退金额
          'payDay': '@date', // 到账日期
          'payMethodStr': '@ctitle', // 支付方式
          'updateBy': '@cname', // 操作人
          'updateTime': '@date', // 操作时间
          'billOutput': {
            'id|1-10': 10, // 业务主键
            'billNum': '@id', // 账单编号
            'billType': '@pick([1,2])', // 账单类型1收款单2付款单,@seeBillTypeEnum
            'projectId': '@id', // 项目id
            'projectName': '@ctitle', // 项目名字
            'merchantId': '@id', // 商户id
            'merchantName': '@ctitle', // 商户名字
            'storeId': '@id', // 商铺id
            'storeName': '@ctitle', // 商铺名字
            'expenseItemsId': '@id', // 费用项目id
            'expenseItemsName': '@ctitle', // 费用项目名称
            'contractCode': '@id', // 合同编号
            'billSourceType': '@pick([1,2])', // 账单来源1合同2手工录入,,@seeBillSourceTypeEnum
            'businessStat': '@pick([0,1,2,3,4,5])', // 业务状态0草稿1待确认2未支付3已作废4部分支付5已结清,@seeBusinessStatEnum
            'paymentDays': '@date', // 账期
            'expensePeriod': '@date' + '~' + '@date', // 费用期间
            'startAt': '@date("yyyy-MM-dd")', // 费用开始日期
            'endAt': '@date("yyyy-MM-dd")', // 费用结束日期
            'billCreateAt': '@date("yyyy-MM-dd")', // 账单生成日期(应收日)
            'rebateAmount': '@date("yyyy-MM-dd")', // 返款金额
            'advanceAmount': '@integer(1000,6000)', // 预付款
            'feeAmount': '@integer(1000,6000)', // 手续费
            'receivableAmount': '@integer(1000,6000)', // 应收金额
            'deductionAmount': '@integer(1000,6000)', // 抵扣金额
            'collectionAndPaymentAmount': '@integer(1000,6000)', // 已收已付金额
            'amountNotReceived': '@integer(1000,6000)' // 未收金额
          }
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/mis/payment_refund/commit',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/audit_before',
    method: 'post',
    response: mock({
      'code': 200,
      'msg': 'mock拦截成功',
      'data|1-10': [
        {
          'processInstanceId|+1': 1, // 流程实例ID
          'taskId|+1': 1 // 任务ID
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/mis/payment_refund/audit',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/mis/payment_refund/cancel_audit',
    method: 'post',
    response: resData({})
  }
]);
