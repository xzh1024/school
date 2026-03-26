/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/

return $GetValue('t_requirement_clarification_plan_start_date') + '至' + $GetValue('t_requirement_clarification_plan_end_date');