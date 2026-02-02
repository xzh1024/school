/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var tenantNum = $GetCurrentTenant().tenantNum;
var incidentId = $GetValue('_parentId') || $GetValue('id')
var curUser = $GetCurrentPersonId();

// var clr = $GetBusinessObject('IAM_USER', $GetValue('assignee_person_id'), ['department_id:name', 'department_id:parent_id:name', 'department_id:parent_id:parent_id:name'])
var clr = $GetBusinessObject('IAM_USER', $GetValue('assignee_person_id'), [
    "department_id:t_dept_desc_shrt",
    "department_id:t_p_dept_desc_shrt",
    "department_id:parent_id:t_p_dept_desc_shrt",])

var syd = $SearchBusinessObject('INCIDENT', {
    't_complaint_form_no': $GetValue('t_complaint_form_no'),
    'service_item_id': '633958439861358592',
}, ['closed_by', 'id']);
$Print('测试数据===', syd, $GetValue('t_complaint_form_no'))
var tsd = $SearchBusinessObject('INCIDENT', {
    'number': $GetValue('t_complaint_form_no'),
}, ['id'])

var params = {
    '_status': 'create',
    // 服务项
    'service_item_id': '633980740208168960',
    // 状态
    'state_id': '634789803762388992',
    // 提单人
    'submitted_by': syd[0]['closed_by'],
    // 投诉单编号
    't_complaint_form_no': $GetValue('t_complaint_form_no'),
    't_ocms': $GetValue('t_ocms'),
    't_whether_qr_products': $GetValue('t_whether_qr_products'),
    't_whether_cross_division': $GetValue('t_whether_cross_division'),
    't_product_name_default': $GetValue('t_product_name_default'),
    't_request_feedback_time': $GetValue('t_request_feedback_time'),
    't_sales_division': $GetValue('t_sales_division'),
    't_market_centre': $GetValue('t_market_centre'),
    't_sales_region': $GetValue('t_sales_region'),
    't_business_department': $GetValue('t_business_department'),
    'assignee_person_id': $GetValue('assignee_person_id'),
    'short_description': $GetValue('short_description'),
    't_approval_history': '632606333061562368:' + syd[0]['closed_by'] + ':1',
    // 't_traceability_plant': clr['department_id:name'],
    // 't_traceability_area': clr['department_id:parent_id:parent_id:name'],
    't_traceability_area': clr["department_id:t_p_dept_desc_shrt"],
    't_traceability_plant': clr["department_id:t_dept_desc_shrt"],
    't_previous_processor': syd[0]['closed_by'],
    't_whether_traceability': $GetValue("t_whether_traceability"),
    't_traceability_method': $GetValue('t_traceability_method'),
    't_minimum_traceability': $GetValue('t_minimum_traceability'),
    't_sy_second_attech': $GetValue('t_sy_second_attech'),
    't_sy_second_remarks': $GetValue('t_sy_second_remarksarks'),
    't_advice': $GetValue('t_advice'),
}

var id = submitByCode('INCIDENT', params)

var arr = [
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
    't_internal_customer',
    't_code_img_file', // 图片
    't_last_complaint_dealer', // 上次投诉经销商
    't_last_complaint_check_order', // 上次投诉核实单号
    't_complained', // 是否投诉过
];

var sr_xm = $SearchBusinessObject('TRACEABILITY_PROJ_DETAIL', { 't_incident_id': $GetValue('id') }, arr)

sr_xm.forEach(function (item) {
    var p = {
        't_incident_id': id,
        '_status': 'create',
    }

    arr.forEach(function (i) {
        p[i] = item[i];
    })
    submitByCode('TRACEABILITY_PROJ_DETAIL', p);
})

var arr2 = [
    't_cus_name_new',
    't_whether_adjude',
    't_adjude_num_new',
    't_award_type',
    't_cus_code',
];

var sr_cdb = $SearchBusinessObject('CUSTOMER_ADJUDE', { 't_incident_id': $GetValue('id') }, arr2)

sr_cdb.forEach(function (item) {
    var p = {
        't_incident_id': id,
        '_status': 'create',
    }

    arr2.forEach(function (i) {
        p[i] = item[i];
    })
    submitByCode('CUSTOMER_ADJUDE', p);
})

$CallInterface(tenantNum, 'LOW_CODE', 'TICKET_PARENT_RELATIVE', JSON.stringify({
    'payload': JSON.stringify([{
        'targetTicketId': syd[0]['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }, {
        'targetTicketId': tsd[0]['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }])
}));

var syd_part = $SearchBusinessObject('INCIDENT_PARTICIPANT', {
    'task_id': syd[0]['id'],
}, ['participant_id'])

if (syd_part && syd_part.length > 0) {
    syd_part.forEach(function (item) {
        submitByCode('INCIDENT_PARTICIPANT', {
            '_status': 'create',
            'task_id': id,
            'participant_user_id': item['participant_id'],
            'participant_id': item['participant_id'],
            'type': "USER"
        })
    })
}

var key = JSON.stringify({
    sip: "TRACEABILITY/SECONDARY_TRACEABILITY/VERIFICATION/PROCESSING_SLIP/FEEDBACK",
    ticketId: id,
    participants: [$GetValue('assignee_person_id')]
})
$Invoke('yqcloud-external', "SyncParticipantInvoker", key)

function submitByCode (bo, params) {
    var body = {
        'requestParamMap': { 'businessObjectCode': bo },
        'payload': JSON.stringify(params)
    }

    var response = $CallInterface(tenantNum, 'LOW_CODE', 'BOSUB', JSON.stringify(body));
    var responseNode = JSON.parse(response)
    return responseNode['id']
}

$Print('debug27 incidentId=' + incidentId);

/* // 清除当前事件单当前登录人之前存的所有新建核实单的有效状态草稿 */
var drafts = $SearchBusinessObject('INCIDENT_DRAFT', {
    'incident_id': incidentId,
    't_is_draft': 1,
    't_is_valid_draft': 1,
    't_draft_created_by': curUser,
    't_draft_type': 'create_sy_second',
}, ['incident_id', 'id', 't_is_valid_draft']);

$Print('debug27 drafts=' + drafts);

if (drafts && drafts.length > 0) {
    drafts.forEach(function (item) {
        var payload_6 = {
            't_is_valid_draft': 0,
            'id': item.id,
            '_status': 'update',
        };
        var params_6 = {
            'requestParamMap': {
                'businessObjectCode': 'INCIDENT_DRAFT'
            },
            'payload': JSON.stringify(payload_6)
        }
        $Print('debug27 清空草稿 str params_6=' + JSON.stringify(params_6));
        var response_6 = $CallInterface(tenantNum, 'LOW_CODE', 'BOSUB', JSON.stringify(params_6));
        $Print('debug27 清空草稿 response=' + response_6);
    })
}

return {
    'id': id,
}
