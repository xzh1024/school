/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

var id = $GetValue('id');
var data = $GetBusinessObject('INCIDENT', id, ['t_functional_actual_start_date'])
var startDate = data['t_functional_actual_start_date'];
if (startDate) {
    return startDate.split(' ')[0] + '至' + $GetCurrentDate();
}
return ''
