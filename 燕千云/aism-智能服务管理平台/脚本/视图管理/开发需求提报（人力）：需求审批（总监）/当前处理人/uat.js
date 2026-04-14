/*
 * @Author: yangluxi
 * @Date: 2025-12-15 19:40:09
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-22 12:34:43
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/开发需求提报(人力)：需求审批（总监下一处理人默认.js
 * @Description:  测试环境 需求澄清中ID(786006261386334208 ) 正式环境 需求澄清中ID(796728311145693184）
 */
var incidentId = $GetValue("_parentId") || $GetValue("id");
var infoId = '788355414329917440'; /* 固定信息组 测试环境：788355414329917440 正式环境：796689860161441792*/

var incident = $GetBusinessObject('INCIDENT', incidentId, ['assignee_person_id', 't_approval_history']);

/* 计算处理人 开始 */
var assigneePersonId = '';
$Print('------debug66 incident', incident);
$Print('------debug66 incident bool', incident['t_approval_history'].indexOf('786006261386334208') > -1);

var t_approval_history = incident['t_approval_history'];
if (t_approval_history) {
    if (t_approval_history.indexOf('786006261386334208') > -1) {
        var history_list = t_approval_history.split(',');
        if (history_list.length) {
            for (var i = 0;i < history_list.length;i++) {

                if (String(history_list[i]).indexOf("786006261386334208") > -1) {

                    var arrs = String(history_list[i]).split(':');

                    if (arrs.length > 1) {
                        assigneePersonId = arrs[1];/* 每组审批历史数据，第一个是状态，第二个是处理人，状态:处理人:1这种格式 */
                    }
                }
            }
        }
    }
}
/* 计算处理人结束 */
$Print('------debug66 assigneePersonId', assigneePersonId);

/* 计算处理组开始 */
var userGroup = {};
if (infoId) {
    /* 查询固定信息组组的管理员 */
    $SetValue('assignment_group_id', infoId);
    userGroup = $GetBusinessObject("IAM_USER_GROUP", infoId, ['owner_id', 'owner_id:real_name', 'name']);
    $SetValue('assignment_group_id:name', userGroup['name']);
}

/* 计算处理组结束 */

if (assigneePersonId) {
    var person = $GetBusinessObject("IAM_USER", assigneePersonId, [
        "is_enabled",
        "id",
        "real_name",
    ]);
    return {
        id: assigneePersonId,
        real_name: person['real_name'],
    };
}

return {
    id: '',
    real_name: '',
};
