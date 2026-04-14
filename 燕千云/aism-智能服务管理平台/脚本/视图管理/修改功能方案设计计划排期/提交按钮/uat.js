var id = $GetValue('_parentId') || $GetValue('id')
var tenantNum = $GetCurrentTenant().tenantNum
var startDate = $GetValue('t_functional_plan_start_date') // 功能方案计划开始日期
var endDate = $GetValue('t_functional_plan_end_date') // 功能方案计划结束日期

/* 定义提交创建事件单的函数  bo:业务对象， params：插入业务对象的数据*/
function submitByCode (bo, params) {
    var body = {
        requestParamMap: {
            businessObjectCode: bo
        },
        payload: JSON.stringify(params)
    }
    var response = $CallInterface(
        String(tenantNum),
        'LOWCODE',
        'BOSUB',
        JSON.stringify(body)
    )
    return JSON.parse(response)
}

// 更新
var updateParams = {
    _status: 'update',
    id: id,
    t_functional_plan_start_date: startDate,
    t_functional_plan_end_date: endDate,
    t_functional_plan_date_range: startDate + '至' + endDate
}
var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳
if (nowTimestamp >= startTimestamp) {
    updateParams.state_id = '824960850319245312' // 功能方案设计中
    updateParams.t_functional_actual_start_date = $GetCurrentDate() // 功能方案实际开始日期
}
submitByCode('INCIDENT', updateParams)
