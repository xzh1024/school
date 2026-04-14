/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var startDate = $GetValue('t_business_plan_start_date') // 业务方案计划开始日期
var endDate = $GetValue('t_business_plan_end_date') // 业务方案计划结束日期
var actualDate = '' // 业务方案实际开始日期
var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳

if (nowTimestamp >= startTimestamp) {
    actualDate = $GetCurrentDate()
}

return actualDate
