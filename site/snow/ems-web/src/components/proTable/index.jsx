import { OrderedListOutlined, ReloadOutlined, SettingOutlined, SplitCellsOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Checkbox, Divider, Dropdown, Popover, Switch, Table, Tooltip, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import ResizeTable from '../resizeTable';
import ColumnsConfig from './columnsDraggable';

const CACHE_KEY = 'proTableColumns';
const CACHE_SHOW_KEY = 'proTableShowColumns';

const { Text } = Typography;

// 表格大小选项
const dropdownItems = [
  {
    key: 'large',
    label: '默认',
  },
  {
    key: 'middle',
    label: '中等',
  },
  {
    key: 'small',
    label: '紧凑',
  },
];

let count = 0;

let cache = false;

export default function Index(props) {
  const { token } = theme.useToken();
  const {
    tools,
    toolsLeft,
    onReload,
    rowSelection,
    dataSource,
    columns: tableColumns,
    hideTools,
    disabledResize,
    columnsHidden,
    cardProps,
    pagination,
    ...otherOption
  } = props;
  const [size, setSize] = useState('small');
  const [selectNum, setSelectNum] = useState(0);
  const [resizeAble, setResizeAble] = useState(true);
  const [columns, setColumns] = useState([]);
  const [fixedLeftColumns, setFixedLeftColumns] = useState([]);
  const [fixedRightColumns, setFixedRightColumns] = useState([]);
  const [unFixedColumns, setUnFixedColumns] = useState([]);
  const [showColumns, setShowColumns] = useState([]);

  const getCacheData = () => {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const key = location.pathname;
    const columns = cache[key] || [];
    return columns;
  };

  const getShowCacheData = () => {
    const cache = JSON.parse(localStorage.getItem(CACHE_SHOW_KEY) || '{}');
    const key = location.pathname;
    const data = cache[key] || [];
    return data;
  };

  const setCacheData = (data, isShow) => {
    const cache = JSON.parse(localStorage.getItem(isShow ? CACHE_SHOW_KEY : CACHE_KEY) || '{}');
    const key = location.pathname;
    cache[key] = data;
    localStorage.setItem(isShow ? CACHE_SHOW_KEY : CACHE_KEY, JSON.stringify(cache));
  };

  useEffect(() => {
    const columns = getCacheData();
    if (
      columns.length === tableColumns.length &&
      columns.every(item => tableColumns.some(i => i.dataIndex === item.dataIndex))
    ) {
      const tempColumns = columns.map(item => {
        const column = tableColumns.find(i => i.dataIndex === item.dataIndex);
        if (column) {
          column.fixed = item.fixed;
        }
        return column;
      });
      console.log(tempColumns, 31);
      initColumns(tempColumns);
      return;
    }

    initColumns(tableColumns);
  }, [tableColumns, columnsHidden]);

  const initColumns = tableColumns => {
    const fixedLeft = [];
    const fixedRight = [];
    const unFixed = [];

    if (columnsHidden && columnsHidden.length > 0) {
      tableColumns = tableColumns.filter(item => !columnsHidden.includes(item.dataIndex));
    }

    tableColumns.forEach((item, index) => {
      item.columnKey = index.toString();
      if (!item.fixed) {
        return unFixed.push(item);
      }
      if (item.fixed === 'left') {
        return fixedLeft.push(item);
      }
      return fixedRight.push(item);
    });

    setFixedLeftColumns(fixedLeft);
    setFixedRightColumns(fixedRight);
    setUnFixedColumns(unFixed);
    const cacheData = getShowCacheData();
    let showData = tableColumns.map(item => item.columnKey);
    if (cacheData.length > 0) {
      showData = showData.filter(item => cacheData.includes(item));
    }
    setShowColumns(showData);
  };

  useEffect(() => {

    setColumns([...fixedLeftColumns, ...unFixedColumns, ...fixedRightColumns]);

    if (cache) {
      setCacheData(
        [...fixedLeftColumns, ...unFixedColumns, ...fixedRightColumns].map(item => ({
          dataIndex: item.dataIndex,
          fixed: item.fixed,
        })),
      );
      cache = false;
    }

  }, [fixedLeftColumns, fixedRightColumns, unFixedColumns]);

  const handleSelected = ({ key }) => {
    setSize(key);
  };

  // 获取表格选择数据时的数据
  const handleSelectChange = (selectedRowKeys, selectedRows, info) => {
    setSelectNum(selectedRowKeys.length);
    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows, info);
    }
  };

  // 初始化所选数据长度
  useEffect(() => {
    if (rowSelection?.selectedRowKeys || rowSelection?.defaultSelectedRowKeys) {
      const keys = rowSelection.selectedRowKeys || rowSelection.defaultSelectedRowKeys;

      setSelectNum(keys.length);
      return;
    }
    setSelectNum(0);
  }, [dataSource, rowSelection]);

  // 渲染表格是否可以拖拽
  const renderSettingContent = () => {
    return (
      <div>
        <div className="line-config">
          <div>表格拖动：</div>
          <div>
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              checked={resizeAble}
              onChange={checked => setResizeAble(checked)}
            />
          </div>
        </div>
        <Divider style={{ margin: '8px 0' }} />
      </div>
    );
  };

  const handleCancelFixed = (column, source) => {
    let sourceData = [...fixedLeftColumns];
    let changeFunc = setFixedLeftColumns;
    cache = true;
    if (source === 'right') {
      sourceData = [...fixedRightColumns];
      changeFunc = setFixedRightColumns;
    }

    const index = sourceData.findIndex(item => {
      return column.columnKey === item.columnKey;
    });
    sourceData.splice(index, 1);

    changeFunc(sourceData);
    if (source === 'right') {
      return setUnFixedColumns([...unFixedColumns, { ...column, fixed: undefined }]);
    }

    return setUnFixedColumns([{ ...column, fixed: undefined }, ...unFixedColumns]);
  };

  // type: 要固定在左还是右, source  在那部分点击的
  const handleFixed = (column, type, source) => {
    let data = [...unFixedColumns];
    let sourceFunc = setUnFixedColumns;
    if (source === 'left') {
      data = [...fixedLeftColumns];
      sourceFunc = setFixedLeftColumns;
    }
    if (source === 'right') {
      data = [...fixedLeftColumns];
      sourceFunc = setFixedRightColumns;
    }

    cache = true;
    const index = data.findIndex(item => {
      return column.columnKey === item.columnKey;
    });
    data.splice(index, 1);

    sourceFunc(data);

    if (type === 'right') {
      return setFixedRightColumns([{ ...column, fixed: type }, ...fixedRightColumns]);
    }

    return setFixedLeftColumns([...fixedLeftColumns, { ...column, fixed: type }]);
  };

  const handleChangeCheckbox = value => {
    setCacheData(value, true);
    setShowColumns(value);
  };

  const handleCheckAll = e => {
    const checkAll = e.target.checked;
    if (checkAll) {
      return setShowColumns(columns.map(item => item.columnKey));
    }
    setShowColumns([]);
  };

  const renderColumnsSettingContent = () => {
    const unFixedProps = {
      dataSource: unFixedColumns,
      onChange: setUnFixedColumns,
      droppableId: 'unFixed',
      type: 'unFixed',
      title: '不固定',
      onFixed: (column, type) => handleFixed(column, type),
    };
    const fixedLeftProps = {
      dataSource: fixedLeftColumns,
      onChange: setFixedLeftColumns,
      droppableId: 'fixedLeft',
      type: 'fixedLeft',
      title: '固定在头',
      onCancelFixed: column => handleCancelFixed(column, 'left'),
      onFixed: column => handleFixed(column, 'right', 'left'),
    };
    const fixedRightProps = {
      dataSource: fixedRightColumns,
      onChange: setFixedRightColumns,
      droppableId: 'fixedRight',
      type: 'fixedRight',
      title: '固定在尾',
      onCancelFixed: column => handleCancelFixed(column, 'right'),
      onFixed: column => handleFixed(column, 'left', 'right'),
    };
    return (
      <div style={{ minWidth: '120px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Checkbox
            indeterminate={showColumns.length < columns.length}
            checked={showColumns.length === columns.length}
            onChange={handleCheckAll}
          >
            列展示
          </Checkbox>
          <Text
            style={{
              color: token.colorPrimary,
              cursor: 'pointer',
            }}
            onClick={() => initColumns(tableColumns)}
          >
            重置
          </Text>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <Checkbox.Group onChange={handleChangeCheckbox} value={showColumns}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ColumnsConfig {...fixedLeftProps} />
            <ColumnsConfig {...unFixedProps} />
            <ColumnsConfig {...fixedRightProps} />
          </div>
        </Checkbox.Group>
      </div>
    );
  };

  return (
    <ProCard className="pro-table-container" {...cardProps}>
      {!hideTools ? (
        <div className="pro-table-tools">
          <div className="pro-table-tools-left flex">
            {rowSelection && rowSelection.type !== 'radio' && (
              <div
                className="select-number-container"
                style={{
                  backgroundColor: token.colorPrimaryBg,
                  borderRadius: token.borderRadius,
                  marginRight: '8px',
                }}
              >
                <Text
                  style={{
                    color: token.colorPrimaryText,
                  }}
                >
                  当前表格已选择{' '}
                  <Text strong style={{ fontSize: '16px', color: token.colorPrimaryText }}>
                    {selectNum}
                  </Text>{' '}
                  项
                </Text>
              </div>
            )}

            {toolsLeft && toolsLeft}
          </div>
          <div className="pro-table-tools-right">
            {tools ? tools : null}

            <div className="pro-table-tools-right-item">
              {onReload ? (
                <div className="tool-action">
                  <Tooltip title="刷新">
                    <ReloadOutlined
                      onClick={() => {
                        onReload && onReload();
                      }}
                    />
                  </Tooltip>
                </div>
              ) : null}

              <div className="tool-action">
                <Dropdown
                  trigger={['click']}
                  menu={{
                    items: dropdownItems,
                    selectedKeys: [size],
                    onClick: handleSelected,
                  }}
                >
                  <Tooltip title="表格密度">
                    <OrderedListOutlined />
                  </Tooltip>
                </Dropdown>
              </div>
              {!disabledResize ? (
                <div className="tool-action">
                  <Popover trigger="hover" placement="bottomLeft" content={renderSettingContent()}>
                    <SplitCellsOutlined />
                  </Popover>
                </div>
              ) : null}
              <div className="tool-action">
                <Popover trigger="click" placement="bottomLeft" content={renderColumnsSettingContent(columns)}>
                  <Tooltip title="列设置">
                    <SettingOutlined />
                  </Tooltip>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {resizeAble && !disabledResize ? (
        <ResizeTable
          {...otherOption}
          dataSource={dataSource}
          size={size}
          pagination={{
            position: ['bottomCenter'],
            ...pagination,
          }}
          columns={columns.filter(item => showColumns.includes(item.columnKey))}
          rowSelection={
            rowSelection
              ? {
                  ...rowSelection,
                  onChange: handleSelectChange,
                }
              : null
          }
        />
      ) : (
        <Table
          {...otherOption}
          dataSource={dataSource}
          size={size}
          pagination={{
            position: ['bottomCenter'],
            ...pagination,
          }}
          columns={columns.filter(item => showColumns.includes(item.columnKey))}
          rowSelection={
            rowSelection
              ? {
                  ...rowSelection,
                  onChange: handleSelectChange,
                }
              : null
          }
        />
      )}
    </ProCard>
  );
}
