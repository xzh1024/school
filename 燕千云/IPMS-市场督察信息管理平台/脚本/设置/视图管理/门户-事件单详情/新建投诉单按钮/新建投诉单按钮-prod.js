/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var tenantNum = $GetCurrentTenant().tenantNum // 租户信息
var id = $GetValue('id') // 经销商投诉单id

var user = $GetCurrentPerson()
var userId = user.id

function submitByCode (businessObjectCode, params) {

  var body = {
    requestParamMap: {
      businessObjectCode: businessObjectCode
    },
    payload: JSON.stringify(params)
  }
  // 调用内部接口平台接口
  var response = $CallInterface(
    tenantNum, // 接口平台对应的命名应用编码
    'LOW_CODE', // 接口平台对应的服务编码
    'BOSUB', // 接口平台对应的接口编码
    JSON.stringify(body) // 请求体
  )
  var responseNode = JSON.parse(response)
  return responseNode['id']
}

if (id) {
  var dep_id = $GetBusinessObject('IAM_USER', $GetCurrentPersonId(), ['department_id:id'])['department_id:id']
  var t_sales_region = ''
  var t_market_centre = ''
  var t_sales_division = ''
  var t_business_department = ''
  var t_market_centre_id = ''
  var t_sales_division_id = ''

  var result = $Invoke("yqcloud-external", "CrbDepartmentQueryInvoker", dep_id)
  result = JSON.parse(result)
  result.forEach(function (item) {
    if (item['t_tree_level_num'] == '6') t_business_department = item['t_dept_desc_shrt']
    if (item['t_tree_level_num'] == '5') t_sales_region = item['t_dept_desc_shrt']
    if (item['t_tree_level_num'] == '4') {
      t_market_centre = item['t_dept_desc_shrt']
      t_market_centre_id = item['id']
    }
    if (item['t_tree_level_num'] == '3') {
      t_sales_division = item['t_dept_desc_shrt']
      t_sales_division_id = item['id']
    }
  })

  var fd = $GetBusinessObject('INCIDENT', id, [
    'assignee_person_id',
    't_assignee_person_id:real_name',
    't_complaint_form_no', // 投诉单编号
    't_dealer_complaint_creator',
    'contact_phone', // 投诉人电话

    't_dealer_complaint_code',
    't_dealer_marketing_center1',
    't_dealer_complaint_channel',
    't_dealer_account_type',
    't_product_name_default', //（受影响）产品名称 638825317316472832
    't_complaints_number_boxs',
    't_verify_location_name', // 核实地点
    't_approval_status',
    'id', // 798538027542380544
    't_sale_policy_deduce',
    'service_item_id',
    't_operations_department_respondent',
    //'t_sales_division',
    //'t_sales_region', // 销售大区
    'created_by', // 提单人
    'created_by:real_name', // 提单人名称
    //'t_market_centre' // 营销中心
  ])

  // 1.获取当前处理人部门
  var loginUserId = ''
  var userList = $SearchBusinessObject('IAM_USER', { id: userId }, [
    'login_name' // 用户 ID
  ])

  if (userList && userList.length) {
    loginUserId = userList[0].id
  }
  if (fd) {
    // 投诉单违约产品情况
    var existingList = $SearchBusinessObject(
      'COMPLAINT_DEFAULT_PRODUCT',
      {
        t_t_incident_id: id
      },
      [
        // 't_t_box_qr_codes',
        // 't_case_serial_numbers',
        // 't_bottle_qr_codes',
        // 't_bottle_serial_numbers'
        't_box_code', // 包装箱编码
        't_bottle_can_code' // 瓶/听编码
      ]
    )
    // 查询投诉单违约产品情况 COMPLAINT_DEFAULT_PRODUCT
    // 违约产品情况-包装箱二维码
    var list1 = $SearchBusinessObject(
      // 'COMPLAINT_DEFAULT_PRODUCT', // 业务对象-投诉单违约产品情况
      'DEALER_COMPLAINT_QRCODE', // 业务对象-经销商投诉单包装箱二维码
      // 查询的条件Map。条件仅支持 equal 判断。
      {
        t_t_incident_id: id
      },
      // 默认会查询业务对象下，所有勾选了默认查询的字段
      [
        't_t_box_qr_codes' // 箱二维码
      ]
    )
    // 违约产品情况-包装箱喷码
    var list2 = $SearchBusinessObject(
      'DEALER_COMPLAINT_INCODE', // 经销商投诉单包装箱喷码
      {
        t_t_incident_id: id
      },
      [
        't_case_serial_numbers' // 经销商投诉箱喷码
      ]
    )
    // 违约产品情况-瓶/听二维码
    var list3 = $SearchBusinessObject(
      'DEALER_COMPLAINT_BOTTLE_QRCODE', // 经销商投诉单瓶 / 听二维码
      {
        t_t_incident_id: id
      },
      [
        't_bottle_qr_codes' // 瓶 / 听二维码
      ]
    )
    // 违约产品情况-瓶/听喷码
    var list4 = $SearchBusinessObject(
      'DEALER_COMPLAINT_BOTTLE_INKJETCODE', // 经销商投诉瓶 / 听喷码
      {
        t_t_incident_id: id
      },
      [
        't_bottle_serial_numbers' // 瓶 / 听喷码
      ]
    )


    return {
      id: id,
      // 业务部联络人:提单人
      // t_business_department_contacts: userId, // 634522121880866816
      t_business_department_contacts: loginUserId,
      't_business_department_contacts:real_name': user.realName,
      // 销售事业部
      't_sales_division': t_sales_division,
      // // 销售大区
      't_sales_region': t_sales_region,
      // 核实地点
      // t_verify_location_name: fd['t_verify_location_name'],
      // （受影响）产品名称
      // t_affect_product_name: fd['t_product_name_default'],
      // 业务部联络人电话:提单人电话
      // t_business_department_phone: fd['contact_phone'],
      t_business_department_phone: user.phone || '',
      // 营销中心
      't_market_centre': t_market_centre,
      // 业务部
      't_business_department': t_business_department,
      't_market_centre_id': t_market_centre_id,
      't_sales_division_id': t_sales_division_id
    }
  } else {
    return {
      id: id
    }
  }
}
