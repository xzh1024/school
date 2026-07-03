/*
** Script must return a value.
** example:
** var userName = $GetCurrentAttribute('iam_user_id:login_name')
** return userName;
*/
var incidentId = $GetValue("_parentId") || $GetValue("id");

var incident = $GetBusinessObject('INCIDENT', incidentId, [
    'assignee_person_id',
    'assignee_person_id:real_name'
]);
if (incident && incident['assignee_person_id']) {
    return {
        id: incident['assignee_person_id'],
        real_name: incident['assignee_person_id:real_name']
    }
}
return '';
