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
        service_item_id: '796675416186556416', // 服务项：人力信息化需求提报
        state_id: '796727302336151552,796727423618646016,796727578409172992,796727709439229952,796726757709709312,796727839462653952,776023805222727680', // 方案设计中、方案审核中、方案审批中、待IT组评估、待IT组受理、待排期、排期中
    },
    // 默认会查询业务对象下，所有勾选了默认查询的字段
    [
        'creation_date', // 创建时间
        'number', // 单据编号
        't_dev_index', // 开发排序
    ]
)

if (list && list.length > 0) {
    list.sort(function (a, b) {
        var date1 = a.creation_date ? new Date(a.creation_date).getTime() : a.creation_date,
            date2 = b.creation_date ? new Date(b.creation_date).getTime() : b.creation_date;
        return date1 - date2; // 从小到大排序
    });

    for (var i = 0;i < list.length;i++) {
        var item = list[i];
        if (item.creation_date >= creationDate) {
            return i + 1
        }
    }

    return list.length;
}

return 1;