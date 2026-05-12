var id = $GetValue("_parentId") || $GetValue("id");

var fieldsArr = [
    "t_functional_plan_end_date",
];

var datas = $GetBusinessObject("INCIDENT", id, fieldsArr) || {};

return datas['t_functional_plan_end_date']