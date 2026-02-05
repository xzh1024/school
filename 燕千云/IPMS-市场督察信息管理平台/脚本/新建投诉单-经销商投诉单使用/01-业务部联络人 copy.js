/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var id = $GetValue('_parentId') || $GetValue('id')
var fd = $GetBusinessObject('INCIDENT', id, ['created_by:real_name'])

$Print('新建投诉单-id:' + id)
$Print('新建投诉单-fd:' + fd)

return fd['created_by:real_name']
