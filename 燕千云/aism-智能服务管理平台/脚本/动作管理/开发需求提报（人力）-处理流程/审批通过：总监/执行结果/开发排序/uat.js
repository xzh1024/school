/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var creationDate = $GetValue('creation_date');

$Print('开发排序-creationDate:', creationDate);

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
    var date1 = a.creation_date ? new Date(a.creation_date).getTime() : a.creation_date,
        date2 = b.creation_date ? new Date(b.creation_date).getTime() : b.creation_date;
    return date1 - date2; // 从小到大排序
});
$Print('开发排序-list:', list);
$Print('开发排序-list-length:', list.length);

for (var i = 0;i < list.length;i++) {
    var item = list[i];
    if (item.creation_date >= creationDate) {

        $Print('开发排序-100:', i + 1);
        return i + 1
    }
}
$Print('开发排序-200:', list.length || 1);

return list.length || 1;