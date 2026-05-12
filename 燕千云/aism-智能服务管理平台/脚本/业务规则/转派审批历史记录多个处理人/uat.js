/*
 * @Author: yangluxi
 * @Date: 2026-01-27 09:50:31
 * @LastEditors: yangluxi
 * @LastEditTime: 2026-01-27 19:00:51
 * @FilePath: /script_backups_code/AISM_UAT/业务规则/转派审批历史记录多个处理人.js
 * @Description: 
 */

$Print('------debug68 审批记录当前状态及处理人');
var id = $GetValue('id');
var incident = $GetBusinessObject('INCIDENT', id, ['state_id', 't_approval_history', 'assignee_person_id', 't_previous_processor', 't_esponsible_person']);

var t_approval_history = $GetCurrentAttribute('t_approval_history') || incident['t_approval_history'];

$Print('------debug68 t_approval_history', t_approval_history);

/* // 这里会优先取弹窗里的数据，导致直接获取到是更新后的值
// 这里需要从数据库查询数据 */
var state_id = incident['state_id'];
var assignee_person_id = incident['assignee_person_id'];

/* 获取当前弹窗选择的处理人 */
var curSelAssigneePersonId = $GetValue('t_esponsible_person');

$Print('------debug68 curSelAssigneePersonId', curSelAssigneePersonId);


// 当前记录状态 
var new_history = '';
$Print('------debug68 new_history', new_history);

/* 转交是不会改变状态的 只会改变处理人  */
if (t_approval_history) {
    var index = t_approval_history.indexOf(state_id);
    if (index != -1 && !!curSelAssigneePersonId) {
        // 存在则更新状态
        var history_list = t_approval_history.split(',');
        $Print('------debug68,history_list', history_list);
        var history = '';
        var flag = false;
        for (var i = 0;i < history_list.length;i++) {
            // 分割状态和审批人 list[0]状态  list[1]处理人  list[2]驳回状态0/1  list[3]转交处理人 只有转交动作才有list[3]
            var list = history_list[i].split(':');
            history = history + (history ? ',' : '');

            $Print('------debug68 i=', i, ',history_list[i]=', history_list[i]);

            /* 审批历史包含转交状态 */
            if (list[0] == state_id) {
                //转交状态下审批人可能更换 
                $Print('------debug68 list[1]', list[1]);
                history = history + list[0] + ':' + list[1] + ':' + '1' + ':' + curSelAssigneePersonId;
            } else {
                // 其他状态的历史记录保持不变
                history = history + history_list[i];
            }
        }
        new_history = history;
        $Print('------debug68,new_history', new_history);
        $SetValue('t_approval_history', new_history);
    }
}

