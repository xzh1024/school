var id = $GetValue('_parentId') || $GetValue('id')
var tenantNum = $GetCurrentTenant().tenantNum

$Print('修改设计计划-开始:', $GetValue('t_business_plan_start_date'))
$Print('修改设计计划-结束:', $GetValue('t_business_plan_end_date'))

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
    t_business_plan_start_date: $GetValue('t_business_plan_start_date'),
    t_business_plan_end_date: $GetValue('t_business_plan_end_date'),
    t_business_plan_date_range: $GetValue('t_business_plan_start_date') + '至' + $GetValue('t_business_plan_end_date'),
}
