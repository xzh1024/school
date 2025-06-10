import React, { useState, useMemo } from 'react';
import { message, Modal, Input, Tooltip, Tabs, Segmented } from 'antd';
import { observer } from 'mobx-react';
import { ReactComponent as IconEdit } from '../../../../../public/svg/icon_edit.svg';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { markResult } from '@api/ai';
import useStores from '@s';
import { toLine } from '@u/tools';

function Index(props) {
  const { summation, monthList, setMonthList, selectedRows, setSelectedRows } = props;
  const { aiDriverFare: aiStore } = useStores();

  const [tabsActiveKey, setTabsActiveKey] = useState('全部');

  const getTabDom = item => {
    return Object.keys(item).map(key => {
      /*
        {
          name: '标题',
          activeIndex: 0,
          remark: '',
          calculateData: '',
          list: [],
        }
      */
      const itemData = item[key];
      const itemDataList = itemData && itemData.list;
      return !['date', 'id'].includes(key) && itemData ? (
        <div
          key={key}
          className="p-2.5 mb-2.5 rounded text-[#1A1C27]"
          style={{
            cursor: key === 'calculateResult' ? 'auto' : 'pointer',
            backgroundColor:
              selectedRows.length &&
              itemDataList.length &&
              selectedRows[0].key === itemDataList[itemData.activeIndex].key &&
              selectedRows[0].cosKey === itemDataList[itemData.activeIndex].cosKey
                ? '#EFF4FF'
                : '',
          }}
          onClick={() => {
            key !== 'calculateResult' && itemDataList.length && changeSelectedRows(itemDataList[itemData.activeIndex]);
          }}
        >
          <div className="flex leading-[22px]">
            <div className="flex-1 flex">
              <div className="w-[100px] flex-none text-[#44567C]">{itemData.name}</div>
              <div className="flex-1 text-right">
                {key === 'calculateResult' ? (
                  itemData.value || itemData.value === 0 ? (
                    <div>
                      {itemData.value}
                      <Tooltip placement="left" title={`计算值=行车里程*每公里标准=${itemData.value}`}>
                        <QuestionCircleOutlined className="ml-1.5" />
                      </Tooltip>
                    </div>
                  ) : (
                    <span className="text-[#FF0C02]">未识别</span>
                  )
                ) : (
                  ''
                )}
                {key !== 'calculateResult' ? (
                  itemDataList.length && itemDataList[itemData.activeIndex].key ? (
                    key === 'extractSign' ? (
                      itemData.value === '1' ? (
                        <span className="text-[#31CD30]">有</span>
                      ) : (
                        <span className="text-[#FF0C02]">无</span>
                      )
                    ) : (
                      itemDataList[itemData.activeIndex].key
                    )
                  ) : (
                    <span className="text-[#FF0C02]">未识别</span>
                  )
                ) : (
                  ''
                )}
              </div>
            </div>
            <Tooltip placement="left" title={itemData.remark || '点击输入反馈'}>
              <IconEdit
                className={
                  itemData.remark
                    ? 'flex-none ml-3.5 mt-[2px] w-[18px] h-[18px] rounded cursor-pointer fill-[#2A61FF] bg-[#E9EFFF] hover:bg-[#D4D4D4] hover:fill-[#515151]'
                    : 'flex-none ml-3.5 mt-[2px] w-[18px] h-[18px] rounded cursor-pointer fill-[#515151] bg-[#EBEBEB] hover:bg-[#D4D4D4] hover:fill-[#515151]'
                }
                onClick={e => {
                  handleEdit(item, key);
                  e.stopPropagation();
                }}
              />
            </Tooltip>
          </div>
          {selectedRows.length &&
          itemDataList.length > 1 &&
          selectedRows[0].key === itemDataList[itemData.activeIndex].key &&
          selectedRows[0].cosKey === itemDataList[itemData.activeIndex].cosKey ? (
            <div className="mt-2.5 pt-2.5 pb-0.5 flex items-center border-t border-solid border-[#E9EBF3] text-[12px]">
              <div className="flex-1 text-[#44567C]">识别到多条</div>
              <div className="flex select-none">
                <div
                  className="w-[60px] h-[24px] border border-solid border-[#AAC4FF] flex justify-center items-center text-[#2A61FF] cursor-pointer rounded-s"
                  onClick={e => {
                    e.stopPropagation();
                    onLast(item.date, key);
                  }}
                >
                  上一条
                </div>
                <div
                  className="w-[60px] h-[24px] border-y border-r border-solid border-[#AAC4FF] flex justify-center items-center text-[#2A61FF] cursor-pointer rounded-r"
                  onClick={e => {
                    e.stopPropagation();
                    onNext(item.date, key);
                  }}
                >
                  下一条
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      );
    });
  };

  const tabsItems = useMemo(() => {
    return [
      {
        key: '全部',
        label: '全部',
        children: (
          <div>
            <div className="flex p-[7px] leading-[22px] text-[#152C5B]">
              <div className="w-[100px] text-[#44567C]">姓名：</div>
              <div className="flex-1 text-right">
                {summation.username ? (
                  <span className="text-[#1A1C27]">{summation.username}</span>
                ) : (
                  <span className="text-[#FF0C02]">未识别</span>
                )}
              </div>
            </div>
            <div className="flex p-[7px] leading-[22px] text-[#152C5B] mt-2.5">
              <div className="w-[100px] text-[#44567C]">总里程数：</div>
              <div className="flex-1 text-right">
                {summation.extractKm || summation.extractKm === 0 ? (
                  <span className="text-[#1A1C27]">{summation.extractKm} 公里</span>
                ) : (
                  <span className="text-[#FF0C02]">未识别</span>
                )}
              </div>
            </div>
            <div className="flex p-[7px] leading-[22px] text-[#152C5B] mt-2.5">
              <div className="w-[100px] text-[#44567C]">总金额：</div>
              <div className="flex-1 text-right">
                {summation.calculationResult || summation.calculationResult === 0 ? (
                  <span className="text-[#1A1C27]">{summation.calculationResult} 元</span>
                ) : (
                  <span className="text-[#FF0C02]">未识别</span>
                )}
              </div>
            </div>
            <div className="flex p-[7px] leading-[22px] text-[#152C5B] mt-2.5">
              <div className="w-[100px] text-[#44567C]">AI计算结果：</div>
              <div className="flex-1 text-right text-[#1A1C27]">
                {summation.calculationFlag === '1' ? (
                  <div>一致</div>
                ) : summation.calculationFlag === '0' ? (
                  <div className="text-[#FF0C02]">不一致</div>
                ) : (
                  <div className="text-[#FF0C02]">未识别</div>
                )}
              </div>
            </div>
          </div>
        ),
      },
      ...monthList.map(item => ({
        key: item.date,
        label: item.date,
        children: getTabDom(item),
      })),
    ];
  }, [monthList, selectedRows]);

  const changeSelectedRows = select => {
    setSelectedRows([select]);
  };

  // 上一个
  const onLast = (date, key) => {
    const monthData = monthList.find(item => item.date === date);
    const data = monthData[key];
    if (!data) return;
    if (data.activeIndex === 0) {
      data.activeIndex = data.list.length - 1;
    } else {
      data.activeIndex -= 1;
    }
    setMonthList([...monthList]);
    setSelectedRows([data.list[data.activeIndex]]);
  };

  // 下一个
  const onNext = (date, key) => {
    const monthData = monthList.find(item => item.date === date);
    const data = monthData[key];
    if (!data) return;
    if (data.activeIndex + 1 === data.list.length) {
      data.activeIndex = 0;
    } else {
      data.activeIndex += 1;
    }
    setMonthList([...monthList]);
    setSelectedRows([data.list[data.activeIndex]]);
  };

  // 编辑反馈
  const handleEdit = (item, key) => {
    const opeUid = aiStore.initData.userName;
    const data = item[key] || {};
    let remark = data.remark || '';
    Modal.confirm({
      title: '反馈',
      icon: null,
      content: (
        <Input
          defaultValue={remark}
          placeholder="请输入"
          allowClear={true}
          maxLength={200}
          onInput={e => (remark = e.target.value)}
          onChange={row => {
            if (row.type === 'click') {
              // 触发清除
              remark = '';
            }
          }}
        />
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        markResult({
          id: item.id,
          filed: toLine(key),
          content: remark,
          opeUid,
        }).then(() => {
          message.success('反馈成功');
          // 更新反馈状态
          data.remark = remark;
          setMonthList([...monthList]);
        });
      },
    });
  };

  return (
    <Tabs
      className="tabs-flex"
      activeKey={tabsActiveKey}
      items={tabsItems}
      tabBarGutter={16}
      indicator={{
        align: 'center',
      }}
      tabBarStyle={{
        marginBottom: '0',
      }}
      renderTabBar={() => (
        <Segmented
          value={tabsActiveKey}
          style={{
            marginBottom: 8,
          }}
          onChange={setTabsActiveKey}
          options={tabsItems.map(item => item.key)}
        />
      )}
    />
  );
}

export default observer(Index);
