import { processHistory } from '@api/historyData';
import { Spin, Steps, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
const App = props => {
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState([]);
  const [processList, setProcessList] = useState([]);
  const { claimId = '51781995' } = props;

  const showTitle = optionNode => {
    const users = optionNode.umap || {};
    const allUser = Object.values(users)
      .map(user => {
        return user.name;
      })
      .join(',');
    return allUser ? (
      <Tooltip className="cursor-pointer" title={`审核人：${allUser}`}>
        {optionNode.name}
      </Tooltip>
    ) : (
      optionNode.name
    );
  };

  const getDescription = (name, approve) => {
    return (
      <div>
        <div className="text-sm">审批人：{name}</div>
        <div className="text-sm">{approve}</div>
      </div>
    );
  };

  const getProcess = claimId => {
    setLoading(true);
    processHistory(claimId)
      .then(res => {
        const wtstates = res.data.wtstates || [];
        (res.data.processOpinionModels || []).forEach(item => {
          const index = wtstates.findIndex(state => state.id === item.stateId);
          if (index > -1) {
            const option = wtstates[index];
            option.approveInfo = item;
          }
        });
        const options = (wtstates || []).map(item => {
          if (item.approveInfo) {
            return {
              title: item.approveInfo.stateName,
              description: getDescription(item.approveInfo.employeeName, item.approveInfo.appertain),
              status: 'finish',
            };
          }
          return {
            title: showTitle(item),
            // subTitle: item.employeeName,
            status: 'finish',
          };
        });
        setProcess(options);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProcess(claimId);
  }, []);

  useEffect(() => {
    let processList = [];
    let unitList = [];
    process.forEach((item, index) => {
      if ((index + 1) % 7 === 0 && index !== 0) {
        processList.push(unitList);
        unitList = [];
      }
      unitList.push(item);
    });
    if (unitList.length > 0) {
      processList.push(unitList);
    }
    console.log(processList, 13333333, process);
    setProcessList(processList);
  }, [process]);

  return (
    <Spin spinning={loading}>
      {processList.map((process, index) => {
        return <Steps key={index} size='small' className="py-4" items={process} />;
      })}
    </Spin>
  );
};
export default App;
