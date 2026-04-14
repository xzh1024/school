/*
 * @Author: yangluxi
 * @Date: 2025-12-15 10:41:58
 * @LastEditors: yangluxi
 * @LastEditTime: 2025-12-16 10:50:53
 * @FilePath: /script_backups_code/AISM_UAT/业务规则/驳回上一级.js
 * @Description: 
 */

var incidentId = $GetValue("_parentId") || $GetValue("id");

var fieldsArr = [
    "state_id",
    "assignee_person_id",
    "t_approval_history",
];


var curIncident = $GetBusinessObject("INCIDENT", incidentId, fieldsArr);
$Print('驳回-curIncident:', curIncident);

var stateId = $GetValue("state_id") || curIncident['state_id'];
var assigneePersonId = $GetValue("assignee_person_id") || curIncident['assignee_person_id'];
var approvalHistory = $GetValue("t_approval_history") || curIncident['t_approval_history'];


$Print('驳回-stateId:', stateId);
$Print('驳回-assigneePersonId:', assigneePersonId);
$Print('驳回-approvalHistory:', approvalHistory);


if (approvalHistory) {
    // 更新上一状态、审批人
    $SetValue("t_previous_state", stateId);
    $SetValue("t_previous_processor", assigneePersonId);

    // 驳回上级，就是取最后一个标识为1的审批历史
    var approvalList = approvalHistory.split(",");
    var flag = false;
    var newHistory = "";
    for (var i = 0;i < approvalList.length;i++) {
        var list = approvalList[i].split(":");
        if (list[2] == "1") {
            var checkLastFlag = false;
            if (i == approvalList.length - 1) {
                checkLastFlag = true;
            } else {
                var nextList = approvalList[i + 1].split(":");
                if (nextList[2] == 0) {
                    checkLastFlag = true;
                }
            }
            // 最后一项
            if (checkLastFlag) {
                flag = true;
                $SetValue("state_id", list[0]);
                $SetValue("assignee_person_id", list[1]);
                handleLastAssigneePerson(approvalList[i - 1]);
                if (list[1]) {
                    var personData = findEnabledPerson(list[1]);
                    $Print('驳回-personData:', personData);
                    $Print('驳回-personData-name:', personData.name);
                    if (personData.id) {
                        $SetValue("assignee_person_id", personData.id);
                        $SetValue("assignee_person_id:real_name", personData.name);
                    } else {
                        $SetValue("assignee_person_id", '');
                    }
                } else {
                    $SetValue("assignee_person_id", '');
                }
            }
        }
        // flag为true后，说明是驳回的历史
        newHistory =
            newHistory +
            (newHistory ? "," : "") +
            list[0] +
            ":" +
            list[1] +
            ":" +
            (flag ? "0" : "1");
    }

    // 删除本次的驳回后的状态
    $SetValue("t_approval_history", newHistory);
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

// 更新 上个处理人
function handleLastAssigneePerson (data) {
    var list = data.split(":");
    if (list && list.length) {
        var personData = findEnabledPerson(list[1]);
        if (personData.id) {
            $SetValue("t_last_assignee_person_id", personData.id);
        } else {
            $SetValue("t_last_assignee_person_id", '');
        }
    }
}
