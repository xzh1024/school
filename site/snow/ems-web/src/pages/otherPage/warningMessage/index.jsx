import Table from '@c/proTable';
import axios from '@u/request';
import { Button, Checkbox, Input, Select, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TitleBox from './titleBox';
import ExcelJS from 'exceljs';
import { downloadByBlob } from '@u/tools';
import dayjs from 'dayjs';

const border = {
  style: 'thin',
  color: { argb: 'FF000000' },
};

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

export default function Index() {
  const [search, setSearch] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [warningData, setWarningData] = useState([]);
  const [normalData, setNormalData] = useState([]);
  const [consecutiveData, setConsecutiveData] = useState([]);
  const [sensitiveData, setSensitiveData] = useState([]);
  const [RPAData, setRPAData] = useState({});
  const [RPARound, setRPARound] = useState('');
  const [RPATableData, setRPATableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const isStepAccount =
    (search.get('processStateId') || '') === 'stepaccount' && (search.get('openMode') || '') !== '8';

  useEffect(() => {
    const SSOUserName = search.get('SSOUserName') || '';
    const claimId = search.get('claimId') || '';
    const ouCode = search.get('ouCode') || '';
    getWarningData(SSOUserName, claimId, ouCode);
    // setWarningData(data.data);
  }, []);

  useEffect(() => {
    if (warningData.length === 0) {
      return;
    }

    const normalTempData = [];
    const consecutiveTempData = [];
    const sensitiveTempData = [];
    const RPATempData = {};

    warningData.forEach(item => {
      if (item.warnType === '90') {
        if (RPATempData[item.updateUser]) {
          RPATempData[item.updateUser].push(item);
        } else {
          RPATempData[item.updateUser] = [item];
        }
      } else if (item.warnType === '02') {
        consecutiveTempData.push(item);
      } else if (['05', '10', '11'].includes(item.warnType)) {
        sensitiveTempData.push(item);
      } else {
        normalTempData.push(item);
      }
    });

    setConsecutiveData(consecutiveTempData);
    setSensitiveData(sensitiveTempData);
    setNormalData(normalTempData);
    setRPAData(RPATempData);
  }, [warningData]);

  useEffect(() => {
    const keys = Object.keys(RPAData);
    if (keys.length === 0) {
      return;
    }
    if (!RPARound) {
      const data = [
        ...RPAData[keys[0]].filter(item => item.warnLevel === 'HOLD'),
        ...RPAData[keys[0]].filter(item => item.warnLevel === 'PASS'),
      ];
      setRPATableData(data);
      setRPARound(keys[0]);
      return;
    }
    const data = [
      ...RPAData[RPARound].filter(item => item.warnLevel === 'HOLD'),
      ...RPAData[RPARound].filter(item => item.warnLevel === 'PASS'),
    ];
    setRPATableData(data);
  }, [RPAData, RPARound]);

  const getWarningData = (SSOUserName, claimId, ouCode) => {
    if (!SSOUserName || !claimId || !ouCode) {
      return message.error('缺少必要参数');
    }

    setLoading(true);

    axios({
      url: `/ReimbursePlatform/consumerAccountAction/getWarnMessage.action?SSOUserName=${SSOUserName}&claimBase.claimId=${claimId}&claimBase.ouCode=${ouCode}`,
      method: 'post',
    })
      .then(res => {
        setWarningData(res.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeRow = (index, key, value) => {
    const copyData = [...sensitiveData];
    const findIndex = selectedRow.findIndex(item => JSON.stringify(item) === JSON.stringify(copyData[index]));
    if (findIndex > -1) {
      const copySelectData = [...selectedRow];
      copySelectData[findIndex][key] = value;
    }
    copyData[index][key] = value;
    setSensitiveData(copyData);
  };

  const warningMessageColumns = [
    {
      title: '编号',
      dataIndex: 'messageId',
      align: 'center',
      width: '25%',
    },
    {
      title: '类型',
      dataIndex: 'warnPoint',
      align: 'center',
      width: '25%',
    },
    {
      title: '内容',
      dataIndex: 'warnMessage',
      align: 'left',
    },
  ];

  const invoiceConsecutiveColumns = [
    {
      title: '序号',
      dataIndex: 'indexId',
      align: 'center',
      width: '5%',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: '发票号码',
      dataIndex: 'bizInfo',
      align: 'center',
      width: '35%',
      render: value => {
        return <div style={{ wordBreak: 'break-all', width: '100%' }}>{value}</div>;
      },
    },
    {
      title: '重复报账单号',
      dataIndex: 'warnMessage',
      align: 'left',
      render: value => {
        return <div style={{ wordBreak: 'break-all', width: '100%' }}>{value}</div>;
      },
    },
  ];

  const invoiceSensitiveColumns = [
    {
      title: '序号',
      dataIndex: 'messageId',
      align: 'center',
      width: '5%',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: '发票号码',
      dataIndex: 'bizInfo',
      align: 'center',
      width: '15%',
      ...ellipsisColumn,
    },
    {
      title: '检验事项',
      dataIndex: 'warnPoint',
      align: 'center',
      width: '10%',
      ...ellipsisColumn,
    },
    {
      title: '检验等级',
      dataIndex: 'warnLevel',
      align: 'center',
      width: '10%',
      render: value => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={value === 'L1' ? 'red-dot' : 'yellow-dot'}></div>
          </div>
        );
      },
    },
    {
      title: '检验消息',
      dataIndex: 'warnMessage',
      align: 'left',
      render: value => {
        return <div style={{ wordBreak: 'break-all', width: '100%' }}>{value}</div>;
      },
    },
    {
      title: '审核确认',
      dataIndex: 'confirmFlag',
      align: 'center',
      width: '10%',
      render: (value, record, index) => {
        return record.warnLevel !== 'L1' && isStepAccount ? (
          <div>
            <Checkbox
              checked={value === 1}
              onChange={e => {
                const newValue = e.target.checked ? 1 : 0;
                handleChangeRow(index, 'confirmFlag', newValue);
              }}
            />{' '}
            <span>已确认</span>
          </div>
        ) : record.warnLevel !== 'L1' && value === 1 ? (
          '已确认'
        ) : (
          ''
        );
      },
    },
    {
      title: '白名单',
      dataIndex: 'confirmInfo',
      align: 'left',
      width: '10%',
      render: (value, record, index) => {
        return record.warnLevel !== 'L1' && isStepAccount ? (
          <Input
            defaultValue={value}
            maxLength={40}
            onChange={e => {
              const inputValue = e.target.value;
              handleChangeRow(index, 'confirmInfo', inputValue);
            }}
          />
        ) : (
          value
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'comments',
      align: 'left',
      width: '10%',
      render: (value, record, index) => {
        return record.warnLevel !== 'L1' && isStepAccount ? (
          <Input
            defaultValue={value}
            maxLength={40}
            onChange={e => {
              const inputValue = e.target.value;
              handleChangeRow(index, 'comments', inputValue);
            }}
          />
        ) : (
          value
        );
      },
    },
  ];

  const RPAColumns = [
    {
      title: '序号',
      dataIndex: 'messageId',
      align: 'center',
      width: '5%',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: '审核点名称',
      dataIndex: 'warnPoint',
      align: 'center',
      width: '20%',
      render: (value, record) => {
        return <span className={record.warnLevel === 'HOLD' ? 'rpa-hold' : 'rpa-pass'}>{value}</span>;
      },
    },
    {
      title: '审核结果',
      dataIndex: 'warnLevel',
      align: 'center',
      width: '15%',
    },
    {
      title: '备注',
      dataIndex: 'warnMessage',
      align: 'left',
    },
  ];

  const handleRPARoundChange = value => {
    setRPARound(value);
  };

  const renderRPATitle = (RPAData, RPATableData) => {
    const keys = Object.keys(RPAData);

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>RPA审核信息：请选择版本：</div>
        <Select
          style={{ minWidth: '120px' }}
          value={RPARound}
          onSelect={handleRPARoundChange}
          options={keys.map(item => ({
            label: item,
            value: item,
          }))}
        />
        <div style={{ marginLeft: '16px' }}>
          <span className="rpa-hold">HOLD：{RPATableData.filter(item => item.warnLevel === 'HOLD').length}条</span>
          <span className="rpa-pass" style={{ marginLeft: '16px' }}>
            PASS：{RPATableData.filter(item => item.warnLevel === 'PASS').length}条
          </span>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    const data = sensitiveData.filter(item => item.warnLevel !== 'L1');
    const formData = new FormData();
    data.forEach((item, index) => {
      const keys = Object.keys(item);
      keys.forEach(key => {
        const value = item[key];
        if (value !== undefined) {
          formData.append(`warnMessageList[${index}].${key}`, value);
        }
      });
    });
    axios({
      url: `/ReimbursePlatform/consumerAccountAction/confirmWarnMessage.action`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(res => {
        message.success('保存成功');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckedAll = () => {
    setCheckedAll(!checkedAll);
    setSensitiveData(
      sensitiveData.map(item => {
        if (item.warnLevel !== 'L1') {
          item.confirmFlag = !checkedAll ? 1 : 0;
        }
        return item;
      }),
    );
    return;
  };

  const sensitiveTitle = data => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>发票敏感词检验信息</div>
      {isStepAccount && data.length > 0 && (
        <div>
          <Button onClick={handleCheckedAll}>全选</Button>
          <Button onClick={handleSave} type="primary" style={{ marginLeft: '10px' }}>
            保存
          </Button>
        </div>
      )}
    </div>
  );

  const handleExport = () => {
    exportExcel(
      invoiceConsecutiveColumns.map(item => ({
        header: item.title,
        key: item.dataIndex,
        width: item.title === '序号' ? 15 : 50,
      })),
      [
        {
          bizInfo: '发票号码',
          indexId: '序号',
          warnMessage: '重复报账单号',
        },
        ...consecutiveData,
      ].map((item, index) => {
        if (index !== 0) {
          return {
            ...item,
            indexId: index,
          };
        }
        return item;
      }),
      `${search.get('claimNo') || ''}_发票连号校验信息_${dayjs(new Date()).format('YYYYMMDDHHmmss')}.xlsx`,
    );
  };


  const exportExcel = (columns = [], dataSource = [], fileName) => {
    // 创建工作簿
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'fssc';
    workbook.created = new Date();
  
    const sheet = workbook.addWorksheet('发票连号检验信息', {
      properties: { tabColor: { argb: 'FF00FF00' } },
      views: [{ xSplit: 1, ySplit: 1 }],
    });
  
    const sheetColumns = columns.map(item => {
      return {
        header: item.header,
        key: item.key,
        width: item.width,
        font: {
          name: 'Comic Sans MS',
          family: 4,
          size: 18,
          bold: true,
        },
      };
    });
  
    sheet.columns = sheetColumns;
  
    sheet.getColumn(1).alignment = { horizontal: 'center', wrapText: true, vertical: 'middle' };
    sheet.getColumn(2).alignment = { vertical: 'middle', wrapText: true };
    sheet.getColumn(3).alignment = { vertical: 'middle', wrapText: true };
  
    sheet.mergeCells('A1:C1');
  
    const firstCell = sheet.getCell('C1');
    firstCell.value = '发票连号检验信息';
    firstCell.font = {
      size: 20,
      bold: true,
    };
  
    sheet.addRows(dataSource);
  
    sheet.getRow(2).getCell(1).style = {
      fill: {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFEE68E' },
      },
      alignment: {
        horizontal: 'center',
      },
      font: {
        size: 16,
        bold: true,
      },
    };
    sheet.getRow(2).getCell(2).style = {
      fill: {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFEE68E' },
      },
      alignment: {
        horizontal: 'center',
      },
      font: {
        size: 16,
        bold: true,
      },
    };
    sheet.getRow(2).getCell(3).style = {
      fill: {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: 'FFFEE68E' },
      },
      alignment: {
        horizontal: 'center',
      },
      font: {
        size: 16,
        bold: true,
      },
    };
  
    sheet.eachRow(function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.border = {
          top: border,
          right: border,
          bottom: border,
          left: border,
        };
      });
    });
  
    workbook.xlsx.writeBuffer().then(data => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      downloadByBlob(blob, fileName);
    });
  };

  const exportBtn = (
    <Button type="primary" onClick={handleExport}>
      导出
    </Button>
  );

  return (
    <div className="warning-message-container">
      <TitleBox title="报账单警示信息">
        <Table
          rowKey="messageId"
          dataSource={normalData}
          columns={warningMessageColumns}
          pagination={false}
          disabledResize={true}
        />
      </TitleBox>
      <TitleBox title="发票连号检验信息">
        <Table
          rowKey="messageId"
          tools={consecutiveData.length ? exportBtn : null}
          dataSource={consecutiveData}
          columns={invoiceConsecutiveColumns}
          pagination={false}
          locale={{
            emptyText: <div style={{ padding: '24px 0' }}>无核验异常消息</div>,
          }}
          disabledResize={true}
        />
      </TitleBox>
      <TitleBox title={sensitiveTitle(sensitiveData)}>
        <Table
          disabledResize={true}
          rowKey="messageId"
          dataSource={sensitiveData}
          columns={invoiceSensitiveColumns}
          pagination={false}
          locale={{
            emptyText: <div style={{ padding: '24px 0' }}>无核验异常消息</div>,
          }}
        />
      </TitleBox>
      <TitleBox title={renderRPATitle(RPAData, RPATableData)}>
        <Table
          rowKey="messageId"
          dataSource={RPATableData}
          columns={RPAColumns}
          pagination={false}
          disabledResize={true}
        />
      </TitleBox>
    </div>
  );
}
