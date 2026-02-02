/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 */

var incidentId = $GetValue('_parentId') || $GetValue('id') // 父单id  经销商投诉单id
var tenantNum = $GetCurrentTenant().tenantNum
var user = $GetCurrentPerson()
var userId = user.id

$Print('新建投诉单-id:', incidentId)
$Print('新建投诉单-tenantNum:', tenantNum)
var fd = $GetBusinessObject('INCIDENT', incidentId, [
  'closed_by',
  't_complaint_form_no', // 投诉单编号
  't_terminal_discoveries',
  't_sample_wines',
  't_second_discover',
  't_verificate_num_sued',
  't_second_verificate_num_sued',
  't_sample_wines_sued',
  't_terminal_discoveries_sued',
  't_second_discover_sued',
  'id',
  't_is_operations_manager', // 是否业务部经理发起
  'submitted_by', // 提单人
  't_business_department_contacts'
  // 't_business_department_contacts:real_name'
])
$Print('debug23 fd=' + fd)

/* 定义提交创建事件单的函数  bo:业务对象， params：插入业务对象的数据*/
function submitByCode (bo, params) {
  var body = {
    requestParamMap: {
      businessObjectCode: bo // 业务对象-事件单（数据库表）
    },
    payload: JSON.stringify(params)
  }
  $Print('新建投诉单-body完整参数:', JSON.stringify(body))

  var response = $CallInterface(
    String(tenantNum),
    'LOW_CODE',
    'BOSUB',
    JSON.stringify(body)
  )

  $Print('新建投诉单-返回', response) // "number":"TS20260116-0004"

  // var responseNode = JSON.parse(response)
  // return responseNode['id']
  return JSON.parse(response)
}

// 获取上级审批人数据
function getManagerData (userId) {
  var data = {
    director_id: '', // 直接领导
    'director_id:director_id': '' // 隔级领导
  }
  var list = $SearchBusinessObject('IAM_USER', { id: userId }, [
    'director_id', // 直接领导-id
    'director_id:real_name', // 直接领导-姓名
    'director_id:director_id', // 隔级领导-id
    'director_id:director_id:real_name' // 隔级领导-姓名
  ])
  if (list && list.length) {
    var itemData = list[0]
    $Print('新建投诉单-部门领导:', itemData)
    $Print('新建投诉单-部门领导-id:', itemData['director_id'])
    $Print('新建投诉单-部门领导-id-id:', itemData['director_id:director_id'])
    if (itemData) {
      data['director_id'] = itemData['director_id'] || '' // 丁麒崴：634522367918739456
      data['director_id:director_id'] =
        itemData['director_id:director_id'] || ''
    }
  }
  return data
}

var paramsArr = [
  // Section
  't_business_department_contacts', // 业务部联络人
  't_business_department_contacts:real_name', // 业务部联络人姓名
  't_business_department_phone', // 业务部联络人电话
  't_sales_division', // 销售事业部
  't_market_centre', // 营销中心
  't_sales_region', // 销售大区
  't_business_department', // 业务部
  't_verify_location_type', // 取证酒来源类型
  't_verify_location', // 核实地点
  't_verify_platform_new', // 取证酒来源平台
  't_verify_platform', // 其他线上平台
  // 默认Section
  // 业务对象：库存组织中间表(STORAGE_MIDDLE) // 生产工厂(简称)
  // 违约产品情况
  't_product_name_default', // (违约销售)产品名称
  't_brand', // 品牌
  't_isoem', // 是否代加工产品
  // 违约产品情况2
  't_whether_destroy_code', // 是否毁码
  't_destroy_code_type', // 毁码类型
  't_whether_qr_products', // 是否二维码产品
  't_qr_type', // 二维码类型
  't_qr_attechment', // 二维码产品附件
  // 默认Section
  't_t_depositions_total_num_boxs_computed', // 取证数量合计(箱)
  't_t_complaints_number_boxs_computed', // 投诉数量(箱)-计算属性
  // 默认Section
  'alert_bgzlupyv', // 提示
  // 违约产品情况-包装箱、瓶/听  // 表格 总是不可见
  /*
    业务对象-投诉单违约产品情况
    关联字段-经销商投诉单事件单ID
  */
  // 违约产品情况 // 表格
  /*
    业务对象-投诉单违约产品情况
    关联字段-经销商投诉单事件单ID
  */
  // 受影响情况
  't_affect_product_name', // (当地受影响)产品名称
  // 默认Section
  't_respondent_terminal_price', // 被诉方终端进价(元/箱)
  't_respondennt_retail_price', // 被诉方零售价(元/瓶)
  't_complaints_source', // 投诉来源
  't_complainant_terminal_price', // 投诉方终端进价(元/箱)
  't_complainant_retail_price', // 投诉方零售价(元/瓶)
  't_affected_type', // 受影响类型
  // 默认Section
  'alert_drctscjl', // 提示
  // 受影响情况-终端明细 // 表格
  /*
    业务对象-投诉单终端明细
    关联字段-t_incident_id
  */
  // 默认Section
  't_terminals_total_num', // 终端数量合计(家)
  't_terminal_table_attech', // 终端明细附件表
  // 受影响情况-渠道明细
  't_second__instalment_name', // 二批名称
  't_quantity_found_boxes', // 发现数量(箱)
  't_distributor_affected_name', // 受影响经销商名称
  't_second_batch_address', // 二批地址
  't_second_forensics_num_boxes', // 二批取证数量(箱)
  // 附件及备注
  'attachments', // 附件
  't_complaint_remarks', // 备注
  // 默认Section
  't_dm_approval', // 直属上级审批
  // 'state_id', // 状态
  // 'submitted_by', // 提单人
  't_previous_processor', // 上一处理人
  't_previous_state', // 上一状态
  // 't_submitted_by_department_one', // 提单人所属部门
  // 默认Section
  't_advice', // 审批意见
  // 隐藏区域 总是不可见
  't_if_details_null', // 投诉单终端明细表
  't_approval_history' // 审批历史
  // 不可见
  // 'service_item_id' // 服务项
  // 't_approval_history' // 审批历史
]
var t_submitted_by_department_one = ''
var userDatas = $SearchBusinessObject("IAM_USER", { "id": userId }, ["department_id:name"]);
$Print("userDatas=", userDatas)
if (userDatas.length > 0) {
  t_submitted_by_department_one = userDatas[0]["department_id:name"]
  // return userDatas["department_id:name"];
}
$Print("userDatas=t_submitted_by_department_one--", t_submitted_by_department_one)

// 新建投诉单的表单参数
var createParams = {
  _status: 'create',
  short_description: '投诉单',
  // short_description:
  //   (tsd[0]['t_sales_division'] || '') + f d['t_complaint_form_no'] + '投诉单',
  parent_id: incidentId, // 父级事件单
  service_item_id: '628299624163446784', // 服务项：投诉单
  // state_id: '632615547465105408', // 状态：隔级上级审批中
  state_id: '632615169130496000', // 状态：直属上级审批中
  // submitted_by: fd['submitted_by'], // 提单人
  submitted_by: userId, // 提单人-当前用户
  // closed_by: fd['submitted_by'], // 关单人
  service_catalog_id: '628299591038795776', // 服务目录：投诉单
  't_business_department_contacts:real_name':
    fd['t_business_department_contacts:real_name'], // 业务部联络人姓名
  // assignee_person_id: '628299855913299968', // 当前处理人
  // 'assignee_person_id:real_name': 'ipms'
  // creation_date: '2026-01-19 17:27:02' // 创建时间

  // t_business_department_contacts: '',
  // t_business_department_phone: '',
  // t_sales_division: '',
  // t_market_centre: '',
  // t_line_incident_id: incidentId,
  t_submitted_by_department_one: t_submitted_by_department_one // 提单人所属部门
}
var managerData = getManagerData(userId)
$Print('新建投诉单-审批人数据:', JSON.stringify(managerData))

if (fd['t_is_operations_manager'] == '是') {
  $Print(
    '新建投诉单-是否业务部经理发起-是:',
    managerData['director_id:director_id']
  )
  createParams.assignee_person_id = managerData['director_id:director_id'] // 当前处理人-隔级领导id
} else {
  $Print('新建投诉单-是否业务部经理发起-否:', managerData['director_id'])
  createParams.assignee_person_id = managerData['director_id'] // 当前处理人-直接领导id
}

paramsArr.forEach(function (item) {
  var value = $GetValue(item)
  if (value) {
    createParams[item] = value
  }
})
if (!createParams['t_business_department_contacts']) {
  createParams['t_business_department_contacts'] =
    fd['t_business_department_contacts']
}
$Print('新建投诉单-createParams:', createParams)
// var parentRes = submitByCode('HR_RELATIVE', parentParams)
var orderData = submitByCode('INCIDENT', createParams)
$Print('新建投诉单-orderData:', orderData)
if (!orderData) {
  return
}
var orderId = orderData['id']
$Print('新建投诉单-parentRes:', orderId) // 800087655384743936

// 更新投诉单
var updateSubParams = {
  _status: 'update',
  id: orderId,
  short_description:
    (orderData['t_sales_division'] || '') + orderData['number'] + '投诉单' // 标题
}
var updateSubRes = submitByCode('INCIDENT', updateSubParams)
$Print('新建投诉单-updateSubRes:', updateSubRes)

var arr = [
  {
    targetTicketId: incidentId,
    sourceTicketId: orderId,
    linkId: '628299657726267392'
  }
]

var relationRes = $CallInterface(
  tenantNum,
  'LOW_CODE',
  'TICKET_PARENT_RELATIVE', // 添加父子关联单据
  JSON.stringify({
    payload: JSON.stringify(arr)
  })
)
$Print('新建投诉单-关联关系res:', relationRes)

// 更新父单状态
var updateParentParams = {
  _status: 'update',
  id: incidentId,
  state_id: '628299584982220800' // 状态：已关闭
}

var updateParentRes = submitByCode('INCIDENT', updateParentParams)
$Print('新建投诉单-updateParentRes:', updateParentRes)

// 违约产品情况-包装箱、瓶/听  表格数据处理
// var parentList = $SearchBusinessObject(
//   'COMPLAINT_DEFAULT_PRODUCT', // 投诉单违约产品情况
//   {
//     t_t_incident_id: incidentId
//   },
//   [
//     't_box_code', // 包装箱编码
//     't_bottle_can_code' // 瓶/听编码
//   ]
// )
// $Print('新建投诉单-parentList:', parentList)

// if (parentList && parentList.length) {
//   parentList.forEach(function (item) {
//     submitByCode('COMPLAINT_DEFAULT_PRODUCT', {
//       _status: 'create',
//       t_t_incident_id: orderId,
//       t_box_code: item['t_box_code'],
//       t_bottle_can_code: item['t_bottle_can_code']
//     })
//   })
// }

/* 投诉单创建成功后，同步经销商投诉单中的表格数据 */
// 违约产品情况-包装箱二维码
var list1 = $SearchBusinessObject(
  'DEALER_COMPLAINT_QRCODE', // 业务对象-经销商投诉单包装箱二维码
  // 查询的条件Map。条件仅支持 equal 判断。
  {
    t_t_incident_id: incidentId // 事件单id
  },
  // 默认会查询业务对象下，所有勾选了默认查询的字段
  [
    't_t_box_qr_codes', // 箱二维码
    't_t_box_qr_codes_fj', // 二维码图片
    't_qr_code_value1' // 二维码码值
  ]
)
if (list1 && list1.length) {
  for (var i = 0;i < list1.length;i++) {
    var itemData = list1[i]
    var newData = {
      t_t_incident_id: orderId, // 事件单id
      t_t_box_qr_codes: itemData['t_t_box_qr_codes'], // 溯源编码 t_bottle_can_code
      t_t_box_qr_codes_fj: itemData['t_t_box_qr_codes_fj'], // 二维码码值
      t_qr_code_value1: itemData['t_qr_code_value1'], // 图片
      _status: 'create'
    }
    submitByCode('DEALER_COMPLAINT_QRCODE', newData)
  }
}
// 违约产品情况-包装箱喷码
var list2 = $SearchBusinessObject(
  'DEALER_COMPLAINT_INCODE', // 经销商投诉单包装箱喷码
  {
    t_t_incident_id: incidentId
  },
  [
    't_case_serial_numbers', // 经销商投诉箱喷码
    't_inkjet_image', // 喷码图片
    't_qr_code_value1' // 二维码码值
  ]
)
if (list2 && list2.length) {
  for (var i = 0;i < list2.length;i++) {
    var itemData = list2[i]
    var newData = {
      t_t_incident_id: orderId, // 事件单id
      // t_tracea_code_type: 'BOX_INKJET_CODE', // 溯源编码类型
      t_case_serial_numbers: itemData['t_case_serial_numbers'], // 溯源编码 t_bottle_can_code
      t_inkjet_image: itemData['t_inkjet_image'], // 图片
      t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
      _status: 'create'
    }
    submitByCode('DEALER_COMPLAINT_INCODE', newData)
  }
}
// 违约产品情况-瓶/听二维码
var list3 = $SearchBusinessObject(
  'DEALER_COMPLAINT_BOTTLE_QRCODE', // 经销商投诉单瓶 / 听二维码
  {
    t_t_incident_id: incidentId
  },
  [
    't_bottle_qr_codes', // 瓶 / 听二维码
    't_t_box_qr_codes_fj', // 二维码图片
    't_qr_code_value1' // 二维码码值
  ]
)
if (list3 && list3.length) {
  for (var i = 0;i < list3.length;i++) {
    var itemData = list3[i]
    var newData = {
      t_t_incident_id: orderId, // 事件单id
      t_bottle_qr_codes: itemData['t_bottle_qr_codes'], // 溯源编码
      t_t_box_qr_codes_fj: itemData['t_t_box_qr_codes_fj'], // 二维码图片
      t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
      _status: 'create'
    }
    submitByCode('DEALER_COMPLAINT_BOTTLE_QRCODE', newData)
  }
}
// 违约产品情况-瓶/听喷码
var list4 = $SearchBusinessObject(
  'DEALER_COMPLAINT_BOTTLE_INKJETCODE', // 经销商投诉瓶 / 听喷码
  {
    t_t_incident_id: incidentId
  },
  [
    't_bottle_serial_numbers', // 瓶 / 听喷码
    't_inkjet_image', // 喷码图片
    't_qr_code_value1' // 二维码码值
  ]
)
if (list4 && list4.length) {
  for (var i = 0;i < list4.length;i++) {
    var itemData = list4[i]
    var newData = {
      t_t_incident_id: orderId, // 事件单id
      t_bottle_serial_numbers: itemData['t_bottle_serial_numbers'], // 溯源编码
      t_inkjet_image: itemData['t_inkjet_image'], // 二维码图片
      t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
      _status: 'create'
    }
    submitByCode('DEALER_COMPLAINT_BOTTLE_INKJETCODE', newData)
  }
}
$Print('经销商投诉-投诉单-list-1：' + list1)
$Print('经销商投诉-投诉单-list-2：' + list2)
$Print('经销商投诉-投诉单-list-3：' + list3)
$Print('经销商投诉-投诉单-list-4：' + list4)

// 标签：生产工厂(简称)
// 业务对象：库存组织中间表(STORAGE_MIDDLE)
// 关联字段：事件单
// 目标字段：库存组织-crb_inventory_organization_id
var productionPlantList = $SearchBusinessObject(
  'STORAGE_MIDDLE', // 库存组织中间表
  {
    incident_id: incidentId
  },
  [
    'crb_inventory_organization_id' // 库存组织
  ]
)
$Print('新建投诉单-生产工厂:', productionPlantList)

if (productionPlantList && productionPlantList.length) {
  productionPlantList.forEach(function (item) {
    submitByCode('STORAGE_MIDDLE', {
      _status: 'create',
      incident_id: orderId,
      crb_inventory_organization_id: item['crb_inventory_organization_id']
    })
  })
}
