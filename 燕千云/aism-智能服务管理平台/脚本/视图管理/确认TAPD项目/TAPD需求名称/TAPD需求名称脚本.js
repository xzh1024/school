var id = $GetValue('_parentId') || $GetValue('id')

var fd = $GetBusinessObject('INCIDENT', id, [
    'number', // 单据编号
    'short_description', // 简称
])

if (fd) {
    return fd['number'] + ' ' + fd['short_description']
}
return ''