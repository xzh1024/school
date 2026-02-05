/*
 * @Author: yangluxi
 * @Date: 2025-09-29 17:33:02
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-11-11 21:50:59
 * @FilePath: /script_backups_code/IPMS/新建核实单/确定按钮脚本.js
 * @Description: 
 */

/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */
var tenantNum = $GetCurrentTenant().tenantNum;

var incidentId = $GetValue('_parentId') || $GetValue('id')
var curUser = $GetCurrentPersonId();

var yd = $GetBusinessObject('INCIDENT', incidentId, ['closed_by', 'service_item_id', 'id']);

// 0是溯源单 1是二次溯源单
var source = 0;

if (yd['service_item_id'] === '633980740208168960') {
    source = 1;
}

var arr = [
    't_complainant_customer_name1',
    't_respondent_customer_name1',
    't_respondent_cus_code',
    't_complainant_code',
    't_t_respondent_quantity_wines_collected',
    't_t_complainant_wines_collection_quantity',
    'short_description',
    'assignee_person_id',
    't_complaint_form_no',
    't_required_time',
    't_arrival_time',
    't_verify_location_name',
    't_business_department_contacts',
    't_business_department_phone',
    't_judge_type',
    't_complaints_number_boxs',
    't_terminals_total_num',
    't_operations_department_respondent',
    't_cusname_respondent',
    't_premises_type_respondent',
    't_ocms',
    't_terminal_discoveries_sued',
    't_sample_wines_sued',
    't_second_discover_sued',
    't_terminals_visited_sued',
    't_verificate_num_sued',
    't_second_visited_sued',
    't_second_verificate_num_sued',
    't_dealer_net_price',
    't_complainant_purchase_sued',
    't_verification_method',
    't_instruction',
    't_business_department',
    't_business_department_new',
    't_premises_type',
    't_varieties',
    't_terminal_discoveries',
    't_sample_wines',
    't_second_discover',
    't_terminals_visited',
    't_verificate_num',
    't_second_visited',
    't_second_verificate_num',
    't_complainant_purchase',
    't_whether_verification',
    't_instruction_one',
    't_advice',
    't_instruction_new',
    't_instruction_one_new',
]

var params = {
    '_status': 'create',
    'service_item_id': '636494836392529920', // 核实单
    'state_id': '636866679859318784',
    't_approval_history': '632606333061562368:' + yd['closed_by'] + ':1',
    'submitted_by': yd['closed_by'],
    // 't_total_number_sued': ($GetValue('t_terminal_discoveries_sued') || 0) + ($GetValue('t_sample_wines_sued') || 0) + ($GetValue('t_second_discover_sued') || 0),
    // 't_total_number': ($GetValue('t_terminal_discoveries') || 0) + ($GetValue('t_sample_wines') || 0) + ($GetValue('t_second_discover') || 0),
    't_total_number_sued': 3.0,
    't_total_number': 3.0,
    't_previous_processor': yd['closed_by'],
};

arr.forEach(function (item) {
    params[item] = $GetValue(item);
})

var id = submitByCode('INCIDENT', params);
$Print('debug22 新建事件单id=' + id);

var cdb = $SearchBusinessObject('CUSTOMER_ADJUDE', {
    't_incident_id': $GetValue('_parentId')
}, ['t_cus_name_new', 't_whether_adjude', 't_adjude_num_new', 't_award_type', 't_cus_code'])

if (cdb && cdb.length > 0) {
    cdb.forEach(function (item) {
        submitByCode('CUSTOMER_ADJUDE', {
            '_status': 'create',
            't_incident_id': id,
            't_cus_name_new': item['t_cus_name_new'],
            't_whether_adjude': item['t_whether_adjude'],
            't_adjude_num_new': item['t_adjude_num_new'],
            't_award_type': item['t_award_type'],
            't_cus_code': item['t_cus_code'],
        })
    })
}

var custom_name = $GetValue('multiplechoice_tbbtygdu');

if (custom_name && custom_name.length > 0) {
    custom_name.forEach(function (item) {
        // 溯源单溯源项目明细-中间表
        submitByCode('TRACEABILITY_PROJ_DETAIL_MIDDLE', {
            '_status': 'create',
            'incident_id': id,
            'traceability_proj_detail_id': item.id // 溯源单溯源项目明细
        })
    })
}

var notify = $GetValue('multiplechoice_xijbfqkh');

if (notify && notify.length > 0) {
    notify.forEach(function (item) {
        submitByCode('PERSON_MIDDLE', {
            '_status': 'create',
            'incident_id': id,
            'iam_user_id': item.id,
        })
        submitByCode('INCIDENT_PARTICIPANT', {
            '_status': 'create',
            'task_id': id,
            'participant_user_id': item.id,
            'participant_id': item.id,
            'type': "USER"
        })
    })
}

var arr = [];

var tsd = $SearchBusinessObject('INCIDENT', {
    'number': $GetValue('t_complaint_form_no'),
}, ['id'])

var srd = $SearchBusinessObject('INCIDENT', {
    't_complaint_form_no': $GetValue('t_complaint_form_no'),
    'service_item_id': '633958439861358592'
}, ['id'])

// 说明核实单是通过二次溯源单创建的
if (source === 1) {
    arr = [{
        'targetTicketId': tsd[0]['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }, {
        'targetTicketId': srd[0]['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }, {
        'targetTicketId': yd['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }]
} else {
    arr = [{
        'targetTicketId': tsd[0]['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }, {
        'targetTicketId': yd['id'],
        'sourceTicketId': id,
        'linkId': '628299657726267392'
    }]
}

$CallInterface(tenantNum, 'LOW_CODE', 'TICKET_PARENT_RELATIVE', JSON.stringify({
    'payload': JSON.stringify(arr)
}));

var syd_part = $SearchBusinessObject('INCIDENT_PARTICIPANT', {
    'task_id': yd['id'],
}, ['participant_id', 'add_type'])

if (syd_part && syd_part.length > 0) {
    syd_part.forEach(function (item) {
        submitByCode('INCIDENT_PARTICIPANT', {
            '_status': 'create',
            'task_id': id,
            'participant_user_id': item['participant_id'],
            'participant_id': item['participant_id'],
            'type': "USER",
            'add_type': item['add_type']
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
        'requestParamMap': {
            'businessObjectCode': bo
        },
        'payload': JSON.stringify(params)
    }

    var response = $CallInterface(tenantNum, 'LOW_CODE', 'BOSUB', JSON.stringify(body));
    var responseNode = JSON.parse(response)
    $Print('debug22 bo=' + bo);
    $Print('debug22 response=' + response);
    return responseNode['id']
}

// 清除当前事件单当前登录人之前存的所有新建核实单的有效状态草稿

var yd = $GetBusinessObject('INCIDENT', incidentId, ['closed_by', 'service_item_id', 'id', 't_whether_cross_division', 'state_id', 't_submitted_by_department_one']);
$Print('debug22 暂存incidentId=' + incidentId);
$Print('debug22 暂存yd=' + yd);
var draftType = '';

if (yd && yd.service_item_id == '633958439861358592') {
    /*溯源单/创建核实单 */
    draftType = 'create_verify';
}
if (yd && yd.service_item_id == '633980740208168960') {
    /*二次溯源单/创建核实单 */
    draftType = 'create_re_sy_verify';
}

if (draftType == null || draftType == '') {
    return '';
}
var drafts = $SearchBusinessObject('INCIDENT_DRAFT', {
    'incident_id': incidentId,
    't_is_draft': 1,
    't_is_valid_draft': 1,
    'incident_id': incidentId,
    't_draft_created_by': curUser,
    't_draft_type': draftType,
}, ['incident_id', 'id', 't_is_valid_draft']);

$Print('debug23 drafts=' + drafts);

if (drafts && drafts.length > 0) {
    drafts.forEach(function (item) {
        var payload_6 = {
            't_is_valid_draft': 0,
            'id': item.id,
            '_status': 'update',
        };
        $Print('debug23 清空草稿 item=' + item);
        $Print('debug23 清空草稿  payload_6=' + payload_6);
        $Print('debug23 清空草稿 str payload_6=' + JSON.stringify(payload_6));
        var params_6 = {
            'requestParamMap': {
                'businessObjectCode': 'INCIDENT_DRAFT'
            },
            'payload': JSON.stringify(payload_6)
        }
        $Print('debug23 清空草稿 str params_6=' + JSON.stringify(params_6));
        var response_6 = $CallInterface(tenantNum, 'LOW_CODE', 'BOSUB', JSON.stringify(params_6));
        $Print('debug23 清空草稿 response=' + response_6);
    })
}

/* 自动添加参与人 start*/

var obj = $GetBusinessObject("INCIDENT", id, ["t_operations_department_respondent", "t_dept_descr_full_path", "t_dept_full_path", "level_path"])
var departmentId = obj["t_operations_department_respondent"];
if (!departmentId) {
    return '';
}

var departmentObj = $GetBusinessObject("ORG_DEPARTMENT", departmentId, ["t_dept_descr_full_path", "t_dept_full_path", "level_path", "parent_id", 'parent_id:t_p_dept_desc_shrt', 'parent_id:parent_id', 'parent_id:parent_id:t_p_dept_desc_shrt', 'full_path', 'domain_path', 'level_path', 't_dept_descr', 't_p_dept_desc_shrt']);

//取营销中心的id 或者事业部的id （只有武汉事业部旗下 （634534936297476096） 才取事业部的id）
var wuhanDepId = '634534936297476096';
var marketingDepId = departmentObj['parent_id'];
var careerDepId = departmentObj['parent_id:parent_id'];
var configs = [];

if (marketingDepId || careerDepId) {
    if ((marketingDepId === wuhanDepId || careerDepId === wuhanDepId || departmentId === wuhanDepId)) {
        configs = $SearchBusinessObject('AUTOINFORMATION_CONFIG', { 't_department': wuhanDepId, }, ["id", 't_informant', 't_department', 't_informant:name']);
    } else {
        configs = $SearchBusinessObject('AUTOINFORMATION_CONFIG', { 't_department': marketingDepId, }, ["id", 't_informant', 't_department', 't_informant:name']);
        $Print('debug004 marketingDepId configs=', configs);
        if (configs.length <= 0 && careerDepId) {
            configs = $SearchBusinessObject('AUTOINFORMATION_CONFIG', { 't_department': careerDepId, }, ["id", 't_informant', 't_department', 't_informant:name']);
            $Print('debug004 careerDepId configs=', configs);
            $Print('debug004 careerDepId configs=', configs);
        }
    }
}


$Print('debug004 id=', id);
$Print('debug004 obj=', obj);
$Print('debug004 departmentId=', departmentId);
$Print('debug004 departmentObj=', departmentObj);
$Print('debug004 marketingDepId=', marketingDepId);
$Print('debug004 careerDepId=', careerDepId);
$Print('debug004 configs=', configs);

var addPersonFunc = function (incidentId, userId) {
    var participantParams = {
        'requestParamMap': { 'businessObjectCode': 'INCIDENT_PARTICIPANT' },
        'payload': JSON.stringify({
            'task_id': incidentId,
            'participant_user_id': userId,
            'participant_id': userId,
            'type': 'USER',
            'add_type': 'AUTO_INFORM',
            '_status': 'create'
        })
    }
    try {
        var resp = $CallInterface(tenantNum, 'LOW_CODE', 'BOSUB', JSON.stringify(participantParams));
        $Print('debug004 添加参与人resp', resp);
    } catch (error) {
        $Print('debug004 添加参与人失败', error);
    }
}


if (configs && configs.length > 0) {
    //1.查到当前单据关联的投诉单编号

    var service = $GetBusinessObject('INCIDENT', id, ['service_item_id:name', 't_complaint_form_no', 'number', 'id']);
    var complaintNum = service['t_complaint_form_no']

    //2.根据投诉单编号查询到所有的关联单据
    var list = $SearchBusinessObject('INCIDENT', { 't_complaint_form_no': complaintNum }, ['id', 'service_item_id:name', 't_complaint_form_no'])

    //3.在关联单据里找出溯源单，二次溯源单，处理单，反馈单 把当前营销中心的负责人添加到参与人
    list.forEach(function (item) {
        if (['溯源单', '二次溯源单', '处理单', '反馈单'].indexOf(item['service_item_id:name']) != -1) {
            configs.forEach(function (it) {
                addPersonFunc(item['id'], it['t_informant'])
                $Print('debug004 item=', item);
            })
        }
    })

    //4.把当前营销中心的负责人添加到当前核实单据的参与人中

    configs.forEach(function (it) {
        addPersonFunc(id, it['t_informant'])
        $Print('debug004 it=', it);
    })
}

/* 自动添加参与人 end */
