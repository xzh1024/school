/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var id = $GetValue('_parentId') || $GetValue('id')
var fd = $GetBusinessObject('INCIDENT', id, ['t_sales_division'])

$Print('新建投诉单-id:' + id)
$Print('新建投诉单-销售事业部:' + fd['t_sales_division'])

return fd['t_sales_division']
