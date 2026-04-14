/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

return $GetBusinessObject('INCIDENT', $GetValue('id'), ['assignee_person_id'])['assignee_person_id'];
