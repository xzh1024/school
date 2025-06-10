import { SearchOutlined } from '@ant-design/icons';
import { getInitInfo } from '@api/ai';
import { getCategoryMenu, openApplyClaim, searchCategory } from '@api/categoryMenu';
import SvgIcon from '@c/svgIcon';
import { useWindowSize } from '@u/hooks';
import { Divider, Select, Spin, Tooltip, theme } from 'antd';
import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import useStores from '../../store';
import Screen from './screen';

const ICON_MAPS = {
  2666: 'left-menu-1',
  1000932: 'left-menu-2',
  2669: 'left-menu-3',
  981531: 'left-menu-4',
  987930: 'left-menu-5',
  989734: 'left-menu-6',
  2721: 'left-menu-7',
  2784: 'left-menu-8',
  2849: 'left-menu-9',
  2860: 'left-menu-10',
  2867: 'left-menu-11',
  2889: 'left-menu-12',
  2990: 'left-menu-13',
  980331: 'left-menu-14',
};

const ICON_ACTIVE_MAPS = {
  2666: 'left-menu-1-active',
  1000932: 'left-menu-2-active',
  2669: 'left-menu-3-active',
  981531: 'left-menu-4-active',
  987930: 'left-menu-5-active',
  989734: 'left-menu-6-active',
  2721: 'left-menu-7-active',
  2784: 'left-menu-8-active',
  2849: 'left-menu-9-active',
  2860: 'left-menu-10-active',
  2867: 'left-menu-11-active',
  2889: 'left-menu-12-active',
  2990: 'left-menu-13-active',
  980331: 'left-menu-14-active',
};

export default function Index() {
  const ref = React.createRef(null);
  const { width } = useWindowSize();
  const { token } = theme.useToken();
  const { configStore } = useStores();
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [subclass, setSubclass] = React.useState([]);
  const [active, setActive] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [openAi, setOpenAi] = React.useState(false);
  const [optionLoading, setOptionLoading] = React.useState(false);
  const [mouseId, setMouseId] = React.useState('');

  useEffect(() => {}, [width]);

  useEffect(() => {
    getInitInfo().then(res => {
      const isAiEnabled = res.data.isAiEnabled;
      setOpenAi(isAiEnabled === 'Y');
    });
    configStore.needContentPadding = false;
    getCategory();
    console.log(token.colorPrimaryTextHover, 291);
    return () => {
      configStore.needContentPadding = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    getSubclass(active);
  }, [active]);

  const getCategory = () => {
    setLoading(true);
    getCategoryMenu()
      .then(res => {
        const { data } = res;
        setCategory(data);
        setActive(data[0].expCategoryId);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSubclass = id => {
    setLoading(true);
    getCategoryMenu({
      level: 2,
      expCategoryId: id,
    })
      .then(res => {
        const { data } = res;
        const copyArrays = [];
        const dataSource = (data || [])
          .filter(item => {
            return item.isAllowedReimburse === 'Y' || item.childrenList.length > 0;
          })
          .map((item, index) => {
            let childrenList = item.childrenList || [];
            if (item.isAllowedReimburse === 'Y' && childrenList.length === 0) {
              childrenList.push(item);
            }
            childrenList = childrenList.filter(child => child.isAllowedReimburse === 'Y');
            item.childNum = childrenList.length;
            if (childrenList.length > 22) {
              const copyItem = { ...item };
              item.childrenList = childrenList.slice(0, Math.ceil(childrenList.length / 2));
              item.hasCopy = true;
              copyItem.childrenList = childrenList.slice(Math.ceil(childrenList.length / 2));
              copyItem.remoteIndex = index;
              copyArrays.push(copyItem);
            }
            return item;
          });
        copyArrays.forEach((item, index) => {
          dataSource.splice(item.remoteIndex + index + 1, 0, item);
        });
        console.log(dataSource, 2381);
        const storeArr = [
          ...dataSource.filter(item => item.hasCopy || item.remoteIndex > 0),
          ...dataSource.filter(item => !(item.hasCopy || item.remoteIndex > 0)),
        ];
        setSubclass(storeArr);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openApply = id => {
    setLoading(true);
    openApplyClaim(id)
      .then(res => {
        console.log(res, 1823);
        window.open(res.data, '_blank');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = keyword => {
    if (keyword.length < 2) return;
    setOptionLoading(true);
    searchCategory(keyword)
      .then(res => {
        console.log(res, 1382);
        setOptions(res.data);
      })
      .finally(() => {
        setOptionLoading(false);
      });
  };

  const handleSelect = (value, option) => {
    console.log(value, option, 22271);
    openApply(value);
  };

  return (
    <div className="w-full h-full category-container bg-white overflow-hidden">
      <Spin spinning={loading} style={{ height: '100%' }}>
        <div className="w-full h-full flex overflow-hidden bg-[#F2F4F5]">
          {/* 左侧 */}
          <div className="left min-w-[245px] border-r-border-color border-solid overflow-y-scroll no-scrollbar category-menu-left">
            <div className="category-menu-left-list">
              <div className="pt-5 px-6 text-base font-semibold leading-[22px]">
                全部报账申请
                <Divider />
              </div>
              {category.map(item => {
                return (
                  <div
                    key={item.expCategoryId}
                    className={`flex px-6 items-center mb-1 py-3 cursor-pointer hover:text-main-blue-5 font-semibold ${
                      active === item.expCategoryId ? 'bg-main-blue-1 text-main-blue-6' : ''
                    }`}
                    onClick={() => {
                      setActive(item.expCategoryId);
                    }}
                    onMouseEnter={() => setMouseId(item.expCategoryId)}
                    onMouseLeave={() => setMouseId('')}
                  >
                    <SvgIcon
                      name={
                        (active === item.expCategoryId || mouseId === item.expCategoryId)
                          ? ICON_ACTIVE_MAPS[item.expCategoryId] || 'left-menu-1-active'
                          : ICON_MAPS[item.expCategoryId] || 'left-menu-1'
                      }
                      className="text-base mr-2 "
                    ></SvgIcon>
                    <Tooltip className="text-sm" title={item.expCategoryDesc || item.expCategoryName}>
                      {item.expCategoryName}
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 右侧 */}
          <div className="right px-4 py-5 flex-1 h-full overflow-y-scroll no-scrollbar  relative">
            {subclass.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center flex-col">
                <SvgIcon name="empty_snow"></SvgIcon>
                <span className="pt-2">暂无可报销大类，请重试</span>
              </div>
            ) : (
              <>
                <div className="flex absolute top-5 left-menu-3 z-10 h-8">
                  <Select
                    showSearch
                    className="min-w-[245px]"
                    disabled={loading}
                    loading={optionLoading}
                    suffixIcon={<SearchOutlined />}
                    options={options}
                    dropdownRender={node => {
                      return <Spin spinning={optionLoading}>{node}</Spin>;
                    }}
                    placeholder="请输入名称搜索业务大类"
                    filterOption={false}
                    fieldNames={{
                      label: 'expCategoryName',
                      value: 'expCategoryCode',
                    }}
                    onSearch={debounce(handleSearch, 800)}
                    onSelect={handleSelect}
                  ></Select>
                </div>
                <div className="w-full" ref={ref}>
                  <Screen subclass={subclass} screenWidth={width} onApply={openApply}></Screen>
                </div>
              </>
            )}
          </div>
        </div>
      </Spin>
    </div>
  );
}
