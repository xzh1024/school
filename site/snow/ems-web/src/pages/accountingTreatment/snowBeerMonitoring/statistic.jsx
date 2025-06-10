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
  const { snowBeerMonitoring } = useStores();
  const { statisticNumber, activeKey, loading, initPage } = snowBeerMonitoring;
  const { token } = theme.useToken();

  useEffect(() => {
    initPage();
  }, []);

  const activeStyle = {
    color: token.colorPrimaryTextHover,
    fontWeight: 500,
  };

  const handleActive = key => {
    if (loading || key === activeKey) return;
    runInAction(() => {
      snowBeerMonitoring.activeKey = key;
      snowBeerMonitoring.searchParams = {};
      snowBeerMonitoring.pageIndex = 1;
      snowBeerMonitoring.getTableData();
      snowBeerMonitoring.getStatisticNumber();
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
      key: 'C1',
      title: '待导入ERP',
      icon: 'statistic1',
    },
    {
      key: 'C2',
      title: '待ERP生成发票',
      icon: 'statistic2',
    },
    {
      key: 'C3',
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
            onClick={() => handleActive(item.key)}
            style={{
              backgroundColor: hexToRgba(token.colorPrimaryBg, 0.5),
              boxSizing: 'border-box',
            }}
            statistic={{
              title: <div style={activeKey === item.key ? activeStyle : {}}>{item.title}</div>,
              valueStyle: activeKey === item.key ? activeStyle : {},
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
