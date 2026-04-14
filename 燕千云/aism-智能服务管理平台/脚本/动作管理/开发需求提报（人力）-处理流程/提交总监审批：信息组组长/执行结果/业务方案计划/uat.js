/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var id = $GetValue('id');
var data = $GetBusinessObject('INCIDENT', id, ['t_business_plan_start_date', 't_business_plan_end_date'])
var startDate = data['t_business_plan_start_date'];
var endDate = data['t_business_plan_end_date'];
if (startDate && endDate) {
    return startDate.split(' ')[0] + '至' + endDate.split(' ')[0];
}
return '';
