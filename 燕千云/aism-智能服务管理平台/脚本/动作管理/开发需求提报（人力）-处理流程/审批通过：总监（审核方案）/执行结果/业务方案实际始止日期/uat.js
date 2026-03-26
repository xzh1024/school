/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

return $GetValue('t_business_actual_start_date') + '至' + $GetCurrentDate();
