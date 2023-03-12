import { create, mockList, mockList1, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/cbd-api-project/estate/energyConsume/device/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle(6)',
          'buildingName': '@ctitle(5)',
          'buildingFloorName': '@ctitle(4)',
          'deviceCode': '@id()',
          'deviceName': '@ctitle(5)',
          'deviceType': '@pick([1,2,3])',
          'intelligentDevice': '@pick([1,2])',
          'estateSnapshotName': '@ctitle(4)'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/common/estate/selectList',
    method: 'get',
    response: resData(
      mockList(
        {
          estate: {
            id: '@id()',
            projectId: '@id()',
            projectName: '@ctitle(6)',
            buildingId: '@id()',
            buildingName: '@ctitle(5)',
            floorId: '@id()',
            floorName: '@ctitle(4)',
            doorPlate: '@integer(600, 1000)',
            categoryId: '@id()',
            categoryName: '@ctitle(4)',
            code: '@guid()',
            acreage: '@float(90, 200,1,2)',
            provinceCode: '@guid()',
            provinceName: '@ctitle(4)',
            cityCode: '@id()',
            cityName: '@ctitle(4)',
            districtCode: '@id()',
            districtName: '@ctitle(4)',
            address: '@ctitle(12)',
            status: '@pick([1,2,3])',
            remark: '@cword(12)',
            useAcreage: '@float(90, 150,1,2)',
            bottomDayRent: '@integer',
            bottomMonthRent: '@integer',
            datumDayRent: '@integer',
            datumMonthRent: '@integer'
          },
          value: '@integer',
          label: '@ctitle(4)',
          formatId: '@id()'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/device/add',
    method: 'post',
    response: resData(
      mock({
        code: 200,
        msg: '成功',
        data: null
      })
    )
  },
  {
    url: '/cbd-api-project/common-mis/selectExpense',
    method: 'get',
    response: resData(
      mockList1(
        {
          expenseId: '@integer(600, 1000)',
          expenseKeyCode: '@id()',
          expenseCode: '@id()',
          expenseType: '@ctitle(4)',
          chargingMethod: '@pick([1,2])',
          print: '@pick([0,1])'
        },
        5
      )
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/bill/calculation',
    method: 'put',
    response: resData(
      mockList1(
        {
          'id|+1': 1,
          'storeBillDetail': [
            {
              billStartDate: '2023-01-28',
              billEndDate: '2023-01-29',
              merchantName: '测试商户1',
              merchantId: '123',
              storeName: '测试店铺1',
              storeId: '232',
              snapshotName: '测试铺位1',
              snapshotId: '456',
              totalCost: 500
            },
            {
              billStartDate: '2023-01-28',
              billEndDate: '2023-01-29',
              merchantName: '测试商户2',
              merchantId: '124',
              storeName: '测试店铺2',
              storeId: '233',
              snapshotName: '测试铺位2',
              snapshotId: '457',
              totalCost: 500
            }
          ]
        },
        2
      )
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/bill/editInit',
    method: 'get',
    response: resData(
      mockList1(
        {
          deviceId: '@id()',
          recordId: '@id()',
          deviceCode: '@guid()',
          deviceName: '@ctitle(5)',
          brand: '@ctitle(6)',
          deviceType: '@pick([1,2,3])',
          expenseItem: '@id()',
          expenseItemName: '@ctitle(5)',
          price: '@float(100, 200, 1, 2)',
          rateType: '@pick([1,2])',
          rateNum: '@integer(200, 500)',
          previousMeterReadingDate: '2023-01-29',
          previousReadOutNum: '@integer(200, 500)',
          previousPrice: '@integer(10, 100)',
          previousCost: '@integer(500, 1000)',
          currentMeterReadingDate: '2023-02-06',
          currentReadOutNum: '@integer(300, 500)',
          currentPrice: '@float(10, 100 ,1,2)',
          currentCost: '@integer(600, 800)',
          storeList: [
            {
              billStartDate: '2023-01-28',
              billEndDate: '2023-01-29',
              merchantName: '@ctitle(5)',
              merchantId: '@id()',
              storeName: '@ctitle(7)',
              storeId: '@id()',
              snapshotName: '@ctitle(6)',
              snapshotId: '@id()',
              totalCost: '@integer(300, 1000)'
            },
            {
              billStartDate: '2023-01-28',
              billEndDate: '2023-01-29',
              merchantName: '@ctitle(5)',
              merchantId: '@id()',
              storeName: '@ctitle(7)',
              storeId: '@id()',
              snapshotName: '@ctitle(6)',
              snapshotId: '@id()',
              totalCost: '@integer(300, 1000)'
            }
          ]
        },
        2
      )
    )
  },
  {
    url: '/cbd-api-project/common/device/selectList',
    method: 'get',
    response: resData(
      mockList1(
        {
          value: '@integer(600, 1000)',
          label: '@ctitle(4)',
          code: '@id()'
        },
        5
      )
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/device/info/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@integer(990, 1000)',
        projectId: 820000197105072014,
        projectName: '@ctitle(4)',
        buildingId: 370000197011292607,
        buildingFloorIds: [2],
        estateSnapshotIds: [853],
        estateSnapshotList: [
          {
            estateSnapshotId: 853,
            buildingName: '@ctitle(4)',
            buildingId: '@integer(600, 1000)',
            buildingFloorName: '@ctitle(4)',
            buildingFloorId: '@integer(600, 1000)',
            estateSnapshotName: '@ctitle(5)',
            estateSnapshotCode: '@id()',
            acreage: '@float(90,200,1,2)',
            useAcreage: '@float(90,200,1,2)'
          },
          {
            estateSnapshotId: 865,
            buildingName: '@ctitle(4)',
            buildingId: '@integer(600, 1000)',
            buildingFloorName: '@ctitle(4)',
            buildingFloorId: '@integer(600, 1000)',
            estateSnapshotName: '@ctitle(5)',
            estateSnapshotCode: '@id()',
            acreage: '@float(90,200,1,2)',
            useAcreage: '@float(90,200,1,2)'
          }
        ],
        deviceType: '@pick([1,2,3])',
        deviceCode: '@id()',
        deviceName: '@ctitle(5)',
        intelligentDevice: '@pick([1,2])',
        expenseItem: 885,
        expenseItemName: '@ctitle(5)',
        rate: '@integer(10, 20)',
        deviceMaxReadOut: '@integer(8888, 9999)',
        lossRate: '@integer(10, 20)',
        previousMeterReadingDate: '2023-01-29',
        nowReadOutNum: '@integer(100, 900)',
        price: '@float(1000, 2000, 1 ,2)',
        rateType: '@pick([1,2])',
        rateNum: '@integer(50, 120)',
        hardwareCode: '@guid()',
        brand: '@ctitle(5)',
        ecRecordState: '@pick([1,2])'
      })
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/info/:id',
    method: 'get',
    response: resData(
      mock({
        id: '@id()',
        projectId: '@integer(2000, 9999)',
        projectName: '@ctitle(5)',
        buildingId: '@id()',
        buildingName: '@ctitle(4)',
        buildingFloorId: '@id()',
        buildingFloorName: '@ctitle(6)',
        deviceType: '@pick([1,2,3])',
        deviceId: '@integer(2000, 9999)',
        deviceCode: '@guid()',
        deviceName: '@ctitle(3)',
        status: '@pick([1,2])',
        billId: '@id()',
        previousMeterReadingDate: '2023-01-29',
        previousReadOutNum: '@integer(200, 500)',
        previousPrice: '@float(10,100, 1, 2)',
        currentMeterReadingDate: '2023-02-05',
        currentReadOutNum: '@integer(100, 600)',
        currentPrice: '@float(30,100, 1, 2)',
        currentStartDate: '2023-01-28',
        currentEndDate: '2023-01-29',
        currentEnergyConsumptionNum: '@integer(10000, 20000)',
        currentCost: '@integer(10000, 20000)'
      })
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/bill/info/:id',
    method: 'get',
    response: resData(
      mock({
        'deviceId': '@id()',
        'deviceCode': '@guid()',
        'deviceName': '@ctitle(5)',
        'brand': '@ctitle(6)',
        'deviceType': '@pick([1,2,3])',
        'expenseItem': '@id()',
        'expenseItemName': '@ctitle(5)',
        'price': '@float(100, 200, 1, 2)',
        'rateType': '@pick([1,2])',
        'rateNum': '@integer(200, 500)',
        'previousMeterReadingDate': '2023-01-29',
        'previousReadOutNum': '@integer(200, 500)',
        'previousPrice': '@integer(10, 100)',
        'previousCost': '@integer(500, 1000)',
        'currentMeterReadingDate': '2023-02-06',
        'currentReadOutNum': '@integer(300, 500)',
        'currentPrice': '@float(10, 100 ,1,2)',
        'currentCost': '@integer(600, 800)',
        'storeList|1-5': [
          {
            billStartDate: '2023-01-28',
            billEndDate: '2023-01-29',
            merchantName: '@ctitle(5)',
            merchantId: '@id()',
            storeName: '@ctitle(7)',
            storeId: '@id()',
            snapshotName: '@ctitle(6)',
            snapshotId: '@id()',
            totalCost: '@integer(300, 1000)'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/importPreview/:resourceId',
    method: 'get',
    response: resData(
      mock({
        'successDataList|2-3': [
          {
            projectName: '@ctitle(6)',
            buildingName: '@ctitle(7)',
            buildingFloorName: '@ctitle(8)',
            deviceType: '@pick([1,2])',
            deviceName: '@ctitle(4)',
            currentMeterReadingDate: '2023-02-06',
            currentReadOutNum: '@integer(200, 500)',
            currentPrice: '@float(10, 100 ,1,2)',
            rowNum: '@integer(10, 100)'
          }
        ],
        'failDataList|1-2': [
          {
            projectName: '@ctitle(6)',
            buildingName: '@ctitle(7)',
            buildingFloorName: '@ctitle(8)',
            deviceType: '@pick([1,2])',
            deviceName: '@ctitle(4)',
            currentMeterReadingDate: '2023-02-06',
            currentReadOutNum: '@integer(200, 500)',
            currentPrice: '@float(10, 100 ,1,2)',
            rowNum: '@integer(10, 100)',
            errorMsg: '@ctitle(16)'
          }
        ]
      })
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/device/update',
    method: 'put',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/bill/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/device/remove/:id',
    method: 'delete',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/remove/:id',
    method: 'delete',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/editInit/:id',
    method: 'get',
    response: resData(
      mock({
        previousMeterReadingDate: '2023-01-28',
        previousReadOutNum: '@integer(500, 1200)',
        previousPrice: 90
      })
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/list',
    method: 'get',
    response: resData(
      mockList(
        {
          'id|+1': 1,
          'projectName': '@ctitle(6)',
          'projectId': '@id()',
          'buildingName': '@ctitle(5)',
          'buildingId': '@id()',
          'buildingFloorName': '@ctitle(4)',
          'buildingFloorId': '@id()',
          'recordCode': '@id()',
          'deviceCode': '@id()',
          'deviceName': '@ctitle(5)',
          'deviceType': '@pick([1,2,3])',
          'currentMeterReadingDate': '2023-02-01',
          'previousReadOutNum': '@integer(100, 900)',
          'currentReadOutNum': '@integer(100, 900)',
          'currentEnergyConsumptionNum': '@integer(1500, 2000)',
          'status': '@pick([1,2])'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/update',
    method: 'put',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/export',
    method: 'get',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/estate/energyConsume/record/importConfirm/:resourceId',
    method: 'get',
    response: resData(mock({}))
  }
]);
