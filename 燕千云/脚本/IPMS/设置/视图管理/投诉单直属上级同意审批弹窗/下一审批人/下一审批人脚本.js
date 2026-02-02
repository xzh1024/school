/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

//submitted_by:department_id:name
$Print('投诉单直属上级同意审批弹窗===')
var tdr = $GetBusinessObject("INCIDENT", $GetValue("_parentId"), [
    "submitted_by",
    "submitted_by:real_name",
    "submitted_by:department_id:t_market_inspection_department_personnel",
    "submitted_by:department_id:t_market_inspection_department_personnel:real_name",
    "submitted_by:department_id:name",
    "assignee_person_id",
    "assignee_person_id:director_id",
    "assignee_person_id:director_id:real_name",
    "t_business_department_contacts",
    "t_business_department_contacts:department_id:parent_id:parent_id:t_market_inspection_department_personnel",
    "t_business_department_contacts:department_id:parent_id:parent_id:t_market_inspection_department_personnel:real_name",
    "t_market_centre_id",
    "t_market_centre",
    "t_sales_division",
]);

$Print("debug28 暂存tdr.t_market_centre_id=" + tdr);
if (tdr.t_market_centre) {
    var departItem = $SearchBusinessObject(
        "ORG_DEPARTMENT",
        {
            name: tdr.t_sales_division + tdr.t_market_centre,
        },
        [
            "t_market_inspection_department_personnel",
            "t_market_inspection_department_personnel:real_name",
        ]
    );
}
var bm_name = tdr["submitted_by:department_id:name"];

var incidentId = $GetValue("_parentId") || $GetValue("id");
var curUser = $GetCurrentPersonId();

var yd = $GetBusinessObject("INCIDENT", incidentId, [
    "closed_by",
    "service_item_id",
    "id",
    "t_whether_cross_division",
    "state_id",
    "t_submitted_by_department_one",
]);

var draftType = "";
if (
    yd &&
    yd.state_id == "632615169130496000" &&
    yd.service_item_id == "628299624163446784" &&
    yd.t_submitted_by_department_one.indexOf("市场督察") > -1
) {
    /* 投诉单 提交市场督察部审核-投诉单直属上级同意审批弹窗 */
    draftType = "create_ts_directly";
}
if (
    yd &&
    yd.state_id == "632615169130496000" &&
    yd.service_item_id == "628299624163446784" &&
    yd.t_submitted_by_department_one.indexOf("市场督察") <= -1
) {
    /*  投诉单 提交大区总经理/总监审核-投诉单直属上级同意审批弹窗 */
    draftType = "create_ts_area_manager";
}

if (draftType != null || draftType != "") {
    var drafts = $SearchBusinessObject(
        "INCIDENT_DRAFT",
        {
            incident_id: incidentId,
            t_draft_created_by: curUser,
            t_is_draft: 1,
            t_is_valid_draft: 1,
            t_draft_type: draftType,
        },
        ["t_assignee_person_id:real_name", "t_assignee_person_id"]
    );

    var record = null;

    if (drafts && drafts.length > 0) {
        record = drafts[0];
        return {
            id: record["t_assignee_person_id"],
            real_name: record["t_assignee_person_id:real_name"],
        };
    }
}

if ((!bm_name || bm_name.indexOf("市场督察部") === -1) && tdr["assignee_person_id:director_id"]) {
    var listData = findEnabledPerson(
        tdr["assignee_person_id"],
        false,
        "director_id"
    );
    if (listData.id) {
        return {
            id: listData.id,
            real_name: listData.name,
        };
    } else {
        return "";
    }
} else if (departItem && departItem.length > 0 && departItem[0]["t_market_inspection_department_personnel"]) {
    $Print("步骤2===");
    var drafData = findEnabledSinglePerson(
        departItem[0]["t_market_inspection_department_personnel"],
        false
    );

    if (drafData.id) {
        return {
            id: drafData.id,
            real_name: drafData.name,
        };
    } else {
        return {
            id: "634522367918739456",
            real_name: "丁麒崴",
        };
    }
}

return {
    id: "634522367918739456",
    real_name: "丁麒崴",
};

function findEnabledPerson (personId, flag, key) {
    var userGroup = $GetBusinessObject("IAM_USER_GROUP", "753191652310589440", [
        "owner_id",
        "name",
        "owner_id:real_name",
    ]);

    var ownerObj = {
        id: userGroup["owner_id"],
        name: userGroup["owner_id:real_name"],
    };

    var person = $GetBusinessObject("IAM_USER", personId, [
        "is_enabled",
        "id",
        "real_name",
        key,
        key + ":real_name",
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
        if (person['department_id:parent_id:parent_id:t_market_inspection_department_personnel'] != null || person['director_id'] != null) {
            return {
                id: person[key],
                name: person[key + ":real_name"],
            };
        } else {
            return {
                id: "634522367918739456",
                name: "丁麒崴",
            };
        }
    } else {

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
                [
                    "is_enabled",
                    "id",
                    "real_name",
                    "department_id",
                    key,
                    key + ":real_name",
                ]
            );
            $Print("handOver=====", handOver);
            if (handOver.is_enabled) {
                if (handOver[key]) {
                    return {
                        id: handOver[key],
                        name: handOver[key + ":real_name"],
                    };
                } else {
                    if (flag) {
                        return ownerObj;
                    } else {
                        return {
                            id: "",
                            name: "",
                        }; // 人员不存在
                    }
                }
            } else {
                if (handOver[key]) {
                    findEnabledPerson(handOver[key], flag, key);
                } else {
                    if (flag) {
                        return ownerObj;
                    } else {
                        return {
                            id: "",
                            name: "",
                        }; // 人员不存在
                    }
                }
            }
        }

        if (flag) {
            return ownerObj;
        } else {
            return {
                id: "634522367918739456",
                name: "丁麒崴",
            };
        }
    }
}
function findEnabledSinglePerson (personId, flag) {
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
                id: "634522367918739456",
                name: "丁麒崴",
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
        $Print("handoverList=====", handoverListverList);
        if (handoverList.length > 0) {
            var handOver = $GetBusinessObject(
                "IAM_USER",
                handoverList[0]["t_handover_person"],
                ["is_enabled", "id", "real_name", "department_id"]
            );
            $Print("handOver=====", handOver);

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
                    findEnabledSinglePerson(handOver["id"], flag);
                } else {
                    return ownerObj;
                }
            }
        }

        if (flag) {
            return ownerObj;
        } else {
            return {
                id: "634522367918739456",
                name: "丁麒崴",
            };
        } // 没有找到可用的人员
    }
}
