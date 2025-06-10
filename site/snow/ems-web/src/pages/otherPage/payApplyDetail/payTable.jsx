import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Dropdown } from 'antd';
import React from 'react';

export default function Index() {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '发票供应商',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '供应商地点',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '收款方户名',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '收款方账号',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '是否委托付款',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '发票编号',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '请款类型',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '付款类型',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '原始到期日',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '到期日',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '发票入账日期',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '到期金额',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '经办人',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '申请付款金额',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '汇票金额',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '转账金额',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '合同名称',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '合同编码',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '项目名称',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '项目编码',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '币种',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '备注',
      width: 140,
      dataIndex: 'index',
    },
    {
      title: '操作',
      width: 140,
      fixed: 'right',
      align: 'center',
      dataIndex: 'actions',
      render: () => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  label: '票据付款信息',
                  key: '1',
                },
                {
                  label: '转账付款信息',
                  key: '2',
                },
                {
                  label: '其他付款信息',
                  key: '3',
                },
              ],
            }}
          >
            <Button type="link">
              查看付款信息
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={[{}]}
      toolsLeft={
        <Button type="primary" icon={<DownloadOutlined />}>
          导出
        </Button>
      }
      scroll={{
        x: 'max-content',
      }}
      cardProps={{
        title: '付款信息明细',
        bordered: true,
        style: { background: '#fff', height: '100%' },
      }}
    ></Table>
  );
}
