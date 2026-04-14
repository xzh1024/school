/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var startDate = $GetValue('t_functional_plan_start_date') // 功能方案计划开始日期
var endDate = $GetValue('t_functional_plan_end_date') // 功能方案计划结束日期

var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳
var value = ''
if (nowTimestamp >= startTimestamp) {
    value = $GetCurrentDate()
}

return value