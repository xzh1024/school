/*
 * @Author: xiezihan
 * @Date: 2026-03-03 21:30:00
 * @LastEditors: xiezihan
 * @LastEditTime: 2026-03-03 21:30:00
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

var params = JSON.stringify({
    incidentId: incidentId,
});
var data = $Invoke('yqcloud-external', "TapdGeneralSyncInvoker", params);
