/*
 ** 名称：投诉单-驳回重走后-取消
 ** 编码：UPDATE_PARENT_APPROVAL_STATUS
 ** 业务对象：事件单
 ** 执行顺序：1000
 */

var incidentId = $GetValue('_parentId') || $GetValue('id')
$Print('投诉单-取消-id', incidentId)
var tenantNum = $GetCurrentTenant().tenantNum

var fd = $GetBusinessObject('INCIDENT', incidentId, ['id', 'parent_id'])
$Print('投诉单-取消-fd', fd)
$Print('投诉单-取消-parent_id', fd['parent_id'])
if (fd['parent_id']) {
  // 更新经销商投诉单
  var parentData = submitByCode('INCIDENT', {
    _status: 'update',
    id: fd['parent_id'],
    t_approval_status: 'REGION_REJECTED' // 大区驳回
  })
  $Print('投诉单-取消-parentData:' + parentData)
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
    $Print('投诉单-取消-responseNode:' + responseNode)
    return responseNode['id']
  } catch (error) {
    $Print('Error submitting by code: ' + error)
    return null // Return null if submission fails
  }
}
