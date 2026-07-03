var tenantNum = $GetCurrentTenant().tenantNum;
var configItem = 'OPTION_VALUE_1'; //配置项：可选值1
var scItem = $GetValue('t_sc_item'); //服务类型
var system = $GetValue('t_system'); //系统信息
var optionValue1 = $GetValue('t_option_value_1'); //可选值1
var optionValue2 = $GetValue('t_option_value_2'); //可选值2
var userId = $GetValue('caller_id'); //申请人
$Print('需求类型-');
if (scItem == null || scItem == undefined) {
    // 兼容不可编辑模式下，服务项视图展示时只显示编码不显示值的问题
    return null;
}

$Print('=========== 计算字段可选值范围 ============');
var payload = {
    'calc_element': 't_item_options',
    'config_item': configItem,
    'sc_item': scItem,
    'system': system,
    'option_value_1': optionValue1,
    'option_value_2': optionValue2,
    'user_id': userId
}
try {
    var response = $CallInterface(tenantNum, 'LOWCODE', 'SCRIPT_CALC', JSON.stringify({ 'payload': JSON.stringify(payload) }));
    var respJson = JSON.parse(response);
    var failed = respJson.failed;
    $Print('failed=' + failed);
    if (failed == null || failed == undefined) {
        if (respJson['t_item_options']) {
            $Print('需求类型-可选值:', respJson['t_item_options']);
            return respJson['t_item_options'];  // 返回可选值列表
        }
    }
} catch (error) {
    $Print('remoke error=' + error);
    // 打印错误信息 
}
return '-1';

