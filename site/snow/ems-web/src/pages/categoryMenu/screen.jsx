import SvgIcon from '@c/svgIcon';
import { Tooltip } from 'antd';
import React, { useEffect } from 'react';

const iconMap = {
  'menu-1': [6532],
  'menu-2': [2668],
  'menu-3': [2945],
  'menu-4': [14530],
  'menu-5': [5130, 2783],
  'menu-6': [10130],
  'menu-7': [860129],
  'menu-8': [979530],
  'menu-9': [999731, 988132],
  'menu-10': [995331, 2677, 985930, 5330, 2722, 985732],
  'menu-11': [2670],
  'menu-12': [2694, 981533],
  'menu-13': [2702, 981534, 2738, 2800, 2839, 998374],
  'menu-14': [2954],
  'menu-15': [988131],
  'menu-16': [988130],
  'menu-17': [989931],
  'menu-18': [2982, 2848, 988531, 18938, 3055, 7330],
  'menu-19': [2728],
  'menu-20': [2757],
  'menu-21': [2776],
  'menu-22': [2781],
  'menu-23': [993330],
  'menu-24': [2785, 2850, 980530],
  'menu-25': [2795, 2857],
  'menu-26': [2812],
  'menu-27': [2818],
  'menu-28': [2845],
  'menu-29': [13730],
  'menu-30': [2857],
  'menu-31': [2861],
  'menu-32': [2865, 2868],
  'menu-33': [3208],
  'menu-34': [2872, 19134],
  'menu-35': [19130],
  'menu-36': [2890],
  'menu-37': [2893],
  'menu-38': [5930, 18932],
  'menu-39': [2991],
  'menu-40': [5730],
  'menu-41': [18940],
  'menu-42': [19132],
};

export default function Index(props) {
  const { subclass = [], screenWidth, onApply } = props;
  const [colNum, setColNum] = React.useState(5);
  const [menuList, setMenuList] = React.useState([[], [], [], [], []]);

  const getIconName = id => {
    const keys = Object.keys(iconMap);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (iconMap[key].includes(id)) {
        return key;
      }
    }
    return 'menu-15';
  };

  useEffect(() => {
    let col = 5;
    console.log(screenWidth, 1237);
    if (screenWidth > 0 && screenWidth < 1300) {
      col = 4;
    }
    if (col !== colNum) {
      setColNum(col);
    }
  }, [screenWidth]);

  useEffect(() => {
    const menuListCopy = [];
    for (let i = 0; i < colNum; i++) {
      menuListCopy[i] = [];
    }
    console.log(subclass, 381829, menuListCopy);

    const needExchange = [];

    subclass.forEach((item, index) => {
      let menuIndex = ((index + 1) % colNum) - 1;

      if (index > colNum - 1) {
        menuIndex = getMinListIndex(menuListCopy);
        console.log(menuIndex, 38218);
        menuListCopy[menuIndex].push(item);
        return;
      }
      if (menuIndex === -1) {
        menuIndex = colNum - 1;
      }

      menuListCopy[menuIndex].push(item);
    });
    console.log(menuListCopy, 333);
    setMenuList(menuListCopy);
  }, [subclass, colNum]);
  const openApply = id => {
    onApply && onApply(id);
  };
  const getMinListIndex = menuList => {
    const numList = menuList.map(item => {
      let count = 0;
      item.forEach(sub => {
        count += (sub.childrenList || []).length;
      });
      return count;
    });
    console.log(numList);
    return numList.findIndex((value, index, arr) => value === Math.min(...arr));
  };

  return (
    <div
      className={`mt-14 grid text-xs ${colNum === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}
      style={{
        fontFamily: 'PingFang SC',
      }}
    >
      {menuList.map((menu, index) => {
        return (
          <div key={index}>
            {(menu || []).map((item, itemIndex) => {
              return (
                <div className={`bg-white rounded-t-[4px] mb-2 ${item.hasCopy ? '' : 'mr-2'}`} key={itemIndex}>
                  <div
                    className="p-3 flex items-center relative"
                    style={{
                      boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.06)`,
                    }}
                  >
                    {item.remoteIndex > 0 && <div className="absolute left-0 top-0 right-0 bottom-0 bg-white"></div>}
                    <SvgIcon name={getIconName(item.expCategoryId)} className="w-5 h-5"></SvgIcon>
                    <span className="ml-2 text-sm font-semibold leading-[22px] cursor-pointer">
                      <Tooltip title={item.expCategoryDesc || item.expCategoryName}>{item.expCategoryName}</Tooltip>
                    </span>
                  </div>
                  <div className="flex w-full">
                    <div className="flex-1">
                      {item.childrenList &&
                        item.childrenList.length > 0 &&
                        item.childrenList.map((sub, childIndex) => {
                          return (
                            <div
                              className="px-3 py-[10px] flex items-center justify-between"
                              key={childIndex}
                              style={{
                                boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.06)`,
                                borderLeft: item.remoteIndex > 0 ? `1px solid rgba(0, 0, 0, 0.06)` : '',
                              }}
                            >
                              <span
                                className="text-xs font-normal text-[#333333] leading-5"
                                onClick={() => openApply(sub.expCategoryCode)}
                              >
                                <Tooltip
                                  className="hover:text-main-blue-5 cursor-pointer"
                                  title={sub.expCategoryDesc || sub.expCategoryName}
                                >
                                  {sub.expCategoryName}
                                </Tooltip>
                              </span>
                              <SvgIcon name="arrow" className="w-4 h-4"></SvgIcon>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {/* {subclass.map((item, itemIndex) => {
        return (
          <div className="bg-white rounded-t-[4px]" key={itemIndex}>
            <div
              className="p-3 flex items-center"
              style={{
                boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.06)`,
              }}
            >
              <SvgIcon name="menu-icon" className="w-5 h-5"></SvgIcon>
              <span className="ml-2 text-sm font-semibold leading-[22px] cursor-pointer">
                <Tooltip title={item.expCategoryDesc || item.expCategoryName}>{item.expCategoryName}</Tooltip>
              </span>
            </div>
            <div className="flex w-full">
              <div className="flex-1">
                {item.childrenList &&
                  item.childrenList.length > 0 &&
                  item.childrenList.map((sub, childIndex) => {
                    return (
                      <div
                        className="px-3 py-[10px] flex items-center justify-between"
                        key={childIndex}
                        style={{
                          boxShadow: `0px 1px 0px 0px rgba(0, 0, 0, 0.06)`,
                        }}
                      >
                        <span className="text-xs font-normal text-[#333333] leading-5">
                          <Tooltip
                            className="hover:text-main-blue-5"
                            title={sub.expCategoryDesc || sub.expCategoryName}
                            onClick={() => openApply(sub.expCategoryCode)}
                          >
                            {sub.expCategoryName}
                          </Tooltip>
                        </span>
                        <SvgIcon name="arrow" className="w-4 h-4"></SvgIcon>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
