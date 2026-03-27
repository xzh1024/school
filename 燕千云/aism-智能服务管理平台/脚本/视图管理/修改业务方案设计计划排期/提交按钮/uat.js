var id = $GetValue('_parentId') || $GetValue('id')
var tenantNum = $GetCurrentTenant().tenantNum
var startDate = $GetValue('t_business_plan_start_date')
var endDate = $GetValue('t_business_plan_end_date')

/* 定义提交创建事件单的函数  bo:业务对象， params：插入业务对象的数据*/
function submitByCode (bo, params) {
    var body = {
        requestParamMap: {
            businessObjectCode: bo // 业务对象-事件单（数据库表）
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
    t_business_plan_start_date: startDate,
    t_business_plan_end_date: endDate,
    t_business_plan_date_range: startDate + '至' + endDate
}
var startTimestamp = new Date(startDate + ' 00:00:00').getTime() // 开始时间戳
var nowTimestamp = new Date().getTime() // 当前时间戳
if (nowTimestamp >= startTimestamp) {
    updateParams.state_id = '784793902370148352' // 方案设计中
    updateParams.t_business_actual_start_date = $GetCurrentDate() // 获取当前日期对应的字符串，格式固定为yyyy-MM-dd
}
submitByCode('INCIDENT', updateParams)

if (nowTimestamp >= startTimestamp) {
    $Invoke(
        'yqcloud-external',
        'SendTodoInvoker',
        JSON.stringify({
            id: id,
            businessObjectCode: 'INCIDENT',
            actionCode: 'HR04', // 通知模版：【待办】人力经办人认领
            title: $GetValue('short_description')
        })
    )
}
