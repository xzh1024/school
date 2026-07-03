/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

var assignmentGroupId = $GetValue("assignment_group_id");
var users = $SearchBusinessObject('IAM_USER_GROUP_ASSIGN', { 'user_group_id': assignmentGroupId, }, ['user_id', 'user_id:is_enabled', 't_status']);

var ids = [];
if (users && users.length) {
    users.forEach(function (item) {
        ids.push(item['user_id'])
    })
}
return ids.join(",");
