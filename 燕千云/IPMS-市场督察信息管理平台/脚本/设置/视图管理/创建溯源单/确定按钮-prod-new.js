/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */
var tenantNum = $GetCurrentTenant().tenantNum

var tsd = $SearchBusinessObject(
  'INCIDENT',
  {
    number: $GetValue('number')
  },
  [
    'id',
    't_sales_division',
    'closed_by',
    't_business_department',
    't_sales_region',
    't_market_centre',
    'closed_by:department_id:parent_id:name',
    'closed_by:department_id:parent_id:parent_id:name',
    't_business_department_contacts:department_id:name'
  ]
)
var tackItem = {}
if (tsd && tsd.length > 0) {
  tsd.forEach(function (item) {
    if (item.id == $GetValue('id')) {
      tackItem = item
    }
  })
}

$Print('debug28 tsd=id' + $GetValue('id'))
$Print('debug28 tsd=' + tackItem, JSON.stringify(tsd))
var assignee = $GetBusinessObject('IAM_USER', $GetValue('assignee_person_id'), [
  'department_id:t_dept_desc_shrt',
  'department_id:t_p_dept_desc_shrt',
  'department_id:parent_id:t_p_dept_desc_shrt'
])
$Print('debug28 assignee=' + JSON.stringify(assignee))
var keys = [
  't_ocms',
  't_whether_qr_products',
  't_whether_cross_division',
  't_product_name_default',
  't_request_feedback_time',
  't_business_department_contacts',
  't_whether_traceability',
  't_traceability_method',
  'assignee_person_id',
  't_sy_attech',
  't_minimum_traceability',
  't_remark_instruction',
  't_advice'
]

var params = {
  _status: 'create',
  short_description:
    (tackItem['t_sales_division'] || '') + $GetValue('number') + '溯源单',
  t_complaint_form_no: $GetValue('number'),
  service_item_id: '633958439861358592',
  state_id: '632615169130496000',
  submitted_by: tackItem['closed_by'],

  t_traceability_area: assignee['department_id:t_p_dept_desc_shrt'],
  t_traceability_plant: assignee['department_id:t_dept_desc_shrt'],

  //t_business_department: tackItem["t_business_department"],
  t_business_department:
    tackItem['t_business_department_contacts:department_id:name'],
  t_sales_region: tackItem['t_sales_region'],
  t_market_centre: tackItem['t_market_centre'],
  t_sales_division: tackItem['t_sales_division'],
  t_approval_history: '632606333061562368:' + tackItem['closed_by'] + ':1',
  t_previous_processor: tackItem['closed_by']
}
$Print('debug28 params=1:' + JSON.stringify(params))
keys.forEach(function (key) {
  params[key] = $GetValue(key)
})
$Print('debug28 params=2:' + JSON.stringify(params))

var inc_id = submitByCode('INCIDENT', params)
$Print('debug28 inc_id=' + inc_id) // 801565733675204608
var detail_arr = [
  't_traceability_num',
  't_tracea_code_type',
  't_pickup_order',
  't_customer_full_name',
  't_customer_code',
  't_customer_ordernum',
  't_account',
  't_accept_time',
  't_vehicle_num',
  't_sales_division',
  't_market_centre',
  't_sales_region',
  't_business_department',
  't_judge_type',
  't_internal_customer',
  't_qr_code_value1',
  't_billno',
  't_billlineno',
  't_if_fp_same',
  't_if_no_cm',
  't_code_img_file', // 图片
  't_last_complaint_dealer', // 上次投诉经销商
  't_last_complaint_check_order', // 上次投诉核实单号
  't_complained', // 是否投诉过
]

// 查询溯源单溯源项目明细 TRACEABILITY_PROJ_DETAIL
var traceabilities = $SearchBusinessObject(
  'TRACEABILITY_PROJ_DETAIL',
  {
    t_incident_id: $GetValue('id')
  },
  detail_arr
)
$Print(
  'debug28 traceabilities=' + JSON.stringify(traceabilities),
  traceabilities
)
if (traceabilities && traceabilities.length) {
  for (var i = 0;i < traceabilities.length;i++) {
    var params = {
      t_incident_id: inc_id,
      _status: 'create'
    }
    detail_arr.forEach(function (item) {
      params[item] = traceabilities[i][item]
    })
    submitByCode('TRACEABILITY_PROJ_DETAIL', params)
  }
}

var tsd_part = $SearchBusinessObject(
  'INCIDENT_PARTICIPANT', // 事件单参与者 选择业务对象字段
  {
    task_id: tackItem['id']
  },
  ['participant_id']
)

if (tsd_part && tsd_part.length > 0) {
  tsd_part.forEach(function (item) {
    submitByCode('INCIDENT_PARTICIPANT', {
      _status: 'create',
      task_id: inc_id,
      participant_user_id: item['participant_id'],
      participant_id: item['participant_id'],
      type: 'USER'
    })
  })
}

// 关联单据
try {
  $CallInterface(
    tenantNum,
    'LOW_CODE',
    'TICKET_PARENT_RELATIVE',
    JSON.stringify({
      payload: JSON.stringify([
        {
          targetTicketId: tackItem['id'],
          sourceTicketId: inc_id,
          linkId: '628299657726267392'
        }
      ])
    })
  )
} catch (error) {
  $Print('Error in ticket association: ' + error)
}

var key = JSON.stringify({
  sip: 'TRACEABILITY/SECONDARY_TRACEABILITY/VERIFICATION/PROCESSING_SLIP/FEEDBACK',
  ticketId: inc_id,
  participants: [$GetValue('assignee_person_id')]
})
$Print('debug28 key=' + key)
$Invoke('yqcloud-external', 'SyncParticipantInvoker', key)

function submitByCode (bo, params) {
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

/* 清除暂存草稿 */
var tenantNum = $GetCurrentTenant().tenantNum
var incidentId = $GetValue('_parentId') || $GetValue('id')
var curUser = $GetCurrentPersonId()
var draftType = 'create_ts_sy'

var fd = $GetBusinessObject('INCIDENT', incidentId, ['id', 'parent_id'])
$Print('溯源单-投诉单', fd)
$Print('溯源单-投诉单-经销商投诉单：', fd['parent_id'])
if (fd['parent_id']) {
  // 更新经销商投诉单
  var parentData = submitByCode('INCIDENT', {
    _status: 'update',
    id: fd['parent_id'],
    t_approval_status: 'PROCESSING' // 处理中
  })
  $Print('经销商投诉单-parentData:' + parentData) // 801565733675204608
}

$Print('------ debug draftType', draftType)
if (draftType) {
  // 清除当前事件单当前登录人之前存的对应的暂存类型的草稿
  var drafts = $SearchBusinessObject(
    'INCIDENT_DRAFT',
    {
      incident_id: incidentId,
      t_is_draft: 1,
      t_is_valid_draft: 1,
      t_draft_created_by: curUser,
      t_draft_type: draftType
    },
    ['incident_id', 'id', 't_is_valid_draft']
  )

  $Print('debug draftType drafts=' + drafts)

  if (drafts && drafts.length > 0) {
    drafts.forEach(function (item) {
      var payload_6 = {
        t_is_valid_draft: 0,
        id: item.id,
        _status: 'update'
      }
      $Print('debug draftType 清空草稿 item=' + item)
      $Print('debug draftType 清空草稿  payload_6=' + payload_6)
      $Print(
        'debug draftType 清空草稿 str payload_6=' + JSON.stringify(payload_6)
      )
      var params_6 = {
        requestParamMap: {
          businessObjectCode: 'INCIDENT_DRAFT'
        },
        payload: JSON.stringify(payload_6)
      }
      $Print(
        'debug draftType 清空草稿 str params_6=' + JSON.stringify(params_6)
      )
      try {
        var response_6 = $CallInterface(
          tenantNum,
          'LOW_CODE',
          'BOSUB',
          JSON.stringify(params_6)
        )
        $Print('debug draftType 清空草稿 response=' + response_6)
      } catch (error) {
        $Print('Error clearing draft: ' + error)
      }
    })
  }
}

if (inc_id) {
  return {
    inc_id: inc_id
  }
}
