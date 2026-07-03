/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

var user = $GetCurrentPerson()
var userId = user.id
$Print('需求部门-user:', user)
$Print('需求部门-user-id:', userId)

var list = $SearchBusinessObject('IAM_USER', { id: userId }, [
    'department_id', // 部门id
    'department_id:name', // 部门名称
])

$Print('需求部门-list:', list)
$Print('需求部门-list-length:', list.length)
if (list && list.length) {
    var itemData = list[0]
    $Print('需求部门-list-item:', itemData)
    if (itemData && itemData['department_id']) {
        return {
            id: itemData['department_id'],
            name: itemData['department_id:name']
        }
    }
}

var options = $SearchBusinessObject('CRB_ITEM_OPTIONS_CONFIG', {
    't_enabled_flag': 1,
    't_config_item': 'OPTION_VALUE_1',
    't_sc_item': 'SC_ITEM_017'
}, ['id', 't_name', 't_option_value_1', 't_option_value_2', 'crb_system_id', 't_department_id', 't_department_id:level_path', 't_attachment_template', 't_description_template']);
$Print('配置项-options:', options);
$Print('配置项-options.length:', options.length);

return null