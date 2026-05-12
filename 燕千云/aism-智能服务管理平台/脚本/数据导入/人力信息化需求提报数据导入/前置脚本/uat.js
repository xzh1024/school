/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

$Print('导入脚本-service_item_id:', $GetValue('service_item_id'));
$SetValue('service_item_id:name', '人力信息化需求提报');
/* uat环境写死 正式环境的时候注意替换正式环境此服务项对应的id */
$SetValue('service_item_id', '796675416186556416');

// 开发排序
var devIndex = $GetValue('t_dev_index');
if (devIndex) {
    $SetValue('t_dev_index', Number(devIndex));
}

var businessPlanDateRange = $GetValue('t_business_plan_date_range'); // 业务方案计划
if (businessPlanDateRange) {
    var businessPlanDateRangeArr = businessPlanDateRange.split('至');
    if (businessPlanDateRangeArr && businessPlanDateRangeArr.length) {
        $SetValue('t_business_plan_start_date', businessPlanDateRangeArr[0]); // 业务方案计划开始日期
        $SetValue('t_business_plan_end_date', businessPlanDateRangeArr[1]); // 业务方案计划结束日期
    }
}