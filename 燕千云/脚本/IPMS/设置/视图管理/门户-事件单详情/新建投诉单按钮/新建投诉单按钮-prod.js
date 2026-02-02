/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var tenantNum = $GetCurrentTenant().tenantNum // 租户信息
var id = $GetValue('id') // 经销商投诉单id
$Print('经销商投诉tenantNum=' + tenantNum)
$Print('经销商投诉id=' + id) // 798538027542380544

var user = $GetCurrentPerson()
var userId = user.id
$Print('经销商投诉id=user--' + user)

var req = $GetBusinessObject('SC_REQ_ITEM', $GetValue('id'), [
  'item_id',
  't_system'
])
$Print('经销商投诉-req：' + req)

// 判断是否已经创建过
function isExist(arrayList, code) {
  var check = false
  for (var i = 0; i < arrayList.length; i++) {
    if (
      arrayList[i].t_box_code == code ||
      arrayList[i].t_bottle_can_code == code
    ) {
      check = true
    }
  }
  return check
}

function submitByCode(businessObjectCode, params) {
  $Print('经销商投诉-params：' + JSON.stringify(params))
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
  var fd = $GetBusinessObject('INCIDENT', $GetValue('id'), [
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
    't_sales_division',
    't_sales_region', // 销售大区
    'created_by', // 提单人
    'created_by:real_name', // 提单人名称
    't_market_centre' // 营销中心
  ])

  // 1.获取当前处理人部门
  var list = $SearchBusinessObject('IAM_USER', { id: userId }, [
    'login_name' // 用户 ID
  ])
  $Print('经销商投诉-list' + list)
  var loginUserId = ''
  if (list && list.length) {
    loginUserId = list[0].id
  }
  // "t_business_department_contacts": "634522801211314176",
  // {anonymous_flag=false, tenant_id=628299336139927552, object_version_number=39, _token=MEgoYaVwNF5GDeElJj4FXDpJcF7pBuO1O3JYIT2SekmNzPcuUd9Jzpz2stcvq4DN, creation_date=2024-10-16 22:52:49, created_by=628299855913299968, domain_id=0, last_updated_by=628299855913299968, login_name=loupeihua1, domain_path=/, invitation_status=joined, id=634524247881289728, last_update_date=2026-01-20 20:03:12}
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
    $Print('经销商投诉-投诉单违约产品情况：' + existingList)
    $Print('经销商投诉-投诉单违约产品情况-length' + existingList.length)
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
    $Print('经销商投诉-id：' + fd['id'])
    $Print('经销商投诉-list-1：' + list1)
    $Print('经销商投诉-list-2：' + list2)
    $Print('经销商投诉-list-3：' + list3)
    $Print('经销商投诉-list-4：' + list4)
    var list = []
    if (list1 && list1.length) {
      for (var i = 0; i < list1.length; i++) {
        // list.push({
        //   t_t_box_qr_codes: list1[i]['t_t_box_qr_codes']
        // })
        var codeValue = list1[i]['t_t_box_qr_codes']
        // 判断是否已经创建
        if (!isExist(existingList, codeValue)) {
          $Print('经销商投诉-list-1-请求')
          // 业务对象-投诉单违约产品情况
          submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
            // t_t_box_qr_codes: list[j].t_t_box_qr_codes,
            // t_case_serial_numbers: list[j].t_case_serial_numbers,
            // t_bottle_qr_codes: list[j].t_bottle_qr_codes,
            // t_bottle_serial_numbers: list[j].t_bottle_serial_numbers,
            t_box_code: codeValue, // 包装箱编码
            // t_bottle_can_code: '', // 瓶/听编码
            t_t_incident_id: id,
            _status: 'create'
          })
        }
      }
    }
    if (list2 && list2.length) {
      for (var i = 0; i < list2.length; i++) {
        // list.push({
        //   t_case_serial_numbers: list2[i]['t_case_serial_numbers']
        // })
        // 业务对象-投诉单违约产品情况
        var codeValue = list2[i]['t_case_serial_numbers']
        // 判断是否已经创建
        if (!isExist(existingList, codeValue)) {
          $Print('经销商投诉-list-2-请求')
          // 业务对象-投诉单违约产品情况
          submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
            t_box_code: codeValue, // 包装箱编码
            // t_bottle_can_code: '', // 瓶/听编码
            t_t_incident_id: id,
            _status: 'create'
          })
        }
      }
    }
    if (list3 && list3.length) {
      for (var i = 0; i < list3.length; i++) {
        // list.push({
        //   t_bottle_qr_codes: list3[i]['t_bottle_qr_codes']
        // })
        // 业务对象-投诉单违约产品情况
        var codeValue = list3[i]['t_bottle_qr_codes']
        // 判断是否已经创建
        if (!isExist(existingList, codeValue)) {
          $Print('经销商投诉-list-3-请求')
          // 业务对象-投诉单违约产品情况
          submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
            t_bottle_can_code: codeValue, // 瓶/听编码
            t_t_incident_id: id,
            _status: 'create'
          })
        }
      }
    }
    if (list4 && list4.length) {
      for (var i = 0; i < list4.length; i++) {
        // list.push({
        //   t_bottle_serial_numbers: list4[i]['t_bottle_serial_numbers']
        // })
        // 业务对象-投诉单违约产品情况
        var codeValue = list4[i]['t_bottle_serial_numbers']
        // 判断是否已经创建
        if (!isExist(existingList, codeValue)) {
          $Print('经销商投诉-list-4-请求')
          // 业务对象-投诉单违约产品情况
          submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
            t_bottle_can_code: codeValue, // 瓶/听编码
            t_t_incident_id: id,
            _status: 'create'
          })
        }
      }
    }
    $Print('经销商投诉-list：', list)
    // for (var j = 0; j < list.length; j++) {
    //   // 业务对象-投诉单违约产品情况
    //   submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
    //     t_t_box_qr_codes: list[j].t_t_box_qr_codes,
    //     t_case_serial_numbers: list[j].t_case_serial_numbers,
    //     t_bottle_qr_codes: list[j].t_bottle_qr_codes,
    //     t_bottle_serial_numbers: list[j].t_bottle_serial_numbers,

    //     t_box_code: , // 包装箱编码
    //     t_bottle_can_code, // 瓶/听编码
    //     t_t_incident_id: id,
    //     _status: 'create'
    //   })
    // }

    $SetValue('t_business_department_contacts:phone', fd['contact_phone'])
    $Print('经销商投诉事业部=' + fd['t_sales_division'])

    // var createdPhone = '' // 提单人电话
    // var user = $SearchBusinessObject('IAM_USER', { id: fd['created_by'] }, [
    //   'phone',
    //   'hidden_phone_flag'
    // ])
    // $Print('经销商投诉事业部=user：', user)
    // // [{anonymous_flag=false, tenant_id=628299336139927552, object_version_number=58, hidden_phone_flag=false, _token=MEgoYaVwNF5GDeElJj4FXLUYyB7zK2bLqGd5VHgmHFACUpaNsw/nlnavjofH/3pC, creation_date=2024-09-29 18:39:18, created_by=0, domain_id=0, last_updated_by=628299855913299968, phone=null, domain_path=/, invitation_status=joined, id=628299855913299968, last_update_date=2025-09-16 15:33:32}]]
    // if (user || user.length || user[0].hidden_phone_flag != 1) {
    //   createdPhone = user[0].phone
    // }
    return {
      id: id,
      // 业务部联络人:提单人
      // t_business_department_contacts: userId, // 634522121880866816
      t_business_department_contacts: loginUserId,
      't_business_department_contacts:real_name': user.realName,
      // 销售事业部
      // t_sales_division: fd['t_sales_division'],
      // // 销售大区
      // t_sales_region: fd['t_sales_region'],
      // 核实地点
      // t_verify_location_name: fd['t_verify_location_name'],
      // （受影响）产品名称
      // t_affect_product_name: fd['t_product_name_default'],
      // 业务部联络人电话:提单人电话
      // t_business_department_phone: fd['contact_phone'],
      t_business_department_phone: user.phone || ''
      // 营销中心
      // t_market_centre: fd['t_market_centre']
      // 业务部
      // 't_business_department': '',
    }
  } else {
    return {
      id: id
    }
  }
}
