var id = $GetValue("_parentId") || $GetValue("id");

var datas = $GetBusinessObject("INCIDENT", id, [
    "t_date_aanmcgbb" // 计划完成日期
]) || {};

return datas['t_date_aanmcgbb']