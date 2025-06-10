import { confirm, getData, update } from '@api/travelConfirm';
import { Button, Modal, Switch, Table, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

export default function Index({ date }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showNote, setShowNote] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      width: 80,
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'subsidyDate',
      title: '补贴日期',
      width: 140,
      align: 'center',
      render: value => {
        return dayjs(value).format('YYYY-MM-DD');
      },
    },
    {
      dataIndex: 'subsidyCity',
      title: '补贴城市',
      align: 'center',
      width: 120,
    },
    {
      dataIndex: 'subsidyStandard',
      title: '补贴标准',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'distributeSub',
      title: '状态',
      width: 140,
      align: 'center',
      render: value => {
        return value ? '不发放补贴' : '发放补贴';
      },
    },
    {
      dataIndex: 'claimNo',
      title: '报账单号',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'travelApplyNo',
      title: '商旅订单号',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'dataSources',
      title: '补贴类型',
      ...ellipsisColumn,
      render: value => {
        return value === 3 ? '辖区内补贴' : '出差补贴';
      },
    },
    {
      dataIndex: 'actions',
      title: '操作',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (value, record) => {
        return (
          <Switch
            checkedChildren="报销"
            unCheckedChildren="不报销"
            value={!record.distributeSub}
            disabled={disabled}
            onChange={() => handleUpdate(record)}
          />
          // <Button
          //   size="small"
          //   type="link"
          //   danger={!record.distributeSub}
          //   disabled={disabled}
          //   onClick={() => handleUpdate(record)}
          // >
          //   {record.distributeSub ? '报销' : '不报销'}
          // </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const confirm = searchParams.get('confirm');
    setDisabled(confirm === 'true');
  }, []);

  const getList = () => {
    setLoading(true);
    getData({
      batchNo: (searchParams.get('title') || '').split('批次个人差补发放确认')[0],
    })
      .then(res => {
        const data = res.data.data;
        for (let i = 0; i < res.data.data.length; i++) {
          const item = res.data.data[i];
          if (parseInt(item.status) !== 4) {
            setDisabled(true);
            break;
          }
        }
        setDataSource(data);
        // 如果没有数据，自动确认
        if (data && data.length === 0) {
          confirm({
            batchNo: (searchParams.get('title') || '').split('批次个人差补发放确认')[0],
          }).then(res => {
            message.success(`确认成功`);
            setDisabled(true);
          });
        }
      })
      .catch(e => {
        setDisabled(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = record => {
    const data = {
      id: record.calendarId,
      distributeSub: Number(!record.distributeSub),
    };

    update(data).then(res => {
      getList();
    });
  };

  const init = () => {
    setShowNote(false);
    getList();
  };

  const getNumberStr = data => {
    const jurisdiction = data.filter(item => item.dataSources === 3);
    const jurisdictionIsRight = jurisdiction.filter(item => !item.distributeSub);
    const travel = data.filter(item => item.dataSources !== 3);
    const travelIsRight = travel.filter(item => !item.distributeSub);
    let jurisdictionStr =
      jurisdiction.length > 0
        ? `报销辖区内补贴${jurisdictionIsRight.length}天，不报销辖区内补贴${
            jurisdiction.length - jurisdictionIsRight.length
          }天`
        : '';
    let travelStr =
      travel.length > 0
        ? `报销出差补贴${travelIsRight.length}天，不报销出差补贴${travel.length - travelIsRight.length}天`
        : '';
    return `本次${travelStr};${jurisdictionStr}`;
  };

  const footer = (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={init}>
        我已知晓
      </Button>
    </div>
  );

  const handleConfirm = () => {
    window.$modal.confirm({
      title: '温馨提示：',
      content: (
        <div>
          <div>{getNumberStr(dataSource)}</div>
          <div className="pt-2">是否确认?</div>
        </div>
      ),
      onOk: () => {
        confirm({
          batchNo: (searchParams.get('title') || '').split('批次个人差补发放确认')[0],
        }).then(res => {
          message.success(`确认成功`);
          setDisabled(true);
        });
      },
    });
  };

  return (
    <>
      <div className="web-content-container" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <div className="web-content-container-actions">
          <span className="web-content-container-actions-note">
            {dataSource.length > 0 && `本批次补贴天数累计${dataSource.length}天，请逐一确认`}
          </span>
          <Button type="primary" onClick={handleConfirm} disabled={disabled}>
            确认
          </Button>
        </div>
        <Table
          loading={loading}
          columns={columns}
          pagination={false}
          rowKey="calendarId"
          scroll={{
            y: 700,
          }}
          dataSource={dataSource}
        />
      </div>
      <Modal
        title={null}
        open={showNote}
        keyboard={false}
        maskClosable={false}
        closeIcon={false}
        footer={footer}
        width={550}
      >
        <div className="note-container">
          <div className="note-container-group">
            <div className="note-container-group-title">下列情况不得报销差旅补助，请在确认环节，选择“不报销”：</div>
            <div className="note-container-group-item">
              1、会议、培训等差旅期间全封闭或由主办方统一安排了市内用车和用餐的行程；
            </div>
            <div className="note-container-group-item">2、按《异地工作人员管理办法》规定报销21天住宿费用的情况；</div>
            <div className="note-container-group-item">3、不享受差补员工：享受经理人差旅待遇员工、实习生；</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
