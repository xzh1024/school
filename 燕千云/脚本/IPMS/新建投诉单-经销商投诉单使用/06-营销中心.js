/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var id = $GetValue('_parentId') || $GetValue('id')
var fd = $GetBusinessObject('INCIDENT', id, ['t_market_centre'])

$Print('新建投诉单-id:' + id)
$Print('新建投诉单-营销中心:' + fd['t_market_centre'])

return fd['t_market_centre']
