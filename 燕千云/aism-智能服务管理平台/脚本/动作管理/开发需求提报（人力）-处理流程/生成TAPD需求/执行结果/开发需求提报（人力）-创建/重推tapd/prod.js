/*
 * @Author: yangluxi
 * @Date: 2025-12-22 13:13:19
 * @LastEditors: yangluxi
 * @LastEditTime: 2026-01-06 14:48:55
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/创建tapd.js
 * @Description: 
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

var fieldsArr = [
    'assignee_person_id', // 当前处理人
    't_tapd_project_name', // TAPD项目名称
    't_copy_sign', // 复制工单标识
    'parent_id', // 父级事件单
]
var incident = $GetBusinessObject('INCIDENT', incidentId, fieldsArr);
var projectNumber = $GetValue("t_tapd_project_name") || incident['t_tapd_project_name'];
var requirementName = $GetValue('t_tapd_requirement_name') || ($GetValue('number') + ' ' + $GetValue('short_description')); // 需求名称
var ids = [];
if (incident['t_copy_sign'] && incident['parent_id']) {
    /* 查询变更子表信息 */
    var changeInfos = $SearchBusinessObject(
        "TAPD_REQUIRE",
        {
            't_incident_id_mul': incident['parent_id'],
        },
        [
            'id',
            't_pause_reason',
        ]
    );
    if (changeInfos.length > 0) {
        changeInfos.forEach(function (item) {
            ids.push(item['id']);
        })
    }
}

var params = JSON.stringify({
    incidentId: incidentId,
    projectNumber: projectNumber,
    requirementName: requirementName,
    ids: ids,
    businessDesc: $GetValue('t_tapd_business_desc'), // 需求概述
    storyAcceptanceTime: $GetValue('t_tapd_accept_time_hr'), // 需求受理时间
    storySubmitDepartment: $GetValue('t_tapd_story_submit_department'), // 需求来源部门
    storySubmitUser: $GetValue('t_tapd_story_submit_user'), // 需求提出人
    expectCompletionTime: $GetValue('t_tapd_expect_completion_time'), // 期望完成时间
    businessPriority: $GetValue('t_tapd_priority_hr'), // 紧急度
    storySource: $GetValue('t_tapd_story_source_hr'), // 需求类型
    valueType: $GetValue('t_tapd_value_type_hr'), // 价值类型
    storyPlanUser: $GetValue('t_tapd_story_plan_user'), // 需求对接人
    storyBa: $GetValue('t_tapd_story_ba'), // BA
});
$Print("生成tapd需求-params:", params);
var data = $Invoke('yqcloud-external', "TapdNewInvoker", params);

if (data['success'] === 'false' || data['success'] === false) {
    $SetValue('t_is_create_requirement', 'F');
} else if (data['success'] === 'true' || data['success'] === true) {
    $SetValue('t_is_create_requirement', 'F');
}