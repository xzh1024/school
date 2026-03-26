/*
 ** Script must return a value.
 ** example:
 ** var userName = $GetCurrentAttribute('iam_user_id:login_name')
 ** return userName;
 IAM_USER_GROUP 生产-753191652310589440 uat-741367889857609728
 */
var tenantNum = $GetCurrentTenant().tenantNum
// var id = $GetValue('id')
var id = $GetValue('_parentId') || $GetValue('id')

// 查询投诉单违约产品情况 COMPLAINT_DEFAULT_PRODUCT
var complaints = $SearchBusinessObject(
  'COMPLAINT_DEFAULT_PRODUCT',
  {
    t_t_incident_id: id
  },
  ['t_bottle_can_code', 't_box_code', 't_qr_code_value1', 't_qr_code_picture']
)

// 当前登录人
var curUser = $GetCurrentPersonId();
// 是否可创建关闭的自动溯源单，默认不可以。当登录人是【市场督查部固定审核人员】时可以创建关闭的自动溯源单。
var t_can_auto_close_data = "NO";

// 查询当前登录人是否是【市场督查部固定审核人员】
var departmentInfo = $SearchBusinessObject('ORG_DEPARTMENT', {
  t_market_inspection_department_personnel: curUser
}, [])

// 是否能溯源到经销商
var t_whether_traceability = 'NO_THREE'

// 市场督查人员需要进行自动溯源，如果自动溯源结果达标，则可以创建关闭的自动溯源单
function handleAutoTraceability () {

  // 瓶/听二维码
  var t_qr_code_values = $SearchBusinessObject('TRACEABILITY_PROJ_DETAIL', {
    t_incident_id: id
  }, ['t_traceability_num', 'id'])

  var qrCodeList = []

  for (var i = 0;i < t_qr_code_values.length;i++) {
    if (t_qr_code_values[i].t_traceability_num) {
      qrCodeList.push(t_qr_code_values[i].t_traceability_num)
    }
  }

  var params = JSON.stringify({
    qrCodeList: qrCodeList
  })

  var res = JSON.parse($Invoke('yqcloud-external', 'CrbMarketWineCollectionInvoker', params))

  if (res && res.length) {

    for (var i = 0;i < res.length;i++) {

      if (res[i].targetName && res[i].targetCode) {
        t_whether_traceability = 'YES'
      }

      var curData = null;
      for (var j = 0;j < t_qr_code_values.length;j++) {
        if (t_qr_code_values[j].t_traceability_num === res[i].qrCode) {
          curData = t_qr_code_values[j];
          break;
        }
      }

      if (curData) {
        submitByCode('TRACEABILITY_PROJ_DETAIL', {
          id: curData.id,
          t_quantity_of_the_same_product: res[i].orderCount,
          _status: 'update'
        })
      }
    }
  }

}

// 非空判断
if (departmentInfo && departmentInfo.length > 0) {
  // 自动溯源
  handleAutoTraceability();
  t_can_auto_close_data = 'YES'
}

// 查询溯源单溯源项目明细
var traceabilities = $SearchBusinessObject(
  'TRACEABILITY_PROJ_DETAIL',
  {
    t_incident_id: id
  },
  ['t_traceability_num', 't_tracea_code_type']
)

var list = []
if (complaints && complaints.length) {
  for (var i = 0;i < complaints.length;i++) {
    var bottle_num = complaints[i]['t_bottle_can_code'] // 瓶/听编码
    var t_qr_code_value1 = complaints[i]['t_qr_code_value1'] // 二维码码值
    if (bottle_num) {
      // 判断是否已经创建
      // 通过'瓶/听编码'判断是否已经创建过
      if (!isExist(traceabilities, bottle_num, 'BOTTLE_CODE')) {
        list.push({
          t_traceability_num: bottle_num,
          t_tracea_code_type: 'BOTTLE_CODE',
          t_qr_code_value1: t_qr_code_value1
        })
      }
    }
    var box_num = complaints[i]['t_box_code'] // 包装箱编码
    if (box_num) {
      // 判断是否已经创建
      // 通过'包装箱编码'判断是否已经创建过
      if (!isExist(traceabilities, box_num, 'BOX_CODE')) {
        list.push({
          t_traceability_num: box_num,
          t_tracea_code_type: 'BOX_CODE',
          t_qr_code_value1: t_qr_code_value1
        })
      }
    }
  }
}

for (var j = 0;j < list.length;j++) {
  submitByCode('TRACEABILITY_PROJ_DETAIL', {
    t_traceability_num: list[j].t_traceability_num, // 溯源编码
    t_tracea_code_type: list[j].t_tracea_code_type, // 溯源编码类型
    t_qr_code_value1: list[j].t_qr_code_value1, // 二维码码值
    t_incident_id: id, // 事件单id
    _status: 'create'
  })
}

// 判断是否已经创建过
function isExist (arrayList, num, type) {
  var check = false
  for (var i = 0;i < arrayList.length;i++) {
    // 溯源编码：t_traceability_num
    // 溯源编码类型：t_tracea_code_type
    if (
      arrayList[i].t_traceability_num == num &&
      arrayList[i].t_tracea_code_type == type
    ) {
      check = true
    }
  }
  return check
}

function submitByCode (bo, params) {
  var body = {
    requestParamMap: {
      businessObjectCode: bo
    },
    payload: JSON.stringify(params)
  }

  var response = $CallInterface(
    tenantNum,
    'LOW_CODE',
    'BOSUB',
    JSON.stringify(body)
  )
  var responseNode = JSON.parse(response)
  return responseNode['id']
}

// 判断是否已经创建过
function isExist2 (arrayList, data) {
  var check = false
  for (var i = 0;i < arrayList.length;i++) {
    // 溯源编码：t_traceability_num
    // 溯源编码类型：t_tracea_code_type
    if (
      arrayList[i].t_traceability_num == data.t_traceability_num &&
      arrayList[i].t_tracea_code_type == data.t_tracea_code_type
    ) {
      check = true
    }
  }
  return check
}
var allList = []
/*
  溯源编码类型：TRACEABILITY_CODE_TYPE
    包装箱编码：BOX_CODE（old）
    瓶/听编码：BOTTLE_CODE（old）
    箱二维码：BOX_QR_CODE // 查
    箱喷码：BOX_INKJET_CODE // 查
    瓶听二维码：BOTTLE_QR_CODE
    瓶/听喷码：BOTTLE_INKJET_CODE
*/

if (id) {
  /* 查询投诉单违约产品情况 COMPLAINT_DEFAULT_PRODUCT */
  // 违约产品情况-包装箱二维码
  var list1 = $SearchBusinessObject(
    'DEALER_COMPLAINT_QRCODE', // 业务对象-经销商投诉单包装箱二维码
    // 查询的条件Map。条件仅支持 equal 判断。
    {
      t_t_incident_id: id // 事件单id
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
        t_incident_id: id, // 事件单id
        t_traceability_num: itemData['t_t_box_qr_codes'], // 溯源编码 t_bottle_can_code
        t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
        t_tracea_code_type: 'BOX_QR_CODE', // 溯源编码类型
        t_code_img_file: itemData['t_t_box_qr_codes_fj'] // 图片
      }
      // 判断是否已经创建
      if (!isExist2(traceabilities, newData)) {
        allList.push(newData)
      }
    }
  }
  // 违约产品情况-包装箱喷码
  var list2 = $SearchBusinessObject(
    'DEALER_COMPLAINT_INCODE', // 经销商投诉单包装箱喷码
    {
      t_t_incident_id: id
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
        t_incident_id: id, // 事件单id
        t_traceability_num: itemData['t_case_serial_numbers'], // 溯源编码 t_bottle_can_code
        t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
        t_tracea_code_type: 'BOX_INKJET_CODE', // 溯源编码类型
        t_code_img_file: itemData['t_inkjet_image'] // 图片
      }
      // 判断是否已经创建
      if (!isExist2(traceabilities, newData)) {
        allList.push(newData)
      }
    }
  }
  // 违约产品情况-瓶/听二维码
  var list3 = $SearchBusinessObject(
    'DEALER_COMPLAINT_BOTTLE_QRCODE', // 经销商投诉单瓶 / 听二维码
    {
      t_t_incident_id: id
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
        t_incident_id: id, // 事件单id
        t_traceability_num: itemData['t_bottle_qr_codes'], // 溯源编码 t_bottle_can_code
        t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
        t_tracea_code_type: 'BOTTLE_QR_CODE', // 溯源编码类型
        t_code_img_file: itemData['t_t_box_qr_codes_fj'] // 图片
      }
      // 判断是否已经创建
      if (!isExist2(traceabilities, newData)) {
        allList.push(newData)
      }
    }
  }
  // 违约产品情况-瓶/听喷码
  var list4 = $SearchBusinessObject(
    'DEALER_COMPLAINT_BOTTLE_INKJETCODE', // 经销商投诉瓶 / 听喷码
    {
      t_t_incident_id: id
    },
    [
      't_bottle_serial_numbers', // 瓶 / 听喷码
      't_t_inkjet_image', // 喷码图片
      't_qr_code_value1' // 二维码码值
    ]
  )
  if (list4 && list4.length) {
    for (var i = 0;i < list4.length;i++) {
      var itemData = list4[i]
      var newData = {
        t_incident_id: id, // 事件单id
        t_traceability_num: itemData['t_bottle_serial_numbers'], // 溯源编码 t_bottle_can_code
        t_qr_code_value1: itemData['t_qr_code_value1'], // 二维码码值
        t_tracea_code_type: 'BOTTLE_INKJET_CODE', // 溯源编码类型
        t_code_img_file: itemData['t_t_inkjet_image'] // 图片
      }
      // 判断是否已经创建
      if (!isExist2(traceabilities, newData)) {
        allList.push(newData)
      }
    }
  }

  // 数据写入溯源单溯源项目明细表
  for (var i = 0;i < allList.length;i++) {
    submitByCode(
      'TRACEABILITY_PROJ_DETAIL',
      Object.assign({ _status: 'create' }, allList[i])
    )
  }

  // 查询溯源单溯源项目明细
  var sourceList = $SearchBusinessObject(
    'TRACEABILITY_PROJ_DETAIL',
    {
      t_incident_id: id
    },
    ['t_traceability_num', 't_tracea_code_type', 't_code_img_file']
  )
  var tempList = []

  var typeMap = {
    // BOX_CODE: 'boxQr', // old
    // BOTTLE_CODE: 'boxQr', // old
    BOX_QR_CODE: 'boxQr',
    BOTTLE_QR_CODE: 'boxQr',
    // BOX_INKJET_CODE: 'boxInk',
    // BOTTLE_INKJET_CODE: 'boxInk'
  }
  // 查询是否投诉过
  for (var i = 0;i < sourceList.length;i++) {
    var itemData = sourceList[i]

    // 没有溯源编码则跳过
    if (!itemData.t_traceability_num) {
      continue
    }

    if (typeMap[itemData.t_tracea_code_type]) {
      // 如果不是箱二维码、箱喷码则不调用是否投诉接口
      var params = JSON.stringify({
        tenantId: $GetCurrentTenant().tenantId,
        traceabilityCode: itemData.t_traceability_num, // 溯源编码
        type: typeMap[itemData.t_tracea_code_type] // boxQr:箱二维码,boxInk:箱喷码
      })

      var res = JSON.parse(
        $Invoke('yqcloud-external', 'CrbMarketWineCollectionInvoke', params)
      )

      var tempItem = {
        _status: 'update',
        id: itemData.id
      }
      if (res && res['historyIncidentNumber']) {
        // res = {
        //   latestComplaintDealer: ['2141'], // 上次投诉经销商
        //   historyIncidentNumber: 'HS20251106-0009', // 历史单据号
        //   status: 'ok'
        // }
        tempItem['t_last_complaint_dealer'] = res['latestComplaintDealer'] // 上次投诉经销商
        tempItem['t_last_complaint_check_order'] = res['historyIncidentNumber'] // 上次投诉核实单号
        tempItem['t_complained'] = res['historyIncidentNumber'] ? '是' : '否' // 是否投诉过
      } else {
        tempItem['t_last_complaint_dealer'] = '' // 上次投诉经销商
        tempItem['t_last_complaint_check_order'] = '' // 上次投诉核实单号
        tempItem['t_complained'] = '否' // 是否投诉过
      }

      tempList.push(tempItem)
    }
  }

  // 数据写入溯源单溯源项目明细表-得到投诉信息后的更新
  for (var i = 0;i < tempList.length;i++) {

    submitByCode('TRACEABILITY_PROJ_DETAIL', tempList[i])
  }
}

var yd = $GetBusinessObject('INCIDENT', id, [
  'closed_by',
  'service_item_id',
  'id',
  't_whether_cross_division',
  'state_id',
  't_submitted_by_department_one',
  'assignee_person_id',
  't_complaint_form_no'
])

var draftType = ''
if (yd && yd.service_item_id == '6282996241634467844163446784') {
  /* 投诉单 提交工厂溯源岗审核-投诉单市场督察部同意审批弹窗 */
  draftType = 'create_ts_sy'
}

if (draftType) {
  var arr = [
    't_short_description',
    't_closed_by',
    't_closed_by:real_name',
    't_assignee_person_id',
    't_assignee_person_id:real_name',
    't_advice',
    't_whether_qr_products',
    't_whether_cross_division',
    't_whether_traceability',
    't_minimum_traceability',
    't_traceability_method',
    't_ocms',
    't_sy_attech',
    't_remark_instruction'
  ]

  /* 查询当前单据-当前登录人-发起沟通时存的所有有效状态草稿 并且取最新的那条*/
  var drafts = $SearchBusinessObject(
    'INCIDENT_DRAFT',
    {
      incident_id: id,
      t_draft_created_by: curUser,
      t_is_draft: 1,
      t_is_valid_draft: 1,
      t_draft_type: draftType
    },
    arr
  )

  var record = null
  if (drafts && drafts.length > 0) {
    record = drafts[0]
  }

  if (record && id) {

    var obj = {
      id: id,
      short_description: record['t_short_description'],
      closed_by: record['t_closed_by'],
      'closed_by:real_name': record['t_closed_by:real_name'],
      //'assignee_person_id': record['t_assignee_person_id'],
      //'assignee_person_id:real_name': record['t_assignee_person_id:real_name'],
      assignee_person_id: '628299855913299968',
      'assignee_person_id:real_name': 'ipms',
      t_advice: JSON.stringify(record['t_advice']),
      //'t_advice': '<p>1334</p>',
      t_whether_qr_products: record['t_whether_qr_products'],
      t_whether_cross_division: record['t_whether_cross_division'],
      t_minimum_traceability: record['t_minimum_traceability'],
      't_minimum_traceability:name': record['t_minimum_traceability:name'],
      t_traceability_method: record['t_traceability_method'],
      't_traceability_method:name': record['t_traceability_method:name'],

      t_whether_traceability: record['t_whether_traceability'],
      t_ocms: record['t_ocms'],
      't_ocms:t_name': record['t_ocms:t_name'],
      t_sy_attech: record['t_sy_attech'],
      t_remark_instruction: record['t_remark_instruction'],
    }

    return obj
  }
}

function findEnabledPerson (personId, flag, key) {
  var userGroup = $GetBusinessObject('IAM_USER_GROUP', '741367889857609728', [
    'owner_id',
    'name',
    'owner_id:real_name'
  ])

  var ownerObj = {
    id: userGroup['owner_id'],
    name: userGroup['owner_id:real_name']
  }
  var person = $GetBusinessObject('IAM_USER', personId, [
    'is_enabled',
    'id',
    'real_name',
    key,
    key + ':real_name'
  ])
  if (!person) {
    if (flag) {
      return ownerObj
    } else {
      return {
        id: '',
        name: ''
      } // 人员不存在
    }
  }

  if (person.is_enabled) {
    return {
      id: person[key],
      name: person[key + ':real_name']
    } // 直接返回可用的人员ID
  } else {
    var handoverList =
      $SearchBusinessObject(
        'HANDOVER_FORM',
        { t_transferor: personId, t_handover_status: 'true' },
        ['t_handover_person', 't_handover_person:real_name']
      ) || []
    if (handoverList.length > 0) {
      var handOver = $GetBusinessObject(
        'IAM_USER',
        handoverList[0]['t_handover_person'],
        [
          'is_enabled',
          'id',
          'real_name',
          'department_id',
          key,
          key + ':real_name'
        ]
      )

      if (handOver.is_enabled) {
        if (handOver[key]) {
          return {
            id: handOver[key],
            name: handOver[key + ':real_name']
          }
        } else {
          if (flag) {
            return ownerObj
          } else {
            return {
              id: '',
              name: ''
            } // 人员不存在
          }
        }
      } else {
        if (handOver[key]) {
          findEnabledPerson(handOver[key], flag, key)
        } else {
          if (flag) {
            return ownerObj
          } else {
            return {
              id: '',
              name: ''
            } // 人员不存在
          }
        }
      }
    }

    if (flag) {
      return ownerObj
    } else {
      return {
        id: '',
        name: ''
      }
    } // 没有找到可用的人员
  }
}

if (id) {

  var personData = $GetBusinessObject('INCIDENT', id, [
    'assignee_person_id',
    'assignee_person_id:real_name',
    'closed_by:director_id',
    'closed_by:director_id:real_name',
    'closed_by:real_name',
    'assignee_person_id:department_id:parent_id:t_p_dept_desc_shrt',
    't_traceability_plant'
  ])

  // 声明生产日期
  var t_production_date = '';
  // 是否全等
  var productFlag = true;
  // 箱二维码
  var boxQrList = $SearchBusinessObject(
    'DEALER_COMPLAINT_QRCODE',
    { t_t_incident_id: id },
    ['t_product_time']
  );
  // 瓶听二维码
  var bottleQrList = $SearchBusinessObject(
    'DEALER_COMPLAINT_BOTTLE_QRCODE',
    { t_t_incident_id: id },
    ['t_product_time']
  );
  // 箱喷码
  var boxInkList = $SearchBusinessObject(
    'DEALER_COMPLAINT_INCODE',
    { t_t_incident_id: id },
    ['t_case_serial_numbers']
  );
  // 瓶听喷码
  var bottleInkList = $SearchBusinessObject(
    'DEALER_COMPLAINT_BOTTLE_INKJETCODE',
    { t_t_incident_id: id },
    ['t_bottle_serial_numbers']
  );

  for (var i = 0;i < boxQrList.length;i++) {
    if (t_production_date === '') {
      t_production_date = boxQrList[i].t_product_time
    }
    if (t_production_date !== boxQrList[i].t_product_time) {
      productFlag = false
    }
  }

  for (var i = 0;i < bottleQrList.length;i++) {
    if (t_production_date === '') {
      t_production_date = bottleQrList[i].t_product_time
    }
    if (t_production_date !== bottleQrList[i].t_product_time) {
      productFlag = false
    }
  }

  for (var i = 0;i < boxInkList.length;i++) {
    if (t_production_date === '') {
      t_production_date = boxInkList[i].t_case_serial_numbers
    }
    if (t_production_date !== boxInkList[i].t_case_serial_numbers) {
      productFlag = false
    }
  }

  for (var i = 0;i < bottleInkList.length;i++) {
    if (t_production_date === '') {
      t_production_date = bottleInkList[i].t_bottle_serial_numbers
    }
    if (t_production_date !== bottleInkList[i].t_bottle_serial_numbers) {
      productFlag = false
    }
  }

  if (productFlag && t_production_date) {
    function formatDate (dateStr) {
      try {
        return dateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
      } catch (err) {
        return ''
      }
    }
    t_production_date = formatDate(t_production_date + '');
  } else {
    t_production_date = ''
  }

  if (personData) {
    var drafData = findEnabledPerson(
      personData['assignee_person_id'],
      false,
      'director_id'
    )

    if (drafData.id) {
      return {
        id: id,
        t_advice: '',
        assignee_person_id: drafData.id,
        'assignee_person_id:real_name': drafData.name,
        t_traceability_plant: personData.t_traceability_plant,
        t_production_date: t_production_date,
        t_whether_traceability: t_whether_traceability,
        t_can_auto_close_data: t_can_auto_close_data
      }
    } else {
      return {
        id: id,
        t_advice: '',
        assignee_person_id: '',
        'assignee_person_id:real_name': '',
        t_traceability_plant: personData.t_traceability_plant,
        t_production_date: t_production_date,
        t_whether_traceability: t_whether_traceability,
        t_can_auto_close_data: t_can_auto_close_data
      }
    }
  } else {
    return {
      id: id,
      t_advice: '',
      assignee_person_id: '',
      'assignee_person_id:real_name': '',
      t_production_date: t_production_date,
      t_whether_traceability: t_whether_traceability,
      t_can_auto_close_data: t_can_auto_close_data
    }
  }
}
