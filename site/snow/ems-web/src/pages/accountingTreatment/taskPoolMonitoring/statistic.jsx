import useStores from '@/store';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { getAccountControlCount } from '@api/accountingTreatment/taskPoolMonitoring';
import SvgIcon from '@c/svgIcon';
import { hexToRgba } from '@u/tools';
import { Col, Row, theme } from 'antd';
import { runInAction } from 'mobx';
import React, { useCallback, useEffect, useState } from 'react';

const defaultStatisticData = [
  {
    key: 'accounting',
    title: '会计任务池',
    icon: 'statistic1',
    dataList: [
      {
        key: 'accounting_notSpecified',
        title: '未指定小组任务',
        value: 11,
      },
      {
        key: 'accounting_undistributed',
        title: '小组未分配任务',
        value: 11,
      },
      {
        key: 'accounting_untreated',
        title: '小组未处理任务',
        value: 11,
      },
    ],
  },
  {
    key: 'grabOrders',
    title: '抢单任务池',
    icon: 'statistic2',
    dataList: [
      {
        key: 'grabOrders_wait',
        title: '待抢单据池',
        value: 11,
      },
      {
        key: 'grabOrders_alreadyRobbed',
        title: '已抢未处理',
        value: 11,
      },
    ],
  },
  {
    key: 'review',
    title: '复核任务池',
    icon: 'statistic3',
    dataList: [
      {
        key: 'review_notSpecified',
        title: '未指定小组任务',
        value: 11,
      },
      {
        key: 'review_undistributed',
        title: '小组未分配任务',
        value: 11,
      },
      {
        key: 'review_untreated',
        title: '小组未处理任务',
        value: 11,
      },
    ],
  },
];

export default function statistic() {
  const { token } = theme.useToken();
  const { taskPoolMonitoring } = useStores();
  const [statisticDataList, setStatisticDataList] = useState(defaultStatisticData);
  const [statisticLoading, setStatisticLoading] = useState(false);
  const { activeKey } = taskPoolMonitoring;

  // 获取选中时的文字颜色
  const getActiveStyle = (key, activeKey) => {
    if (key === activeKey) {
      return {
        color: token.colorPrimaryTextHover,
        // fontWeight: 500,
        transition: 'color .3s',
        zIndex: 10,
      };
    }

    return {
      transition: 'color .3s',
      zIndex: 10,
    };
  };

  const getSvgIcon = svgName => {
    return (
      <div className="statistic-svg" style={{ position: 'absolute', right: '25px', bottom: '25px', zIndex: 1 }}>
        <SvgIcon name={svgName} />
      </div>
    );
  };

  const getDataFunc = () => {
    setStatisticLoading(true);
    getAccountControlCount({ taskPoolType: 'all' })
      .then(res => {
        setStatisticLoading(false);
        const getData = res.data;
        let cuData = [...statisticDataList];
        cuData[0].dataList[0].value = getData.noGroupSteppool || 0;
        cuData[0].dataList[1].value = getData.toAssignedSteppool || 0;
        cuData[0].dataList[2].value = getData.noHandleSteppool || 0;

        cuData[1].dataList[0].value = getData.wrestPool1Count || 0;
        cuData[1].dataList[1].value = getData.wrestedToDoCount || 0;

        cuData[2].dataList[0].value = getData.noGroupSteppool2 || 0;
        cuData[2].dataList[1].value = getData.toAssignedSteppool2 || 0;
        cuData[2].dataList[2].value = getData.noHandleSteppool2 || 0;
        setStatisticDataList(cuData);
      })
      .catch(err => {
        console.log(err);
        setStatisticLoading(false);
      });
  };

  useEffect(() => {
    getDataFunc();
  }, []);

  const handleClickFunc = key => {
    runInAction(() => {
      taskPoolMonitoring.total = 0;
      taskPoolMonitoring.pageIndex = 1;
      taskPoolMonitoring.search = { dateRange: '15' };
      taskPoolMonitoring.selectKey = [];
      taskPoolMonitoring.activeKey = key;
    });
    let groupType = 'steppool';
    if (['accounting_notSpecified', 'accounting_undistributed', 'accounting_untreated'].includes(key)) {
      groupType = 'steppool';
    } else if (['review_notSpecified', 'review_undistributed', 'review_untreated'].includes(key)) {
      groupType = 'steppool2';
    }
    taskPoolMonitoring.getAllGroupFunc({ groupType });
  };

  const MyProCardCom = useCallback(
    ({ itemData }) => {
      return (
        <ProCard
          className="p-0"
          layout="center"
          style={{ backgroundColor: hexToRgba(token.colorPrimaryBg, 0.5) }}
          title={itemData.title}
          headStyle={{ padding: '16px 16px' }}
          bodyStyle={{ padding: '0 16px 16px 16px' }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              width: '100%',
              height: '70px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {itemData.dataList.map(item => {
              return (
                <>
                  <div
                    className="w-1/3"
                    style={getActiveStyle(item.key, activeKey)}
                    onClick={() => handleClickFunc(item.key)}
                  >
                    <div>{item.title}</div>
                    <div style={{ fontSize: '26px', marginTop: '10px', textAlign: 'center' }}>
                      {/* <CountUp end={item.value} separator="," /> */}
                      {item.value}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {getSvgIcon(itemData.icon)}
        </ProCard>
      );
    },
    [statisticDataList, activeKey],
  );

  return (
    <StatisticCard.Group
      loading={statisticLoading}
      style={{ cursor: 'pointer', boxSizing: 'border-box', padding: '24px' }}
    >
      <Row gutter={16}>
        {statisticDataList.map((item, index) => {
          return (
            <>
              <Col span={index === 1 ? 6 : 9}>
                <MyProCardCom itemData={item} />
              </Col>
            </>
          );
        })}
      </Row>
    </StatisticCard.Group>
  );
}
