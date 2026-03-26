/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

$Print('导入脚本-service_item_id:', $GetValue('service_item_id'));
$SetValue('service_item_id:name', '人力信息化需求提报');
/* uat环境写死 正式环境的时候注意替换正式环境此服务项对应的id */
$SetValue('service_item_id', '796675416186556416');

// 当前处理组(assignment_group_id)
var assignmentGroupName = $GetValue('assignment_group_id');
if (assignmentGroupName === '人力IT组') {
    $SetValue('assignment_group_id', '796689677130407936');
} else if (assignmentGroupName === '人力信息组') {
    $SetValue('assignment_group_id', '796689860161441792');
}
// 开发排序
var devIndex = $GetValue('t_dev_index');
if (devIndex) {
    $SetValue('t_dev_index', Number(devIndex));
}

$Print('导入脚本-assignee_person_id:', $GetValue('assignee_person_id'));
// 处理人LDAP账号转小写
var loginName = $GetValue('assignee_person_id:login_name');
$Print('导入脚本-login_name:', loginName);
if (loginName) {
    $Print('导入脚本-login_name-小写:', loginName.toLowerCase());
    $SetValue('assignee_person_id:login_name', loginName.toLowerCase());
}
