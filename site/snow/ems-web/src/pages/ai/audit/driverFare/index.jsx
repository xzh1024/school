import React, { useEffect, useMemo, useState } from 'react';
import { getEcsbAppToken } from '@u/request';
import { getAItoken, getInitInfo, getFinanceAudit, getWarnMessage, aiRpaClaimRetrial, getClaimInfo } from '@api/ai';
import { toHump } from '@u/tools';
import { message, Drawer, Table, Spin } from 'antd';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import useStores from '@s';
import BaseCollapse from './components/baseCollapse';
import ResultCanvas from './resultCanvas';
import ResultTabs from './resultTabs';
import Ask from '../ask';
import { ReactComponent as IconPass } from 'public/svg/icon_pass.svg';
import { ReactComponent as IconHold } from 'public/svg/icon_hold.svg';
import { ReactComponent as IconEmpty } from 'public/svg/icon_empty.svg';
import { ReactComponent as IconReset } from 'public/svg/icon_reset.svg';
import { ReactComponent as AiLogo } from 'public/svg/ai_logo.svg';
import { ReactComponent as AskLogo } from 'public/svg/ask_logo.svg';
import aiLoadingGif from 'public/images/ai/ai_loading.gif';

const columns = [
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
    title: '审核点名称',
    dataIndex: 'warnPoint',
    key: 'warnPoint',
    ellipsis: true,
  },
  {
    title: '审核结果',
    dataIndex: 'warnLevel',
    key: 'warnLevel',
    render: value => {
      return value === 'PASS' ? (
        <span className="text-[14px] text-[#31CD30] leading-[22px] rounded py-0.5 px-2 bg-[#ECFFE8]">PASS</span>
      ) : (
        <span className="text-[14px] text-[#FF0C02] leading-[22px] rounded py-0.5 px-2 bg-[#FFECE8]">HOLD</span>
      );
    },
  },
  {
    title: '备注',
    key: 'warnMessage',
    dataIndex: 'warnMessage',
    ellipsis: true,
  },
];

function Index() {
  const { aiDriverFare: aiStore } = useStores();

  const [askOpen, setAskOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [resourceList, setResourceList] = useState([]); // 所有图片资源地址
  const [resourceLoading, setResourceLoading] = useState(true);
  const [resultList, setResultList] = useState([]); // 结果信息，可能多个月份
  const [summation, setSummation] = useState({}); // 统计信息

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [warningData, setWarningData] = useState([]);

  // 过滤数据且HOLD数据在前
  const warningList = useMemo(() => {
    const holdList = [];
    const passList = [];
    let updateUser = '';
    warningData.forEach(item => {
      const result = item.warnType === '90' && item.createUser === '"RPA"';
      if (result) {
        if (item.updateUser && item.updateUser >= updateUser) {
          updateUser = item.updateUser;
        }
        if (item.warnLevel === 'PASS') {
          passList.push(item);
        } else {
          holdList.push(item);
        }
      }
    });
    return [...holdList, ...passList].filter(item => item.updateUser === updateUser);
  }, [warningData]);

  // 统计信息
  const warningDataInfo = useMemo(() => {
    const data = {
      y: 0,
      n: 0,
    };
    warningList.forEach(item => {
      switch (item.warnLevel) {
        case 'PASS': {
          data.y += 1;
          break;
        }
        case 'HOLD': {
          data.n += 1;
          break;
        }
        default: {
          break;
        }
      }
    });
    return data;
  }, [warningList]);

  // 获取审核信息
  const getWarningData = () => {
    const { SSOUserName, claimId, ouCode } = aiStore.aiApprove;
    if (!SSOUserName || !claimId || !ouCode) {
      return message.error('缺少必要参数');
    }

    setLoading(true);

    getWarnMessage({
      SSOUserName,
      claimId,
      ouCode,
    })
      .then(res => {
        setLoading(false);
        setWarningData(res.data || []);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 重审
  const onRetrial = () => {
    setDisabled(true);
    aiRpaClaimRetrial({
      claimId: aiStore.aiApprove.claimId,
    })
      .then(() => {
        setInterval(() => {
          getWarningData(); // 重新拉取表格数据
        }, 1000 * 60);
      })
      .catch(() => {
        setDisabled(false);
      });
  };

  const askClose = () => {
    setAskOpen(false);
  };

  useEffect(() => {
    const tempList = [];
    resultList.forEach(resultItem => {
      let tempItem = {
        id: 0, // 编辑备注时所需参数
        date: resultItem.date, // 月份
        extractTitle: {
          name: '标题',
          activeIndex: 0,
          remark: '',
          calculateData: '',
          list: [],
        },
        extractDriverName: {
          name: '驾驶员姓名',
          activeIndex: 0,
          remark: '',
          calculateData: '',
          list: [],
        },
        extractTravelKm: {
          name: '行车里程数',
          activeIndex: 0,
          remark: '',
          calculateData: '',
          list: [],
        },
        extractTravelMoney: {
          name: '行车补贴总额',
          activeIndex: 0,
          remark: '',
          list: [],
        },
        calculateResult: {
          name: '计算结果',
          activeIndex: 0,
          remark: '',
          value: '',
          list: [],
        },
        extractSign: {
          name: '有无签注',
          activeIndex: 0,
          remark: '',
          calculateData: '',
          list: [],
        },
      };
      const data = resultItem.data || []; // 如果数组长度大于1说明是多个username，当前业务数组长度应该固定为1
      data.forEach(item => {
        tempItem.id = item.id;
        const markInfo = item.markInfo || {}; // 标记信息
        Object.keys(markInfo).forEach(key => {
          const k = toHump(key);
          tempItem[k] && (tempItem[k].remark = markInfo[key]);
        });
        const calculateData = item.calculateData || {}; // 计算数据
        const calculatePosition = item.calculatePosition || {}; // 计算位置信息
        // const keyFileMap = calculatePosition.keyFileMap || {}; // 关键信息在哪些文件中，这里使用文件的 cosKey
        const imageInfoMap = calculatePosition.imageInfoMap || {}; // 某个文件中的所有关键信息，以及关键信息的坐标信息
        tempItem['calculateResult'].value = calculateData.calculateResult; // 计算结果
        tempItem['extractSign'].value = calculateData.extractSign; // 有无签注
        Object.keys(imageInfoMap).forEach(cosKey => {
          const imageItem = imageInfoMap[cosKey];
          const keyInfos = imageItem.keyInfos || []; // 图片坐标信息
          keyInfos.forEach(keyInfo => {
            tempItem[keyInfo.code] &&
              tempItem[keyInfo.code].list.push({
                ...keyInfo,
                cosKey,
                key: calculateData[keyInfo.code] || keyInfo.key,
              });
          });
        });

        // 提取到数据但未获取到坐标信息
        Object.keys(tempItem).forEach(key => {
          if (!['id', 'date', 'calculateResult'].includes(key)) {
            const item = tempItem[key];
            if (item.list.length === 0 && calculateData[key]) {
              item.list.push({
                cosKey: '',
                code: key,
                height: 0,
                key: calculateData[key],
                width: 0,
                x: 0,
                y: 0,
              });
            }
          }
        });
      });
      tempList.push(tempItem);
    });
    setMonthList(tempList);
  }, [resultList]);

  const getAItokenData = async () => {
    const { data } = await getAItoken();
    sessionStorage.setItem('AI_TOKEN', data);
  };

  const getData = () => {
    const { claimNo, claimId } = aiStore.aiApprove;
    if (!claimNo || !claimId) {
      return message.error('缺少必要参数');
    }
    Promise.allSettled([
      // 获取文件信息
      getFinanceAudit({
        financeNum: claimNo,
      }),
      // 获取文件地址
      getClaimInfo({
        claimId,
      }),
    ])
      .then(resAll => {
        const [res1, res2] = resAll;
        const data1 = res1.value.data;
        const data2 = res2.value.data;
        if (res1.status === 'fulfilled' && data1) {
          const data = data1;
          setResultList(data.resultList || []);
          setSummation(data.summation && data.summation.length ? data.summation[0] : {});
        }
        if (res2.status === 'fulfilled' && data2) {
          const data = data2;
          const list = data.resources.map(item => {
            // 如果为pdf文件，则替换url，使用ai返回文件地址
            if (
              item.url.split('.').pop().toLocaleLowerCase() === 'pdf' &&
              data1.resources &&
              data1.resources[item.cosKey]
            ) {
              item.url = data1.resources[item.cosKey];
            }
            return item;
          });
          setResourceList(list);
        }

        setResourceLoading(false);
      })
      .catch(() => {
        setResourceLoading(false);
      });
  };

  const init = async () => {
    getWarningData();
    await getEcsbAppToken();
    await getAItokenData();
    const res = await getInitInfo();
    aiStore.initData = res.data || {};
    getData();
  };

  useEffect(() => {
    init();
    // <img src={aiLoadingGif} alt="" className="w-[48px] h-[48px]" />
  }, []);

  return (
    <div
      className="h-screen relative"
      style={{
        borderRadius: '8px 0px 0px 8px',
        background: warningDataInfo.n
          ? 'linear-gradient(180deg, #FFF2DB 0%, #F6F7FC 130px, #F6F7FC 100%)'
          : warningDataInfo.y
          ? 'linear-gradient(180deg, #D1F3FF 0%, #F6F7FC 130px, #F6F7FC 100%)'
          : 'linear-gradient(180deg, #D1E2FF 0%, #F6F7FC 130px, #F6F7FC 100%)',
        boxShadow: '-4px 4px 20px 0px rgba(96, 108, 138, 0.3)',
      }}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex-none p-5 flex mb-4 relative">
          <div className="flex-none w-[48px] h-[48px]">
            {warningDataInfo.n ? (
              <IconHold className="w-[48px] h-[48px]" />
            ) : warningDataInfo.y ? (
              <IconPass className="w-[48px] h-[48px]" />
            ) : (
              <IconEmpty className="w-[48px] h-[48px]" />
            )}
          </div>
          <div className="flex-1 ml-2">
            <div className="font-medium text-[16px] text-[#152C5B] flex items-center">
              雪宝智审结果
              <button
                className={
                  disabled
                    ? 'ml-4 flex items-center outline-none bg-white px-2 h-[22px] box-border rounded-md text-[#2A61FF] text-[12px] font-medium border-[1px] border-solid border-[#AAC4FF] select-none opacity-60 cursor-not-allowed'
                    : 'ml-4 flex items-center outline-none bg-white px-2 h-[22px] box-border rounded-md text-[#2A61FF] text-[12px] font-medium border-[1px] border-solid border-[#AAC4FF] select-none cursor-pointer hover:bg-[#F5F8FF]'
                }
                disabled={disabled}
                onClick={() => onRetrial()}
              >
                {disabled ? (
                  <Spin indicator={<LoadingOutlined spin className="text-[12px]" />} size="small" />
                ) : (
                  <IconReset />
                )}
                <span className="ml-1">{disabled ? '重审中...' : '重审'}</span>
              </button>
            </div>
            {loading ? (
              ''
            ) : warningDataInfo.n || warningDataInfo.y ? (
              <div className="mt-0.5 leading-6 text-[18px]">
                {warningDataInfo.y ? <span className="text-[#31CD30]">PASS {warningDataInfo.y}条</span> : ''}
                {warningDataInfo.n ? (
                  <span className={warningDataInfo.y ? 'text-[#FF0C02] ml-4' : 'text-[#FF0C02]'}>
                    HOLD {warningDataInfo.n}条
                  </span>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div className="mt-0.5 leading-6 text-[18px] text-[#2A61FF]">未返回结果</div>
            )}
          </div>
        </div>
        <AiLogo className="absolute right-[34px] top-[42px] z-[1] cursor-pointer" onClick={() => setAskOpen(true)} />
        <div className="flex-1 px-5 overflow-auto z-[2]">
          <BaseCollapse
            title="识别结果"
            content={
              <div className="flex">
                {resourceLoading ? (
                  <div className="w-[502px] h-[500px] flex items-center justify-center">
                    <img src={aiLoadingGif} alt="" className="w-[48px] h-[48px]" />
                  </div>
                ) : (
                  <ResultCanvas
                    resourceList={resourceList}
                    resultList={resultList}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                )}

                <div className="flex-1 max-h-[500px] ml-2 overflow-hidden">
                  <ResultTabs
                    summation={summation}
                    monthList={monthList}
                    setMonthList={setMonthList}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                </div>
              </div>
            }
          />
          <div className="my-4">
            <BaseCollapse
              title={warningList.length ? `审核信息（${warningList[0].updateUser}）` : '审核信息'}
              content={
                <Table
                  rowKey="messageId"
                  size="small"
                  loading={loading}
                  columns={columns}
                  dataSource={warningList}
                  pagination={false}
                  scroll={{
                    y: '400px',
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
      <Drawer
        open={askOpen}
        title="雪宝问答"
        placement="right"
        width="650px"
        rootClassName="ai-drawer"
        closeIcon={true}
        maskClosable={false}
        mask={false}
        onClose={askClose}
        style={{
          borderRadius: '8px',
          background: '#EFF4FF',
          maxHeight: '550px',
          position: 'relative',
          top: '50%',
          transform: 'translate(-14px, -50%)',
          boxShadow: '-4px 4px 16px 0px rgba(0, 0, 0, 0.2)',
        }}
        styles={{
          header: {
            display: 'none',
          },
          body: {
            padding: '20px 24px 24px',
          },
        }}
      >
        <div className="w-full h-full flex flex-col relative">
          <CloseOutlined
            className="absolute right-[-8px] top-[-2px] z-20 text-[16px] text-[#152C5B] cursor-pointer"
            onClick={askClose}
          />
          <div className="flex-none flex items-center mb-2">
            <AskLogo className="mr-2 mt-1" />
            <div className="text-[#2A61FF] text-[18px] leading-[26px] font-medium">雪宝问答</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Ask />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default observer(Index);
