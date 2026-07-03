/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

var incidentId = $GetValue("_parentId") || $GetValue("id");

var fieldsArr = [
    "submitted_by",
    "submitted_by:real_name",
    "short_description",
    "t_option_value_1",
    "t_option_value_2",
    "t_expected_launch_date",
    /* 需求类型t_need_type 生产换字段：t_hr_need_type */
    "t_hr_need_type",
    "t_demand_value_type",
    "t_demand_background",
    "t_demand_value",
    "t_requirement_description",
    "attachments",
    "t_function",
    // "t_hr_type",
    "t_urgency_new",
    "caller_id", // 需求提出人
    "caller_id:real_name", // 需求提出人
    "service_catalog_id", // 服务目录
    "service_catalog_id:name", // 服务目录
    "t_sc_item", // 服务类型
    "t_system", // 系统名称
    "urgency_id", // 紧急度
    "urgency_id:name", // 紧急度
    "t_demand_source", // 需求来源
    "t_feedbacker", // 需求对接人
    "t_feedbacker:real_name", // 需求对接人
    "t_option_value_1", // 需求类型
    "t_expected_launch_date", // 期望上线日期
    "description", // 需求描述
    "t_demand_value_impact", // 需求价值
    "t_t_demand_value_type1", // 价值类型
];

/* 查询当前事件单 */
var curIncident = $GetBusinessObject("INCIDENT", incidentId, []);
$Print('debug002,curIncident', curIncident);

$SetValue('short_description', curIncident['short_description']);
$SetValue('t_option_value_1', curIncident['t_option_value_1']);
$SetValue('t_option_value_2', curIncident['t_option_value_2']);
$SetValue('t_expected_launch_date', curIncident['t_expected_launch_date']);
$SetValue('t_hr_need_type', curIncident['t_hr_need_type']);
$SetValue('t_demand_value_type', curIncident['t_demand_value_type']);
$SetValue('t_demand_background', curIncident['t_demand_background']);
$SetValue('t_demand_value', curIncident['t_demand_value']);
$SetValue('t_requirement_description', curIncident['t_requirement_description']);
$SetValue('attachments', curIncident['attachments']);
$SetValue('t_function', curIncident['t_function']);
$SetValue('t_urgency_new', curIncident['t_urgency_new']);

$SetValue('caller_id', curIncident['caller_id']);
$SetValue('caller_id:real_name', curIncident['caller_id:real_name']);
$SetValue('service_catalog_id', curIncident['service_catalog_id']);
$SetValue('service_catalog_id:name', curIncident['service_catalog_id:name']);
$SetValue('t_sc_item', curIncident['t_sc_item']);
$SetValue('t_system', curIncident['t_system']);
$SetValue('urgency_id', curIncident['urgency_id']);
$SetValue('urgency_id:name', curIncident['urgency_id:name']);
$SetValue('t_demand_source', curIncident['t_demand_source']);
$SetValue('t_feedbacker', curIncident['t_feedbacker']);
$SetValue('t_feedbacker:real_name', curIncident['t_feedbacker:real_name']);
$SetValue('t_option_value_1', curIncident['t_option_value_1']);
$SetValue('t_expected_launch_date', curIncident['t_expected_launch_date']);
$SetValue('description', curIncident['description']);
$SetValue('t_demand_value_impact', curIncident['t_demand_value_impact']);
$SetValue('t_t_demand_value_type1', curIncident['t_t_demand_value_type1']);

// var curHrType = curIncident['t_hr_type'];
// $SetValue('t_hr_type', !!curHrType || curHrType == null || curHrType === '1' ? '2' : '');

return {
    id: curIncident['submitted_by'] || '-1',
    real_name: curIncident['submitted_by:real_name'] || '-1',
}
