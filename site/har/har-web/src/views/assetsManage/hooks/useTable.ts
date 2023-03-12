export function useTable() {
  const columns = [
    {
      label: '商户',
      prop: 'merchantName'
    },
    {
      label: '合同号',
      prop: 'code'
    },
    {
      label: '状态',
      prop: 'mixStatusDesc'
    },
    {
      label: '合同开始时间',
      prop: 'leaseStartDate'
    },
    {
      label: '合同结束时间',
      prop: 'leaseEndDate'
    },
    {
      label: '详情',
      prop: 'detail',
      width: 90
    }
  ];

  const contractTableOptions = {
    pageShow: true,
    tableCard: false,
    indexTitle: '序号',
    index: true,
    menu: false,
    menuOtherOptions: {
      bordered: false
    },
    columns
  };

  const shopTableOptions = {
    pageShow: false,
    tableCard: false,
    menu: false,
    columns: [
      { label: '单据号', prop: 'code' },
      { label: '审批状态', prop: 'status' },
      { label: '铺位类型', prop: 'categoryName' },
      { label: '调整类型', prop: 'changeType' }
    ]
  };

  return {
    contractTableOptions,
    shopTableOptions
  };
}
