/*
 * @Author: yangluxi
 * @Date: 2025-12-23 13:46:41
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-23 15:32:09
 * @FilePath: /script_backups_code/AISM_UAT/开发需求提报（人力）/服务项可选值1筛选.js
 * @Description: 
 */

/* 根据可选值1 和 服务类型 晒线 系统信息 */

var scItem = $GetValue('t_sc_item'); //服务类型
var optionValue1 = $GetValue('t_option_value_1'); //可选值1

var configs = $SearchBusinessObject(
    "CRB_ITEM_OPTIONS_CONFIG",
    {
        't_sc_item': scItem,
    },
    [
        't_sc_item',
        't_option_value_1',
        'crb_system_id',
        'id'
    ]
);

var ids = [];
if (configs.length > 0 && scItem) {
    configs.forEach(function (item) {
        ids.push(item['t_option_value_1'])
    })

    return ids.join(",")
}

return '-1'
