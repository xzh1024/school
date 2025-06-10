import { StatisticCard } from '@ant-design/pro-components';
import SvgIcon from '@c/svgIcon';
import { hexToRgba } from '@u/tools';
import { theme } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import useStores from '../../../store';

const numberFormatter = value => <CountUp end={value} separator="," />;

const { Divider } = StatisticCard;

function Statistic() {
  const { token } = theme.useToken();
  const { newInvoiceMonitoring } = useStores();
  const { statisticNumber, activeKey, loading } = newInvoiceMonitoring;

  // 获取选中时的文字颜色
  const getActiveStyle = (key, activeKey) => {
    if (key === activeKey) {
      return {
        color: token.colorPrimaryTextHover,
        fontWeight: 500,
        transition: 'color .3s',
      };
    }

    return {
      transition: 'color .3s',
    };
  };

  useEffect(() => {
    newInvoiceMonitoring.init();
  }, []);

  const handleChangeActive = key => {
    if (activeKey === key || loading) return;
    runInAction(() => {
      newInvoiceMonitoring.activeKey = key;
      newInvoiceMonitoring.pageIndex = 1;
      newInvoiceMonitoring.searchParams = {};
      newInvoiceMonitoring.getTableData();
    });
  };

  const getSvgIcon = svgName => {
    return (
      <div className="statistic-svg">
        <SvgIcon name={svgName} />
      </div>
    );
  };

  const statisticData = [
    {
      key: 'erpFailed',
      title: '待导入ERP',
      icon: 'statistic1',
    },
    {
      key: 'fmsFailed',
      title: '待ERP生成发票',
      icon: 'statistic2',
    },
    {
      key: 'alreadyFailed',
      title: '已生成发票',
      icon: 'statistic3',
    },
  ];

  return (
    <StatisticCard.Group style={{ cursor: 'pointer', boxSizing: 'border-box', padding: '24px' }}>
      {statisticData.map((item, index) => {
        return (
          <StatisticCard
            key={index}
            onClick={() => handleChangeActive(item.key)}
            style={{
              backgroundColor: hexToRgba(token.colorPrimaryBg, 0.5),
              boxSizing: 'border-box',
            }}
            statistic={{
              title: <div style={getActiveStyle(item.key, activeKey)}>{item.title}</div>,
              valueStyle: getActiveStyle(item.key, activeKey),
              value: statisticNumber[item.key],
              formatter: numberFormatter,
            }}
            chart={getSvgIcon(item.icon)}
          />
        );
      })}
    </StatisticCard.Group>
  );
}

export default observer(Statistic);
