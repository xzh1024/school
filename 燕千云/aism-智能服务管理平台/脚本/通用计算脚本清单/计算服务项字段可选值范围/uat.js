$Print('===== 计算字段的可选值范围 =====');
/* //调用传参：
{
  "calc_element": "t_item_options",
  "config_item": "OPTION_VALUE_1",
  "sc_item": "SC_ITEM_001",
  "system": "647362880652443648",
  "option_value_1": "value1",
  "option_value_2": "value2",
  "user_id": "123"
}
*/
var calcElement = $GetValue('calc_element');
if (calcElement != 't_item_options') return;

var configItem = $GetValue('config_item'); //配置项：系统信息/可选值1/可选值2
var scItem = $GetValue('sc_item'); //服务类型
var system = $GetValue('system'); //系统信息
var optionValue1 = $GetValue('option_value_1'); //可选值1
var optionValue2 = $GetValue('option_value_2'); //可选值2
var userId = $GetValue('user_id'); //申请人
var deptPath = null; //申请人部门路径

if (userId) {
    deptPath = $GetBusinessObject('IAM_USER', userId, ['department_id:level_path'])['department_id:level_path'];
}
$Print('=========== Start Log ============');
$Print('configItem=' + configItem + ', scItem=' + scItem + ', system=' + system + ', optionValue1=' + optionValue1 + ', optionValue2=' + optionValue2 + ', deptPath=' + deptPath);

//Step0：清理无效参数值
if (configItem == 'SYSTEM') {
    system = null;
    optionValue1 = null;
    optionValue2 = null;
} else if (configItem == 'OPTION_VALUE_1') {
    optionValue1 = null;
    optionValue2 = null;
} else if (configItem == 'OPTION_VALUE_2') {
    optionValue2 = null;
}
// value值兼容性修复
if (optionValue1 == '默认') {
    optionValue1 = 'B10000';
}

if (scItem) {
    var params = {
        't_enabled_flag': 1,
        't_config_item': configItem,
        't_sc_item': scItem
    };
    // if( system ){ params['crb_system_id'] = system; }
    // if( optionValue1 ){ params['t_option_value_1'] = optionValue1; }
    // if( optionValue2 ){ params['t_option_value_2'] = optionValue2; }
    // $Print('params='+JSON.stringify(params));
    // Step1: 按[服务类型]查询配置项， 因为无法用部门参数检索，故查询所有
    var options = $SearchBusinessObject('CRB_ITEM_OPTIONS_CONFIG', params, ['id', 't_name', 't_option_value_1', 't_option_value_2', 'crb_system_id', 't_department_id', 't_department_id:level_path', 't_attachment_template', 't_description_template']);
    var arrys = options;
    $Print('arrys.length=' + arrys.length);

    // Step2.1: 匹配[部门]参数【1级优先】
    var extArrys = [];
    var nullArrys = [];
    var otherArrys = [];
    arrys.forEach(function (item) {
        var deptId = item['t_department_id:level_path'];
        var rec = {
            'id': item['id'],
            't_name': item['t_name'],
            't_system': item['crb_system_id'],
            't_option_value_1': item['t_option_value_1'],
            't_option_value_2': item['t_option_value_2'],
            't_description_template': item['t_description_template'],
            't_attachment_template': item['t_attachment_template'],
            't_department_id': item['t_department_id'],
            't_department_id:level_path': item['t_department_id:level_path']
        }
        $Print('deptId=' + deptId);
        if (deptId === null || deptId === undefined || deptId === '') {
            nullArrys.push(rec);
        } else {
            if (deptPath && ~deptPath.indexOf(deptId)) {
                // 优先匹配包含部门的配置值
                extArrys.push(rec);
            } else {
                //非申请人部门下的系统值，即其他部门独享的系统值
                otherArrys.push(item['crb_system_id']);
            }
        }
    });
    if (extArrys.length > 0) {
        // 存在精确匹配行时，舍弃配置为空的行
        var arrys = extArrys;
    } else {
        var arrys = nullArrys;
    }
    $Print('deptArrys=' + JSON.stringify(arrys));

    // Step2.2: 匹配[系统信息]参数【2级优先】
    var extArrys = [];
    var nullArrys = [];
    arrys.forEach(function (item) {
        var sys = item['t_system'];
        if (sys === null || sys === undefined || sys === '') {
            nullArrys.push(item);
        } else if (sys && system && sys == system) {
            extArrys.push(item);
        } else if (sys && configItem == 'SYSTEM') {
            extArrys.push(item);
        }
    });
    if (extArrys.length > 0) {
        // 存在精确匹配行或存在配置项值时，舍弃配置为空的行
        var arrys = extArrys;
    } else {
        var arrys = nullArrys;
    }
    $Print('sysArrys=' + JSON.stringify(arrys));

    // Step2.3: 匹配[可选值1]参数【3级优先】
    var extArrys = [];
    var nullArrys = [];
    arrys.forEach(function (item) {
        var value1 = item['t_option_value_1'];
        if (value1 === null || value1 === undefined || value1 === '') {
            nullArrys.push(item);
        } else if (value1 && optionValue1 && value1 == optionValue1) {
            extArrys.push(item);
        } else if (value1 && configItem == 'OPTION_VALUE_1') {
            extArrys.push(item);
        }
    });
    if (extArrys.length > 0) {
        // 存在精确匹配行或存在配置项值时，舍弃配置为空的行
        var arrys = extArrys;
    } else {
        var arrys = nullArrys;
    }
    $Print('value1Arrys=' + JSON.stringify(arrys));

    // Step2.4: 匹配[可选值2]参数【4级优先】
    var extArrys = [];
    var nullArrys = [];
    arrys.forEach(function (item) {
        var value2 = item['t_option_value_2'];
        if (value2 === null || value2 === undefined || value2 === '') {
            nullArrys.push(item);
        } else if (value2 && optionValue2 && value2 == optionValue2) {
            extArrys.push(item);
        } else if (value2 && configItem == 'OPTION_VALUE_2') {
            extArrys.push(item);
        }
    });
    if (extArrys.length > 0) {
        // 存在精确匹配行或存在配置项值时，舍弃配置为空的行
        var arrys = extArrys;
    } else {
        var arrys = nullArrys;
    }
    $Print('value2Arrys=' + JSON.stringify(arrys));

    $Print('=========== End Log ============');
    // Step3: 拼接返回结果
    var result = [];
    arrys.forEach(function (item) {
        if (configItem == 'SYSTEM' && item['t_system']) {
            result.push(item['t_system']);
        } else if (configItem == 'OPTION_VALUE_1' && item['t_option_value_1']) {
            result.push(item['t_option_value_1']);
        } else if (configItem == 'OPTION_VALUE_2' && item['t_option_value_2']) {
            result.push(item['t_option_value_2']);
        } else if (configItem == 'ATTACHMENT_TEMPLATE' && item['t_attachment_template']) {
            result.push(item['t_attachment_template']);
        } else if (configItem == 'DESCRIPTION_TEMPLATE' && item['t_description_template']) {
            result.push(item['t_description_template']);
        }
    });

    // Step4：针对系统信息字段添加特殊逻辑
    if (configItem == 'SYSTEM' && result.length <= 0) {
        // 没有配置系统值范围则查询所有系统值
        var systems = $SearchBusinessObject('CRB_SYSTEM', { 't_enabled_flag': true }, ['id']);
        // 从系统值里剔除其他部门独享的系统值
        systems.forEach(function (item) {
            if (otherArrys.indexOf(item['id']) === -1) {
                result.push(item['id']);
            }
        });
    }

    if (result.length > 0) {
        var optionStr = result.join(',');
        $SetValue('t_item_options', optionStr);
        return optionStr;
    }
}
return null;