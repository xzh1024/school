/*
 * @Author: yangluxi
 * @Date: 2025-12-15 10:41:58
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-16 10:50:53
 * @FilePath: /script_backups_code/AISM_UAT/业务规则/驳回上一级.js
 * @Description: 
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

$Print('debug002,incidentId', incidentId);

var fieldsArr = [
    "state_id",
    "assignee_person_id",
    "t_approval_history",
];


var curIncident = $GetBusinessObject("INCIDENT", incidentId, fieldsArr);
$Print('debug002,curIncident', curIncident);

var state_id = $GetValue("state_id") || curIncident['state_id'];
var assignee_person_id = $GetValue("assignee_person_id") || curIncident['assignee_person_id'];
var t_approval_history = $GetValue("t_approval_history") || curIncident['t_approval_history'];

$Print('debug002,state_id', state_id);
$Print('debug002,assignee_person_id', assignee_person_id);
$Print('debug002,t_approval_history', t_approval_history);


if (t_approval_history) {
    // 更新上一状态、审批人
    $SetValue("t_previous_state", state_id);
    $SetValue("t_previous_processor", assignee_person_id);

    // 驳回上级，就是取最后一个标识为1的审批历史
    var approval_list = t_approval_history.split(",");
    var flag = false;
    var new_history = "";
    for (var i = 0;i < approval_list.length;i++) {
        var list = approval_list[i].split(":");
        if (list[2] == "1") {
            var check_last_flag = false;
            if (i == approval_list.length - 1) {
                check_last_flag = true;
            } else {
                var next_list = approval_list[i + 1].split(":");
                if (next_list[2] == 0) {
                    check_last_flag = true;
                }
            }
            // 最后一项
            if (check_last_flag) {
                flag = true;
                $SetValue("state_id", list[0]);
                $SetValue("assignee_person_id", list[1]);
                if (list[1]) {
                    var personData = findEnabledPerson(list[1]);
                    if (personData.id) {
                        $SetValue("assignee_person_id", personData.id);
                    } else {
                        $SetValue("assignee_person_id", '');
                    }
                } else {
                    $SetValue("assignee_person_id", '');
                }
            }
        }
        // flag为true后，说明是驳回的历史
        new_history =
            new_history +
            (new_history ? "," : "") +
            list[0] +
            ":" +
            list[1] +
            ":" +
            (flag ? "0" : "1");
    }

    // 删除本次的驳回后的状态
    $SetValue("t_approval_history", new_history);
}

function findEnabledPerson (personId) {
    var person = $GetBusinessObject("IAM_USER", personId, [
        "is_enabled",
        "id",
        "real_name",
    ]);

    if (!person) {
        return {
            id: "",
            name: "",
        }; // 人员不存在
    }
    $Print("person=====", person);

    if (person.is_enabled) {
        return {
            id: person["id"],
            name: person["real_name"],
        }; // 直接返回可用的人员ID
    } else {
        return {
            id: "",
            name: "",
        };
    }
}
