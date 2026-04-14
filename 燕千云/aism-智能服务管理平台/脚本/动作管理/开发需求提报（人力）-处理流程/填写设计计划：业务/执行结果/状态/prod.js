/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var startDate = $GetValue('t_business_plan_start_date') // 业务方案计划开始日期
var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳
var stateId = '824359454380793856' // 业务方案设计待开始
if (nowTimestamp >= startTimestamp) {
    // 跳过‘功能方案设计待开始’直接到‘功能方案设计中’
    stateId = '796727302336151552' // 业务方案设计中
}

return stateId
