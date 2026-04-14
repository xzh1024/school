var startDate = $GetValue('t_functional_plan_start_date') // 功能方案计划开始日期
var endDate = $GetValue('t_functional_plan_end_date') // 功能方案计划结束日期
var stateId = $GetValue('state_id') // 状态
var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳

if (nowTimestamp >= startTimestamp) {
    stateId = '829312322052034560' // 功能方案设计中
}

return stateId
