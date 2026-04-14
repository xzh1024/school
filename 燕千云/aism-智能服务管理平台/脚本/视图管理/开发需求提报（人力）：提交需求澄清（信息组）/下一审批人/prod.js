/*
 * @Author: yangluxi
 * @Date: 2025-12-15 11:43:41
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-15 12:10:49
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/提交需求澄清(信息组视图-下一处理人默认脚本.js
 * @Description: 
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

var fieldsArr = [
    "assignee_person_id",
    "assignment_group_id",
];

/* 查询当前事件单 */
var curIncident = $GetBusinessObject("INCIDENT", incidentId, fieldsArr);
$Print('debug002,curIncident', curIncident);

var userGroup = {};
/* 查询当前处理组的管理员 */
if (curIncident['assignment_group_id']) {
    userGroup = $GetBusinessObject("IAM_USER_GROUP", curIncident['assignment_group_id'], ['owner_id', 'owner_id:real_name']);
}

$Print('debug002,userGroup', userGroup);


if (userGroup['owner_id']) {
    return {
        id: userGroup['owner_id'],
        real_name: userGroup['owner_id:real_name'],
    }
};

return {
    id: '-1',
    real_name: '-1',
};
