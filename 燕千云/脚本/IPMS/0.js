/*
事件单 表
业务对象
动作 视图
通知模板
待办逻辑表

设置 >
业务对象（看数据库）
事件单（主表）算出审批人
服务项-经销商投诉单-Section-经销商投诉单创建人
然后去 
分单规则-编辑-资源分配-写脚本
视图管理-经销商投诉单-Section-经销商投诉单创建人

事件单-视图（标签：编码）。
一、找到 业务部经理
提交时触发分单（算出业务部经理）。
二、业务部经理  审核（1.业务部经理审核。2.转派给业务员）
三、新建投诉单按钮-经销商投诉单写到 投诉单中 点击投诉单后经销商投诉单自动关单
视图管理 > 门户-事件单详情 > 进入设计器 > 新建投诉单按钮

经销商投诉单：JXSTS20260108-0002 JXSTS20260108-0003
经销商投诉单编码：T_DEALER_COMPLAINT_FORM

var user = $SearchBusinessObject("IAM_USER", {id:$GetCurrentPersonId()}, ["phone","hidden_phone_flag"]);
if(user == null || user.length == 0 || user[0].hidden_phone_flag == 1){
 return null;
}
return user[0].phone;


[
{
anonymous_flag=false, 
tenant_id=628299336139927552, 
object_version_number=58, 
hidden_phone_flag=false, _token=MEgoYaVwNF5GDeElJj4FXLUYyB7zK2bLqGd5VHgmHFACUpaNsw/nlnavjofH/3pC, 
creation_date=2024-09-29 18:39:18, 
created_by=0, 
domain_id=0, 
last_updated_by=628299855913299968, 
phone=null, 
domain_path=/, 
invitation_status=joined, 
id=628299855913299968, 
last_update_date=2025-09-16 15:33:32}
]
]

var incident = $GetBusinessObject('INCIDENT', 
    '620938321241853952',
    ['id', 'short_description', 't_solution']);
if (incident != null) {


*/
