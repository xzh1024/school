/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var id = $GetValue('_parentId') || $GetValue('id')
var fd = $GetBusinessObject('INCIDENT', id, ['t_verify_location_name'])

$Print('新建投诉单-id:' + id)
$Print('新建投诉单-核实地点:' + fd['t_verify_location_name'])

return fd['t_verify_location_name']
