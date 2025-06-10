import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getPersonalStandard } from '@api/dashboard';
import Icon from '@c/svgIcon';
import { Dropdown, Popover, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

//  城市标准
const Detail = (item, oldList) => {
  const flag = item.title.includes('1');
  const flag2 = item.title.includes('2');
  const flag3 = item.title.includes('3');
  let r = null;
  let r2 = null;
  let r3 = null;
  r = oldList.filter(item => item.areaCode === '1');
  r2 = oldList.filter(item => item.areaCode === '2');
  r3 = oldList.filter(item => item.areaCode === '3');

  let obj = r[0] || {};
  let obj2 = r2[0] || {};
  let obj3 = r3[0] || {};
  let o = {
    hotel: obj.hotelStandard || 0,
    plane: obj.airName || '经济舱',
    train: obj.trainName || '硬卧/软座/硬座',
    highTrain: obj.highSpeedName || '-',
    shipName: obj.shipName || '-',
  };
  let o2 = {
    hotel: obj2.hotelStandard || 0,
    plane: obj2.airName || '经济舱',
    train: obj2.trainName || '硬卧/软座/硬座',
    highTrain: obj.highSpeedName || '-',
    shipName: obj.shipName || '-',
  };
  let o3 = {
    hotel: obj3.hotelStandard || 0,
    plane: obj3.airName || '经济舱',
    train: obj3.trainName || '硬卧/软座/硬座',
    highTrain: obj.highSpeedName || '-',
    shipName: obj.shipName || '-',
  };

  return (
    <div>
      <div className={'title'}>
        <div className={'left'}>城市等级</div>
        <div className={'city'}>具体城市</div>
        <div className={'hotel'}>酒店</div>
        <div className={'plane'}>飞机</div>
        <div className={'train'}>火车</div>
        <div className={'train'}>高铁/动车</div>
        <div className={'train'}>轮船</div>
      </div>
      <div className={'cityType'} style={{ background: flag ? '#E9EBF3' : '' }}>
        <div className={'left'}>一类城市</div>
        <ul className={'main'}>
          <li>
            <span className={'dot'}>• </span>北京、上海、广州、深圳
          </li>
          <li>
            <span className={'dot'}>• </span>
            天津、重庆、武汉、哈尔滨、沈阳、成都、南京、西安、长春、 济南、杭州、大连、青岛、厦门、宁波
          </li>
        </ul>
        <div className={'hotel'}>{o.hotel}元</div>
        <div className={'hotel'}>{o.plane}</div>
        <div className={'train'}>{o.train}</div>
        <div className={'train'}>{o.highTrain}</div>
        <div className={'train'}>{o.shipName}</div>
      </div>
      <div className={'cityType'} style={{ background: flag2 ? '#E9EBF3' : '' }}>
        <div className={'left'}>二类城市</div>
        <ul className={'main'}>
          <li>
            <span className={'dot'}>• </span>
            石家庄、郑州、太原、兰州、银川、西宁、呼和浩特、乌鲁木齐、 拉萨、合肥、长沙、南昌、福州、
            昆明、贵阳、南宁、海口
          </li>
          <li>
            <span className={'dot'}>• </span>
            常州、苏州、无锡、温州、汕头、珠海、泉州、东芫、佛山、三亚、惠州、雄安新区（雄县、容城县、安新县）
          </li>
          <li>
            <span className={'dot'}>• </span>一类城市下辖市、县
          </li>
        </ul>
        <div className={'hotel'}>{o2.hotel}元</div>
        <div className={'hotel'}>{o2.plane}</div>
        <div className={'train'}>{o2.train}</div>
        <div className={'train'}>{o2.highTrain}</div>
        <div className={'train'}>{o2.shipName}</div>
      </div>
      <div className={`${'cityType'} ${'last'}`} style={{ background: flag3 ? '#E9EBF3' : '' }}>
        <div className={'left'}>三类城市</div>
        <ul className={`lastMain`}>
          <li>
            <span className={'dot'}>• </span>二类城市下辖市、县{' '}
          </li>
          <li>
            <span className={'dot'}>• </span>其他城市、县城及乡镇
          </li>
        </ul>
        <div className={'hotel'}>{o3.hotel}元</div>
        <div className={'hotel'}>{o3.plane}</div>
        <div className={'train'}>{o3.train}</div>
        <div className={'train'}>{o3.highTrain}</div>
        <div className={'train'}>{o3.shipName}</div>
      </div>
    </div>
  );
};

const StandardItem = ({ title, unit, value, dorpMenus, showHelp, travelStandardInfoList = [] }) => {
  const [open, setOpen] = React.useState(false);
  const [defaultValue, setDefaultValue] = useState({ title, value });

  return (
    <div>
      <div className="flex items-end">
        <div className="text-xl font-bold leading-8 text-[#1A1C27] mr-1 font-[DIN Alternate]">{defaultValue.value}</div>
        <div className="text-xs leading-7 text-[#1A1C27] font-[250] font-[Alibaba PuHuiTi 2.0]">{unit}</div>
      </div>
      <div className="flex items-center">
        {dorpMenus && dorpMenus.length > 0 ? (
          <Dropdown
            trigger={['click']}
            menu={{
              items: dorpMenus,
              onClick: node => {
                const item = dorpMenus.find(i => String(i.key) === String(node.key));
                setDefaultValue({
                  title: item.label,
                  value: item.value,
                });
              },
            }}
            onOpenChange={isOpen => setOpen(isOpen)}
          >
            <div className="flex items-center cursor-pointer">
              <div
                className={`text-sm leading-[22px] font-normal font-[PingFang SC] ${
                  open ? 'text-[#2C68FF]' : 'text-[#5a6074]'
                } `}
              >
                {defaultValue.title}
              </div>
              {!open ? <DownOutlined /> : <UpOutlined />}
            </div>
          </Dropdown>
        ) : (
          <div className="text-sm leading-[22px] font-normal font-[PingFang SC] text-[#5a6074]">
            {defaultValue.title}
          </div>
        )}
        {showHelp && (
          <Popover
            overlayClassName="dashboard-popver"
            content={() =>
              Detail(
                {
                  title: defaultValue.title,
                },
                travelStandardInfoList,
              )
            }
          >
            <div className="ml-1 cursor-pointer">
              <Icon name="help" className="w-4"></Icon>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};

const areaCode = ['1', '2', '3'];

export default function Index() {
  const [standard, setStandard] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    const res = await getPersonalStandard().finally(() => {
      setLoading(false);
    });
    setStandard(res.data);
  };

  const getItem = standardInfo => {
    const { communicationFeeAmount = [], jurisdictionFeeAmount = [], travelStandardInfoList = [] } = standardInfo;
    console.log(21838, standardInfo, communicationFeeAmount, jurisdictionFeeAmount, travelStandardInfoList);

    const data = (travelStandardInfoList || []).filter(item => areaCode.includes(String(item.areaCode)));

    if (data.length === 0) {
      return [];
    }

    return items.map(item => {
      if (item.title === '通讯费') {
        item.value = communicationFeeAmount;
        item.unit;
        item.travelStandardInfoList = travelStandardInfoList;
        return item;
      }

      if (item.key) {
        return {
          ...item,
          value: data[0][item.key],
          title: `${item.desc} (${data[0].areaCode}类城市)`,
          showHelp: true,
          travelStandardInfoList,
          dorpMenus: data.map((standard, index) => {
            return {
              key: index,
              label: `${item.desc} (${standard.areaCode}类城市)`,
              value: standard[item.key],
            };
          }),
        };
      }
    });
  };

  const items = [
    {
      title: '通讯费',
      value: '100',
      unit: '元',
    },
    {
      key: 'foodStandard',
      unit: '元',
      desc: '差旅补贴',
    },
    {
      key: 'hotelStandard',
      unit: '元',
      desc: '酒店',
    },
    {
      desc: '飞机',
      unit: '标准',
      key: 'airName',
    },
    {
      desc: '火车',
      unit: '元',
      key: 'trainName',
    },
  ];

  return standard.communicationFeeAmount === null &&
    standard.jurisdictionFeeAmount === null &&
    standard.travelStandardInfoList === null ? null : (
    <div className="dashboard-container">
      <div className="text-lg font-semibold leading-[26px]">个人报销标准</div>
      <Skeleton
        loading={loading}
        active
        title={false}
        paragraph={{
          rows: 3,
        }}
      >
        <div
          className="grid mt-5 "
          style={{
            gridTemplateColumns: '1fr 2fr 2fr 2fr 2fr',
          }}
        >
          {getItem(standard).map((item, index) => {
            return <StandardItem key={index} {...item}></StandardItem>;
          })}
        </div>
      </Skeleton>
    </div>
  );
}
