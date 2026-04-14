/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var stateId = $GetValue('state_id');
var stateList = [
    '827937187706871808', // 功能方案设计中
    '827937334637535232', // 功能方案审核中
    '827937479051616256', // 功能方案审批中
]
if (stateList.indexOf(String(stateId)) == -1) {
    stateId = '776023805222727680' // 排期中
}
return stateId