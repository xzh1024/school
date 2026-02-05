/*
 * @Author: yangluxi
 * @Date: 2025-03-25 17:58:45
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-10 14:52:28
 * @FilePath: /script_backups_code/IPMS_UAT/溯源单/溯源单动作集显示条件脚本.js
 *  * 溯源单 投诉单 处理单 反馈单 二次溯源单 核实单 等动作前提条件 都是这个脚本
 * @Description:
 */
var taskId = $GetValue('_parentId') || $GetValue('id')

$Print('debug99 taskId=' + taskId)

if (taskId) {
  var list = $GetBusinessObject('INCIDENT', taskId, ['t_task_journal_id'])
  $Print('debug99 list=' + list)

  var allList = $SearchBusinessObject(
    'CRB_TASK_JOURNALS',
    {
      incident_id: taskId,
      visible_caller_flag: true
    },
    ['id', 'status']
  )

  var completeList = $SearchBusinessObject(
    'CRB_TASK_JOURNALS',
    {
      incident_id: taskId,
      status: 'COMPLETE',
      'parent_id:name': '➤ 开始',
      visible_caller_flag: true
    },
    ['id', 'status']
  )

  var stopList = $SearchBusinessObject(
    'CRB_TASK_JOURNALS',
    {
      incident_id: taskId,
      status: 'STOP',
      'parent_id:name': '➤ 开始',
      visible_caller_flag: true
    },
    ['id', 'status']
  )

  var pendingList = $SearchBusinessObject(
    'CRB_TASK_JOURNALS',
    {
      incident_id: taskId,
      status: 'PENDING',
      'parent_id:name': '➤ 开始',
      visible_caller_flag: true
    },
    ['id', 'status']
  )
  $Print(
    'debug99 completeList=' + completeList + ',length=' + completeList.length
  )
  $Print('debug99 stopList=' + stopList + ',length=' + stopList.length)
  $Print('debug99 pendingList=' + pendingList + ',length=' + pendingList.length)

  /* 1.沟通行都为已反馈 */
  if (
    completeList.length > 0 &&
    pendingList.length == 0 &&
    stopList.length == 0
  ) {
    $Print(
      'debug15 completeList after=' +
        completeList +
        ',length=' +
        completeList.length
    )
    return $GetCurrentTenantId()
  } else if (
    stopList.length > 0 &&
    pendingList.length == 0 &&
    completeList.length == 0
  ) {
    $Print('debug15 stopList after=' + stopList + ',length=' + stopList.length)
    /* 2.沟通行都为已终止状态 */
    return $GetCurrentTenantId()
  } else if (
    stopList.length > 0 &&
    completeList.length > 0 &&
    pendingList.length == 0
  ) {
    $Print(
      'debug15 pendingList after=' +
        pendingList +
        ',length=' +
        pendingList.length
    )

    /* 3.沟通行 都为已反馈或者已终止 但是没有待沟通行 */
    return $GetCurrentTenantId()
  } else if (allList.length == 0) {
    /* 4.从来没发起沟通的单据 */
    return $GetCurrentTenantId()
  } else {
    $Print('debug99 还有待沟通数据=')
    return '-1'
  }
} else {
  $Print('debug99 拿不到事件单id')
  return '-1'
}
