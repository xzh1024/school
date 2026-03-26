/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var id = $GetValue('_parentId') || $GetValue('id')
$Print('调整开发顺序-index:', $GetValue('t_dev_index'))
$Print('调整开发顺序-id:', id)
var fd = $GetBusinessObject('INCIDENT', id, [
    't_dev_index',
])
$Print('调整开发顺序-fd:', fd)
$Print('调整开发顺序-value:', fd['t_dev_index'])

if (fd) {
    return fd['t_dev_index'];
}
return '';
