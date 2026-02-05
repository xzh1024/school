/*
 ** 名称：处理单-关单-更新经销商投诉单
 ** 编码：DEAL_CLOSE_UPDATE_DEALERCOMPLAINT
 ** 业务对象：事件单
 ** 执行顺序：1001
 */

var incidentId = $GetValue('_parentId') || $GetValue('id')
var tenantNum = $GetCurrentTenant().tenantNum
$Print('处理单-关单-id', incidentId)

var infoData = $GetBusinessObject('INCIDENT', incidentId, [
  'parent_id',
  'service_item_id',
  't_complaint_form_no'
])
$Print('处理单-关单-infoData', infoData)
var er_syd = $SearchBusinessObject(
  'INCIDENT',
  {
    number: infoData['t_complaint_form_no']
    // service_item_id: '633958439861358592' // 服务目录-投诉单
  },
  ['id']
)

$Print('处理单-关单-er_syd', er_syd)
$Print('处理单-关单-er_syd-id', er_syd[0])

// var dealerId = '' // 经销商投诉单id
function getOrderData(id) {
  var fd = $GetBusinessObject('INCIDENT', id, ['parent_id', 'service_item_id'])
  var parentId = fd['parent_id']
  $Print('处理单-关单-fd', fd)
  $Print('处理单-关单-parentId', parentId)
  if (parentId) {
    // 更新经销商投诉单
    var parentData = submitByCode('INCIDENT', {
      _status: 'update',
      id: parentId,
      t_approval_status: 'DECIDED' // 已裁定
    })
    $Print('处理单-关单-parentData:' + parentData)
  }
}
if (er_syd && er_syd.length) {
  getOrderData(er_syd[0]['id'])
}

function submitByCode(bo, params) {
  var body = {
    requestParamMap: {
      businessObjectCode: bo
    },
    payload: JSON.stringify(params)
  }
  try {
    var response = $CallInterface(
      tenantNum,
      'LOW_CODE',
      'BOSUB',
      JSON.stringify(body)
    )
    var responseNode = JSON.parse(response)
    return responseNode['id']
  } catch (error) {
    $Print('Error submitting by code: ' + error)
    return null // Return null if submission fails
  }
}
