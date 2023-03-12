import { create, mockList, mockList1, resData } from '../utils';
import { mock } from 'mockjs';
import common from './common';
import contactList from '../project/new-contact/contact-list';
import contactMain from '../project/new-contact/contact-main';
import contactShop from '../project/new-contact/contract-shop';
import feeList from '../project/new-contact/fee-list';
import contactContent from '../project/new-contact/contact-content';
import costInfo from '../project/new-contact/cost-info';
import costSetting from '../project/finance-manage/cost-setting';
import bill from '../project/finance-manage/bill';
import deposit from '../project/finance-manage/deposit';
import collectPay from '../project/finance-manage/collect-pay';
import collectPayRefund from '../project/finance-manage/collect-pay-refund';
import examine from './examine';
import worker from './worker';
import invoiceRecord from '../project/finance-manage/invoice-record';
import energyEquipment from '../project/estateManage/energyEquipment';

import contractBill from './contract-bill';
import merchantEmployee from './merchant-employee';
import messageManage from './message-manage';
import sale from './sale';
export default create([
  ...common(),
  ...contactList(),
  ...contactMain(),
  ...contactShop(),
  ...feeList(),
  ...contactMain(),
  ...contactContent(),
  ...costInfo(),
  ...costSetting(),
  ...examine(),
  ...contractBill(),
  ...merchantEmployee(),
  ...messageManage(),
  ...sale(),
  ...worker(),
  ...deposit(),
  ...bill(),
  ...collectPay(),
  ...collectPayRefund(),
  ...invoiceRecord(),
  ...energyEquipment(),
  //获取用户签名
  {
    url: '/cbd-api-project/system/user/signature',
    method: 'get',
    response: resData(
      mock({
        id: '',
        name: '',
        type: '',
        format: '',
        size: '',
        previewAddress: ''
      })
    )
  },
  {
    url: '/cbd-api-project/merchant/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'status|1': [1, 2],
          'name': '@cname',
          'linkman': '@cname',
          'linkTel': /1\d{0,10}/,
          'sceneId': '@id',
          'sceneName': '@ctitle',
          'typeId': '@id',
          'typeName': '@ctitle',
          'purposeId': '@id',
          'purposeName': '@title',
          'principal': '@cname',
          'companyName': '@ctitle',
          'legalPerson': '@cname'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/merchant/info/:merchantId',
    method: 'get',
    response: resData(
      mock({
        basicInfo: {
          'id': '@id',
          'code': '@id',
          'name': '@cname',
          'linkman': '@cname',
          'linkTel': /1\d{0,10}/,
          'sceneIds': [1],
          'sceneNames': ['显示'],
          'typeId': '@id',
          'typeName': '@ctitle',
          'purposeId': '@id',
          'purposeName': '@ctitle',
          'requireArea': '@integer(1,100)',
          'provinceCode': '110000',
          'cityCode': '110100',
          'districtCode': '110101',
          'provinceName': '北京市',
          'cityName': '市区',
          'districtName': '昌平区',
          'address': '@city(true)',
          'remark': '@csentence',
          'status|1': [1, 2]
        },
        businessInfo: {
          principal: '@cname',
          principalId: '262265626626266626',
          principalIdFrontAttachment: {
            previewAddress: '@image',
            type: 'image/png'
          },
          principalIdBackAttachment: {
            previewAddress: '@image',
            type: 'image/png'
          },
          principalRegisterAddress: '@city(true)',
          companyName: '@ctitle',
          legalPerson: '@cname',
          uscCode: '@id',
          businessLicenseAttachment: {
            previewAddress: '@image',
            type: 'image/png'
          }
        }
      })
    )
  },
  {
    url: '/cbd-api-project/merchant/updateInit/:merchantId',
    method: 'post',
    response: resData(
      mock({
        'id|+1': 1,
        'code': '@id',
        'status|1': [1, 2],
        'name': '@cname',
        'linkman': '@cname',
        'linkTel': /1\d{0,10}/,
        'sceneId': '@id',
        'typeId': '@id',
        'purposeId': '@id',
        'principal': '@cname',
        'companyName': '@ctitle',
        'legalPerson': '@cname',
        'provinceCode': '110000',
        'cityCode': '110100',
        'districtCode': '110101',
        'address': '@ctitle',
        'remark': '@ctitle',
        'requireArea': 100,
        'principalId': '34556345345345',
        'principalIdFrontAttachment': ['@image'],
        'principalIdBackAttachment': ['@image'],
        'businessLicenseAttachment': ['@image'],
        'principalRegisterAddress': '@ctitle',
        'uscCode': '23423423423423'
      })
    )
  },
  {
    url: '/cbd-api-project/merchant/update/:merchantId/:status',
    method: 'put',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/merchant/checkParam',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/print/template/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'name': '@ctitle'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/print/template/modify',
    method: 'put',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/print/template/info/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        code: '@id',
        name: '@ctitle',
        type: 2,
        logoPreUrl:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F23f17e4aaa6cb3efc5811b3fa4926445bad168857e3ef-vnIVkW_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667012359&t=d984eac2832df6c4cd97cc585cc6c347',
        printCopies: '@pick([1,2,3])',
        reminder: '@ctitle',
        qrCodePreUrl:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F23f17e4aaa6cb3efc5811b3fa4926445bad168857e3ef-vnIVkW_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667012359&t=d984eac2832df6c4cd97cc585cc6c347',
        columns: [
          {
            id: '@id',
            parentId: '@id',
            columnKey: '@title',
            columnName: '表头信息',
            requireState: '@pick([1,2])',
            level: '1',
            defaultValue: '@ctitle',
            checked: '@pick([1,2])',
            children: [
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '商场名称',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              },
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '店铺名称',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              },
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '店铺号',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              }
            ]
          },
          {
            id: '@id',
            parentId: '@id',
            columnKey: '@title',
            columnName: '优惠信息',
            requireState: '@pick([1,2])',
            level: '1',
            defaultValue: '@ctitle',
            checked: '@pick([1,2])',
            children: [
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '优惠信息',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              },
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '会员信息',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              }
            ]
          },
          {
            id: '@id',
            parentId: '@id',
            columnKey: '@title',
            columnName: '账单信息',
            requireState: '@pick([1,2])',
            level: '1',
            defaultValue: '@ctitle',
            checked: '@pick([1,2])',
            children: [
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '终端号',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              },
              {
                id: '@id',
                parentId: '@id',
                columnKey: '@title',
                columnName: '交易金额',
                requireState: '@pick([1,2])',
                level: '2',
                defaultValue: '@ctitle',
                checked: '@pick([1,2])'
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/receipt/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'accountReceivableCode': '@id',
          'code': '@id',
          'id': '@id',
          'type|1': [0, 1, 2, 3],
          'paymentMethod|1': [1, 2, 3],
          'collectionDate': '@date',
          'actualAmount': '@integer',
          'amountReceived': '@integer',
          'status|1': [0, 1, 2, 3],
          'auditTime': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/receipt/info/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'accountReceivableCode': '@id',
        'code': '@id',
        'typeName': '@ctitle',
        'paymentMethod|1': [1, 2, 3],
        'collectionDate': '@date',
        'amountReceived': '@integer',
        'channelAmount': '@integer',
        'channelFee': '@integer',
        'status|1': [1, 2, 3],
        'auditTime': '@date',
        'principal': '@cname',
        'merchantCompanyName': '@ctitle',
        'contractCode': '@id',
        'attachmentList': [
          {
            'id|+1': 1,
            'name': '@ctitle',
            'type': '@ctitle',
            'size': '@integer',
            'previewAddress': '@title'
          }
        ],
        'permissions': {
          history: true,
          permissions: true,
          approvalProcessBusinessVos: [
            {
              'departmentId': '@id',
              'departmentName': '@ctitle',
              'userId': '@id',
              'userName': '@cname',
              'createTime': '@date',
              'approvalLevel': '@integer',
              'result|1': [1, 2],
              'opinion': '@ctitle'
            }
          ]
        }
      })
    )
  },
  {
    url: '/cbd-api-project/receipt/audit',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/receipt/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/lease/record/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'estateCode': '@id',
          'status|1': [0, 1, 2, 3],
          'projectName': '@ctitle',
          'buildingName': '@ctitle',
          'floorName': '@ctitle',
          'houseNum': '@id',
          'contractCode': '@id',
          'merchantName': '@cname',
          'ascriptionCompanyName': '@cname',
          'areaName': '@cname',
          'received': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/lease/record/operation',
    method: 'get',
    response: resData(
      mock({
        info: {
          merchantName: '@ctitle',
          principal: '@ctitle',
          provinceCode: '',
          provinceName: '@ctitle',
          cityCode: '',
          cityName: '@ctitle',
          districtCode: '',
          districtName: '@ctitle',
          address: '@ctitle',
          purpose: '@ctitle',
          scene: '@ctitle',
          costType: '@ctitle'
        },
        summaryList: [
          {
            fundType: '@ctitle',
            contractAmount: '@integer',
            paidInAmount: '@integer',
            totalArrears: '@integer',
            arrearsDuration: '@integer'
          }
        ],
        detailsList: [
          {
            'id': '@id',
            'bond': '@integer',
            'status|1': [0, 1, 2, 3],
            'payableDate': '@date',
            'paidInDate': '@date'
          }
        ],
        billList: [
          {
            costType: '@ctitle',
            totalAmount: '@integer',
            billDetailList: [
              {
                'id|+1': 1,
                'billCycle|1': [0, 1, 2, 3],
                'actualAmount': '',
                'status|1': [0, 1, 2, 3],
                'billLastRepaymentDate': '@date',
                'paymentTime': '@date'
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/lease/record/record',
    method: 'get',
    response: resData(
      mock({
        bondList: [
          {
            costType: '@ctitle',
            totalAmount: '@integer',
            billList: [
              {
                'id|+1': 1,
                'code': '@integer',
                'actualAmount': '@integer',
                'billLastRepaymentDate': '@date',
                'paymentTime': '@date',
                'amountReceived': '@integer'
              }
            ]
          }
        ],
        billList: [
          {
            costType: '@ctitle',
            totalAmount: '@integer',
            billDetailList: [
              {
                'id|+1': 1,
                'billCycle|1': [0, 1, 2, 3],
                'code': '@integer',
                'actualAmount': '@integer',
                'amountReceived': '@integer',
                'billLastRepaymentDate': '@date',
                'paymentTime': '@date'
              },
              {
                'id|+1': 1,
                'billCycle|1': [0, 1, 2, 3],
                'code': '@integer',
                'actualAmount': '@integer',
                'amountReceived': '@integer',
                'billLastRepaymentDate': '@date',
                'paymentTime': '@date'
              }
            ]
          },
          {
            costType: '@ctitle',
            totalAmount: '@integer',
            billDetailList: [
              {
                'id|+1': 1,
                'billCycle|1': [0, 1, 2, 3],
                'code': '@integer',
                'actualAmount': '@integer',
                'amountReceived': '@integer',
                'billLastRepaymentDate': '@date',
                'paymentTime': '@date'
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/lease/record/basicInfo',
    method: 'get',
    response: resData(
      mock({
        houseNum: '@integer',
        projectName: '@ctitle',
        buildingName: '@ctitle',
        floorName: '@ctitle',
        estateArea: '@integer',
        categoryName: '@ctitle',
        estateCode: '@integer',
        provinceCode: '@id',
        provinceName: '@ctitle',
        cityCode: '@id',
        cityName: '@ctitle',
        districtCode: '@id',
        districtName: '@ctitle',
        address: '@ctitle',
        purpose: '@ctitle',
        scene: '@ctitle',
        costType: '@ctitle'
      })
    )
  },
  {
    url: '/cbd-api-project/lease/record/contractInfo',
    method: 'get',
    response: resData(
      mock({
        basicInfo: {
          'ascriptionCompanyName': '@ctitle',
          'code': '@integer',
          'status|1': [0, 1, 2, 3],
          'schemeCode': '@integer',
          'periodStart': '@integer',
          'periodEnd': '@date',
          'provinceCode': '@integer',
          'provinceName': '@ctitle',
          'cityCode': '@integer',
          'cityName': '@ctitle',
          'districtCode': '@integer',
          'districtName': '@ctitle',
          'address': '@ctitle',
          'remark': '@ctitle',
          'files': [
            {
              'id|+1': '1',
              'name': '@ctitle',
              'type': '@ctitle',
              'size': '@integer',
              'previewAddress': '@title'
            }
          ]
        },
        lesseeInfo: {
          merchantName: '@ctitle',
          provinceCode: '@integer',
          provinceName: '@ctitle',
          cityCode: '@integer',
          cityName: '@ctitle',
          districtCode: '@integer',
          districtName: '@ctitle',
          address: '@ctitle',
          principal: '@ctitle',
          principalId: '@integer',
          principalRegisterAddress: '@ctitle',
          companyName: '@ctitle',
          legalPerson: '@ctitle',
          uscCode: '@integer'
        },
        contractInfo: {
          bond: '@integer',
          costType: '@ctitle',
          houseNum: '@integer',
          projectName: '@ctitle',
          buildingName: '@ctitle',
          floorName: '@ctitle',
          estateArea: '@integer',
          categoryName: '@ctitle',
          estateCode: '@integer',
          provinceCode: '@integer',
          provinceName: '@ctitle',
          cityCode: '@integer',
          cityName: '@ctitle',
          districtCode: '@integer',
          districtName: '@ctitle',
          address: '@ctitle',
          purpose: '@ctitle',
          scene: '@ctitle',
          contractBill: {
            totalAmount: '@integer',
            billList: [
              {
                totalAmount: '@integer',
                costType: '@ctitle',
                billDetailList: [
                  {
                    'id|1': 1,
                    'billLastRepaymentDate': '@date',
                    'billCycle|1': [0, 1, 2, 3],
                    'actualAmount': '@integer'
                  },
                  {
                    'id|+1': '@id',
                    'billLastRepaymentDate': '@date',
                    'billCycle|1': [0, 1, 2, 3],
                    'actualAmount': '@integer'
                  }
                ]
              }
            ]
          }
        },
        estateInfo: [
          {
            doorPlate: '@ctitle',
            projectName: '@ctitle',
            buildingName: '@ctitle',
            floorName: '@ctitle',
            acreage: '@ctitle',
            categoryName: '@ctitle',
            code: '@ctitle',
            provinceCode: '@ctitle',
            provinceName: '@ctitle',
            cityCode: '@ctitle',
            cityName: '@ctitle',
            districtCode: '@ctitle',
            districtName: '@ctitle',
            address: '@ctitle',
            leasePurposeName: '@ctitle',
            manageName: '@ctitle',
            estateBillList: [
              {
                costType: '@ctitle',
                totalAmount: 5000,
                payScheme: 1,
                chargingRule: {
                  type: 1,
                  method: '@pick([1,2])',
                  amount: '@integer',
                  commissionRatio: '@integer',
                  isGuarantee: '@pick([0,1])',
                  keepCommission: '@pick([0,1])',
                  ruleDay: '@integer',
                  expireDay: '@integer',
                  bondRatio: '@integer'
                },
                expireRules: [
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  },
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  }
                ],
                billDetailList: [
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 231,
                    discountAmount: 2331,
                    actualAmount: 23132
                  },
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 231,
                    discountAmount: 2331,
                    actualAmount: 23132
                  }
                ]
              },
              {
                costType: '@ctitle',
                totalAmount: 5000,
                payScheme: 3,
                chargingRule: {
                  type: 2,
                  method: '@pick([1,2])',
                  amount: '@integer',
                  commissionRatio: '@integer',
                  isGuarantee: 0,
                  keepCommission: 0,
                  ruleDay: '@integer',
                  expireDay: '@integer',
                  bondRatio: '@integer'
                },
                expireRules: [
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  },
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  }
                ],
                billDetailList: [
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 23111,
                    discountAmount: 23131,
                    actualAmount: 341
                  },
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 2331,
                    discountAmount: 235631,
                    actualAmount: 2365132
                  }
                ]
              },
              {
                costType: '@ctitle',
                totalAmount: 5000,
                payScheme: 3,
                chargingRule: {
                  type: 2,
                  method: '@pick([1,2])',
                  amount: '@integer',
                  commissionRatio: '@integer',
                  isGuarantee: 1,
                  keepCommission: 0,
                  ruleDay: '@integer',
                  expireDay: '@integer',
                  bondRatio: '@integer'
                },
                expireRules: [
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  },
                  {
                    id: '@id',
                    contractCode: '@id',
                    schemeCode: '@id',
                    startDay: 10,
                    endDay: 20,
                    overduePeriodDay: 3,
                    overdueRatio: 5,
                    bondPeriodDay: 20,
                    bondRatio: 8,
                    order: '@integer',
                    projectId: '@integer'
                  }
                ],
                billDetailList: [
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 23111,
                    discountAmount: 23131,
                    actualAmount: 341
                  },
                  {
                    billLastRepaymentDate: '@ctitle',
                    billCycle: '@ctitle',
                    totalAmount: 2331,
                    discountAmount: 235631,
                    actualAmount: 2365132
                  }
                ]
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/common/assets/selectList',
    method: 'get',
    response: resData(
      mock([
        {
          'label': '@ctitle',
          'value': 1,
          'level|+1': 1,
          'extra': {
            id: 1,
            acreage: 300,
            useAcreage: 500
          }
        },
        {
          'label': '@ctitle',
          'value': 2,
          'level|+1': 1,
          'extra': {
            id: 2,
            acreage: 300,
            useAcreage: 500
          }
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/workOrder/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'workNo': '@id',
          'reportTime': '@date',
          'status|1': [0, 1, 2],
          'faultType|1': [129, 130, 131],
          'reporterName': '@cname',
          'chargeType|1': [0, 1],
          'expense|1': [100, 200],
          'handlerName': '@cname',
          'checkStatus|1': [0, 1],
          'finishTime': '@date',
          'consumingHours|1': [10, 20]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/workOrder/info/updateInit/:id',
    method: 'get',
    response: resData(
      mock({
        'id': '@integer',
        'faultTypeId|1': [129, 130, 131],
        'location': '@string',
        'reporter': '@integer',
        'reportTime': '@date',
        'mark': '@string',
        'handlerInfos': [
          {
            'id': '@integer',
            'delFlag|1': [0, 1],
            'checkerName': '@string',
            'handler': '@cid',
            'handlerTime': '@date',
            'status': 1,
            // 'status|1': [1, 2],
            'charge_type|1': [0, 1],
            'expense': 10,
            'remark': '@string'
          }
        ],
        'checkInfos': [
          {
            'id': '@integer',
            'workHandlerId': '@integer',
            'delFlag|1': [0, 1],
            'checkerName': '@cname',
            'checker': '@cid',
            'checkTime': '@date',
            'status|1': [0, 1],
            'remark': '@string'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/workOrder/addOrder',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/workOrder/updateInfo',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/workOrder/:dataType/:id',
    method: 'delete',
    response: resData({})
  },
  {
    url: '/cbd-api-project/workOrder/statistics',
    method: 'get',
    response: resData({
      totalWorkOrderNum: '@integer',
      totalHandlingNum: '@integer',
      totalAcceptNum: '@integer',
      totalRejectNum: '@integer',
      statistics: {
        dates: [
          '2022-09-01',
          '2022-09-02',
          '2022-09-03',
          '2022-09-04',
          '2022-09-05',
          '2022-09-06'
        ],
        handlingNums: [18203, 23489, 29034, 104970, 131744, 630230],
        acceptNums: [18203, 23489, 29034, 104970, 131744, 630230],
        rejectNums: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    })
  },
  {
    url: '/cbd-api-project/tenement/receivableBillList',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 100001,
          'code': '@id',
          'contractCode': '@id',
          'merchantName': '@ctitle',
          'billCycleStartDate': '@date',
          'actualAmount|1': [129, 130, 131],
          'amountUnreceived|1': [10, 20]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/tenement/receivableBill/info/:id',
    method: 'get',
    response: resData({
      'id': '@id',
      'merchantName': '@cname',
      'storeNames': '@cname',
      'estateNames': '@cname',
      'contractCode': '@id',
      'delayingAmount|1': [129, 130, 131],
      'amountUnreceived|1': [12, 13, 14],
      'maker': '@cname',
      'tips': '@ctitle',
      'details': [
        {
          id: '@id',
          typeName: '@ctitle',
          billCycleStartDate: '@date',
          actualAmount: 100,
          amountUnreceived: 10
        },
        {
          id: '@id',
          typeName: '@ctitle',
          billCycleStartDate: '@date',
          actualAmount: 100,
          amountUnreceived: 10
        },
        {
          id: '@id',
          typeName: '@ctitle',
          billCycleStartDate: '@date',
          actualAmount: 100,
          amountUnreceived: 10
        },
        {
          id: '@id',
          typeName: '@ctitle',
          billCycleStartDate: '@date',
          actualAmount: 100,
          amountUnreceived: 10
        }
      ],
      'totalActualAmount': 1009,
      'totalAmountUnreceived': 100
    })
  },
  {
    url: '/cbd-api-project/store/extra/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'linkman': '@cname',
          'linkTel': '@integer',
          'acreage': 200,
          'openTimeDesc': '@date("yyyy-MM-dd")',
          'feature': '@csentence',
          'addressDetail': '@city(true)',
          'remark': '@csentence',
          'storeStatus': '@pick([0,1,2,3])',
          'operatingStatus': '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/extra/info/:id',
    method: 'get',
    response: resData(
      mock({
        name: '@ctitle',
        customerServiceTel: '@integer',
        feature: '@ctitle',
        status: '@pick([1,2])',
        relationStores: [
          {
            'id|+1': ' @id',
            'name': '@ctitle'
          },
          {
            'id|+1': ' @id',
            'name': '@ctitle'
          }
        ],
        provinceCode: '@integer',
        provinceName: '@province',
        cityCode: '@integer',
        cityName: '@city',
        districtCode: '@city',
        districtName: '@ctitle',
        address: '@region()',
        longitude: '@integer',
        latitude: '@integer',
        locationType: '@pick([1,2,3])',
        scopes: [{}],
        openTime: {
          weeks: [],
          durations: [
            {
              week: [],
              startTime: '@datetime',
              endTime: '@datetime'
            }
          ],
          desc: '@ctitle',
          type: '@pick([1,2,3])'
        },
        storeLogoAttachments: [
          {
            type: '@ctitle',
            storePhotoAttachment: [
              {
                'id|+1': ' @id',
                'name': '@ctitle',
                'type': '@title',
                'size': '@integer',
                'previewAddress': '@title'
              }
            ]
          }
        ],
        operatingStatus: '@pick([1,2])'
      })
    )
  },
  {
    url: '/cbd-api-project/store/extra/updateInit/:id',
    method: 'get',
    response: resData(
      mock({
        name: '@ctitle',
        customerServiceTel: '@integer',
        feature: '@ctitle',
        status: '@pick([1,2])',
        relationStores: [
          {
            'id|+1': ' @id',
            'name': '@ctitle'
          },
          {
            'id|+1': ' @id',
            'name': '@ctitle'
          }
        ],
        provinceCode: '@integer',
        provinceName: '@province',
        cityCode: '@integer',
        cityName: '@city',
        districtCode: '@city',
        districtName: '@ctitle',
        address: '@region()',
        longitude: '@integer',
        latitude: '@integer',
        locationType: '@pick([1,2,3])',
        scopes: [{}],
        openTime: {
          weeks: [],
          durations: [
            {
              week: [],
              startTime: '@datetime',
              endTime: '@datetime'
            }
          ],
          desc: '@ctitle',
          type: '@pick([1,2,3])'
        },
        storeLogoAttachments: [
          {
            type: '@ctitle',
            storePhotoAttachment: [
              {
                'id|+1': ' @id',
                'name': '@ctitle',
                'type': '@title',
                'size': '@integer',
                'previewAddress': '@title'
              }
            ]
          }
        ],
        operatingStatus: '@pick([1,2])',
        storePhotos: [
          {
            type: '@ctitle',
            storePhotoAttachments: [
              {
                'id|+1': ' @id',
                'name': '@ctitle',
                'type': '@title',
                'size': '@integer',
                'previewAddress': '@title'
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/store/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'linkman': '@cname',
          'linkTel': '@integer',
          'acreage|100-200': 200,
          'openTimeDesc': '@date("yyyy-MM-dd")',
          'feature': '@csentence',
          'addressDetail': '@city(true)',
          'remark': '@csentence',
          'storeStatus': '@pick([0,1,2,3])',
          'status': '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/basic/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/store/basic/info/:id',
    method: 'get',
    response: resData(
      mock({
        info: {
          name: '@ctitle',
          linkman: '@cname',
          linkTel: '@integer',
          purposeId: 2,
          sceneId: 2,
          remark: '@csentence',
          shopPhotoAttachments: [
            {
              'id|+1': ' @id',
              'name': '@ctitle',
              'type': '@title',
              'size|2000-5000': '@integer',
              'previewAddress': '@title'
            },
            {
              'id|+1': ' @id',
              'name': '@ctitle',
              'type': '@title',
              'size|2000-5000': '@integer',
              'previewAddress': '@title'
            }
          ]
        },
        estateInfos: [
          {
            'estateAssets': [],
            'id': '@id',
            'projectId': '@id',
            'projectName': '@ctitle',
            'buildingId': '@id',
            'buildingName': '@ctitle',
            'floorId': '@id',
            'floorName': '@ctitle',
            'doorPlate|+1': '@integer',
            'categoryId': '@id',
            'categoryName': '@ctitle',
            'code': '@id',
            'acreage': '@integer',
            'provinceCode': '@id',
            'provinceName': '@province',
            'cityCode': '@id',
            'cityName': '@city',
            'districtCode': '@id',
            'districtName': '@ctitle',
            'address': '@ctitle'
          }
        ],
        businessInfo: {
          'businessLicenseAttachment': {
            'id|+1': ' @id',
            'name': '@ctitle',
            'type': '@title',
            'size': '@integer',
            'previewAddress': '@title'
          },
          'idCardAttachments|2': [
            {
              'id|+1': ' @id',
              'name': '@ctitle',
              'type': '@title',
              'size': '@integer',
              'previewAddress': '@title'
            }
          ],
          'realName': '@cname',
          'idCardNum': '@id',
          'registerAddress': '@ctitle',
          'companyName': '@ctitle',
          'legalPerson': '@cname',
          'uscCode': '@id',
          'otherCertificateAttachments|1-5': [
            {
              'id|+1': ' @id',
              'name': '@ctitle',
              'type': '@title',
              'size': '@integer',
              'previewAddress': '@title'
            }
          ]
        },
        storeStatus: 0,
        hasApproval: true
      })
    )
  },
  {
    url: '/cbd-api-project/common/store/select',
    method: 'get',
    response: resData(
      mock([
        {
          value: 1,
          label: '@ctitle'
        },
        {
          value: 2,
          label: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/store/product/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'classifyName': '@ctitle',
          'salesVolume': 3000,
          'stockNum': 5300,
          'updateTime': '@date("yyyy-MM-dd")',
          'status': '@pick([1,2,3])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/product/choiceList',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': '@id',
          'prdId': 1,
          'names': '@ctitle',
          'name': '@ctitle',
          'classifyName': '@ctitle',
          'brandName': '@ctitle',
          'unitName': '@ctitle',
          'picCode': '@ctitle',
          'code': '@ctitle',
          'barcode': '@ctitle',
          'scribingPrice': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/product/info/:id',
    method: 'get',
    response: resData(
      mock({
        id: 1,
        name: '@cname',
        classifyId: '@id',
        classifyName: '@ctitle',
        brandId: '@id',
        brandName: '@ctitle',
        unitId: '@id',
        unitName: '@ctitle',
        code: '@title',
        status: '@pick([1,2,3])',
        coverCode: [
          {
            id: '@id',
            name: 'cname',
            type: '@title',
            size: 20000,
            previewAddress: '@title'
          }
        ],
        detailsCodes: [
          {
            id: '@id',
            name: 'cname',
            type: '@title',
            size: 20000,
            previewAddress: '@title'
          }
        ],
        weights: [
          {
            id: '@id',
            names: '@cname',
            code: '@integer',
            barcode: '@ctitle',
            scribingPrice: 3000,
            salePrice: 3000,
            picCode: [
              {
                id: '@id',
                name: 'cname',
                type: '@title',
                size: 20000,
                previewAddress: '@title'
              }
            ]
          }
        ],
        instructions: '',
        graphicDetails: ''
      })
    )
  },
  {
    url: '/cbd-api-project/store/product-stock/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'storeProductId': '@id',
          'productName': '@ctitle',
          'classifyName': '@ctitle',
          'availableNum': '@integer',
          'amount': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/product-stock/info/:storeProductId',
    method: 'get',
    response: resData(
      mock({
        productInfo: {
          storeProductId: '@id',
          name: '@cname',
          classifyName: '@ctitle',
          brandName: '@ctitle',
          unitName: '@ctitle',
          status: '@pick([1,2,3])',
          coverPic: [
            {
              id: '@id',
              name: 'cname',
              type: '@title',
              size: 20000,
              previewAddress: '@title'
            }
          ],
          detailPic: [
            {
              id: '@id',
              name: 'cname',
              type: '@title',
              size: 20000,
              previewAddress: '@title'
            }
          ]
        },
        skuStockInfoList: [
          {
            storeProductId: '@id',
            storeProductWeightId: '@id',
            sku: '@ctitle',
            skuPic: [
              {
                id: '@id',
                name: 'cname',
                type: '@title',
                size: 20000,
                previewAddress: '@title'
              }
            ],
            skuCode: '@integer',
            barcode: '@integer',
            scribingPrice: '@integer',
            salePrice: '@integer',
            availableNum: '@integer',
            amount: '@integer'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/store/product-in-out-order/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'amount': '@integer',
          'orderCode': '@id',
          'type': '@pick([1,2])',
          'code': '@id',
          'createBy': '@cname',
          'createTime': '@datetime',
          'way': '@pick([1,2])',
          'status': '@pick([1,2,3])',
          'num': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/product-in-out-order/info/:id',
    method: 'get',
    response: resData(
      mock({
        baseInfo: {
          amount: '@integer',
          type: '@pick([1,2])',
          code: '@id',
          createBy: '@cname',
          createTime: '@datetime',
          way: '@pick([1,2])',
          status: '@pick([1,2,3])',
          num: '@integer'
        },
        inOutInfoList: [
          {
            productName: '@ctitle',
            classifyName: '@ctitle',
            brandName: '@ctitle',
            unitName: '@ctitle',
            sku: '@ctitle',
            num: '@integer'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/store/product-stock/single-product-list',
    method: 'get',
    response: resData(
      mockList(
        {
          type: '@pick([1,2])',
          code: '@id',
          createBy: '@cname',
          createTime: '@datetime',
          sku: '@ctitle',
          way: '@pick([1,2])',
          status: '@pick([1,2,3])',
          num: '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/store/product-stock/all-info',
    method: 'get',
    response: resData(
      mockList(
        {
          storeProductId: 23,
          name: '@cname',
          classifyName: '@ctitle',
          brandName: '@ctitle',
          unitName: '@ctitle',
          storeProductWeightId: '@id',
          sku: '@ctitle',
          skuPic: '@title',
          skuCode: '@integer',
          barcode: '@integer',
          scribingPrice: '@integer',
          salePrice: '@integer',
          availableNum: '@integer',
          amount: '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/estate/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/update',
    method: 'put',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/importSave/:resourceId',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/updateInit/:estateId',
    method: 'get',
    response: resData(
      mock({
        categoryId: '@id',
        companyId: '@id',
        areaId: '@id',
        projectId: '@id',
        buildingId: '@id',
        floorId: '@id',
        acreage: '@integer',
        provinceCode: '@',
        provinceName: '@',
        cityCode: '@',
        cityName: '@',
        districtCode: '@',
        districtName: '@',
        address: '@address',
        attachments: [],
        id: '@id',
        doorPlate: '@integer',
        code: '@integer',
        categoryName: '@ctitle',
        projectName: '@ctitle',
        buildingName: '@ctitle',
        floorName: '@ctitle',
        status: '@pick([1,2,3,4])',
        useAcreage: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/estate/importPreview/:resourceId',
    method: 'get',
    response: resData(
      mock({
        importList: [
          {
            'failReason': '@ctitle',
            'index|+1': 1,
            'projectId|+1': 1,
            'projectName': '@ctitle',
            'buildingId': '@integer',
            'buildingName': '@ctitle',
            'floorId': '@integer',
            'floorName': '@ctitle',
            'categoryName': '@ctitle',
            'doorPlate': '@integer',
            'acreage': '@integer',
            'useAcreage': '@integer',
            'bottomDayRent': '@integer',
            'bottomMonthRent': '@integer',
            'datumDayRent': '@integer',
            'datumMonthRent': '@integer',
            'remark': '@ctitle'
          }
        ],
        importErrorList: [
          {
            'failReason': '@ctitle',
            'index|+1': 1,
            'projectId|+1': 1,
            'projectName': '@ctitle',
            'buildingId': '@integer',
            'buildingName': '@ctitle',
            'floorId': '@integer',
            'floorName': '@ctitle',
            'categoryName': '@ctitle',
            'doorPlate': '@integer',
            'acreage': '@integer',
            'useAcreage': '@integer',
            'bottomDayRent': '@integer',
            'bottomMonthRent': '@integer',
            'datumDayRent': '@integer',
            'datumMonthRent': '@integer',
            'remark': '@ctitle'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/building/delete/:id',
    method: 'delete',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/report/day-total',
    method: 'GET',
    response: resData(
      mock({
        orderNum: '@integer',
        orderMoney: '@integer',
        returnOrderNum: '@integer',
        returnOrderMoney: '@integer',
        discountOrderNum: '@integer',
        discountOrderMoney: '@integer',
        verificationCouponNum: '@integer',
        verificationCouponMoney: '@integer',
        verificationActivityNum: '@integer',
        verificationActivityMoney: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/report/day-chart',
    method: 'GET',
    response: resData(
      mock({
        chart: [
          { name: '@ctitle', value: 25 },
          { name: '@ctitle', value: 15 },
          { name: '@ctitle', value: 45 },
          { name: '@ctitle', value: 25 },
          { name: '@ctitle', value: 15 }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/report/store-top-list/:sort',
    method: 'GET',
    response: resData(
      mock([
        {
          storeName: '@ctitle',
          storeCode: '@id',
          sellNum: '@integer',
          SellMoney: '@integer'
        },
        {
          storeName: '@ctitle',
          storeCode: '@id',
          sellNum: '@integer',
          SellMoney: '@integer'
        },
        {
          storeName: '@ctitle',
          storeCode: '@id',
          sellNum: '@integer',
          SellMoney: '@integer'
        },
        {
          storeName: '@ctitle',
          storeCode: '@id',
          sellNum: '@integer',
          SellMoney: '@integer'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/report/product-top-list/:sort',
    method: 'GET',
    response: resData(
      mock([
        {
          productName: '@ctitle',
          sku: '@ctitle',
          barcode: '@id',
          totalNum: '@integer',
          totalMoney: '@integer'
        },
        {
          productName: '@ctitle',
          sku: '@ctitle',
          barcode: '@id',
          totalNum: '@integer',
          totalMoney: '@integer'
        },
        {
          productName: '@ctitle',
          sku: '@ctitle',
          barcode: '@id',
          totalNum: '@integer',
          totalMoney: '@integer'
        },
        {
          productName: '@ctitle',
          sku: '@ctitle',
          barcode: '@id',
          totalNum: '@integer',
          totalMoney: '@integer'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/report/venue-top-list/:sort',
    method: 'GET',
    response: resData(
      mock([
        {
          venueName: '@ctitle',
          week: '@time',
          sku: '@ctitle',
          totalNum: '@integer',
          totalMoney: '@integer'
        },
        {
          venueName: '@ctitle',
          week: '@time',
          sku: '@ctitle',
          totalNum: '@integer',
          totalMoney: '@integer'
        },
        {
          venueName: '@ctitle',
          week: '@time',
          sku: '@ctitle',
          totalNum: '@integer',
          totalMoney: '@integer'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/report/contractExpire',
    method: 'GET',
    response: resData(
      mock({
        datas: [
          {
            dataType: 1,
            num: '@pick([32,53,65,8,54,4,4])',
            statisticsDate: '@date'
          },
          {
            dataType: 2,
            num: '@pick([32,53,65,8,54,4,4])',
            statisticsDate: '@date'
          },
          {
            dataType: 3,
            num: '@pick([32,53,65,8,54,4,4])',
            statisticsDate: '@date'
          },
          {
            dataType: 4,
            num: '@pick([32,53,65,8,54,4,4])',
            statisticsDate: '@date'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/contract/expireList',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'contractCode': '@integer',
          'periodEnd': '@date',
          'availableDays': '@integer',
          'merchantCode': '@integer',
          'merchantName': '@ctitle',
          'linkman': '@cname',
          'linkTel': '@phoneNumber',
          'estateCodes': '@code',
          'estateCategories': '@31',
          'totalAcreage': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/product-attribute/classify-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'pid|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'allow|1': [true, false],
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'name': '@cname',
                'remark': '@ctitle',
                'allow|1': [true, false]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/product-attribute/classify-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/classify-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/classify-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: `/cbd-api-project/product-attribute/classify-info/:id`,
    method: 'get',
    response: resData({
      'id|+1': 1,
      'pid|+1': 1,
      'sort|+1': 1,
      'name': '@cname',
      'remark': '@ctitle'
    })
  },
  {
    url: '/cbd-api-project/product-attribute/specifications-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'pid|+1': '',
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'pid|+1': 1,
                'name': '@cname',
                'remark': '@ctitle'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: `/cbd-api-project/product-attribute/specifications-info/:id`,
    method: 'get',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'pid': '',
      'name': '@cname',
      'remark': '@ctitle',
      'allow|1': [true, false],
      'children|0-10': [
        {
          'id|+1': 1,
          'sort|+1': 1,
          'pid|+1': 1,
          'name': '@cname',
          'remark': '@ctitle',
          'allow|1': [true, false]
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/product-attribute/specifications-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/specifications-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/specifications-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/brand-list',
    method: 'GET',
    response: resData([
      {
        'id|+1': 1,
        'sort|+1': 1,
        'name': '@cname',
        'remark': '@ctitle',
        'file': [
          {
            'id|1': 1,
            'name': '@cname',
            'type': 'image',
            'size': 50025142142,
            'previewAddress':
              'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
          }
        ]
      }
    ])
  },
  {
    url: '/cbd-api-project/product-attribute/brand-info/:id',
    method: 'GET',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'name': '@cname',
      'remark': '@ctitle',
      'file': []
    })
  },
  {
    url: '/cbd-api-project/product-attribute/brand-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/brand-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/brand-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/units-list',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/product-attribute/units-add',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/units-update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/units-delete',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product-attribute/units-info/:id',
    method: 'GET',
    response: resData({
      'id|+1': 1,
      'sort|+1': 1,
      'name': '@cname'
    })
  },
  {
    url: '/cbd-api-project/product/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@cname',
          'classifyName': '@ctitle',
          'brandName': '@ctitle',
          'weightName': '@ctitle',
          'weightNum': 2,
          'unitName|1': ['种', '只', '支', '件'],
          'status|1': [0, 1],
          'updateTime': '@date'
        },
        {}
      )
    )
  },
  {
    url: '/cbd-api-project/product/save',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product/update',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product/updateStatus/:id',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/product/info/:id',
    method: 'get',
    response: resData({
      'id|+1': 1,
      'name': '@cname',
      'classifyName': '@ctitle',
      'brandName': '@ctitle',
      'weightName': '@ctitle',
      'unitName': '@ctitle',
      'status|1': [0, 1],
      'classifyId|+1': 1,
      'brandId|+1': 1,
      'unitId|+1': 1,
      'coverCode': {
        'id|+1': 1,
        'name': '@cname',
        'type': 'image',
        'size': 50161616,
        'previewAddress':
          'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
      },
      'detailsCodes|1-3': [
        {
          'id|+1': 1,
          'name': '@cname',
          'type': 'image',
          'size': 50161616,
          'previewAddress':
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
        }
      ],
      'specNames|3': [
        {
          'psnId|+1': 1,
          'specId|+1': 1,
          'name': '@cname',
          'specVals|2': [
            {
              'psvId|+1': 1,
              'name': '@cname'
            }
          ]
        }
      ],
      'weights|3': [
        {
          specValueIds: [],
          names: '@ctitle',
          picCode:
            'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          code: '@id',
          barcode: '@id',
          scribingPrice: '@integer(1,100)'
        }
      ],
      'instructions': '@sentence',
      'graphicDetails': '<p>测试富文本美容</p>'
    })
  },
  {
    url: '/cbd-api-project/common/product/attribute/classify',
    method: 'get',
    response: resData(
      mock({
        'list|1-5': [
          {
            'id': '@id',
            'pid|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'allow|1': [true, false],
            'children|0-10': [
              {
                'id': '@id',
                'sort|+1': 1,
                'name': '@cname',
                'remark': '@ctitle',
                'allow|1': [true, false]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/common/product/attribute/specifications',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'pid|+1': '',
            'children|0-10': [
              {
                'id|+1': 1,
                'sort|+1': 1,
                'pid|+1': 1,
                'name': '@cname',
                'remark': '@ctitle'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/common/product/attribute/brand',
    method: 'get',
    response: resData(
      mock({
        'list|1-3': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname',
            'remark': '@ctitle',
            'file': [
              {
                'id|1': 1,
                'name': '@cname',
                'type': 'image',
                'size': 50025142142,
                'previewAddress':
                  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/common/product/attribute/units',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            'id|+1': 1,
            'sort|+1': 1,
            'name': '@cname'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/energyConsume/config/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'type|1': [1, 2],
          'unitPrice|1': [100, 200],
          'unit|1': ['m³', 'kwh'],
          'checkStatus|1': [0, 1],
          'category': '@date',
          'status|1': [0, 1]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/energyConsume/config/add',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/energyConsume/config/:id',
    method: 'delete',
    response: resData({})
  },

  {
    url: '/cbd-api-project/energyConsume/device/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'project': {
            label: '@string',
            value: '@id'
          },
          'usageType|1': [1, 2],
          'merchant': {
            label: '@string',
            value: '@id'
          },
          'store': {
            label: '@string',
            value: '@id'
          },
          'type|1': [1, 2],
          'unit|1': ['m³', 'kwh'],
          'unitPrice|1': [10, 21],
          'initNum|1': [11, 22],
          'status|1': [0, 1]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/energyConsume/device/remove/:id',
    method: 'delete',
    response: resData({})
  },
  {
    url: '/cbd-api-project/energyConsume/device/add',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'invoiceNo': '@id',
          'start_date': '@date',
          'endDate': '@date',
          'totalCharge|1': [10, 21],
          'types|1': [[1], [2], [1, 2]],
          'status|1': [0, 1],
          'merchant': {
            label: '@string',
            value: '@id'
          },
          'store': {
            label: '@string',
            value: '@id'
          },
          'project': {
            label: '@string',
            value: '@id'
          }
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/remove/:id',
    method: 'delete',
    response: resData({})
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/createReceivable/:id',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/common/merchant/select',
    method: 'get',
    response: resData(
      mock([
        {
          value: 1,
          label: '@ctitle'
        },
        {
          value: 2,
          label: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/store/selectAll',
    method: 'get',
    response: resData(
      mock([
        {
          value: 1,
          label: '@ctitle'
        },
        {
          value: 2,
          label: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/energyConsume/device/select',
    method: 'get',
    response: resData(
      mock([
        {
          'deviceId': '@cid',
          'storeName': '@ctitle',
          'name': '@ctitle',
          'type|1': [1, 2],
          'usageType|1': [1, 2],
          'unit|1': ['m³', 'kwh'],
          'unitPrice': '@integer',
          'lastNum': 0
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/info/:id',
    method: 'get',
    response: resData({
      'id|+1': 1001,
      'invoiceNo': '@cid',
      'startDate': '@date',
      'endDate': '@date',
      'totalCharge': 100,
      'types': [1, 2],
      'status|1': [0, 1],
      'storeNames': '@ctitle',
      'merchant': {
        label: '@ctitle',
        value: '@cid'
      },
      'project': {
        label: '@ctitle',
        value: '@cid'
      },
      'deviceInfos': [
        {
          'store': {
            label: '@ctitle',
            value: '@id'
          },
          'deviceId': '@id',
          'deviceCode': '@id',
          'deviceName': '@ctitle',
          'type|1': [1, 2],
          'usageType': 1,
          'lastNum': 100,
          'curNum': 100,
          'derateNum': 100,
          'curActNum': 100,
          'curCharge': 100
        },
        {
          'store': {
            label: '@ctitle',
            value: '@id'
          },
          'deviceId': '@id',
          'deviceCode': '@id',
          'deviceName': '@ctitle',
          'type|1': [1, 2],
          'usageType': 2,
          'lastNum': 100,
          'curNum': 100,
          'derateNum': 100,
          'curActNum': 100,
          'curCharge': 100
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/add',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/energyConsume/invoice/update',
    method: 'put',
    response: resData({})
  },
  {
    url: '/cbd-api-project/contract/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'ascriptionCompanyName': '@ctitle',
          'merchantName': '@ctitle',
          'acreage': '@integer(0,100)',
          'totalAmount': '@integer(0,100)',
          'periodStart': '@date',
          'periodEnd': '@date',
          'status|1': [1, 2, 3, 4, 5, 6, 7]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/contract/save',
    method: 'post',
    response: resData({})
  },
  {
    url: '/cbd-api-project/contract/info/:id',
    method: 'get',
    response: resData({
      'id|+1': 1,
      'code': '@id',
      'ascriptionCompanyCode': '@id',
      'ascriptionCompanyName': '@ctitle',
      'address': '@city(true)',
      'schemeCode': '@id',
      'periodStart': '@date',
      'periodEnd': '@date',
      'remark': '@sentence',
      'files|1-3': [
        {
          'id|+10': 12,
          'name': '@cname',
          'type|1': ['image/png', 'image/png', 'plain/txt'],
          'size': '@integer(10,200000)',
          'previewAddress': '@image'
        }
      ],
      'merchantId': 1,
      'bond': '@integer(1,1000)',
      'contractEstateList|1-3': [
        {
          'estateCode': '@id',
          'leasePurposeId': '@id',
          'leasePurposeName': '@ctitle',
          'manageId': '@id',
          'manageName': '@cname',
          'deductionSort|+1': 1,
          'estatePayPlanList|1-3': [
            {
              'payPlanCode': '@id',
              'payStartDate': '@date',
              'payEndDate': '@date',
              'cycle|1': [3, 6, 12],
              'totalAmount': '@integer(100,11000)',
              'discountAmount': '@integer(100,11000)',
              'receivableAmount': '@integer(100,11000)'
            }
          ]
        }
      ],
      'costTypeList|1-3': [
        {
          'costTypeId': '@id',
          'costTypeName': '@ctitle',
          'payScheme': {
            paySchemeCode: '@id',
            paySchemeName: '@cname',
            payMonth: 2
          },
          'chargingRule': {
            'type|1': [1, 2, 3],
            'method|1': [1, 2],
            'amount': '@integer(1,100)'
          },
          'payPlan|1-5': [
            {
              'code': '@id',
              'payStartDate': '@date',
              'payEndDate': '@date',
              'cycle|1': [3, 6, 12],
              'totalAmount': '@integer(100,11000)',
              'discountAmount': '@integer(100,11000)',
              'receivableAmount': '@integer(100,11000)'
            }
          ]
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/contract/update',
    method: 'put',
    response: resData({})
  },
  {
    url: '/cbd-api-project/contract/verify',
    method: 'put',
    response: resData({})
  },
  {
    url: '/cbd-api-project/contract/cancel',
    method: 'put',
    response: resData({})
  },
  {
    url: '/cbd-api-project/captchaImage',
    method: 'get',
    response: resData({ captchaOnOff: true, uuid: 1, img: '' })
  },
  {
    url: '/cbd-api-project/getRouters',
    method: 'get',
    response: resData(
      mock([
        {
          name: 'finance-manage',
          path: '/finance-manage',
          category: 1,
          meta: {
            title: '财务管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'deposit',
              path: '/finance-manage/deposit/list',
              meta: {
                title: '存款处理',
                icon: ''
              }
            },
            {
              category: 2,
              name: 'invoiceRecord',
              path: '/finance-manage/invoiceRecord',
              meta: {
                title: '发票记录',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'financeBill',
              path: '/finance-manage/bill',
              meta: {
                title: '账单管理',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'financeBill',
              path: '/finance-manage/collect-pay',
              meta: {
                title: '收付款单',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'financeBill',
              path: '/finance-manage/collect-pay-refund',
              meta: {
                title: '收付款单退款',
                icon: ''
              }
            }
          ]
        },
        {
          name: 'new-contract',
          path: '/new-contract',
          category: 1,
          meta: {
            title: '合同管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'intentionList',
              path: '/new-contract/intentionList',
              meta: {
                title: '意向合同',
                icon: ''
              }
            },
            {
              category: 2,
              name: 'formalList',
              path: '/new-contract/formalList',
              meta: {
                title: '正式合同',
                icon: ''
              }
            }
          ]
        },
        {
          name: 'resource-manage',
          path: '/resource-manage',
          category: 1,
          meta: {
            title: '资源管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'businessType',
              path: '/resource-manage/businessType',
              meta: {
                title: '业态库',
                icon: ''
              }
            },
            {
              category: 2,
              name: 'brand',
              path: '/resource-manage/brand',
              meta: {
                title: '品牌库',
                icon: ''
              }
            },
            {
              category: 3,
              name: 'merchant',
              path: '/resource-manage/merchant',
              meta: {
                title: '商户库',
                icon: ''
              }
            }
          ]
        },
        {
          name: 'vms',
          path: '/vms',
          category: 1,
          meta: {
            title: '场馆管理',
            icon: '',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'venueManage',
              path: '/vms/venueManage',
              meta: {
                title: '场馆列表',
                icon: ''
              }
            },
            {
              category: 2,
              name: 'siteType',
              path: '/vms/venueManage/siteType',
              meta: {
                title: '场地类型',
                icon: ''
              }
            },
            {
              category: 3,
              name: 'memberManage',
              path: '/vms/memberManage',
              meta: {
                title: '会员管理',
                icon: ''
              }
            },
            {
              category: 4,
              name: 'memberLabel',
              path: '/vms/memberLabel',
              meta: {
                title: '会员标签',
                icon: ''
              }
            }
          ]
        },
        {
          name: 'salesOrder',
          path: '/vms/sales-order',
          category: 1,
          meta: {
            title: '销售订单',
            icon: '',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'timeCardOrder',
              path: '/vms/sales-order/time-card-order',
              meta: {
                title: '限期卡订单',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'timeCardOrder',
              path: '/vms/sales-order/count-card-order',
              meta: {
                title: '次卡订单',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'goodsOrder',
              path: '/vms/sales-order/goods',
              meta: {
                title: '订单管理',
                icon: ''
              }
            }
          ]
        },
        {
          name: 'land',
          path: '/land',
          category: 1,
          meta: {
            title: '地产项目管理',
            icon: 'icon-settings',
            noCache: false
          },
          children: [
            {
              category: 1,
              name: 'project-manage',
              path: '/land/project-manage',
              meta: {
                title: '项目管理',
                icon: ''
              }
            },
            {
              category: 1,
              name: 'project-user',
              path: '/land/project-user',
              meta: {
                title: '项目用户管理',
                icon: ''
              }
            }
          ]
        },
        {
          category: 2,
          name: 'mini-program',
          path: '/mini-program/list',
          meta: {
            title: '小程序管理',
            icon: 'icon-settings',
            noCache: false
          }
        },
        {
          category: 1,
          name: 'assetsManage',
          path: '/assetsManage',
          meta: {
            title: '资产管理',
            icon: 'icon-settings',
            noCache: false
          }
        },
        {
          category: 2,
          name: 'servicesCounter',
          path: '/svc/service-counter',
          meta: {
            title: '储值卡服务台',
            icon: '',
            noCache: false
          }
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/login',
    method: 'post',
    response: resData(
      mock({
        token: '@guid'
      })
    )
  },
  {
    url: '/cbd-api-project/getInfo',
    method: 'get',
    response: resData(
      mock({
        user: {
          userId: '@id',
          deptId: '@id',
          userName: '@cname',
          nickName: '@cname',
          email: '@email',
          phoneNumber: '1561561651',
          sex: '男',
          avatar: '@image',
          loginIp: '@ip'
        },
        role: ['test:node']
      })
    )
  },
  {
    url: '/cbd-api-project/index/dataAnalysis',
    method: 'get',
    response: resData({})
  },
  {
    url: '/cbd-api-project/common/format/selectList',
    method: 'get',
    response: resData(
      mock([
        {
          id: 1,
          pid: 0,
          formatData: '@cname',
          sort: 1,
          childFormats: [
            {
              id: 2,
              pid: 1,
              formatData: '@cname',
              sort: 1,
              childFormats: []
            },
            {
              id: 3,
              pid: 1,
              formatData: '@cname',
              sort: 1,
              childFormats: [
                {
                  id: 3,
                  pid: 3,
                  formatData: '@cname',
                  sort: 1,
                  childFormats: []
                }
              ]
            }
          ]
        },
        {
          id: 4,
          pid: 0,
          formatData: '@cname',
          sort: 2,
          childFormats: []
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/store/select',
    method: 'get',
    response: resData(
      mock([
        {
          value: 1,
          label: '@ctitle'
        },
        {
          value: 2,
          label: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/project/selectList',
    method: 'get',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '体投_ @name'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/file-direct-upload/sign',
    method: 'GET',
    response: resData(
      mock({
        accessid: '',
        policy: '',
        signature: '',
        host: '',
        dir: '',
        cdnUrl: '',
        expire: '',
        callback: '',
        key: '@id'
      })
    )
  },
  {
    url: '/cbd-api-project/dict/getDictData/:id',
    method: 'get',
    response: resData([
      {
        id: '@id',
        dataCode: '@id',
        dataName: '@ctitle',
        remark: '@ctitle'
      },
      {
        id: '@id',
        dataCode: '@id',
        dataName: '@ctitle',
        remark: '@ctitle'
      }
    ])
  },
  {
    url: '/cbd-api-project/bond/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'type|1': [1, 2],
          'typeName': '@ctitle',
          'serverUrl': '@title',
          'stateName': '@title',
          'state': '@pick([ 1, 2])',
          'storeCode': '@id'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/cashier/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/cashier/modify',
    method: 'PUT',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/cashier/info/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'code': '@id',
        'type': '@pick([1,2])',
        'typeName': '@ctitle',
        'serverUrl': '@title',
        'storeInfo': {
          code: '@id',
          name: '@ctitle',
          scene: '@ctitle',
          brand: '@ctitle',
          address: '@address'
        },
        'viewInfo': [
          {
            type: 2,
            viewState: 1,
            intervalTime: 1,
            resourceBatchCode: '@id',
            resourceList: [
              {
                type: '@pick([1,2])',
                format: '@ctitle',
                previewAddress: '@title'
              }
            ]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/cashier/viewSetting',
    method: 'PUT',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/cashier/storeSetting',
    method: 'PUT',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/cashier/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'type': '@pick([1,2])',
          'typeName': '@ctitle',
          'serverUrl': '@192.168.x.x',
          'state': '@pick([1,2])',
          'stateName': '@ctitle',
          'storeCode': '@code'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/bond/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'contractCode': '@id',
          'status|1': ['-1', 1, 2, 3, 4],
          'merchantName': '@ctitle',
          'arrearsTime':
            '@pick([0, 1, 2, 3,4,5,6,7,8, 9, 10, 11, 12, 13, 14, 15])',
          'billingDate': '@date',
          'bond': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/bond/receipt/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'paymentMethod|1': [1, 2],
          'status|1': ['-1', 1, 2, 3],
          'collectionDate': '@date',
          'receivedAmount': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/bond/deduction/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'serialNo': '@id',
          'type|1': [1, 2, 3],
          'deductionTime': '@date',
          'deductionAmount': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/bond/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'contractCode': '@id',
        'code': '@id',
        'status|1': ['-1', 1, 2, 3, 4],
        'merchantName': '@ctitle',
        'arrearsTime': '1天21小时57分',
        'billingDate': '@date',
        'actualAmount': '@integer',
        'receivedAmount': '@integer',
        'dueInAmount': '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/account-receivable/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'principal': '@ctitle',
          'merchantName': '@ctitle',
          'status|1': [0, 1, 2, 3],
          'typeName': '@ctitle',
          'billCycleStr|1': [0, 1, 2, 3],
          'contractCode': '@id',
          'code': '@id',
          'billLastRepaymentDate': '@date',
          'lastRepaymentDate': '@date',
          'lastAmount': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/account-receivable/info/:id',
    method: 'get',
    response: resData(
      mock({
        baseInfo: {
          'code': '@id',
          'typeName': '@ctitle',
          'type|1': [1, 2, 3, 4],
          'billCycleStr|1': [1, 2, 3, 4],
          'collectRentWay': 2,
          'totalAmount': '@integer',
          'actualAmount': '@integer',
          'billLastRepaymentDate': '@date',
          'amountReceived': '@integer',
          'receivedDelayingPayment': '@integer',
          'lastAmount': '@integer',
          'status|1': [1, 2, 3, 4]
        },
        receiptInfoList: [
          {
            'id': '@id',
            'code': '@id',
            'amountReceived': '@integer',
            'status|1': [1, 2, 3, 4],
            'collectionDate': '@date'
          },
          {
            'id': '@id',
            'code': '@id',
            'amountReceived': '@integer',
            'status|1': [1, 2, 3, 4],
            'collectionDate': '@date'
          }
        ],
        assetsInfo: [
          {
            projectName: '@ctitle',
            doorPlate: '@integer',
            code: '@id',
            acreage: '@integer',
            typeName: '@ctitle',
            provinceCode: '@integer',
            cityCode: '@integer',
            districtCode: '@integer',
            address: '@ctitle',
            building: '@ctitle',
            manageName: '@ctitle',
            floorName: '@ctitle',
            leasePurposeName: '@ctitle'
          },
          {
            projectName: '@ctitle',
            doorPlate: '@integer',
            code: '@id',
            acreage: '@integer',
            typeName: '@ctitle',
            provinceCode: '@integer',
            cityCode: '@integer',
            districtCode: '@integer',
            address: '@ctitle',
            building: '@ctitle',
            manageName: '@ctitle',
            floorName: '@ctitle',
            leasePurposeName: '@ctitle'
          }
        ],
        contractInfo: {
          'companyName': '@ctitle',
          'code': '@id',
          'status|1': [1, 2, 3, 4],
          'schemeCode': '@id',
          'periodStart': '@date',
          'periodEnd': '@date',
          'principal': '@cname',
          'merchantCompanyName': '@ctitle'
        }
      })
    )
  },
  {
    url: '/cbd-api-project/account-receivable/amount-info/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        actualAmount: '@integer',
        amountReceived: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/account-receivable/receiptPage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'fallowCode': '@integer',
          'code': '@integer',
          'payType|1': [1, 2],
          'amountTypeDesc': '@ctitle',
          'amountReceived': '@integer',
          'amount': '@integer',
          'status|1': ['-1', 1, 2, 3],
          'collectionDate': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/invest/plan/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'code': '@id',
          'planName': '@ctitle',
          'status': '@pick([1,2,3,4,5])',
          'estateName': '@ctitle',
          'merchantName': '@cname',
          'channelName': '@cname',
          'startDate': '@date',
          'endDate': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/invest-channel/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'code': '@id',
          'type': '@pick([1,2,3,4])',
          'name': '@ctitle',
          'principalName': '@cname',
          'principalPhone': '@phone',
          'canDelete': '@boolean'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/building-floor/list-select',
    method: 'get',
    response: resData(
      mock([
        {
          value: 1,
          label: '@ctitle'
        },
        {
          value: 2,
          label: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/negotiate/record/list',
    method: 'get',
    response: resData(
      mockList(
        {
          negotiateStage: '@pick([1,2,3,4,5])',
          negotiateMode: '@pick([1,2])',
          recordId: '@id',
          projectId: '@id',
          planId: '@id',
          merchantId: '@id',
          merchantName: '@cname',
          brandId: '@id',
          brandName: '@cname',
          address: '@address',
          negotiateDate: '@date',
          negotiateStime: '@datetime',
          negotiateEtime: '@datetime',
          leaseType: '@pick([1,2,3,4])',
          estateId: '@id',
          expectMinArea: '@pick([300,400])',
          expectMaxArea: '@pick([500,700])',
          expectLeaseDate: '@date',
          expectLeaseMonth: '@pick([1,2,3,4,5, 6, 7,8,9,10,11,12])',
          expectMinRent: '@pick([300,400])',
          expectMaxRent: '@pick([500,700])',
          negotiateContent: '@ctitle',
          negotiateAnnexListattendeeList: [],
          attendeeList: [
            { userId: '@id', name: '@cname' },
            { userId: '@id', name: '@cname' },
            { userId: '@id', name: '@cname' }
          ],
          customerList: [
            { userId: '@id', name: '@cname' },
            { userId: '@id', name: '@cname' }
          ]
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/negotiate/record/contract',
    method: 'get',
    response: resData(
      mock({
        expectContractList: [
          {
            contractId: '@id',
            merchantName: '@cname',
            contractCode: '@id',
            businessStatus: '@pick([1,2,3,4,5])',
            verifyStatus: '@pick([1,2,3,4,5])',
            leaseStartDate: '@date',
            leaseEndDate: '@date'
          }
        ],
        contractList: [
          {
            contractId: '@id',
            merchantName: '@cname',
            contractCode: '@id',
            businessStatus: '@pick([1,2,3,4,5])',
            verifyStatus: '@pick([1,2,3,4,5])',
            leaseStartDate: '@date',
            leaseEndDate: '@date'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/negotiate/list',
    method: 'get',
    response: resData(
      mock({
        startList: [
          {
            'planId|+1': 1,
            'planName': '@ctitle',
            'num|+50': 100,
            'storeName': '@ctitle',
            'brandName': '@ctitle',
            'minArea': '@pick([100,200,300])',
            'maxArea': '@pick([400,500,600])',
            'type': '@pick([1,2,3,4])'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/negotiate/info',
    method: 'get',
    response: resData(
      mock({
        'negotiateStage': '@pick([1,2,3,4])',
        'negotiateMode': '@pick([1,2])',
        'projectId|+1': 1,
        'recordId|+1': 1,
        'planId|+1': 1,
        'merchantId|+1': 1,
        'storeName': '@ctitle',
        'merchantName': '@ctitle',
        'planName': '@ctitle',
        'brandId|+1': 1,
        'brandName': '@ctitle',
        'projectName': '@ctitle',
        'address': '@address',
        'negotiateDate': '@date',
        'negotiateStime': '@date',
        'negotiateEtime': '@date',
        'leaseType': '@pick([1,2,3,4])',
        'estateId|+1': 1,
        'expectMinArea|+50': 300,
        'expectMaxArea|+50': 300,
        'expectLeaseDate': '@date',
        'expectLeaseMonth|+1': 5,
        'expectMinRent|+200': 3000,
        'expectMaxRent|+200': 3000,
        'negotiateContent': '@ctitle',
        'negotiateAnnexList': [
          {
            id: 1,
            name: '@cname',
            type: 'image/jpeg',
            format: '',
            previewAddress:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F298913890e6272eacccc4045516ee423214eb6a19d52b-1rrvdP_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671001290&t=194cd8774b6482eedf10e2e06f564a5e'
          }
        ],
        'attendeeList': [
          {
            userId: 1,
            name: '@cname'
          }
        ],
        'customerList': [
          {
            userId: 2,
            name: '@cname'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/negotiate/merchant/user/list',
    method: 'get',
    response: resData(
      mock([
        {
          name: '@cname',
          userId: '@id'
        },
        {
          name: '@cname',
          userId: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/negotiate/channel/member/list',
    method: 'get',
    response: resData(
      mock([
        {
          name: '@cname',
          userId: '@id'
        },
        {
          name: '@cname',
          userId: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/invest/plan/select',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/invest/plan/detail/:id',
    method: 'get',
    response: resData(
      mock({
        'id|+1': 1,
        'projectName': '@ctitle',
        'projectId|+1': 1,
        'code': '@id',
        'planName': '@ctitle',
        'estateType': '@pick([1,2,3,4])',
        'estateTypeName': '@ctitle',
        'buildingId': '@id',
        'buildingName': '@ctitle',
        'floorId': '@id',
        'floorName': '@ctitle',
        'estateId': '@id',
        'estateName': '@ctitle',
        'acreage': '@id',
        'useAcreage': '@id',
        'merchantId': '@id',
        'merchantName': [],
        'brandId': '@id',
        'brandName': [],
        'channelId': '@id',
        'channelName': '@ctitle',
        'startDate': '@date',
        'endDate': '@date',
        'settleMode': '@pick([1,2])',
        'ratioType': '@pick([1,2])',
        'ratio': '@pick([1,2,3,4])',
        'amount': '@integer',
        'billGenType1': '@pick([1,2,3,4])',
        'billGenType2': '@pick([1,2,3,4])',
        'billGenDate': '@date',
        'taxIncluded': '@pick([1,2])',
        'taxFee': '@integer',
        'remark': '@ctitle',
        'personnelList': [
          {
            name: '@cname',
            phone: '@phoneNumber',
            level: '@pick([1,2])'
          },
          {
            name: '@cname',
            phone: '@phoneNumber',
            level: '@pick([1,2])'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/common/merchant-brand/list',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/merchant/list',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/negotiate/estate',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: '@id'
        },
        {
          label: '@ctitle',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/negotiate/estate',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@ctitle',
          value: '@id'
        },
        {
          label: '@ctitle',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/invest-channel/list',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/invest/plan/draft',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest-channel/save',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/negotiate/merchant/user/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/negotiate/add',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/negotiate/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest-channel/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest-channel/delete/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest-channel/info/:id',
    method: 'GET',
    response: resData(
      mock({
        baseInfo: {
          'id|+1': 1,
          'projectId': '@id',
          'projectName': '@ctitle',
          'code': '@id',
          'type': '@pick([1,2,3,4])',
          'name': '@ctitle',
          'address': '@ctitle',
          'principalName': '@cname',
          'principalPost': '@ctitle',
          'principalPhone': '@phone',
          'attachmentPic': [
            {
              id: 1,
              name: '@cname',
              type: 'image/jpeg',
              format: '',
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F298913890e6272eacccc4045516ee423214eb6a19d52b-1rrvdP_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671001290&t=194cd8774b6482eedf10e2e06f564a5e'
            }
          ]
        },
        channelMemberInfoList: [
          {
            id: '@id',
            name: '@cname',
            post: '@ctitle',
            phone: '@phone'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/invest/plan/select',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/negotiate/count',
    method: 'get',
    response: resData(
      mock({
        toadyNum: '@integer',
        sevenDayNum: '@integer',
        otherDayNum: '@integer',
        warnNum: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/invest/expenses/period/select',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/common/building/list-select',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@name'
          }
        ]
      }).list
    )
  },

  // 资产看板
  {
    url: '/cbd-api-project/estate/reviewBoard',
    method: 'get',
    response: resData({
      floors: mockList1({
        floorId: '@id',
        floor: '@name',
        floorName: '@name',
        area: '@integer',
        estates: mockList1({
          'estateId': '@id',
          'doorPlate': '@title',
          'acreage': '@integer',
          'useAcreage': '@integer',
          'categoryId|1': [1, 2, 3, 4, 5]
        })
      }),
      categoryStatistics: mockList1({
        'categoryId|1': [1, 2, 3, 4, 5],
        'categoryName': '@name',
        'count': '@integer'
      })
    })
  },
  {
    url: '/cbd-api-project/asset/page',
    method: 'post',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'projectName': '@cname',
          'buildingName': '@cname',
          'floorName': '@cname',
          'doorPlate': '@id',
          'categoryName': '@cname',
          'acreage': '@integer(0, 100)',
          'areaName': '@ctitle'
        },
        {
          pageNum: 1,
          pageSize: 10
        }
      )
    )
  },
  {
    url: '/cbd-api-project/asset/business-condition/chart/:estateId',
    method: 'post',
    response: resData({
      statisticsDate: '@date',
      pieChart: {
        'amountReceived': '@integer(0,100)',
        'pieChartDataList|3-5': [
          {
            typeName: '@ctitle',
            amountReceived: '@integer(0,100)',
            percentage: '@integer(0,100)'
          }
        ]
      },
      radarChart: {
        'radarChartDataList|3-5': [
          {
            typeName: '@ctitle',
            actualAmount: '@integer(0,100)',
            amountReceived: '@integer(0,100)',
            percentage: '@integer(0,100)'
          }
        ]
      }
    })
  },
  {
    url: '/cbd-api-project/asset/business-condition/payment/:estateId',
    method: 'post',
    response: resData({
      'rows|3-5': [
        {
          typeName: '@ctitle',
          actualAmount: '@integer(0,100)',
          amountReceived: '@integer(0,100)',
          lastAmount: '@integer(0,100)',
          arrearsDay: '@date'
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/approvalProcess/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'approvalNo': '@id',
          'disable|1': [1, 2],
          'approvalBusinessName': '@cname',
          'operator': '@cname',
          'updateTime': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/approvalProcess/log',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'updateBy': '@cname',
          'departmentName': '@cname',
          'updateTime': '@date',
          'content': '@ctitle'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/approvalProcess/info/:approvalNo',
    method: 'get',
    response: resData(
      mock({
        'id': 1,
        'approvalNo': '@id',
        'approvalBusinessName': '@cname',
        'data|3': [
          {
            'sort|+1': 1,
            'departmentName': '@cname',
            'departmentId': '@id',
            'roleName': '@cname',
            'roleId': '@id',
            'userName': '@cname',
            'userId': '@id'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/common/building/list-select',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            value: '@id',
            label: '@name'
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/report/day-pay-chart',
    method: 'GET',
    response: resData(
      mock({
        totalNum: '@integer',
        totalMoney: '@integer',
        x: [
          {
            showData: '7-3',
            fullData: '1号店铺'
          },
          {
            showData: '7-4',
            fullData: '2号店铺'
          },
          {
            showData: '7-5',
            fullData: '3号店铺'
          },
          {
            showData: '7-6',
            fullData: '4号店铺'
          },
          {
            showData: '7-7',
            fullData: '5号店铺'
          },
          {
            showData: '7-8',
            fullData: '6号店铺'
          }
        ],
        aliBarY: {
          name: '支付宝支付',
          value: [15, 1313, 546, 48.1, 568.2, 456]
        },
        wechatBarY: {
          name: '微信支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        posBarY: {
          name: 'POS机支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        cashBarY: {
          name: '现金支付',
          value: [15, 133, 546, 485.1, 568.2, 456]
        },
        aliLineY: {
          name: '支付宝支付',
          value: [15, 133, 46, 485.1, 500, 456]
        },
        wechatLineY: {
          name: '微信支付',
          value: [15, 133, 546, 45.1, 400, 456]
        },
        posLineY: {
          name: 'POS机支付',
          value: [15, 333, 546, 485.1, 600, 456]
        },
        cashLineY: {
          name: '现金支付',
          value: [135, 133, 546, 485.1, 396, 456]
        }
      })
    )
  },
  {
    url: '/cbd-api-project/report/day-pay-list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'date': '@date',
          'payNum': '@integer',
          'payMoney': '@integer',
          'wechatPayNum': '@integer',
          'wechatPayMoney': '@integer',
          'aliPayNum': '@integer',
          'aliPayMoney': '@integer',
          'cashPayNum': '@integer',
          'cashPayMoney': '@integer',
          'mixedPayNum': '@integer',
          'mixedPayMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/day-pay-top',
    method: 'GET',
    response: resData(
      mockList(
        {
          payName: '@ctitle',
          payNum: '@integer',
          payMoney: '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/day-product-chart',
    method: 'GET',
    response: resData(
      mock({
        totalNum: '@integer',
        totalMoney: '@integer',
        x: [
          {
            showData: '7-3',
            fullData: '1号店铺'
          },
          {
            showData: '7-4',
            fullData: '2号店铺'
          },
          {
            showData: '7-5',
            fullData: '3号店铺'
          },
          {
            showData: '7-6',
            fullData: '4号店铺'
          },
          {
            showData: '7-7',
            fullData: '5号店铺'
          },
          {
            showData: '7-8',
            fullData: '6号店铺'
          }
        ],
        barGraphDataList: [15, 1313, 546, 48.1, 568.2, 456],
        lineChartDataList: [15, 123, 546, 48, 568, 456]
      })
    )
  },
  {
    url: '/cbd-api-project/report/day-product-list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'storeId|+1': 1,
          'date': '@date',
          'sellNum': '@integer',
          'sellMoney': '@integer',
          'productNum': '@integer',
          'productMoney': '@integer',
          'venueNum': '@integer',
          'venueMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/day-product-top',
    method: 'GET',
    response: resData(
      mockList(
        {
          'storeId|+1': 1,
          'date': '@date',
          'sellNum': '@integer',
          'sellMoney': '@integer',
          'productNum': '@integer',
          'productMoney': '@integer',
          'venueNum': '@integer',
          'venueMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/day-venue-top',
    method: 'GET',
    response: resData(
      mockList(
        {
          'storeId|+1': 1,
          'date': '@date',
          'sellNum': '@integer',
          'sellMoney': '@integer',
          'productNum': '@integer',
          'productMoney': '@integer',
          'venueNum': '@integer',
          'venueMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/day-order-chart',
    method: 'GET',
    response: resData(
      mock({
        totalNum: '@integer',
        totalMoney: '@integer',
        x: [
          {
            showData: '7-3',
            fullData: '2022-7-3'
          },
          {
            showData: '7-4',
            fullData: '2022-7-4'
          },
          {
            showData: '7-5',
            fullData: '2022-7-5'
          },
          {
            showData: '7-6',
            fullData: '2022-7-6'
          },
          {
            showData: '7-7',
            fullData: '2022-7-7'
          },
          {
            showData: '7-8',
            fullData: '2022-7-8'
          }
        ],
        barY: [15, 1313, 546, 48, 568, 456],
        lineY: [15, 123, 546, 48, 568, 456]
      })
    )
  },
  {
    url: '/cbd-api-project/report/day-order-list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'storeId|+1': 1,
          'date': '@date',
          'orderNum': '@integer',
          'orderMoney': '@integer',
          'onlineOrderNum': '@integer',
          'onlineOrderMoney': '@integer',
          'offlineOrderNum': '@integer',
          'offlineOrderMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/report/store-chart',
    method: 'GET',
    response: resData(
      mock({
        totalNum: '@integer',
        totalMoney: '@integer',
        x: [
          {
            showData: '7-3',
            fullData: '1号店铺'
          },
          {
            showData: '7-4',
            fullData: '2号店铺'
          },
          {
            showData: '7-5',
            fullData: '3号店铺'
          },
          {
            showData: '7-6',
            fullData: '4号店铺'
          },
          {
            showData: '7-7',
            fullData: '5号店铺'
          },
          {
            showData: '7-8',
            fullData: '6号店铺'
          }
        ],
        barY: [15, 1313, 546, 48.1, 568.2, 456],
        lineY: [15, 123, 546, 48, 568, 456]
      })
    )
  },
  {
    url: '/cbd-api-project/report/store-list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'storeId|+1': 1,
          'storeName': '@ctitle',
          'storeCode': '@id',
          'orderNum': '@integer',
          'orderMoney': '@integer',
          'onlineOrderNum': '@integer',
          'onlineOrderMoney': '@integer',
          'offlineOrderNum': '@integer',
          'offlineOrderMoney': '@integer',
          'productNum': '@integer',
          'productMoney': '@integer',
          'venueNum': '@integer',
          'venueMoney': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/resource/merchant-brand/page',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@integer(1, 100)',
          'projectId': '@integer(1, 100)',
          'projectName': '项目_ @name(5, 20)',
          'code': '@integer(1, 100)',
          'name|1': [
            '阿玛尼',
            '纪梵希',
            '阿迪',
            '耐克',
            '匡威',
            '安踏',
            '鸿星尔克',
            '特步'
          ],
          'formatId': '@integer(1, 100)',
          'formatName|1': [
            '服装/男装/',
            '服装/男装/',
            '服装/男装/',
            '服装/男装/',
            '服装/男装/',
            '服装/男装/',
            '服装/男装/',
            '服装/男装/'
          ],
          'status|1': [1, 2, 3, 4]
        },
        { pageNum: 1, pageSize: 20 }
      )
    )
  },
  {
    url: '/cbd-api-project/resource/merchant-brand/info/:id',
    method: 'GET',
    response: resData(
      mock({
        'id': '@integer(1, 100)',
        'projectId': '@integer(1, 100)',
        'projectName': '项目_ @name(5, 20)',
        'code': 'C_@integer(1, 100)',
        'name|1': [
          '阿玛尼',
          '纪梵希',
          '阿迪',
          '耐克',
          '匡威',
          '安踏',
          '鸿星尔克',
          '特步'
        ],
        'formatId': '@integer(1, 100)',
        'formatName|1': [
          '服装/男装/',
          '服装/男装/',
          '服装/男装/',
          '服装/男装/',
          '服装/男装/',
          '服装/男装/',
          '服装/男装/',
          '服装/男装/'
        ],
        'status|1': [1, 2, 3, 4],
        'remarks': '@word(10, 20)'
      })
    )
  },
  {
    url: '/cbd-api-project/resource/merchant-brand/update',
    method: 'POST',
    response: resData({
      msg: '修改成功'
    })
  },
  {
    url: '/cbd-api-project/resource/merchant-brand/save',
    method: 'POST',
    response: resData({
      msg: '新增成功'
    })
  },
  {
    url: '/cbd-api-project/resource/merchant-brand/delete/:id',
    method: 'GET',
    response: resData({
      msg: '删除成功'
    })
  },
  {
    url: '/cbd-api-project/resource/format/tree',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'value': '@increment(1)',
            'label|1': ['服装', '箱包', '科技', '家用', '电器', '护理'],
            'parentId': '@id',
            'children|1-8': [
              {
                'value': '@id',
                'label|1': ['男装', '女装', '手机', '电脑', '冰箱', '洗衣机'],
                'parentId': '@id',
                'children|0-5': [
                  {
                    'value': '@increment(1)',
                    'label|1': ['休闲', '运动', '旅游', '定制'],
                    'parentId': '@id',
                    'children': []
                  }
                ]
              }
            ]
          }
        ]
      }).list
    )
  },
  {
    url: '/cbd-api-project/resource/format/info/:id',
    method: 'GET',
    response: resData(
      mock({
        id: '@integer(1, 1000)',
        projectId: '@id',
        projectName: '项目_ @name',
        name: '@name',
        code: '@id',
        remark: '@word(10, 20)',
        canDelete: true,
        canAdd: true
      })
    )
  },
  {
    url: '/cbd-api-project/resource/format/save',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/format/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/format/delete/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/format/preview',
    method: 'GET',
    response: resData(
      mock({
        'successDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            code: '@id',
            parentName: '@name',
            name: '@cname',
            remark: '@cword(5, 10)'
          }
        ],
        'failDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            code: '@id',
            parentName: '@name',
            name: '@cname',
            remark: '@cword(5, 10)',
            failMsg: '@cword(5, 10)'
          }
        ]
      })
    )
  },
  //业态批量导入
  {
    url: '/cbd-api-project/resource/format/batch-save',
    method: 'POST',
    response: resData(mock({}))
  },
  //品牌批量导入预览
  {
    url: '/cbd-api-project/resource/merchant-brand/preview',
    method: 'GET',
    response: resData(
      mock({
        'successDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            code: '@id',
            formatName: '业态_ @name',
            name: '@cname',
            remark: '@cword(5, 10)'
          }
        ],
        'failDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            code: '@id',
            formatName: '业态_ @name',
            name: '@cname',
            remark: '@cword(5, 10)',
            failMsg: '@cword(5, 10)'
          }
        ]
      })
    )
  },
  //品牌批量导入
  {
    url: '/cbd-api-project/resource/merchant-brand/batch-save',
    method: 'POST',
    response: resData(mock({}))
  },
  //商户批量导入预览
  {
    url: '/cbd-api-project/resource/merchant/preview',
    method: 'GET',
    response: resData(
      mock({
        'successDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            merchantCode: '@id',
            name: '@cname',
            type: '@integer(1, 2)'
          }
        ],
        'failDataList|1-10': [
          {
            projectName: '项目_ @cword(5, 10)',
            merchantCode: '@id',
            name: '@cname',
            type: '@integer(1, 2)',
            failMsg: '@cword(5, 10)'
          }
        ]
      })
    )
  },
  //商户批量导入
  {
    url: '/cbd-api-project/resource/merchant/batch-save',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/merchant/page',
    method: 'GET',
    response: resData(
      mockList(
        {
          id: '@increment(1)',
          projectName: '项目_ @name(5, 20)',
          code: '@integer(1, 100)',
          type: '@integer(1, 2)',
          name: '@name',
          status: '@integer(1, 4)'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/resource/merchant/info/:id',
    method: 'GET',
    response: resData(
      mock({
        'baseInfo': {
          'id': '@increment(1)',
          'projectId': '@id',
          'projectName': '项目_ @name(5, 20)',
          'code': '@id',
          'type': '@integer(1, 2)',
          'name': '@name',
          'shortName': '@cname',
          'companyName': '公司—— @word(5, 10)',
          'legalPerson': '@cname',
          'idNumber': '412456897845123658',
          'businessLicenseNumber': '@id',
          'bank|1': ['中国人民银行', '中国农业银行行', '中国工商银行'],
          'bankAccountName': '北京市海淀区朝阳社区人民路支行',
          'bankAccount': '1452368579652102',
          'linkman': '@cname',
          'linkTel': '15812345678',
          'address': '@city(true)',
          'attachmentPic|1-5': [
            {
              id: '@id',
              name: '',
              type: 'image',
              format: '',
              size: '',
              previewAddress: '@image'
            }
          ],
          'status': '@integer(1, 4)',
          'remark': '@word(10, 100)'
        },
        'formalContractList|1-5': [
          {
            id: '',
            merchantName: '',
            code: '',
            status: '',
            contractStartDate: '',
            contractEndDate: ''
          }
        ],
        'intentionContractList|1-3': [
          {
            id: '',
            merchantName: '',
            code: '',
            status: '',
            contractStartDate: '',
            contractEndDate: ''
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/resource/merchant/save',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/merchant/update',
    method: 'POST',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/resource/merchant/delete/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/order/prd/list',
    method: 'get',
    response: resData(
      mockList(
        {
          orderId: '@id',
          orderNo: '@id',
          storeName: '@cname',
          orderTotalPrice: '@integer',
          createTime: '@datetime',
          orderStatus: '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/order/prd/info',
    method: 'get',
    response: resData(
      mock({
        storeName: '@ctitle',
        customerServiceTel: '@phoneNumber',
        feature: '@ctitle',
        location: '@ctitle',
        region: '@ctitle',
        address: '@address',
        orderNo: '@id',
        orderTotalPrice: '@integer',
        createTime: '@datetime',
        orderStatus: '@pick([-1,0,1,2,3,10,11])',
        fundFlowNo: '@id',
        userCode: '@id',
        nickName: '@cname',
        memberLevel: '@ctitle',
        phone: '@phoneNumber',
        memberDiscount: '@integer',
        integralDiscount: '@integer',
        couponDiscount: '@integer',
        discountAmount: '@integer',
        payAmount: '@integer',
        prdList: [
          {
            prdId: '@id',
            prdName: '@ctitle',
            prdPic: {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            },
            prdSpecNames: '@ctitle',
            prdNum: '@Integer',
            prdPrice: '@Integer',
            prdTotalPrice: '@Integer'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/order/venue/list',
    method: 'get',
    response: resData(
      mockList(
        {
          orderId: '@id',
          orderNo: '@id',
          storeName: '@cname',
          orderTotalPrice: '@integer',
          createTime: '@datetime',
          orderStatus: '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/order/venue/info',
    method: 'get',
    response: resData(
      mock({
        storeName: '@ctitle',
        customerServiceTel: '@phoneNumber',
        feature: '@ctitle',
        location: '@ctitle',
        region: '@ctitle',
        address: '@address',
        orderNo: '@id',
        orderTotalPrice: '@integer',
        createTime: '@datetime',
        orderStatus: '@pick([-1,0,1,2,3,10,11])',
        fundFlowNo: '@id',
        userCode: '@id',
        nickName: '@cname',
        memberLevel: '@ctitle',
        phone: '@phoneNumber',
        memberDiscount: '@integer',
        integralDiscount: '@integer',
        couponDiscount: '@integer',
        discountAmount: '@integer',
        payAmount: '@integer',
        prdList: [
          {
            prdId: '@id',
            prdName: '@ctitle',
            prdPic: {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            },
            prdSpecNames: '@ctitle',
            prdNum: '@Integer',
            prdPrice: '@Integer',
            prdTotalPrice: '@Integer'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/members/list',
    method: 'get',
    response: resData(
      mockList(
        {
          id: '@id',
          code: '@id',
          nickName: '@cname',
          avatarUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371',
          levelName: '@ctitle',
          phone: '@phoneNumber',
          createTime: '@datetime'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/members/detail/:id',
    method: 'get',
    response: resData(
      mock({
        code: '@id',
        nickName: '@cname',
        avatarUrl:
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371',
        levelName: '@cname',
        phone: '@phoneNumber',
        createTime: '@datetime',
        rights: [
          {
            name: '@ctitle',
            icon: {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            }
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/members/level/:id',
    method: 'get',
    response: resData(
      mock({
        name: '@cname',
        defaultName: '@ctitle',
        haveLevelBean: 3400,
        nextLevelBean: '@integer',
        levelList: [
          {
            defaultName: '@ctitle',
            levelBean: 0
          },
          {
            defaultName: '@ctitle',
            levelBean: 1000
          },
          {
            defaultName: '@ctitle',
            levelBean: 2000
          },
          {
            defaultName: '@ctitle',
            levelBean: 3000
          },
          {
            defaultName: '@ctitle',
            levelBean: 5000
          },
          {
            defaultName: '@ctitle',
            levelBean: 6000
          },
          {
            defaultName: '@ctitle',
            levelBean: 9000
          },
          {
            defaultName: '@ctitle',
            levelBean: 10000
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/members/levelBeanList',
    method: 'get',
    response: resData(
      mockList(
        {
          type: '@pick([1,2])',
          levelBean: '@integer',
          orderNo: '@id',
          oldLevelName: '@cname',
          createTime: '@datetime'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/members/integralList',
    method: 'get',
    response: resData(
      mock({
        totalIntegral: '@integer',
        integralList: {
          total: 99,
          rows: [
            {
              type: '@pick([1,2])',
              integral: '@integer',
              orderNo: '@id',
              oldIntegral: '@cname',
              createTime: '@datetime',
              validTime: '@datetime'
            },
            {
              type: '@pick([1,2])',
              integral: '@integer',
              orderNo: '@id',
              oldIntegral: '@cname',
              createTime: '@datetime',
              validTime: '@datetime'
            },
            {
              type: '@pick([1,2])',
              integral: '@integer',
              orderNo: '@id',
              oldIntegral: '@cname',
              createTime: '@datetime',
              validTime: '@datetime'
            },
            {
              type: '@pick([1,2])',
              integral: '@integer',
              orderNo: '@id',
              oldIntegral: '@cname',
              createTime: '@datetime',
              validTime: '@datetime'
            }
          ]
        }
      })
    )
  },
  {
    url: '/cbd-api-project/members/integral/integral',
    method: 'get',
    response: resData(
      mock({
        validIntegral: '@integer',
        protectIntegral: '@integer',
        grantIntegral: '@integer',
        consumeIntegral: '@integer',
        common: {
          validType: '@pick([1,2,3])',
          valid: '@pick([1,2,3])',
          validUnit: '@pick([1,2,3])',
          fixedMonth: '@pick([1,2,3,4,5,6,7,8,9,10,11,12])',
          fixedDay: '@pick([1,2,3,4,5,6,7,8,9,10,11,12,13])',
          protectStatus: '@pick([1,2,3])',
          protectDay: '@pick([1,2,3,4,5,6,7,8,9,10,11,12,13])',
          limitStatus: '@pick([1,2])',
          maxIntegral: '@integer'
        },
        consume: {
          ruleStatus: '@pick([1,2])',
          cillType: '@pick([1,2])',
          cillAmount: '@integer',
          limitType: '@pick([1,2,3])',
          limitAmount: '@integer',
          exchangeRate: '@integer'
        },
        obtain: {
          id: '@id',
          amount: '@integer',
          integral: '@integer'
        }
      })
    )
  },
  {
    url: '/cbd-api-project/members/integral/integralObtainSave',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/members/integral/integralObtain',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        amount: '@integer',
        integral: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/members/integral/integralConsumeSave',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/members/integral/integralConsume',
    method: 'get',
    response: resData(
      mock({
        exchangeRate: '@integer',
        ruleStatus: '@pick([1,2])',
        cillType: '@pick([1,2])',
        cillAmount: '@integer',
        limitType: '@pick([1,2,3])',
        limitAmount: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/members/integral/integralCommonSave',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/members/integral/integralCommon',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        validType: '@pick([1,2,3])',
        validUnit: '@pick([1,2,3])',
        valid: '@integer',
        fixedMonth: '@integer',
        fixedDay: '@integer',
        protectStatus: '@pick([1,2])',
        protectDay: '@integer',
        limitStatus: '@pick([1,2])',
        maxIntegral: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/members/level/list',
    method: 'get',
    response: resData(
      mockList(
        {
          id: '@id',
          name: '@cname',
          defaultName: '@cname',
          levelBean: '@integer',
          rights: ['吃饭', '睡觉', '打豆豆']
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/members/level/detail/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        name: '@cname',
        defaultName: '@cname',
        levelBean: '@integer',
        levelRightList: [
          {
            id: 1,
            checked: '@boolean',
            rightsName: '@ctitle',
            rightsValue: '@pick([5,45,48,7,40])'
          },
          {
            id: 2,
            checked: '@boolean',
            rightsName: '@ctitle',
            rightsValue: '@pick([5,45,48,7,40])'
          },
          {
            id: 3,
            checked: '@boolean',
            rightsName: '@ctitle',
            rightsValue: '@pick([5,45,48,7,40])'
          },
          {
            id: 4,
            checked: '@boolean',
            rightsName: '@ctitle',
            rightsValue: ''
          }
        ],
        rightsCouponList: [
          {
            'id|+1': 1,
            'name': '@ctitle',
            'type': '@pick([1,2,3,4])',
            'useThreshold': '@ctitle',
            'remnantInventory': '@pick([5,45,48,7,40])',
            'giveQuantity': '@pick([5,4,8,7,10])'
          },
          {
            'id|+1': 1,
            'name': '@ctitle',
            'type': '@pick([1,2,3,4])',
            'useThreshold': '@ctitle',
            'remnantInventory': '@pick([5,45,48,7,40])',
            'giveQuantity': '@pick([5,4,8,7,10])'
          }
        ]
      })
    )
  },

  {
    url: '/cbd-api-project/members/level/bean/ruleList',
    method: 'get',
    response: resData(
      mock([
        {
          id: 1,
          amount: '@integer',
          levelBean: '@integer'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/members/level/bean/ruleDetail',
    method: 'get',
    response: resData(
      mock({
        amount: '@integer',
        levelBean: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/members/level/bean/ruleSave',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/members/level/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/members/rights/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@cname',
          'showName': '@ctitle',
          'icon': {
            id: '@id',
            name: '@cname',
            type: 'image/png',
            size: 2000,
            previewAddress:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
          },
          'remark': '@title',
          'serviceMode': '@pick([1])',
          'status': '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 4 }
      )
    )
  },
  {
    url: '/cbd-api-project/members/rights/detail/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        name: '@ctitle',
        serviceMode: '@pick([1])',
        showName: '@ctitle',
        remark: '@ctitle',
        icon: {
          id: '@id',
          name: '@cname',
          type: 'image/png',
          size: 2000,
          previewAddress:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
        },
        applyType: '@pick([1,2,3])',
        rightsStoreList: [
          {
            id: '@id',
            storeName: '@ctitle',
            manageName: '@ctitle',
            provinceCode: '@integer',
            provinceName: '@cname',
            cityCode: '@integer',
            cityName: '@ctitle',
            districtCode: '@integer',
            districtName: '@ctitle',
            contacts: '@cname',
            contactsPhone: '@phone',
            spaceApplyType: '@pick([1,2,3])',
            spaceIds: [1, 2, 3],
            pdtApplyType: '@pick([1,2,3])',
            productIds: [1, 2, 3]
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/common/store/selectPage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'storeName': '@cname',
          'manageName': '@ctitle',
          'provinceCode': '@integer',
          'provinceName': '@ctitle',
          'cityCode': '@integer',
          'cityName': '@ctitle',
          'districtCode': '@integer',
          'districtName': '@ctitle',
          'contacts': '@cname',
          'contactsPhone': '@phone'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/product/selectPage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'productName': '@cname',
          'classifyName': '@ctitle',
          'brandName': '@ctitle',
          'unitName': '@ctitle',
          'specValueNames': '@ctitle',
          'salePrice': '@integer',
          'availableNum': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/space/selectPage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@cname',
          'classify': '@ctitle',
          'calType': '@ctitle',
          'code': '@integer',
          'price': '@integer',
          'availableNum': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/venue/classify',
    method: 'get',
    response: resData(
      mock([
        {
          id: 1,
          sort: 1,
          name: '@cname',
          remark: '@ctitle'
        },
        {
          id: 2,
          sort: 2,
          name: '@cname',
          remark: '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/members/rights/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/market/coupon/page',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'type': '@pick([1,2,3,4])',
          'status': '@pick([1,2,3])',
          'threshold': '@ctitle',
          'stock': '@integer',
          'receivedNum': '@integer',
          'usedNum': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/market/coupon/nullify/:id',
    method: 'GET',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/market/coupon/info/:id',
    method: 'GET',
    response: resData(
      mock({
        id: '@id',
        name: '@ctitle',
        stock: '@integer',
        type: '@pick([1,2,3,4])',
        fullReducedAmount: '@integer',
        integral: '@integer',
        deductionAmount: '@integer',
        discount: '@integer',
        maximumDiscount: '@integer',
        applicationScopeStore: {
          type: '@pick([1,2,3])',
          storeList: [
            {
              id: '@id',
              name: '@ctitle',
              scenes: '@ctitle',
              area: '@ctitle',
              contactUser: '@cname',
              phone: '@phoneNumber',
              venueType: '@pick([1,2,3])',
              productType: '@pick([1,2,3])'
            }
          ]
        },
        thresholdAmount: '@integer',
        effectiveDate: {
          type: '@pick([1,2,3])',
          fixedStartDate: '@datetime',
          fixedEndDate: '@datetime',
          delay: '@integer',
          expire: '@integer'
        },
        instruction: '@ctitle',
        claimRestrictions: {
          recipient: {
            type: '@pick([1,2])',
            memberLevelList: [1, 2, 3]
          },
          perPerson: {
            type: '@pick([1,2])',
            number: '@integer'
          }
        }
      })
    )
  },
  {
    url: '/cbd-api-project/market/coupon/application/venuePage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'classify': '@ctitle',
          'code': '@integer',
          'calType': '@ctitle',
          'price': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/market/coupon/application/productPage',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'name': '@ctitle',
          'classify': '@ctitle',
          'band': '@integer',
          'unit': '@integer',
          'specValueNames': '@ctitle',
          'stock': '@integer',
          'price': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/market/coupon/pageOperatingInformation',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'userCode': '@integer',
          'userNickName': '@cname',
          'memberLevel': '@cname',
          'phone': '@phone',
          'ReceivingDate': '@datetime',
          'usedDate': '@datetime',
          'orderNo': '@integer',
          'stock': '@integer',
          'price': '@integer'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },

  {
    url: '/cbd-api-project/market/coupon/basicOperatingInformation/:id',
    method: 'GET',
    response: resData(
      mock({
        name: '@ctitle',
        type: '@pick([1,2,3,4])',
        stock: '@integer',
        status: '@pick([1,2,3])',
        receivedNum: '@integer',
        usedNum: '@integer'
      })
    )
  },
  {
    url: '/cbd-api-project/market/coupon/add',
    method: 'post',
    response: resData(mock({}))
  },
  /**
   * @params
   * 账户进件 相关 mock
   */
  {
    url: '/cbd-api-project/dashboard/operational/projectRentStatistics',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      projectRents: [
        {
          month: '1',
          projectName: '@ctitle',
          rentAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        },
        {
          month: '2',
          projectName: '@ctitle',
          rentAmounts: [125, 24, 332, 44, 567, 676, 73, 85, 89, 910, 11, 152]
        },
        {
          month: '3',
          projectName: '@ctitle',
          rentAmounts: [13, 312, 83, 4, 605, 506, 7, 458, 209, 310, 11, 12]
        },
        {
          month: '5',
          projectName: '@ctitle',
          rentAmounts: [31, 82, 3, 4, 55, 697, 767, 87, 9, 100, 11, 102]
        },
        {
          month: '4',
          projectName: '@ctitle',
          rentAmounts: [125, 24, 332, 544, 567, 676, 73, 875, 89, 910, 11, 152]
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/dashboard/operational/formAnalysis',
    method: 'GET',
    response: resData({
      forms: [
        '餐饮',
        '零售',
        '生鲜',
        '汽车',
        '美妆',
        '家具',
        '健身',
        '家电',
        '投资',
        '彩票',
        '打工',
        '敲代码'
      ],
      rentAmounts: [
        1222, 2567, 3858, 6667, 6576, 6666, 7565, 8435, 5439, 4656, 1341, 1432
      ],
      rentAreas: [311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132]
    })
  },
  {
    url: '/cbd-api-project/dashboard/operational/contractAmountStatistics',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      amounts: [311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132],
      numbers: [1222, 2567, 3858, 667, 576, 666, 565, 435, 439, 656, 1341, 1432]
    })
  },
  {
    url: '/cbd-api-project/dashboard/operational/estateRentStatisticsByMonth',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      rentAmounts: [
        1222, 2567, 3858, 667, 576, 666, 565, 435, 439, 656, 1341, 1432
      ],
      rentAreas: [123, 244, 1432, 162, 65, 732, 565, 435, 439, 656, 1341, 1432]
    })
  },
  {
    url: '/cbd-api-project/dashboard/operational/estateRentStatisticsByCategory',
    method: 'GET',
    response: resData({
      categories: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      datas: [
        { category: '@ctitle', rentAmount: 122, rentArea: 376 },
        { category: '@ctitle', rentAmount: 233, rentArea: 436 },
        { category: '@ctitle', rentAmount: 2021, rentArea: 432 },
        { category: '@ctitle', rentAmount: 423, rentArea: 265 },
        { category: '@ctitle', rentAmount: 2233, rentArea: 544 },
        { category: '@ctitle', rentAmount: 156, rentArea: 543 },
        { category: '@ctitle', rentAmount: 2233, rentArea: 544 },
        { category: '@ctitle', rentAmount: 156, rentArea: 543 }
      ]
    })
  },
  {
    url: '/cbd-api-project/dashboard/operational/estateUnRentStatisticsByCategory',
    method: 'GET',
    response: resData({
      categories: [
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname'
      ],
      unRentNum: [122, 2567, 858, 667, 576, 666, 565, 435, 439, 656, 141, 142],
      unRentArea: [311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/projectIncomeStatistics',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      projectIncomes: [
        {
          month: '1',
          projectName: '@ctitle',
          incomeAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        },
        {
          month: '1',
          projectName: '@ctitle',
          incomeAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        },
        {
          month: '1',
          projectName: '@ctitle',
          incomeAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        },
        {
          month: '1',
          projectName: '@ctitle',
          incomeAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        },
        {
          month: '1',
          projectName: '@ctitle',
          incomeAmounts: [31, 82, 3, 4, 55, 67, 767, 87, 9, 10, 11, 102]
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/formIncomeAnalysis',
    method: 'GET',
    response: resData({
      forms: [
        '餐饮',
        '零售',
        '生鲜',
        '汽车',
        '美妆',
        '家具',
        '健身',
        '家电',
        '投资',
        '彩票',
        '打工',
        '敲代码'
      ],
      incomeAmounts: [
        1222, 2567, 3858, 6667, 6576, 6666, 7565, 8435, 5439, 4656, 1341, 1432
      ],
      incomeNums: [311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/receivableStatistics',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      amounts: [311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/receiptStatistics',
    method: 'GET',
    response: resData({
      months: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      amounts: [1222, 2567, 3858, 667, 576, 666, 565, 435, 439, 656, 1341, 1432]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/receiptStatisticsByCategory',
    method: 'GET',
    response: resData({
      categories: [
        '2021-1',
        '2021-2',
        '2021-3',
        '2021-4',
        '2021-5',
        '2021-6',
        '2021-7',
        '2021-8',
        '2021-9',
        '2021-10',
        '2021-11',
        '2021-12'
      ],
      datas: [
        { category: '@ctitle', receivableAmount: 122, receiptAmount: 376 },
        { category: '@ctitle', receivableAmount: 233, receiptAmount: 436 },
        { category: '@ctitle', receivableAmount: 2021, receiptAmount: 432 },
        { category: '@ctitle', receivableAmount: 423, receiptAmount: 265 },
        { category: '@ctitle', receivableAmount: 2233, receiptAmount: 544 },
        { category: '@ctitle', receivableAmount: 156, receiptAmount: 543 }
      ]
    })
  },
  {
    url: '/cbd-api-project/dashboard/financial/estateArrearageStatistics',
    method: 'GET',
    response: resData({
      categories: [
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname',
        '@cname'
      ],
      arrearageAmount: [
        122, 2567, 858, 667, 576, 666, 565, 435, 439, 656, 141, 142
      ],
      arrearageDays: [
        311, 512, 333, 466, 655, 633, 547, 844, 559, 140, 131, 132
      ]
    })
  },
  {
    url: '/cbd-api-project/bill/list',
    method: 'get',
    response: resData(
      mockList(
        {
          orderNo: '@id',
          code: '@id',
          billNo: '@id',
          name: '@ctitle',
          billAmount: '@integer',
          createTime: '@datetime',
          status: '@pick([1,2,3])',
          payWay: '@ctitle',
          payChannel: '@ctitle'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/activity/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'name': '@ctitle',
          'payType': '@pick([1,2,3])',
          'signupFee': '@integer',
          'maxSignupNum': '@integer',
          'signupNum': '@integer',
          'usedNum': '@integer',
          'activityStartDate': '@datetime',
          'activityEndDate': '@datetime',
          'signupStartDate': '@datetime',
          'signupEndDate': '@datetime',
          'status': '@pick([-1,1,2,3,4,5,6,7])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/activity/info/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id',
        code: '@id',
        activityType: '@pick([1,2])',
        name: '@ctitle',
        address: '@address',
        maxSignupNum: '@integer',
        memberLevel: '@ctitle',
        payType: '@pick([1,2,3])',
        signupFee: '@integer',
        warmUpStartDate: '@datetime',
        warmUpEndDate: '@datetime',
        signupStartDate: '@datetime',
        signupEndDate: '@datetime',
        activityStartDate: '@datetime',
        activityEndDate: '@datetime',
        coverPic: {
          id: '@id',
          name: '@ctitle',
          type: 'image/png',
          size: 500,
          previewAddress:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2F%2Fpic%2F1%2Fa1%2Fed8fc0616a.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659769453&t=77677cc169b1116998b31581e62a2e4d'
        },
        activityPic: [
          {
            id: '@id',
            name: '@ctitle',
            type: 'image/png',
            size: 500,
            previewAddress:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2F%2Fpic%2F1%2Fa1%2Fed8fc0616a.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659769453&t=77677cc169b1116998b31581e62a2e4d'
          },
          {
            id: '@id',
            name: '@ctitle',
            type: 'image/png',
            size: 500,
            previewAddress:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2F%2Fpic%2F1%2Fa1%2Fed8fc0616a.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659769453&t=77677cc169b1116998b31581e62a2e4d'
          }
        ],
        detail: '@title',
        status: '@pick([-1,1,2,3,4,5,6,7])',
        activityStore: [
          {
            name: '@ctitle',
            format: '@ctitle',
            address: '@address',
            linkman: '@cname',
            linkTel: '@phoneNumber'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/activity/cancel/:id',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/activity/operation-info/:id',
    method: 'get',
    response: resData(
      mock({
        signupInfo: {
          name: '@ctitle',
          maxSignupNum: '@integer',
          status: '@pick([1,2,3])',
          signupNum: '@integer',
          verificationNum: '@integer'
        },
        pieChart: {
          pieCharDataList: [
            {
              levelName: '会员等级一',
              num: 300
            },
            {
              levelName: '会员等级二',
              num: 500
            },
            {
              levelName: '会员等级三',
              num: 652
            },
            {
              levelName: '会员等级四',
              num: 125
            }
          ]
        },
        barGraph: {
          payType: '@pick([1,2,3])',
          dateList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          barGraphDataList: [
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              amount: '@integer'
            }
          ],
          lineChartDataList: [
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: 6
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: 3
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: 50
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            },
            {
              date: '@datetime',
              showDate: '@datetime',
              signupNum: '@integer'
            }
          ]
        }
      })
    )
  },
  {
    url: '/cbd-api-project/activity-signup/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'code': '@id',
          'userName': '@cname',
          'userPhone': '@phone',
          'userLevel': '@ctitle',
          'payType': '@pick([1,2,3])',
          'signupFee': '@integer',
          'status': '@pick([1,2,3])',
          'cardStatus': '@pick([1,2,3,4])',
          'verificationTime': '@datetime',
          'verificationMerchant': '@ctitle'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/members/level/select',
    method: 'get',
    response: resData(
      mock([
        {
          'value|+1': 1,
          'label': '@cname'
        },
        {
          'value|+1': 2,
          'label': '@cname'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/activity/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/activity-type/list',
    method: 'GET',
    response: resData(
      mock([
        {
          'id|+1': 1,
          'sort|+1': '1',
          'name': '@ctitle'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/activity-type/delete/:id',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/activity-type/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/activity-type/edit',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest/expenses/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle',
          'code': '@id',
          'type': '@pick([1,2])',
          'settleMode': '@pick([1,2])',
          'planName': '@ctitle',
          'status': '@pick([1,2,3,4,5])',
          'estateName': '@ctitle',
          'contractCode': '@id',
          'merchantName': '@cname',
          'channelName': '@cname',
          'period': '@date',
          'adjustedAmount': '@integer',
          'businessStatus': '@pick([1,2,3])',
          'verifyStatus': '@pick([1,2,3,4,5])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/invest/expenses/period/select',
    method: 'get',
    response: resData(
      mock([
        {
          label: '@cname',
          value: '@id'
        },
        {
          label: '@cname',
          value: '@id'
        }
      ])
    )
  },
  {
    url: '/cbd-api-project/invest/expenses/info',
    method: 'get',
    response: resData(
      mock({
        id: 1,
        verifyStatus: '@pick([1,2,3,4,5])',
        businessStatus: '@pick([1,2,3])',
        baseInfo: {
          projectName: '@ctitle',
          planName: '@ctitle',
          channelName: '@ctitle',
          settleMode: '@ctitle',
          paymentMethod: '@ctitle',
          billGenDate: '@ctitle',
          contractCode: '@ctitle'
        },
        originalBill: {
          type: 1,
          settleMode: '@pick([1,2])',
          taxIncluded: 2,
          paymentMethod: '@ctitle',
          billGenDate: '@date',
          period: '@date',
          amount: 3000,
          taxRate: 0.03,
          taxExcludedAmount: '@integer',
          taxAmount: '@integer',
          totalAmount: '@integer'
        },
        expensesAdjust: [
          {
            type: 1,
            beforeAmount: 3000,
            afterAmount: 3100,
            adjustAmount: '@integer',
            taxAmount: '@integer',
            totalAmount: '@integer',
            remark: '@ctitle',
            history: '@pick([0,1])'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/invest/expenses/batch/confirm',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest/expenses/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/invest/expenses/confirm',
    method: 'post',
    response: resData(mock({}))
  }
]);
