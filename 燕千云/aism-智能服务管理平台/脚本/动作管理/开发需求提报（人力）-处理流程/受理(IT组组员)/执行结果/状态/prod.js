/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var startDate = $GetValue('t_functional_plan_start_date') // 功能方案计划开始日期

var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳
var stateId = '827937790017298432' // 功能方案设计待开始
if (nowTimestamp >= startTimestamp) {
    // 跳过‘功能方案设计待开始’直接到‘功能方案设计中’
    stateId = '827937187706871808' // 功能方案设计中
}

return stateId