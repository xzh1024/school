/*
 * @Author: yangluxi
 * @Date: 2025-09-17 10:03:19
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-09-17 10:03:28
 * @FilePath: /script_backups_code/AISM_UAT/业务规则/生成TAPD需求.js
 * @Description: 
 */
$Print('生成tapd需求===')
var incidentId = $GetValue("_parentId") || $GetValue("id");
var projectNumber = '';
var projectName = $GetValue('t_tapd_project_name');
var requirementName = $GetValue('t_tapd_requirement_name'); // 需求名称

$Print('生成tapd需求===, projectName', projectName);
$Print('生成tapd需求===, requirementName:', requirementName);

var project = $GetBusinessObject('CRB_PROJECT', projectName, ['t_number', 't_name']);

$Print('生成tapd需求===, project', project);

projectNumber = project['t_number'];

$Print('生成tapd需求===, projectNumber', projectNumber);


if (projectNumber) {
    var params = JSON.stringify({
        incidentId: incidentId,
        projectNumber: projectNumber,
        requirementName: requirementName,
        action: "TAPD_CREATE_REQUIREMENT",
    });
    var data = $Invoke('yqcloud-external', "TapdInvoker", params);

    $Print('生成tapd需求===, params', params);
    $Print('生成tapd需求===, data', data);
}
