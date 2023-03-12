import { create, mockList, resData } from '../../utils';
import { mock } from 'mockjs';

export default create([
  {
    url: '/ground-pc-api/store/list',
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
    url: '/ground-pc-api/store/basic/add',
    method: 'post',
    response: resData(mock({}))
  },
  {
    url: '/ground-pc-api/store/basic/info/:id',
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
  }
]);
