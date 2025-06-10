import { ProCard } from '@ant-design/pro-components';
import { Button, Calendar, Col, Modal, Row, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';

const { Text } = Typography;

// 定义补贴状态枚举
const status = {
  1: '草稿',
  2: '审批中',
  3: '已锁定',
  4: '待确认',
  5: '已确认',
  6: '已结束',
};

// App组件
const App = () => {
  // 使用store中的subsidyCalendar状态
  const { subsidyCalendar } = useStores();
  // 表示是否正在加载数据的loading状态
  const { loading } = subsidyCalendar;
  // 表示日历视图模式的state
  const [calendarMode, setCalendarMode] = useState('month');
  // 存储年视图下的补贴数据
  const [calendarYearData, setCalendarYearData] = useState({});
  // 存储月/日视图下的补贴数据
  const [calendarData, setCalendarData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [detailTitle, setDetailTitle] = useState('');
  const [detailData, setDetailData] = useState({});

  // 当月日历数据请求数据
  useEffect(() => {
    const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    getData({ startDate, endDate });
  }, []);

  // 年视图下的日渲染函数，返回指定月份的天数和合计金额
  const monthCellRender = value => {
    const monthData = calendarYearData[value.month()];
    return monthData ? (
      <div>
        本月共{monthData.length}天补贴，合计
        {<span>{monthData.reduce((pre, cur) => pre + parseFloat(cur.subsidyStandard), 0)}</span>}元
      </div>
    ) : (
      ''
    );
  };

  // 日视图下的日渲染函数，返回补贴标准、补贴城市、报账单号和商旅订单等信息
  const dateCellRender = value => {
    const data = calendarData[dayjs(value).format('YYYY-MM-DD')];
    if (data) {
      return (
        <>
          {data.subsidyStandard && (
            <Row>
              <Col span={10}>
                <Text>标准：</Text>
              </Col>
              <Col span={14}>{data.subsidyStandard}</Col>
            </Row>
          )}
          {data.subsidyCity && (
            <Row>
              <Col span={10}>
                <Text>城市：</Text>
              </Col>
              <Col span={14}>{data.subsidyCity}</Col>
            </Row>
          )}
          <Button
            type="link"
            style={{ paddingLeft: 0 }}
            onClick={() => {
              setDetailData(data);
              setShowDetail(true);
              setDetailTitle(dayjs(value).format('YYYY-MM-DD') + '  补贴详情');
            }}
          >
            查看详情
          </Button>
          {/* {data.claimNo && (
            <Row>
              <Col span={10}>
                <Text>单号：</Text>
              </Col>
              <Col span={14}>{data.claimNo}</Col>
            </Row>
          )} */}
        </>
      );
    }
    return '';
  };

  // 日视图下的日期渲染函数，根据类型选择渲染方式
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  // 完整单元格渲染函数，同时渲染日期和补贴信息
  const handleFullCellRender = (current, info) => {
    const today = calendarData[current.format('YYYY-MM-DD')];

    return (
      <div className="ant-picker-cell-inner ant-picker-calendar-date">
        <div className="ant-picker-calendar-date-value">
          <div>
            {info.type === 'date' ? (
              <span style={{ float: 'left' }}>{today && status[today.status]}</span>
            ) : (
              <span style={{ float: 'left' }}></span>
            )}
            <span>{current.format(info.type === 'date' ? 'DD' : 'MM')}</span>
          </div>
        </div>
        <div className="ant-picker-calendar-date-content">{cellRender(current, info)}</div>
      </div>
    );
  };

  // 日期选择改变时的处理函数，根据选择的日期获取补贴数据并更新日历视图
  const handleDateChange = (date, mode) => {
    // 判断选择的日期是否超过当天，如果超过当天则不允许选择
    if (date.isAfter(dayjs(), 'day')) {
      return;
    }
    setCalendarMode(mode);
    const startDate = dayjs(date).startOf(mode).format('YYYY-MM-DD');
    const endDate = dayjs(date).endOf(mode).format('YYYY-MM-DD');
    getData({ startDate, endDate }, mode);
  };

  // 获取补贴数据的API请求函数
  const getData = (params = {}, mode = 'month') => {
    const msg = mode === 'month' ? '月' : '年';

    // 调用API获取补贴数据
    subsidyCalendar
      .getLists({
        page: 1,
        pageSize: 999,
        ...params,
      })
      .then(res => {
        console.log(res, 11111);
        const data = {};
        // 如果返回的data为空，则提示本月份/年份暂无补贴数据
        if (res.data && res.data.length === 0) {
          setCalendarData({});
          setCalendarYearData({});
          return window.$message.info(`本${msg}暂无补贴数据`);
        }
        (res.data || []).forEach(item => {
          const date = dayjs(item.subsidyDate).format('YYYY-MM-DD');
          data[date] = item;
        });
        setCalendarData(data);

        if (mode === 'year') {
          const yearData = {};
          (res.data || []).forEach(item => {
            const month = dayjs(item.subsidyDate).month();
            if (yearData[month]) {
              yearData[month].push(item);
            } else {
              yearData[month] = [item];
            }
          });
          setCalendarYearData(yearData);
        }
      });
  };

  // 返回App组件的渲染内容
  return (
    <>
      <ProCard>
        <Spin spinning={loading}>
          <Calendar
            cellRender={cellRender}
            fullCellRender={handleFullCellRender}
            mode={calendarMode}
            onPanelChange={handleDateChange}
          />
        </Spin>
      </ProCard>
      <Modal open={showDetail} title={detailTitle} footer={null} onCancel={() => setShowDetail(false)}>
        <Row>
          <Col span={7}>
            <Text>补贴标准：</Text>
          </Col>
          <Col span={17}>{detailData.subsidyStandard}</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Text>补贴城市：</Text>
          </Col>
          <Col span={17}>{detailData.subsidyCity}</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Text>报账单号：</Text>
          </Col>
          <Col span={17}>{detailData.claimNo}</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Text>商旅订单：</Text>
          </Col>
          <Col span={17}>{detailData.travelApplyNo}</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Text>补贴类型：</Text>
          </Col>
          <Col span={17}>{detailData.dataSources === 3 ? '辖区内补贴' : '出差补贴'}</Col>
        </Row>
        <Row>
          <Col span={7}>
            <Text>付款日期：</Text>
          </Col>
          <Col span={17}>{detailData.payDate}</Col>
        </Row>
      </Modal>
    </>
  );
};

// 使用mobx-react的observer修饰符装饰App组件
export default observer(App);
