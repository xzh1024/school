/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

$Print('debug经销商投诉单-分单规则')
// 部门id
var respondentDepartmentId = $GetValue('t_operations_department_respondent')
$Print('debug经销商投诉单-分单规则-部门id：', respondentDepartmentId)

// 获取部门信息
var departmentObj = $GetBusinessObject(
  'ORG_DEPARTMENT',
  respondentDepartmentId,
  ['manager_id', 't_manager_name']
)
$Print('debug经销商投诉单-分单规则-部门信息：', departmentObj)
if (departmentObj) {
  $Print('debug经销商投诉单-分单规则-部门经理id：', departmentObj['manager_id'])
  return departmentObj['manager_id']
} else {
  return null
}
