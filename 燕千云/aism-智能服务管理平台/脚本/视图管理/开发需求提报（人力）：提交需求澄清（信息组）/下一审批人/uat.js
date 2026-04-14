/*
 * @Author: yangluxi
 * @Date: 2025-12-15 11:43:41
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-15 12:10:49
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/提交需求澄清(信息组视图-下一处理人默认脚本.js
 * @Description: 
 */

var infoId = '796689860161441792'; /* 固定信息组 测试环境：788355414329917440 正式环境：796689860161441792*/

/* 计算处理组开始 */
var userGroup = {};
if (infoId) {
    /* 查询固定信息组组的管理员 */
    $SetValue('assignment_group_id', infoId);
    userGroup = $GetBusinessObject("IAM_USER_GROUP", infoId, ['owner_id', 'owner_id:real_name', 'name']);
    $SetValue('assignment_group_id:name', userGroup['name']);
}
/* 计算处理组结束 */


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
