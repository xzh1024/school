/*
 * @Author: yangluxi
 * @Date: 2025-12-08 11:39:28
 * @LastEditors: yangluxi
 * @LastEditTime: 2026-01-23 09:59:32
 * @FilePath: /script_backups_code/AISM/工单默认处理流程/知会添加参与人业务规则.js
 * @Description: 
 */

var tenantNum = $GetCurrentTenant().tenantNum;
var incidentId = $GetValue('_parentId') || $GetValue('id');

$Print("debug02 incidentId===", incidentId);

/* 拿到多选框的选择的人员 */
var persons = $SearchBusinessObject('ADD_PARTNER1', {
  'incident_id': incidentId,
}, ['incident_participant_id', 'id', 'incident_participant_id:real_name']);

$Print("debug02 拿到多选框的选择的人员===", persons);

var participantPramas = [];

/* 将人员添加到事件单参与者里面 */
if (persons.length) {
  persons.forEach(function (item) {

    var payload = {
      'task_id': incidentId,
      'participant_user_id': item['incident_participant_id'],
      'participant_id': item['incident_participant_id'],
      'type': 'USER',
      'add_type': 'AUTO_ADD',
      '_status': 'create'
    };
    submitByCode('INCIDENT_PARTICIPANT', payload);

    var payload_2 = {
      't_incident_id': incidentId,
      't_participant_user_id': item['incident_participant_id'],
      't_participant_user_id': item['incident_participant_id'],
      'type': 'USER',
      'add_type': 'AUTO_ADD',
      '_status': 'create'
    };
    submitByCode('INFORM_PARTICIPANT', payload_2);

    participantPramas.push({
      'id': item['id'],
      '_status': 'delete', // create,delete
    })
  })
}

/* 删除本次选择数据 */
$SubmitBusinessObject('ADD_PARTNER1', participantPramas)


/* 定义提交创建事件单的函数  bo:业务对象， params：插入业务对象的数据*/
function submitByCode(bo, params) {
  var body = {
    requestParamMap: {
      businessObjectCode: bo,
    },
    payload: JSON.stringify(params),
  };

  $Print("debug02 创建业务对象完整参数===", JSON.stringify(body));

  var response = $CallInterface(
    String(tenantNum),
    "LOWCODE",
    "BOSUB",
    JSON.stringify(body)
  );

  $Print("debug02 创建业务对象返回===", response);

  var responseNode = JSON.parse(response);
  return responseNode["id"];
}


/* 查询所有的知会参与人 */
var persons = $SearchBusinessObject('INFORM_PARTICIPANT', {
  't_incident_id': incidentId,
}, ['t_participant_user_id', 'id', 't_participant_user_id:real_name']);

$Print("debug002 查询所有的知会参与人===", persons);

var names = '';
var ids = '';

persons = uniqueArrayCompat(persons, 't_participant_user_id')

if (persons.length) {
  persons.forEach(function (item) {
    if (item['t_participant_user_id:real_name']) {
      names = names + item['t_participant_user_id:real_name'] + ','
      ids = ids + item['t_participant_user_id'] + ','
    }
  })
}

function uniqueArrayCompat(arr, key) {
  var result = [];
  var lookup = {};

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var value = key ? item[key] : JSON.stringify(item);

    if (!lookup[value]) {
      lookup[value] = true;
      result.push(item);
    }
  }

  return result;
}

$SetValue('t_participate_names', names);
