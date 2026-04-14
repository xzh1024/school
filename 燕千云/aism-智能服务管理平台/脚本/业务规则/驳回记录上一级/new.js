var state_id = $GetValue("state_id");
var assignee_person_id = $GetValue("assignee_person_id");
var t_approval_history = $GetValue("t_approval_history");
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
                var userGroup = $GetBusinessObject(
                    "IAM_USER_GROUP",
                    "753191652310589440",
                    ["owner_id", "name", "owner_id:real_name"]
                );
                if (list[1]) {
                    var drafData = findEnabledPerson(list[1], true);

                    if (drafData.id) {
                        $SetValue("assignee_person_id", drafData.id);
                    } else {
                        $SetValue("assignee_person_id", userGroup["owner_id"]);
                    }
                } else {
                    $SetValue("assignee_person_id", userGroup["owner_id"]);
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
function findEnabledPerson (personId, flag) {
    var userGroup = $GetBusinessObject("IAM_USER_GROUP", "753191652310589440", [
        "owner_id",
        "name",
        "owner_id:real_name",
    ]);
    $Print("userGroup===", userGroup);
    var ownerObj = {
        id: userGroup["owner_id"],
        name: userGroup["owner_id:real_name"],
    };
    var person = $GetBusinessObject("IAM_USER", personId, [
        "is_enabled",
        "id",
        "real_name",
    ]);
    if (!person) {
        if (flag) {
            return ownerObj;
        } else {
            return {
                id: "",
                name: "",
            }; // 人员不存在
        }
    }
    $Print("person=====", person);
    if (person.is_enabled) {
        return {
            id: person["id"],
            name: person["real_name"],
        }; // 直接返回可用的人员ID
    } else {
        $Print("===falsePerson=====");
        var handoverList =
            $SearchBusinessObject(
                "HANDOVER_FORM",
                { t_transferor: personId, t_handover_status: "true" },
                ["t_handover_person", "t_handover_person:real_name"]
            ) || [];
        $Print("handoverList=====", handoverList);
        if (handoverList.length > 0) {
            var handOver = $GetBusinessObject(
                "IAM_USER",
                handoverList[0]["t_handover_person"],
                ["is_enabled", "id", "real_name", "department_id"]
            );
            $Print("handOver=====", handOver);
            // return {
            //   id: handOver["id"],
            //   name: handOver["real_name"],
            // };
            if (handOver.is_enabled) {
                if (handOver["id"]) {
                    return {
                        id: handOver["id"],
                        name: handOver["real_name"],
                    };
                } else {
                    return ownerObj;
                }
            } else {
                if (handOver["id"]) {
                    findEnabledPerson(handOver["id"], true);
                } else {
                    return ownerObj;
                }
            }
        }

        if (flag) {
            return ownerObj;
        } else {
            return {
                id: "",
                name: "",
            };
        } // 没有找到可用的人员
    }
}
