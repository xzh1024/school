/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var stateId = $GetValue('state_id');
var stateList = [
    '824960850319245312', // 功能方案设计中
    '824961410174943232', // 功能方案审核中
    '824962134904537088', // 功能方案审批中
]
if (stateList.indexOf(String(stateId)) == -1) {
    stateId = '750489627813085184' // 排期中
}
return stateId