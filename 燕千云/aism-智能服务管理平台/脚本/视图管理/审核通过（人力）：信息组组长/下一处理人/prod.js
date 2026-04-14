var incidentId = $GetValue("_parentId") || $GetValue("id");
var directorId = '796689971687854080'; /* 固定总监组 测试环境：788356357813436416 正式环境：796689971687854080*/

var userGroup = {};
/* 查询固定总监组组的管理员 */
if (directorId) {
    userGroup = $GetBusinessObject("IAM_USER_GROUP", directorId, ['owner_id', 'owner_id:real_name']);
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
