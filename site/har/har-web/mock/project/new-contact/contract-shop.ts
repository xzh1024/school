import { create, resData } from '../../utils';
import { mock } from 'mockjs';
//货品组下拉
export default create([
  {
    url: '/cbd-api-project/formal/contract/berth/save',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/cbd-api-project/formal/contract/berth/info/:contractId',
    method: 'GET',
    response: resData(
      mock({
        contractId: '1',
        projectId: '1',
        projectName: '测试',
        categoryId: 1,
        misContractBerthDetailVos: [
          {
            buildingId: 1,
            buildingName: '@ctitle',
            floorId: 2,
            floorName: '@ctitle',
            doorPlate: '@code',
            acreage: 400,
            useAcreage: 100,
            mainBerth: 1
          },
          {
            buildingId: 1,
            buildingName: '@ctitle',
            floorId: 3,
            floorName: '@ctitle',
            doorPlate: '@code',
            acreage: 300,
            useAcreage: 200,
            mainBerth: 0
          }
        ]
      })
    )
  }
]);
