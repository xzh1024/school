/*
 * @Author: yangluxi
 * @Date: 2025-12-15 18:52:19
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-15 19:34:58
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/需求审核(信息组组长)视图-下一处理人默认脚本.js
 * @Description: 
 */


var incidentId = $GetValue("_parentId") || $GetValue("id");
var infoId = '788355414329917440'; /* 固定信息组 测试环境：788355414329917440 正式环境：796689860161441792*/

var userGroup = {};
/* 查询固定信息组组的管理员 */
if (infoId) {
    userGroup = $GetBusinessObject("IAM_USER_GROUP", infoId, ['owner_id', 'owner_id:real_name']);
}

$Print('debug002,userGroup', userGroup);
$Print('debug002,owner_id', userGroup['owner_id']);

if (userGroup['owner_id']) {
    return {
        id: userGroup['owner_id'],
        real_name: userGroup['owner_id:real_name'],
    }
};

return {
    id: '',
    real_name: '',
};
