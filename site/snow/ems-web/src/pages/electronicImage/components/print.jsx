import { Affix, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { ProDescriptions } from '@ant-design/pro-components';
import ProTable from '@c/proTable';
import { Table } from 'antd';
import dayjs from 'dayjs';
import jsBarCode from 'jsbarcode';

const EXPENSE_DETAILS = [
  {
    dataIndex: 'index',
    title: '序号',
    align: 'center',
    width: 80,
    fixed: 'left',
    render: (value, record, index) => {
      return index + 1;
    },
  },
  {
    title: '成本中心',
    dataIndex: 'costCenterName',
  },
  {
    title: '业务小类',
    dataIndex: 'item3Name',
  },
  {
    title: '报账金额',
    dataIndex: 'applyAmount',
  },
  {
    title: '摘要',
    dataIndex: 'summary',
  },
];

export default function Print() {
  const [data, setData] = useState({
    batchList: [],
    deductTypeList: [],
    vatTypeDicts: [],
  });
  const [vatTypeDicts, setVatTypeDicts] = useState([]);

  useEffect(() => {
    if (window.printData) {
      setData(window.printData);
      setVatTypeDicts(window.printData.vatTypeDicts);
    }
    setTimeout(() => {
      if (!window.printData || window.printData.batchList.length === 0) {
        message.error('数据获取失败请重新尝试');
        window.close();
        return;
      }
      jsBarCode('.claim-number-barcode').init();
    }, 300);
  }, []);

  const TAX_DETAILS = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      width: 80,
      fixed: 'left',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: '税率',
      dataIndex: 'vat',
    },
    {
      title: '税率类型',
      dataIndex: 'vatType',
      render: value => {
        let res = '';
        vatTypeDicts.find(item => {
          console.log(item, 333, value);
          if (item.dictCode === value) {
            res = item.dictName;
            return true;
          }
        });

        console.log(res, 777);

        return res;
      },
    },
    {
      title: '税款',
      dataIndex: 'taxAmount',
    },
    {
      title: '发票号码',
      dataIndex: 'invoiceNo',
    },
    {
      title: '摘要',
      dataIndex: 'summary',
    },
  ];

  const getSum = (data, key) => {
    let sum = 0;
    data.forEach(item => {
      const number = typeof item[key] === 'number' ? item[key] : item[key] ? parseFloat(item[key]) : 0;
      sum += number * 100;
    });
    return sum / 100;
  };

  const handlePrint = () => {
    // getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
    // 拿到被打印的body的元素后通过zoom属性调整大小
    document.getElementsByClassName('print-btn')[0].style.display = 'none';
    document.getElementsByClassName('electronic-image-print')[0].style = 'padding: 0 10px';
    window.print();
    document.getElementsByClassName('print-btn')[0].style.display = 'block';
    document.getElementsByClassName('electronic-image-print')[0].style = '';
  };

  return (
    <div className="electronic-image-print">
      {data.batchList.length > 0 && (
        <Affix offsetTop={0} className="print-btn">
          <Button type="primary" className="mt-2" onClick={handlePrint}>
            打印
          </Button>
        </Affix>
      )}

      {data.batchList.map((item, index) => {
        return (
          <div key={index} style={{ pageBreakAfter: 'always', textAlign: 'center' }}>
            <ProDescriptions
              title={
                <div>
                  <div>{item.claimBase.ouName}</div>
                  <div>{`${item.expCategory.parentName} - ${item.expCategory.expCategoryName}`}</div>
                </div>
              }
              dataSource={item.claimBase}
              column={5}
              extra={<svg className="claim-number-barcode" data-value={item.claimBase.claimNo} data-height={80}></svg>}
            >
              <ProDescriptions.Item dataIndex="applyEmpName" label="申请人" />
              <ProDescriptions.Item label="申请日期">
                {dayjs(item.claimBase.applyDate).format('YYYY-MM-DD')}
              </ProDescriptions.Item>
              <ProDescriptions.Item dataIndex="applyCompName" label="申请人公司" />
              <ProDescriptions.Item dataIndex="applyDeptName" label="申请人部门" />
              <ProDescriptions.Item dataIndex="applyEmail" label="申请人邮箱" />
              <ProDescriptions.Item dataIndex="applyPhone" label="申请人电话" />

              <ProDescriptions.Item dataIndex="ouName" label="归属公司" />
              <ProDescriptions.Item dataIndex="item2Name" label="业务大类" />
              <ProDescriptions.Item
                dataIndex="attachNum"
                label={
                  ['400104', '400102'].includes(item.claimBase.item2Code) ||
                  ['6182', '6150', '6141'].includes(item.claimBase.formId)
                    ? '附件张数'
                    : '影像张数'
                }
              />
              <ProDescriptions.Item dataIndex="vendorName" label="供应商名称" />
              <ProDescriptions.Item dataIndex="applyAmount" label="报账金额" />

              <ProDescriptions.Item dataIndex="payAmount" label="付款金额" />
              <ProDescriptions.Item dataIndex="currentWriteOffAmount" label="核销金额" />
              <ProDescriptions.Item
                dataIndex={item.claimBase.isChangedAcceptReim === '1' ? 'sjVendorBankName' : 'vendorBankName'}
                label="开户银行"
              />
              <ProDescriptions.Item
                dataIndex={item.claimBase.isChangedAcceptReim === '1' ? 'sjVendorAccountName' : 'vendorAccountName'}
                label="户名"
              />
              <ProDescriptions.Item
                dataIndex={item.claimBase.isChangedAcceptReim === '1' ? 'sjVendorAccountNo' : 'vendorAccountNo'}
                label="银行账号"
              />
              <ProDescriptions.Item dataIndex="remark" label="备注" />
            </ProDescriptions>

            {/* //费用明细 */}
            <div className="mt-4">
              <div>费用明细</div>
              <div>
                <ProTable
                  columns={EXPENSE_DETAILS}
                  dataSource={item.mainClaimBasePrintVo.claimBaseLineLst}
                  rowKey="baseLineId"
                  locale={{ emptyText: <div className="px-3 py-2">暂无数据</div> }}
                  pagination={false}
                  size="small"
                  hideTools
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align="center">
                          合计
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          {getSum(item.mainClaimBasePrintVo.claimBaseLineLst, 'applyAmount')}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </div>
            </div>

            {/* //税金明细 */}
            <div className="mt-4">
              <div>税金明细</div>
              <div>
                <ProTable
                  columns={TAX_DETAILS}
                  dataSource={item.mainClaimBasePrintVo.claimTaxLineLst}
                  rowKey="baseLineId"
                  pagination={false}
                  size="small"
                  locale={{ emptyText: <div className="px-3 py-2">暂无数据</div> }}
                  hideTools
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} align="center">
                          合计
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          {getSum(item.mainClaimBasePrintVo.claimTaxLineLst, 'taxAmount')}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        <Table.Summary.Cell index={5}></Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
