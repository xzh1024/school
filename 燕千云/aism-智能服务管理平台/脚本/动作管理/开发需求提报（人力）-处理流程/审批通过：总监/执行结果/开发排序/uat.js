/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var creationDate = $GetValue('creation_date');

var list = $SearchBusinessObject(
    'TAPD_REQUIRE', // 开发需求提报（人力）-TAPD需求表
    {
        service_item_id: '784445454248726528', // 服务项：人力信息化需求提报
        state_id: '784793902370148352,784794102258094080,784794321653747712,784794579909627904,784792668850507776,784794829533630464,750489627813085184', // 方案设计中、方案审核中、方案审批中、待IT组评估、待IT组受理、待排期、排期中
    },
    // 默认会查询业务对象下，所有勾选了默认查询的字段
    [
        'creation_date', // 创建时间
        'number', // 单据编号
        't_dev_index', // 开发排序
    ]
)

list.sort(function (a, b) {
    var date1 = a.creation_date,
        date2 = b.creation_date;
    if (date1 === date2) {
        return b.number - a.number;
    }
    return date1 - date2; // 从小到大排序
});

for (var i = 0;i < list.length;i++) {
    var item = list[i];
    if (item.creation_date >= creationDate) {
        return i + 1
    }
}

return list.length || 1;