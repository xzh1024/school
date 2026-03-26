/*
 * @Author: yangluxi
 * @Date: 2025-12-22 13:13:19
 * @LastEditors: yangluxi
 * @LastEditTime: 2026-01-08 09:44:22
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/创建tapd.js
 * @Description: 
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");
var incident = $GetBusinessObject('INCIDENT', incidentId, ['assignee_person_id', 't_tapd_project_name', 't_copy_sign', 't_hr_type', 'parent_id']);
var projectNumber = $GetValue("t_tapd_project_name") || incident['t_tapd_project_name'];
var requirementName = $GetValue('t_tapd_requirement_name') || ($GetValue('number') + ' ' + $GetValue('short_description')); // 需求名称

$Print('debug004 tapd incidentId', incidentId);
$Print('debug004 tapd incident', incident);
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
    $Print('debug004 tapd changeInfos', changeInfos);
    if (changeInfos.length > 0) {
        changeInfos.forEach(function (item) {
            ids.push(item['id']);
        })
    }
}

var params = JSON.stringify({
    incidentId: incidentId,
    projectNumber: projectNumber,
    requirementName: requirementName, // 需求名称
    ids: ids,
});
$Print('debug004 params', params);
var data = $Invoke('yqcloud-external', "TapdNewInvoker", params);

$Print('debug004 suceess', !data['success']);
$Print('debug004 suceess', typeof (data['success']));

if (data['success'] === 'false' || data['success'] === false) {
    $SetValue('t_is_create_requirement', 'F');
} else if (data['success'] === 'true' || data['success'] === true) {
    $SetValue('t_is_create_requirement', 'F');
}

$Print('debug004 生成tapd, data', data);
