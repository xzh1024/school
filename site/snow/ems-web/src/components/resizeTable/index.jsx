import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';

// 调整table表头
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

// 拖拽调整table
const ResizeTable = props => {
  const { dataSource, ...options } = props;

  // 表格列
  const [cols, setCols] = useState(props.columns || []);
  const [columns, setColumns] = useState([]);

  // 定义头部组件
  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  // 处理拖拽
  const handleResize =
    index =>
    (e, { size }) => {
      const nextColumns = [...cols];
      // 拖拽是调整宽度
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      setCols(nextColumns);
    };

  useEffect(() => {
    setCols(props.columns);
  }, [props.columns]);

  useEffect(() => {
    setColumns(
      (cols || []).map((col, index) => ({
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      })),
    );
  }, [cols]);

  return (
    <div className="components-table-resizable-column">
      <Table size="small" {...options} bordered components={components} columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ResizeTable;
