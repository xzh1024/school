import {
  BarsOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Checkbox, Tooltip, Typography, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const { Text } = Typography;

export default function Index(props) {
  const { onChange, dataSource, droppableId, type, onFixed, onCancelFixed, title } = props;
  const { token } = theme.useToken();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(dataSource);
  }, [dataSource]);

  const handleOnDragEnd = e => {
    const copyData = [...list];
    if (!e.source || !e.destination) return;
    const sourceIndex = e.source.index;
    const targetIndex = e.destination.index;
    const temp = copyData[sourceIndex];

    copyData.splice(sourceIndex, 1);
    copyData.splice(targetIndex, 0, temp);
    onChange && onChange(copyData);
  };

  return list.length > 0 ? (
    <div
      style={{
        margin: '10px 0',
        padding: '0 10px',
        maxHeight: '300px',
        overflowY: 'scroll',
      }}
    >
      <div>
        <Text
          style={{
            color: token.colorTextTertiary,
            fontSize: '14px',
            paddingBottom: '6px',
          }}
        >
          {title}
        </Text>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={droppableId} type={type}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, index) => {
                return (
                  <Draggable draggableId={item.columnKey} index={index} key={item.columnKey}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: token.colorBgContainer,
                          }}
                        >
                          <div>
                            <BarsOutlined style={{ marginRight: '4px' }} />
                            <Checkbox value={item.columnKey}>
                              <Text>{item.title}</Text>
                            </Checkbox>
                          </div>
                          <div>
                            {item.fixed && (
                              <Tooltip title="不固定">
                                <VerticalAlignMiddleOutlined
                                  style={{ marginLeft: '4px' }}
                                  onClick={() => onCancelFixed && onCancelFixed(item)}
                                />
                              </Tooltip>
                            )}
                            {(!item.fixed || item.fixed === 'right') && (
                              <Tooltip title="固定在头">
                                <VerticalAlignTopOutlined
                                  style={{ marginLeft: '4px' }}
                                  onClick={() => onFixed && onFixed(item, 'left')}
                                />
                              </Tooltip>
                            )}
                            {(!item.fixed || item.fixed === 'left') && (
                              <Tooltip title="固定在尾">
                                <VerticalAlignBottomOutlined
                                  style={{ marginLeft: '4px' }}
                                  onClick={() => onFixed && onFixed(item, 'right')}
                                />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  ) : null;
}
