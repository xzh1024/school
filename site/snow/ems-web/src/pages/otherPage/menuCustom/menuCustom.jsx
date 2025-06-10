import { DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { delCustomMenu, editCustomMenu, getCustomMenu } from '@api/dashboard';
import Loading from '@c/loading';
import Icon from '@c/svgIcon';
import { Button, Popconfirm, Tooltip, Tour } from 'antd';
import Dragula from 'dragula';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import useStores from '../../../store';

import { useLayoutEffect } from 'react';
import Modal from './MenuEdit';
let notify = false;
let actionsList = [];

const DEFAULT_ACTIONS = [
  {
    title: '我的报账单',
    icon: 'dashboard-action-1',
    menuId: 1181031,
  },
  {
    title: '我的已处理',
    icon: 'dashboard-action-2',
    menuId: 1181602,
  },
  {
    title: '接收报送',
    icon: 'dashboard-action-3',
    menuId: 1185002,
  },
  {
    title: '差补日历',
    icon: 'dashboard-action-4',
    menuId: 1185003,
  },
  {
    title: '我的待处理',
    icon: 'dashboard-action-5',
    menuId: 1181404,
  },
  {
    title: '发起报账申请',
    icon: 'dashboard-action-6',
    menuId: 1185004,
  },
  {
    title: '委托授权',
    icon: 'dashboard-action-7',
    menuId: 1185005,
  },
  {
    title: '质量代办',
    icon: 'dashboard-action-8',
    menuId: 1183806,
  },
];

function Index() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const { layout } = useStores();
  const [tourOpen, setTourOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [actions, setActions] = useState([]);
  const [iconSelectIndex, setIconSelectIndex] = useState(-1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    layout.hideMenu = true;
    getList();
    return () => {
      layout.hideMenu = false;
    };
  }, []);

  const getList = () => {
    setLoading(true);
    getCustomMenu()
      .then(res => {
        setActions(res.data.map(item => ({ ...item, icon: item.icon2 || '', title: item.menuTitle })));
        actionsList = res.data.map(item => ({ ...item, icon: item.icon2 || '', title: item.menuTitle }));
        setTourOpen(!localStorage.getItem('menuCustomTour'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelectIcon = icon => {
    const data = [...actions];
    data[iconSelectIndex].icon = icon;
    setActions(data);
    actionsList = data;
    setIconSelectIndex(-1);

    handleSave();
  };

  const handleSave = params => {
    setLoading(true);
    const data = (params ? params : actions)
      .filter(item => item.menuId)
      .map((item, index) => {
        return {
          menuId: item.menuId,
          orderNum: index + 1,
          icon: item.icon,
        };
      });
    editCustomMenu(data)
      .then(() => {
        const config = {
          message: '操作成功',
          showProgress: true,
          pauseOnHover: true,
          duration: 2,
          onClose: () => {
            notify = false;
          },
        };
        notify = true;
        window.$notify.info(config);
        getList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSave = selectMenuId => {
    const index = actions.findIndex(item => item.menuId === edit.menuId);
    const data = JSON.parse(JSON.stringify(actions));
    data[index].menuId = selectMenuId;

    handleSave(data);
    setEdit(null);
  };

  const handlePlus = () => {
    const data = [...actions];
    data.push({ icon: 'dashboard-action-1', title: '请选择菜单' });
    setActions(data);
    actionsList = data;
    setEdit(data[data.length - 1]);
  };

  const handleDel = item => {
    setLoading(true);
    delCustomMenu(item.id)
      .then(() => {
        const config = {
          message: '操作成功',
          showProgress: true,
          pauseOnHover: true,
          duration: 2,
          onClose: () => {
            notify = false;
          },
        };
        window.$notify.info(config);
        getList();
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const handlePre = (item, index) => {
    const preItem = actions[index - 1];
    const data = [...actions];
    data[index - 1] = item;
    data[index] = preItem;
    setActions(data);
    actionsList = data;
    handleSave(data);
  };

  const handleNext = (item, index) => {
    const preItem = actions[index + 1];
    const data = [...actions];
    data[index + 1] = item;
    data[index] = preItem;
    setActions(data);
    actionsList = data;
    handleSave(data);
  };

  // 导航步骤
  const steps = [
    {
      title: '快捷菜单图标',
      description: '点击图标后可以更换快捷菜单图标',
      target: () => ref1.current,
    },
    {
      title: '快捷菜单',
      description: '点击修改图标后可以打开弹窗进行快捷菜单修改',
      target: () => ref2.current,
    },
    {
      title: '删除快捷菜单',
      description: '点击修改图标后可以删除当前快捷菜单',
      target: () => ref3.current,
    },
    {
      title: '新增快捷菜单',
      description: '点击添加后可添加快捷菜单，最多可添加12个快捷菜单',
      target: () => ref4.current,
    },
    {
      title: '拖动当前菜单',
      description: '鼠标拖动当前菜单、或点击相关按钮，可以更改菜单排序',
      target: () => ref5.current,
    },
  ];

  useLayoutEffect(() => {
    Dragula([document.getElementById('container-drag')]).on('drop', (el, target, source, sibling) => {
      console.log(source, 2818);
      const ids = Array.from(source.children).map(item => item.id);
      const res = ids.map(id => {
        const item = actionsList.find(item => String(item.id) === String(id));
        return item;
      });

      // const moveIndex = el.getAttribute('data-index');
      // const targetIndex = sibling.getAttribute('data-index');

      // const list = [...actionsList];
      // const moveItem = list[moveIndex];
      // const targetItem = list[targetIndex];

      // list[moveIndex] = targetItem;
      // list[targetIndex] = moveItem;

      // if (targetIndex <= ) {

      // }

      console.log(res, 2817);
      handleSave(res);
    });
  }, []);

  return (
    <Loading spinning={loading}>
      <div className="text-xl font-bold mt-4">
        <span>自定义菜单</span>
        <Button
          type="primary"
          ref={ref4}
          onClick={handlePlus}
          size="small"
          className="ml-2"
          disabled={actions.length >= 12}
        >
          添加
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5 mb-6 mt-4" id="container-drag">
        {actions.map((item, index) => {
          return (
            <div
              id={item.id}
              key={item.id}
              data-index={index}
              draggable
              className="bg-white rounded-lg flex items-center pl-5 pr-4 py-3 justify-between"
              style={{
                boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.14),inset 0px 0px 3px 2px #FFFFFF',
              }}
              ref={index === 1 ? ref5 : null}
            >
              <div className="flex items-center" ref={index === 1 ? ref1 : null}>
                <Popconfirm
                  open={iconSelectIndex === index}
                  showCancel={false}
                  title="图标选择"
                  onOpenChange={open => setIconSelectIndex(-1)}
                  description={
                    <div className="grid grid-cols-4 gap-5 mt-2">
                      {DEFAULT_ACTIONS.map((item, index) => {
                        return (
                          <div key={index} onClick={() => handleSelectIcon(item.icon)}>
                            <Icon name={item.icon} className="w-10 cursor-pointer"></Icon>
                          </div>
                        );
                      })}
                    </div>
                  }
                  trigger={['click']}
                  icon={null}
                  okButtonProps={{
                    style: {
                      display: 'none',
                    },
                  }}
                >
                  <div onClick={() => setIconSelectIndex(index)}>
                    <Icon name={item.icon} className="w-10 cursor-pointer"></Icon>
                  </div>
                </Popconfirm>

                <div className="ml-2 text-sm leading-[22px] font-semibold">{item.title}</div>
              </div>
              <div>
                <Tooltip title="向前移动">
                  <Button type="link" className="p-0" onClick={() => handlePre(item, index)} disabled={index === 0}>
                    <LeftOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="向后移动">
                  <Button
                    type="link"
                    className="p-0 ml-2"
                    onClick={() => handleNext(item, index)}
                    disabled={index === actions.length - 1}
                  >
                    <RightOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="编辑">
                  <Button
                    type="link"
                    className="p-0 ml-2"
                    onClick={() => setEdit(item)}
                    ref={index === 1 ? ref2 : null}
                  >
                    <EditOutlined />
                  </Button>
                </Tooltip>
                <Popconfirm
                  okText="确认删除"
                  title="确认删除?"
                  description="该操作删除后不可逆，确认删除？"
                  onConfirm={() => handleDel(item)}
                >
                  <Tooltip title="删除">
                    <Button type="link" danger className="p-0 ml-2" ref={index === 1 ? ref3 : null}>
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
      {edit && <Modal onCancel={() => {
        const data = [...actions];
        data.pop();
        actionsList = data;
        setActions(data);
        setEdit(null);
      }} onSave={onSave} currentMenuId={edit.menuId}></Modal>}
      <Tour
        open={tourOpen}
        onClose={() => {
          setTourOpen(false);
          localStorage.setItem('menuCustomTour', 1);
        }}
        steps={steps}
      />
    </Loading>
  );
}

export default observer(Index);
