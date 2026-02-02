/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var id = $GetValue('_parentId') || $GetValue('id')
var fd = $GetBusinessObject('INCIDENT', id, ['contact_phone'])

$Print('新建投诉单-id:' + id)
$Print('新建投诉单-业务部联络人电话:提单人电话:' + fd['contact_phone'])

return fd['contact_phone']
