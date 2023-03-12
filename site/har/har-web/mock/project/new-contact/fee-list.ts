import { create, resData } from '../../utils';
import { mock } from 'mockjs';
//货品组下拉
export default create([
  {
    url: '/cbd-api-project/formal/contract/pay/paymentInfos',
    method: 'GET',
    response: resData(
      mock([
        {
          expenseType: '租金',
          expenseKeyCode: '202212270001',
          payments: [
            {
              expenseType: 1,
              paymentMethod: 2,
              paymentPeriod: '@date',
              paymentPeriodStart: '@date',
              paymentPeriodEnd: '@date',
              statementDay: '@date',
              contractPayment: 184985.01,
              hasTax: '@pick([0,1])',
              taxRatio: '@pick([1,2,3,4,5,6,7])',
              taxExcludePayment: 30060,
              taxPayment: 20430,
              freePayment: 184300,
              actPayment: 160550
            }
          ]
        },
        {
          expenseType: '物业费',
          expenseKeyCode: '202212270002',
          payments: [
            {
              expenseType: 1,
              paymentMethod: 2,
              paymentPeriod: '@date',
              paymentPeriodStart: '@date',
              paymentPeriodEnd: '@date',
              statementDay: '@date',
              contractPayment: 182985.01,
              hasTax: '@pick([0,1])',
              taxRatio: '@pick([1,2,3,4,5,6,7])',
              taxExcludePayment: 35000,
              taxPayment: 20200,
              freePayment: 18200,
              actPayment: 16300
            }
          ]
        },
        {
          expenseType: '保证金',
          expenseKeyCode: '202212270003',
          payments: [
            {
              expenseType: 1,
              paymentMethod: 2,
              paymentPeriod: '@date',
              paymentPeriodStart: '@date',
              paymentPeriodEnd: '@date',
              statementDay: '@date',
              contractPayment: 30000,
              hasTax: '@pick([0,1])',
              taxRatio: '@pick([1,2,3,4,5,6,7])',
              taxExcludePayment: 3000,
              taxPayment: 2000,
              freePayment: 1800,
              actPayment: 1600
            }
          ]
        }
      ])
    )
  }
]);
