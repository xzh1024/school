import { Col, Divider, Drawer, Row, Slider, Switch, Typography, theme } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../store';

import { CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const COLOR_LIST = [
  { key: 'daybreak', color: '#1890ff' },
  { key: 'blue', color: '#1677ff' },
  { key: 'dust', color: '#F5222D' },
  { key: 'volcano', color: '#FA541C' },
  { key: 'sunset', color: '#FAAD14' },
  { key: 'cyan', color: '#13C2C2' },
  { key: 'green', color: '#52C41A' },
  { key: 'geekblue', color: '#2F54EB' },
  { key: 'purple', color: '#722ED1' },
];

const Setting = () => {
  const { configStore } = useStores();
  const { token } = theme.useToken();
  const {
    isSettingDrawerOpen,
    primaryColor,
    isDarkTheme,
    layoutType,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    menuType,
    headerFixed,
  } = configStore;

  const renderSelected = ({ isFixed, fill }) => {
    return (
      <div className="checked-container">
        <CheckOutlined fill={fill} style={{ color: fill }} />
      </div>
    );
  };

  const LayoutReviewBox = ({ isSelected, type, onClick }) => {
    const renderMap = {
      dark: () => (
        <div className="layout-review-box-all layout-review-box-all-dark">
          <div className="side"></div>
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      light: () => (
        <div className="layout-review-box-all">
          <div className="side"></div>
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      side: () => (
        <div className="layout-review-box-all layout-review-box-all-side">
          <div className="side"></div>
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      top: () => (
        <div className="layout-review-box-all layout-review-box-all-top">
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      mix: () => (
        <div className="layout-review-box-all layout-review-box-all-mix">
          <div className="head"></div>
          <div className="right">
            <div className="side"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      sub: () => (
        <div className="layout-review-box-all layout-review-box-all-sub">
          <div className="side"></div>
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
      group: () => (
        <div className="layout-review-box-all layout-review-box-all-group">
          <div className="side"></div>
          <div className="right">
            <div className="head"></div>
            <div className="content"></div>
          </div>
        </div>
      ),
    };

    return (
      <div className="layout-review-box" onClick={() => onClick(type)}>
        {renderMap[type || 'dark']()}
        {isSelected && renderSelected({ fill: token.colorPrimary })}
      </div>
    );
  };

  const RenderColorSelect = ({ isSelected, color, onClick }) => {
    return (
      <div className="color-box" style={{ backgroundColor: color || '#1890ff' }} onClick={() => onClick(color)}>
        {isSelected && renderSelected({ fill: '#fff' })}
      </div>
    );
  };

  const handleClose = () => {
    runInAction(() => {
      configStore.isSettingDrawerOpen = false;
    });
  };

  const handleLayoutChange = type => {
    runInAction(() => {
      if (['light', 'dark'].includes(type)) {
        configStore.isDarkTheme = type === 'dark';
        return;
      }
      if (['sub', 'group'].includes(type)) {
        configStore.menuType = type;
        return;
      }
      configStore.layoutType = type;
    });
  };

  const handleColorChange = color => {
    runInAction(() => {
      configStore.primaryColor = color;
    });
  };

  const handleBRchange = (value, type = 'M') => {
    runInAction(() => {
      if (type === 'S') {
        configStore.borderRadiusSM = value;
      }

      if (type === 'L') {
        configStore.borderRadiusLG = value;
      }

      configStore.borderRadius = value;
    });
  };

  const handleHeaderFixed = isChecked => {
    runInAction(() => {
      configStore.headerFixed = isChecked;
    });
  };

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={handleClose}
      open={isSettingDrawerOpen}
      closeIcon={false}
      width={300}
    >
      <div className="setting-container">
        <Title level={5}>主题</Title>
        <div className="layout-select-box">
          <LayoutReviewBox type="light" isSelected={!isDarkTheme} onClick={handleLayoutChange} />
          <LayoutReviewBox type="dark" isSelected={isDarkTheme} onClick={handleLayoutChange} />
        </div>
      </div>

      <div className="setting-container-no-margin">
        <Title level={5}>主题色</Title>
        <div className="layout-select-box">
          {COLOR_LIST.map(item => (
            <RenderColorSelect
              {...item}
              key={item.key}
              isSelected={primaryColor === item.color}
              onClick={handleColorChange}
            />
          ))}
        </div>
      </div>
      <Divider />

      <div className="setting-container">
        <Title level={5}>导航模式</Title>
        <div className="layout-select-box">
          <LayoutReviewBox type="side" isSelected={layoutType === 'side'} onClick={handleLayoutChange} />
          <LayoutReviewBox type="top" isSelected={layoutType === 'top'} onClick={handleLayoutChange} />
          <LayoutReviewBox type="mix" isSelected={layoutType === 'mix'} onClick={handleLayoutChange} />
        </div>
      </div>
      <Divider />

      {['side', 'mix'].includes(layoutType) ? (
        <>
          <div className="setting-container">
            <Title level={5}>侧边菜单类型</Title>
            <div className="layout-select-box">
              <LayoutReviewBox type="sub" isSelected={menuType === 'sub'} onClick={handleLayoutChange} />
              <LayoutReviewBox type="group" isSelected={menuType === 'group'} onClick={handleLayoutChange} />
            </div>
          </div>
        </>
      ) : null}

      <div className="line-config">
        <div className="line-config-label">
          <Text>固定Header</Text>
        </div>
        <div className="line-config-content">
          <Switch
            checked={headerFixed}
            onChange={handleHeaderFixed}
            disabled={!['top', 'mix'].includes(layoutType)}
          ></Switch>
        </div>
      </div>
      <Divider />

      <div className="setting-container">
        <Title level={5}>圆角设置</Title>
        <Row align="middle">
          <Col span={8}>
            <Text>普通圆角：</Text>
          </Col>
          <Col span={16}>
            <Slider
              min={0}
              max={10}
              width={200}
              step={1}
              defaultValue={borderRadius}
              onChange={value => handleBRchange(value, 'M')}
            />
          </Col>
        </Row>

        <Row align="middle">
          <Col span={8}>
            <Text>小号圆角：</Text>
          </Col>
          <Col span={16}>
            <Slider
              min={0}
              max={10}
              width={200}
              step={1}
              defaultValue={borderRadiusSM}
              onChange={value => handleBRchange(value, 'S')}
            />
          </Col>
        </Row>

        <Row align="middle">
          <Col span={8}>
            <Text>大号圆角：</Text>
          </Col>
          <Col span={16}>
            <Slider
              min={0}
              max={10}
              width={200}
              step={1}
              defaultValue={borderRadiusLG}
              onChange={value => handleBRchange(value, 'L')}
            />
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default observer(Setting);
