/*
 * @Author: xiezihan
 * @Date: 2026-02-27 11:33:57
 * @LastEditors: xiezihan
 * @LastEditTime: 2026-02-27 11:33:57
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

var params = JSON.stringify({
    incidentId: incidentId,
});
var data = $Invoke('yqcloud-external', "TapdGeneralSyncInvoker", params);

$Print('刷新TAPD需求状态:', data);
