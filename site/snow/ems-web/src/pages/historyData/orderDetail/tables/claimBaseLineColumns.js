import dayjs from 'dayjs';

const columnsMap = {
  51940: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'accountItemCode',
      width: 120,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'extend20',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'extend22',
      width: 140,
      title: '招待类型',
    },
    {
      dataIndex: 'extend16',
      width: 140,
      title: '招待地点',
    },
    {
      dataIndex: 'mealTime',
      width: 140,
      title: '用餐时间',
    },
    {
      dataIndex: 'extend12',
      width: 120,
      title: '招待人数',
    },
    {
      dataIndex: 'extend14',
      width: 120,
      title: '陪同人数',
    },
    {
      dataIndex: 'extend13',
      width: 120,
      title: '标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 120,
      title: '金额',
    },
    {
      dataIndex: 'extend29',
      width: 140,
      title: '招待对象',
    },
    {
      dataIndex: 'extend30',
      width: 180,
      title: '招待事由',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
  ],
  11018: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 120,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 120,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'extend6',
      width: 140,
      title: '员工编号',
    },
    {
      dataIndex: 'extend8',
      width: 140,
      title: '员工姓名',
    },
    {
      dataIndex: 'extend10',
      width: 140,
      title: '月份',
    },
    {
      dataIndex: 'extend9',
      width: 140,
      title: '标准金额',
    },
    {
      dataIndex: 'extend17',
      width: 140,
      title: '实际报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  61448: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'costCenterName',
      width: 140,
      title: '成本中心',
    },
    {
      dataIndex: 'amount',
      width: 140,
      title: '数量',
    },
    {
      dataIndex: 'extend38',
      width: 140,
      title: '地区段',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '金额',
    },
  ],
  59415: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'extend20',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'extend22',
      width: 140,
      title: '用餐类型',
    },
    {
      dataIndex: 'extend16',
      width: 140,
      title: '用餐地点',
    },
    {
      dataIndex: 'mealTime',
      width: 140,
      title: '用餐时间',
    },
    {
      dataIndex: 'extend12',
      width: 140,
      title: '用餐人数',
    },
    {
      dataIndex: 'extend13',
      width: 140,
      title: '标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '金额',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
  ],
  59275: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'extend19',
      width: 140,
      title: '差旅明细信息',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  53154: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'remark',
      width: 140,
      title: '报账类型',
    },
  ],
  49073: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '事前申请单',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  48493: [
    {
      dataIndex: 'detailStartDate',
      width: 140,
      title: '开始日期',
    },
    {
      dataIndex: 'detailEndDate',
      width: 140,
      title: '结束日期',
    },
    {
      dataIndex: 'vacationFlag',
      width: 140,
      title: '申请休假',
      render: value => {
        return value ? (value === 'Y' ? '是' : '否') : '';
      },
    },
    {
      dataIndex: 'vacationDateOne',
      width: 140,
      title: '请假日期1',
    },
    {
      dataIndex: 'vacationOneStartTime',
      width: 140,
      title: '开始时间',
    },
    {
      dataIndex: 'vacationOneEndTime',
      width: 140,
      title: '结束时间',
    },
    {
      dataIndex: 'vacationOneEndTime',
      width: 140,
      title: '请假日期2',
    },
    {
      dataIndex: 'vacationTwoStartTime',
      width: 140,
      title: '开始时间',
    },
    {
      dataIndex: 'vacationTwoEndTime',
      width: 140,
      title: '结束时间',
    },
    {
      dataIndex: 'workLocation',
      width: 140,
      title: '常驻工作地',
    },
    {
      dataIndex: 'tripLocation',
      width: 140,
      title: '出差地',
    },
    {
      dataIndex: 'transferLocation1',
      width: 140,
      title: '中转地1',
    },
    {
      dataIndex: 'transferLocation2',
      width: 140,
      title: '中转地2',
    },
    {
      dataIndex: 'transferLocation3',
      width: 140,
      title: '中转地3',
    },
    {
      dataIndex: 'familyLocation',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'transportType',
      width: 140,
      title: '交通工具',
    },
  ],
  48430: [
    {
      dataIndex: 'travelUserid',
      width: 140,
      title: '出差人ID',
    },
    {
      dataIndex: 'detailStartTime',
      width: 140,
      title: '开始日期',
    },
    {
      dataIndex: 'detailEndTime',
      width: 140,
      title: '结束日期',
    },
    {
      dataIndex: 'detailStartCity',
      width: 140,
      title: '出发地',
    },
    {
      dataIndex: 'detailEndCity',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'travelArea',
      width: 140,
      title: '地区类型',
    },
    {
      title: '住宿',
      children: [
        {
          dataIndex: 'quarterStandard',
          width: 140,
          title: '每日标准',
        },
        {
          dataIndex: 'extend20',
          width: 140,
          title: '预订方式',
        },
      ],
    },
    {
      dataIndex: 'transportStandard',
      width: 140,
      title: '交通工具标准',
    },
    {
      title: '去程交通',
      children: [
        {
          dataIndex: 'goTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'goApplyLevel',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      title: '回程交通',
      children: [
        {
          dataIndex: 'backTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'backTransport',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      dataIndex: 'remark',
      width: 140,
      title: '备注',
    },
  ],
  46658: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '发票余额',
    },
    {
      dataIndex: 'billNo',
      width: 140,
      title: '发票号码',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
  ],
  45911: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'amortizeFlag',
      width: 140,
      title: '是否摊销',
    },
  ],
  45899: null,
  45818: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'amortizeFlag',
      width: 140,
      title: '是否摊销',
    },
    // {
    //   dataIndex: 'detail',
    //   width: 140,
    //   title: '摊销明细',
    // },
  ],
  45542: null,
  41916: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  40357: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'amortizeFlag',
      width: 140,
      title: '是否摊销',
    },
  ],
  40159: null,
  39699: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '供应商',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '费用类型',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '金额',
    },
    {
      dataIndex: 'extend22',
      width: 140,
      title: '合同编号',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  38884: null,
  35882: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'extend19',
      width: 140,
      title: '差旅明细信息',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'carNumber',
      width: 140,
      title: '车牌号',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  33419: [
    {
      dataIndex: 'detailStartTime',
      width: 140,
      title: '开始日期',
      render: value => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      dataIndex: 'detailEndTime',
      width: 140,
      title: '结束日期',
      render: value => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      dataIndex: 'detailStartCity',
      width: 140,
      title: '出发地',
    },
    {
      dataIndex: 'detailEndCity',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'travelArea',
      width: 140,
      title: '地区类型',
    },
    {
      title: '住宿',
      children: [
        {
          dataIndex: 'quarterStandard',
          width: 140,
          title: '每日标准',
        },
        {
          dataIndex: 'extend20',
          width: 140,
          title: '预订方式',
        },
      ],
    },
    {
      dataIndex: 'transportStandard',
      width: 140,
      title: '交通工具标准',
    },
    {
      title: '去程交通',
      children: [
        {
          dataIndex: 'goTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'goApplyLevel',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      title: '回程交通',
      children: [
        {
          dataIndex: 'backTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'backApplyLevel',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      dataIndex: 'remark',
      width: 140,
      title: '备注',
    },
  ],
  33164: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '事前申请单',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  33004: [
    {
      dataIndex: 'travelUserName',
      width: 140,
      title: '出差人',
    },
    {
      dataIndex: 'firstName',
      width: 140,
      title: '英文姓',
    },
    {
      dataIndex: 'lastName',
      width: 140,
      title: '英文名',
    },
    {
      dataIndex: 'detailStartTime',
      width: 140,
      title: '开始日期',
    },
    {
      dataIndex: 'detailEndTime',
      width: 140,
      title: '结束日期',
    },
    {
      dataIndex: 'travelStartCity',
      width: 140,
      title: '出发地',
    },
    {
      dataIndex: 'travelEndCity',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'goTransportName',
      width: 140,
      title: '去程交通工具',
    },
    {
      dataIndex: 'goApplyLevelName',
      width: 180,
      title: '去程交通工具申请等级',
    },
    {
      dataIndex: 'backTransportName',
      width: 140,
      title: '回程交通工具',
    },
    {
      dataIndex: 'backApplyLevelName',
      width: 180,
      title: '回程交通工具申请等级',
    },
    {
      dataIndex: 'airType',
      width: 180,
      title: '差标-飞机',
    },
    {
      dataIndex: 'shipType',
      width: 180,
      title: '差标-轮船',
    },
    {
      dataIndex: 'highSpeedType',
      width: 180,
      title: '差标-高铁',
    },
    {
      dataIndex: 'trainType',
      width: 180,
      title: '差标-火车',
    },
    {
      dataIndex: 'quarterStandard',
      width: 180,
      title: '每日住宿标准',
    },
    {
      dataIndex: 'applyQuarterStandard',
      width: 180,
      title: '酒店每晚住宿金额',
    },
    {
      dataIndex: 'remark',
      width: 180,
      title: '备注',
    },
  ],
  32992: [
    {
      dataIndex: 'feeDeptName',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'costCenterName',
      width: 140,
      title: '成本中心',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '借方科目',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '出差申请单',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'electronicsInvoiceNo',
      width: 140,
      title: '电子发票号',
    },
    {
      dataIndex: 'remark',
      width: 140,
      title: '备注',
    },
  ],
  27959: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'refHeadCode',
      width: 140,
      title: '关联报账单号',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '申请金额',
    },
    {
      dataIndex: 'extend43',
      width: 140,
      title: '资金计划日期',
    },
    {
      dataIndex: 'extend32',
      width: 140,
      title: '计划期间',
    },
    {
      dataIndex: 'extend33',
      width: 140,
      title: '开始日期',
    },
    {
      dataIndex: 'extend34',
      width: 140,
      title: '结束日期',
    },
  ],
  26486: [
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '工程类型',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '供应商',
    },
    {
      dataIndex: 'extend11',
      width: 140,
      title: '合同不含税金额',
    },
    {
      dataIndex: 'extend10',
      width: 140,
      title: '本次完成百分比(%)',
    },
    {
      dataIndex: 'extend13',
      width: 140,
      title: '上次完成百分比(%)',
    },
    {
      dataIndex: 'extend12',
      width: 140,
      title: '在建工程科目账面金额',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '本次入账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  22468: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'extend6',
      width: 140,
      title: '员工编号',
    },
    {
      dataIndex: 'extend8',
      width: 140,
      title: '员工姓名',
    },
    {
      dataIndex: 'travelStartTime',
      width: 140,
      title: '归属月份',
    },
    {
      dataIndex: 'workLocation',
      width: 140,
      title: '工作地',
    },
    {
      dataIndex: 'destinationLocation',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'extend15',
      width: 140,
      title: '费用标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  21370: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类名称',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '借方科目名称',
    },
    {
      dataIndex: 'extend6',
      width: 140,
      title: '员工编号',
    },
    {
      dataIndex: 'extend8',
      width: 140,
      title: '员工姓名',
    },
    {
      dataIndex: 'travelStartTime',
      width: 140,
      title: '归属月份',
    },
    {
      dataIndex: 'workLocation',
      width: 140,
      title: '工作地',
    },
    {
      dataIndex: 'destinationLocation',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'extend15',
      width: 140,
      title: '费用标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  18173: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  17794: [
    {
      dataIndex: 'refHeadCode',
      width: 140,
      title: '关联收款单',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'usableAmount',
      width: 140,
      title: '待确认余额',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '确认金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  15257: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'costCenterName',
      width: 140,
      title: '借方成本中心',
    },
    {
      dataIndex: 'extend38',
      width: 140,
      title: '贷方成本中心',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '借方科目',
    },
    {
      dataIndex: 'crAccountItemName',
      width: 140,
      title: '贷方科目',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '备注',
    },
  ],
  14415: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '借方科目名称',
    },
    {
      dataIndex: 'travelStartTime',
      width: 140,
      title: '归属期间',
    },
    {
      dataIndex: 'extend6',
      width: 140,
      title: '工作地',
    },
    {
      dataIndex: 'extend7',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'extend15',
      width: 140,
      title: '费用标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额(不含税)',
    },
  ],
  11704: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '关联收款单',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'usableAmount',
      width: 140,
      title: '收款单余额',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  11605: null,
  10052: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '关联收款单',
    },
  ],
  10008: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'asistantSegmentName',
      width: 140,
      title: '辅助核算段',
    },
    {
      dataIndex: 'businessItemName',
      width: 140,
      title: '业务条块',
    },
    {
      dataIndex: 'belongPeriod',
      width: 140,
      title: '归属期间',
    },
  ],
  10005: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'refHeadCode',
      width: 140,
      title: '关联收款单',
    },
    {
      dataIndex: 'refLineAmount',
      width: 140,
      title: '收款单余额',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  9895: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  9811: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '事前申请单',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  9680: null,
  9585: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  9342: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目',
    },
    {
      dataIndex: 'extend38',
      width: 140,
      title: '资产类别',
    },
    {
      dataIndex: 'extend31',
      width: 140,
      title: '资产编码',
    },
    {
      dataIndex: 'extend30',
      width: 140,
      title: '资产名称',
    },
    {
      dataIndex: 'extend39',
      width: 140,
      title: '规则型号',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额(不含税)',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '备注',
    },
  ],
  9203: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '关联方',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目名称',
    },
    {
      dataIndex: 'vendorName',
      width: 140,
      title: '交易对象',
    },
  ],
  8809: [
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'extend22',
      width: 140,
      title: '招待类型',
    },
    {
      dataIndex: 'extend12',
      width: 140,
      title: '招待人数',
    },
    {
      dataIndex: 'extend14',
      width: 140,
      title: '陪同人数',
    },
    {
      dataIndex: 'extend13',
      width: 140,
      title: '标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '金额',
    },
    {
      dataIndex: 'applyDrinkFlag',
      width: 140,
      title: '是否领用酒',
    },
    {
      dataIndex: 'extend29',
      width: 140,
      title: '招待对象',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '招待事由',
    },
  ],
  8570: null,
  8022: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'accountItemCode',
      width: 140,
      title: '会计科目编码',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '会计科目名称',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '事前申请单',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'extend22',
      width: 140,
      title: '招待类型',
    },
    {
      dataIndex: 'extend16',
      width: 140,
      title: '招待地点',
    },
    {
      dataIndex: 'mealTime',
      width: 140,
      title: '用餐时间',
    },
    {
      dataIndex: 'extend12',
      width: 140,
      title: '招待人数',
    },
    {
      dataIndex: 'extend14',
      width: 140,
      title: '陪同人数',
    },
    {
      dataIndex: 'extend13',
      width: 140,
      title: '标准',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '金额',
    },
    {
      dataIndex: 'applyDrinkBackFlag',
      width: 140,
      title: '是否退酒',
    },
    {
      dataIndex: 'applyDrinkAmount',
      width: 140,
      title: '用酒金额',
    },
    {
      dataIndex: 'mealStandard',
      width: 140,
      title: '用餐标准',
    },
    {
      dataIndex: 'extend29',
      width: 140,
      title: '招待对象',
    },
    {
      dataIndex: 'extend30',
      width: 140,
      title: '招待事由',
    },
  ],
  7937: null,
  7727: null,
  7693: null,
  5702: [
    {
      dataIndex: 'detailStartTime',
      width: 140,
      title: '开始日期',
    },
    {
      dataIndex: 'detailEndTime',
      width: 140,
      title: '结束日期',
    },
    {
      dataIndex: 'detailStartCity',
      width: 140,
      title: '出发地',
    },
    {
      dataIndex: 'detailEndCity',
      width: 140,
      title: '目的地',
    },
    {
      dataIndex: 'travelArea',
      width: 140,
      title: '地区类型',
    },
    {
      title: '住宿',
      children: [
        {
          dataIndex: 'quarterStandard',
          width: 140,
          title: '每日标准',
        },
        {
          dataIndex: 'extend20',
          width: 140,
          title: '预订方式',
        },
      ],
    },
    {
      dataIndex: 'transportStandard',
      width: 140,
      title: '交通工具标准',
    },
    {
      title: '去程交通',
      children: [
        {
          dataIndex: 'goTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'goApplyLevel',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      title: '回程交通',
      children: [
        {
          dataIndex: 'backTransport',
          width: 140,
          title: '交通工具',
        },
        {
          dataIndex: 'backApplyLevel',
          width: 140,
          title: '申请等级',
        },
      ],
    },
    {
      dataIndex: 'remark',
      width: 140,
      title: '备注',
    },
  ],
  4406: null,
  4183: [
    {
      dataIndex: 'costCenterName',
      width: 140,
      title: '借方成本中心',
    },
    {
      dataIndex: 'extend38',
      width: 140,
      title: '贷方成本中心',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'accountItemName',
      width: 140,
      title: '借方科目',
    },
    {
      dataIndex: 'crAccountItemName',
      width: 140,
      title: '贷方科目',
    },
    {
      dataIndex: 'coaName',
      width: 140,
      title: '借方关联方名称',
    },
    {
      dataIndex: 'crCoaName',
      width: 140,
      title: '借方关联方名称',
    },
    {
      dataIndex: 'extend32',
      width: 140,
      title: '借方增减变动',
    },
    {
      dataIndex: 'extend39',
      width: 140,
      title: '贷方增减变动',
    },
    {
      dataIndex: 'extend28',
      width: 140,
      title: '借方银行子目',
    },
    {
      dataIndex: 'extend29',
      width: 140,
      title: '贷方银行子目',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
  3873: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目',
    },
    {
      dataIndex: 'extend18',
      width: 140,
      title: '交易对象',
    },
  ],
  3360: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'projectName',
      width: 140,
      title: '项目',
    },
    {
      dataIndex: 'refLineDesc',
      width: 140,
      title: '事前申请单',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'extend23',
      width: 140,
      title: '客户',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
    {
      dataIndex: 'extend30',
      width: 140,
      title: '是否有票',
    },
    {
      dataIndex: 'extend42',
      width: 140,
      title: '是否已预提',
    },
  ],

  // 新表单
  formId_613: [
    {
      dataIndex: 'extend25',
      width: 140,
      title: '费用部门',
    },
    {
      dataIndex: 'item3Name',
      width: 140,
      title: '业务小类',
    },
    {
      dataIndex: 'costCenterName',
      width: 140,
      title: '成本中心',
    },
    {
      dataIndex: 'applyAmount',
      width: 140,
      title: '报账金额',
    },
    {
      dataIndex: 'summary',
      width: 140,
      title: '摘要',
    },
  ],
};

const detailInfo = {
  33164: '差旅明细信息',
  32992: '差旅明细信息',
  17794: '摊销明细',
  9895: '摊销明细',
  9811: '差旅明细信息',
};

export default formId => {
  const columns = columnsMap[formId];
  return columns
    ? [
        {
          title: '序号',
          width: 80,
          align: 'center',
          dataIndex: 'index',
          render: (value, record, index) => index + 1,
        },
        ...columns,
      ]
    : [];
};
