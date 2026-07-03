/*
 * @Author: yangluxi
 * @Date: 2025-09-17 10:03:19
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-09-17 10:03:28
 * @FilePath: /script_backups_code/AISM_UAT/业务规则/生成TAPD需求.js
 * @Description: 
 */
var incidentId = $GetValue("_parentId") || $GetValue("id");
var projectNumber = '';
var projectName = $GetValue('t_tapd_project_name');
var requirementName = $GetValue('t_tapd_requirement_name') || ($GetValue('number') + ' ' + $GetValue('short_description')); // 需求名称

$Print('生成tapd需求===, projectName', projectName);
$Print('生成tapd需求===, requirementName:', requirementName);

var project = $GetBusinessObject('CRB_PROJECT', projectName, ['t_number', 't_name']);

$Print('生成tapd需求===, project', project);

projectNumber = project['t_number'];

$Print('生成tapd需求===, projectNumber', projectNumber);
$Print('生成tapd需求-需求受理时间', $GetValue('t_tapd_accept_time'));
$Print('生成tapd需求-期望完成时间', $GetValue('t_tapd_expect_completion_time'));

var storyAcceptanceTime = $GetValue('t_tapd_accept_time') // 需求受理时间
var expectCompletionTime = $GetValue('t_tapd_expect_completion_time') // 期望完成时间

if (projectNumber) {
    var params = {
        incidentId: incidentId,
        projectNumber: projectNumber,
        requirementName: requirementName,
        action: "TAPD_CREATE_REQUIREMENT",
        businessDesc: $GetValue('t_tapd_business_desc'), // 需求概述
        // storyAcceptanceTime: $GetValue('t_tapd_accept_time'), // 需求受理时间
        storySubmitDepartment: $GetValue('t_tapd_story_submit_department'), // 需求来源部门
        storySubmitUser: $GetValue('t_tapd_story_submit_user'), // 需求提出人
        // expectCompletionTime: $GetValue('t_tapd_expect_completion_time'), // 期望完成时间
        businessPriority: $GetValue('t_tapd_priority'), // 紧急度
        storySource: $GetValue('t_tapd_story_source'), // 需求类型
        valueType: $GetValue('t_tapd_value_type'), // 价值类型
        storyPlanUser: $GetValue('t_tapd_story_plan_user'), // 需求对接人
        storyBa: $GetValue('t_tapd_story_ba'), // BA
    };
    // 需求受理时间
    if (storyAcceptanceTime) {
        params.storyAcceptanceTime = String(storyAcceptanceTime);
    }
    // 期望完成时间
    if (expectCompletionTime) {
        params.expectCompletionTime = String(expectCompletionTime);
    }
    $Print("生成tapd需求-params:", JSON.stringify(params));
    var data = $Invoke('yqcloud-external', "TapdInvoker", JSON.stringify(params));
    $Print('生成tapd需求-data:', data);
}
