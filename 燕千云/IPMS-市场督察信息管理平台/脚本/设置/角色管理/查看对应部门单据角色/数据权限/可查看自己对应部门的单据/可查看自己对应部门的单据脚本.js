/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

var tsd = $SearchBusinessObject('INCIDENT', {
    'number': $GetValue('t_complaint_form_no'),
}, ['t_business_department_contacts:department_id:parent_id:parent_id:parent_id:t_department_viewer']);


$Print('t_complaint_form_no ----', $GetValue('t_complaint_form_no'));
$Print('tsd ----', tsd);

if (tsd && tsd.length > 0) {
    if (tsd[0]['t_business_department_contacts:department_id:parent_id:parent_id:parent_id:t_department_viewer'] === $GetCurrentPersonId()) {
        return $GetValue('id')
    }
}

return ''




