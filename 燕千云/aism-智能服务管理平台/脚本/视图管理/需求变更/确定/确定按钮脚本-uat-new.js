/*
 * @Author: yangluxi
 * @Date: 2025-12-16 17:03:17
 * @LastEditors: yangluxi
 * @LastEditTime: 2026-01-23 10:14:09
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/需求变更确定按钮脚本.js
 * @Description: 
 */

var tenantNum = $GetCurrentTenant().tenantNum;
var incidentId = $GetValue("_parentId") || $GetValue("id");
var curTime = $GetCurrentDateTime();
var curUser = $GetCurrentPersonId();

$Print("debug02 incidentId===", incidentId);
$Print("debug02 tenantNum===", tenantNum);


/* 定义需要复制单据的字段 */
var fieldsArr = [
    /* 系统配置 */
    "tenant_id",
    "table_name",
    "active",
    "description",
    "service_catalog_id",
    /*   "urgency_id", */
    "submission_channel",
    "contact",
    "contact_email",
    "contact_department",
    /*"assignment_group_id",
    "assignee_person_id",*/
    "object_version_number",
    "submitted_by",
    "last_updated_by",
    "service_item_id",
    "domain_id",
    "domain_path",
    "t_sc_item",

    /* 服务项配置字段 */
    "t_work_order_number",
    "t_auto_trigger_workflow",
    /*   "t_option_value_2", */
    "t_hr_system",
    // 't_department', // 需求来源
    // "t_system", // 系统
    "t_hr_function",
    "date_daplgvoi",
    "date_aanmcgbb",
    "date_owobqwpp",
    "date_fmcuaibf",
    "t_requirement_person",
    "t_requirement_name_1",
    "t_overview_requirement",
    "t_business_plan",
    "t_assessment_suggestion",
    "t_attachment_name",
    "master_detail_vfuafmtq",
    "t_acceptance_time",
    "date_mvsumabe",
    "date_eibnmfby",
    "date_weqzersd",
    't_hr_type',
];

/* 定义当前弹窗填写的/固定字段 */
var fillFields = [
    /* 填写字段 */
    'short_description', // 标题
    't_work_order_type', // 工单类型
    'caller_id', // 需求提出人
    'urgency_id', // 紧急度
    't_urgency_new',
    "t_option_value_1",
    't_function',
    't_launch_date', // 期望上线日期
    't_system', // 系统
    't_feedbacker', // 需求评价人
    't_department', // 需求来源
    /* 需求类型t_need_type 生产换字段：t_hr_need_type */
    't_need_type',
    't_hr_need_type', // 需求类型
    't_demand_value_type', // 价值类型
    't_demand_background',
    't_requirement_description', // 需求描述
    't_demand_value', // 需求价值
    'attachments', // 附件
    't_need_change_reason', // 变更原因
    't_urgency_new',
    /* 隐藏字段 */
    't_hr_type',
]

/* 查询当前事件单 */
var curIncident = $GetBusinessObject("INCIDENT", incidentId, fieldsArr);
$Print("debug02 curIncident 当前事件单===", curIncident);

var params = {}

fieldsArr.forEach(function (item) {
    if (item !== 'assignee_person_id' && item !== 't_hr_type') {
        params[item] = curIncident[item];
    }
});

fillFields.forEach(function (item) {
    params[item] = $GetValue(item)
});


$Print("debug02 params===", JSON.stringify(params));


var mergedObject = Object.assign({}, params, {
    _status: "create",
    state_id: '637375316872663040',/* 待受理状态 */
    t_copy_sign: 'change', /* 标识是由需求变更创建的单子 */
    parent_id: incidentId,/* 父单id */
});
$Print("debug02 mergedObject====", JSON.stringify(mergedObject));

/* 创建需求变更单据 */
var changeIncidentId = submitByCode("INCIDENT", mergedObject);
$Print("debug02 changeIncidentId=", changeIncidentId);

$Print("debug02 get t_hr_type====", $GetValue('t_hr_type'));

/* 将工单类型标识回写到父单上 */
if (curIncident['t_hr_type'] !== '2') {
    var curIncidentParams = {
        _status: "update",
        id: incidentId,
        t_hr_type: '3', /* 标识发生变更工单 */
    };
    submitByCode("INCIDENT", curIncidentParams);
    $Print("debug02 curIncidentParams====", JSON.stringify(curIncidentParams));
}


/* 查询父单事件单的参与 */

var incidentParticipants = $SearchBusinessObject(
    "INCIDENT_PARTICIPANT",
    {
        task_id: incidentId,
    },
    [
        'task_id',
        'participant_user_id',
        'participant_id',
    ]
);

var participants = [];

incidentParticipants.forEach(function (item) {
    participants.push({
        'task_id': changeIncidentId,
        'participant_user_id': item['participant_user_id'],
        'participant_id': item['participant_id'],
        'type': 'USER',
        'add_type': 'AUTO',
        '_status': 'create'
    })
})

participants.forEach(function (item) {
    submitByCode("INCIDENT_PARTICIPANT", item);
})

/* 建立关联单据信息 */
var linkParams = {
    'payload': JSON.stringify([
        {
            'targetTicketId': incidentId,//父单
            'sourceTicketId': changeIncidentId,//子单
            'linkId': '637375403998969856'
        }
    ])
}

$Print("debug02 linkParams===", JSON.stringify(linkParams));


var res = $CallInterface(tenantNum, 'LOWCODE', 'TICKET_PARENT_RELATIVE', JSON.stringify(linkParams));
$Print("debug02 res===", res);


/*存储变更原因以及父子关系 单据父子关系存储表（人力用） HR_RELATIVE */

/* 1.在父单中 存储子单变更数据 */
var childParams =
{
    't_change_reason': params['t_need_change_reason'],
    't_parent_id': incidentId,//父单
    't_relative_id': incidentId,
    't_revelation_flag': 'child',
    't_name': params['short_description'],
    't_line_incident_id': changeIncidentId,
    '_status': 'create'
};
$Print("debug02 childParams===", childParams);
var childRes = submitByCode("HR_RELATIVE", childParams);
$Print("debug02 childRes===", childRes);

/* 2.在子单中 存储父单数据 */
var parentParams =
{
    't_change_reason': '原始需求工单',
    't_relative_id': changeIncidentId,
    't_revelation_flag': 'parent',
    't_name': curIncident['short_description'],
    't_line_incident_id': incidentId,
    '_status': 'create'
};
$Print("debug02 parentParams===", parentParams);
var parentRes = submitByCode("HR_RELATIVE", parentParams);
$Print("debug02 parentRes===", parentRes);


/* 定义提交创建事件单的函数  bo:业务对象， params：插入业务对象的数据*/
function submitByCode (bo, params) {
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
