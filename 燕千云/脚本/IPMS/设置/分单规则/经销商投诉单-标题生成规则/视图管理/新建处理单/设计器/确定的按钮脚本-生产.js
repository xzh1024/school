/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */
var tenantNum = $GetCurrentTenant().tenantNum
var incidentId = $GetValue('_parentId') || $GetValue('id')

function isNumberStr(str) {
  var num = parseInt(str)
  return !isNaN(num) && str.trim().length > 0 && str === num.toString()
}

function convertStrToNumber(str) {
  if (isNumberStr(str)) {
    return parseInt(str)
  } else {
    return null
  }
}

var hsd = $GetBusinessObject('INCIDENT', $GetValue('_parentId'), [
  'closed_by',
  't_complaint_form_no',
  't_terminal_discoveries',
  't_sample_wines',
  't_second_discover',
  't_verificate_num_sued',
  't_second_verificate_num_sued',
  't_sample_wines_sued',
  't_terminal_discoveries_sued',
  't_second_discover_sued',
  'id'
])
$Print('debug23 hsd=' + hsd)

var tsd = $SearchBusinessObject(
  'INCIDENT',
  {
    number: hsd['t_complaint_form_no'] // 投诉单编号
  },
  ['t_sales_division', 'id']
)

$Print('debug23 tsd=' + tsd)

var paramsArr = [
  't_complaint_form_no',
  't_judge_type',
  't_business_department',
  't_business_department_new',
  't_operations_department_respondent',
  't_ocms',
  't_complaints_number_boxs',
  't_sample_wines',
  't_default_established',
  't_whether_destroy',
  't_market_liquidat',
  't_sales_policy',
  't_wine_collection',
  't_other_remarks',
  't_deduction_respondent',
  't_deduction_complain',
  't_t_other_remarks_one',
  't_hierarchical',
  't_whether_combine',
  't_combine_order',
  'assignee_person_id',
  't_sale_policy_deduce',
  't_advice'
]

var status = ''

var pd_lx = $GetValue('t_judge_type')

if (['REGION_CROSS_DEPARTMENT', 'REGION_DEPARTMENT'].indexOf(pd_lx) !== -1) {
  status = '638673225186545664'
} else {
  status = '632618098281414656'
}

var th_l = 0

var th_dj = $GetValue('multiplechoice_iuzcktir')

function filterThDj(arr) {
  var t_customer_ordernums_arr = []
  var result_arr = []
  arr.forEach(function (item) {
    if (
      t_customer_ordernums_arr.indexOf(
        String(item.t_customer_ordernum) + String(item.t_pickup_order)
      ) === -1
    ) {
      t_customer_ordernums_arr.push(
        String(item.t_customer_ordernum) + String(item.t_pickup_order)
      )
      result_arr.push(item)
    }
  })
  return result_arr
}

if (th_dj && th_dj.length > 0) {
  th_dj.forEach(function (item) {
    var xm_before = $SearchBusinessObject(
      'TRACEABILITY_PROJ_DETAIL',
      {
        id: item.id,
        t_incident_id: item.t_incident_id
      },
      ['t_incident_id']
    )
    var xm = $SearchBusinessObject(
      'TRACEABILITY_PROJ_DETAIL',
      {
        t_customer_ordernum: item.t_customer_ordernum,
        t_incident_id: xm_before[0].t_incident_id
      },
      ['t_account', 't_customer_ordernum', 't_pickup_order']
    )
    if (xm && xm.length > 0) {
      var xm_arr = filterThDj(xm)
      if (xm_arr && xm_arr.length > 0) {
        xm_arr.forEach(function (item) {
          if (item['t_account']) {
            th_l += item['t_account']
          }
        })
      }
    }
  })
}

var params = {
  _status: 'create',
  short_description:
    (tsd[0]['t_sales_division'] || '') + hsd['t_complaint_form_no'] + '处理单',
  service_item_id: '637291489496141824',
  state_id: status,
  submitted_by: hsd['closed_by'],
  t_approval_history: '632606333061562368:' + hsd['closed_by'] + ':1',
  t_volume_of_pickups_new: th_l,
  t_t_final_decision_one_new: th_l,
  t_t_final_decision_new:
    (hsd['t_terminal_discoveries'] || 0) +
    (hsd['t_second_discover'] || 0) +
    (hsd['t_sample_wines'] || 0),
  t_t_final_decision_two_new:
    (hsd['t_verificate_num_sued'] || 0) +
    (hsd['t_second_verificate_num_sued'] || 0),
  t_terminal_discoveries: hsd['t_terminal_discoveries'],
  t_second_discover: hsd['t_second_discover'],
  t_sample_wines_sued: hsd['t_sample_wines_sued'],
  t_terminal_discoveries_sued: hsd['t_terminal_discoveries_sued'],
  t_second_discover_sued: hsd['t_second_discover_sued'],
  t_previous_processor: hsd['closed_by'],
  parent_id: incidentId
}

paramsArr.forEach(function (item) {
  params[item] = $GetValue(item)
})
$Print('debug23 params=' + JSON.stringify(params))
var cld_id = submitByCode('INCIDENT', params)

var cdb = $SearchBusinessObject(
  'CUSTOMER_ADJUDE',
  {
    t_incident_id: $GetValue('_parentId')
  },
  [
    't_cus_name_new',
    't_whether_adjude',
    't_adjude_num_new',
    't_award_type',
    't_cus_code'
  ]
)

if (cdb && cdb.length > 0) {
  cdb.forEach(function (item) {
    submitByCode('CUSTOMER_ADJUDE', {
      _status: 'create',
      t_incident_id: cld_id,
      t_cus_name_new: item['t_cus_name_new'],
      t_whether_adjude: item['t_whether_adjude'],
      t_adjude_num_new: item['t_adjude_num_new'],
      t_award_type: item['t_award_type'],
      t_cus_code: item['t_cus_code']
    })
  })
}

if (th_dj && th_dj.length > 0) {
  th_dj.forEach(function (item) {
    submitByCode('TRACEABILITY_PROJ_DETAIL_MIDDLE', {
      _status: 'create',
      incident_id: cld_id,
      traceability_proj_detail_id: item.id
    })
  })
}

var jxs = $GetValue('multiplechoice_epjvchjo')

if (jxs && jxs.length > 0) {
  jxs.forEach(function (item) {
    submitByCode('TRACEABILITY_PROJ_DETAIL_MIDDLE2', {
      _status: 'create',
      incident_id: cld_id,
      traceability_proj_detail_id: item.id
    })
  })
}

var tabls = $GetValue('_children')

var to_sued = {}

var to_others = {}

if (tabls && tabls.length > 0) {
  tabls.forEach(function (item) {
    if (item.businessObjectId === '637736121130680320') {
      to_sued = item
    }
    if (item.businessObjectId === '637750444972441600') {
      to_others = item
    }
  })
}

if (to_sued && to_sued.data && to_sued.data.length && to_sued.data.length > 0) {
  to_sued.data.forEach(function (item) {
    submitByCode('REVIEW_ONE', {
      _status: 'create',
      t_incident_id: cld_id,
      t_person: item['t_person'],
      t_review_type: item['t_review_type'],
      t_deduct_type: item['t_deduct_type'],
      t_mark: item['t_mark']
    })
  })
}

if (
  to_others &&
  to_others.data &&
  to_others.data.length &&
  to_others.data.length > 0
) {
  to_others.data.forEach(function (item) {
    submitByCode('REVIEW_TWO', {
      _status: 'create',
      t_incident_id: cld_id,
      t_person: item['t_person'],
      t_review_type: item['t_review_type'],
      t_deduct_type: item['t_deduct_type'],
      t_mark: item['t_mark']
    })
  })
}

var syd = $SearchBusinessObject(
  'INCIDENT',
  {
    t_complaint_form_no: hsd['t_complaint_form_no'],
    service_item_id: '633958439861358592'
  },
  ['id']
)

var er_syd = $SearchBusinessObject(
  'INCIDENT',
  {
    t_complaint_form_no: hsd['t_complaint_form_no'],
    service_item_id: '633980740208168960'
  },
  ['id']
)

var arr = [
  {
    targetTicketId: tsd[0]['id'],
    sourceTicketId: cld_id,
    linkId: '628299657726267392'
  },
  {
    targetTicketId: syd[0]['id'],
    sourceTicketId: cld_id,
    linkId: '628299657726267392'
  },
  {
    targetTicketId: $GetValue('_parentId'),
    sourceTicketId: cld_id,
    linkId: '628299657726267392'
  }
]

if (er_syd && er_syd.length > 0) {
  arr.push({
    targetTicketId: er_syd[0]['id'],
    sourceTicketId: cld_id,
    linkId: '628299657726267392'
  })
}

$CallInterface(
  tenantNum,
  'LOW_CODE',
  'TICKET_PARENT_RELATIVE',
  JSON.stringify({
    payload: JSON.stringify(arr)
  })
)

var hsd_part = $SearchBusinessObject(
  'INCIDENT_PARTICIPANT',
  {
    task_id: hsd['id']
  },
  ['participant_id']
)

if (hsd_part && hsd_part.length > 0) {
  hsd_part.forEach(function (item) {
    submitByCode('INCIDENT_PARTICIPANT', {
      _status: 'create',
      task_id: cld_id,
      participant_user_id: item['participant_id'],
      participant_id: item['participant_id'],
      type: 'USER'
    })
  })
}

var key = JSON.stringify({
  sip: 'TRACEABILITY/SECONDARY_TRACEABILITY/VERIFICATION/PROCESSING_SLIP/FEEDBACK',
  ticketId: cld_id,
  participants: [$GetValue('assignee_person_id')]
})
$Invoke('yqcloud-external', 'SyncParticipantInvoker', key)

function submitByCode(bo, params) {
  var body = {
    requestParamMap: { businessObjectCode: bo },
    payload: JSON.stringify(params)
  }

  var response = $CallInterface(
    tenantNum,
    'LOW_CODE',
    'BOSUB',
    JSON.stringify(body)
  )
  var responseNode = JSON.parse(response)
  return responseNode['id']
}

// 清除当前事件单当前登录人之前存的所有新建处理单的有效状态草稿

var curUser = $GetCurrentPersonId()
var draftType = 'create_hs_handle'

var drafts = $SearchBusinessObject(
  'INCIDENT_DRAFT',
  {
    incident_id: incidentId,
    t_is_draft: 1,
    t_is_valid_draft: 1,
    incident_id: incidentId,
    t_draft_created_by: curUser,
    t_draft_type: draftType
  },
  ['incident_id', 'id', 't_is_valid_draft']
)

$Print('debug23 drafts=' + drafts)

if (drafts && drafts.length > 0) {
  drafts.forEach(function (item) {
    var payload_6 = {
      t_is_valid_draft: 0,
      id: item.id,
      _status: 'update'
    }
    $Print('debug23 清空草稿 item=' + item)
    $Print('debug23 清空草稿  payload_6=' + payload_6)
    $Print('debug23 清空草稿 str payload_6=' + JSON.stringify(payload_6))
    var params_6 = {
      requestParamMap: {
        businessObjectCode: 'INCIDENT_DRAFT'
      },
      payload: JSON.stringify(payload_6)
    }
    $Print('debug23 清空草稿 str params_6=' + JSON.stringify(params_6))
    var response_6 = $CallInterface(
      tenantNum,
      'LOW_CODE',
      'BOSUB',
      JSON.stringify(params_6)
    )
    $Print('debug23 清空草稿 response=' + response_6)
  })
}
