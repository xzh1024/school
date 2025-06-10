import { PageContainer } from '@ant-design/pro-components';
import { theme, Calendar, TimePicker, Button, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getCalendarInfoByRange, recordCalendar, recordWorkTime } from '@api/accountingTreatment/accountWorkCalendar';

export default function Index() {
  const { token } = theme.useToken();
  const [calendarList, setCalendarList] = useState([]); //返回的当前月份的列表数据
  const [chooseData, setChooseData] = useState({}); //当前选中的日期
  const [nowDate, setNowDate] = useState({}); //当前选中日期所在的年和月

  useEffect(() => {
    setNowDate({
      year: dayjs().year(),
      month: dayjs().month() + 1,
    });
    asyncGetCalendar({
      startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
      endDate: dayjs().endOf('month').format('YYYY-MM-DD'),
    }).then(() => {
      handleSelectChange(dayjs());
    });
  }, []);

  // 日视图下的日期渲染函数，根据类型选择渲染方式
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  // 日视图下的日渲染函数
  const dateCellRender = value => {
    const index = calendarList.map(item => item.workDateStr).indexOf(dayjs(value).format('YYYY-MM-DD'));
    if (index !== -1) {
      const isWeekend = calendarList[index].workFlag === '0';
      return (
        <>
          <div className={isWeekend ? 'weekend' : ''}>
            上午：{calendarList[index].workStime.substring(0, 5)} 至 {calendarList[index].workEtime.substring(0, 5)}
          </div>
          <div className={isWeekend ? 'weekend' : ''}>
            下午：{calendarList[index].workStime2.substring(0, 5)} 至 {calendarList[index].workEtime2.substring(0, 5)}
          </div>
        </>
      );
    }
  };

  // 完整单元格渲染函数，同时渲染日期和补贴信息
  const handleFullCellRender = (current, info) => {
    const index = calendarList.map(item => item.workDateStr).indexOf(dayjs(current).format('YYYY-MM-DD'));
    let isWeekend = current.day() === 6 || current.day() === 0;
    if (index !== -1 && calendarList[index].workFlag === '0') {
      isWeekend = true;
    }
    return (
      <div className="ant-picker-cell-inner ant-picker-calendar-date">
        <div className="ant-picker-calendar-date-value">
          <span className={isWeekend ? 'weekend' : ''}>{current.format('DD')}</span>
        </div>
        <div className="ant-picker-calendar-date-content">{cellRender(current, info)}</div>
      </div>
    );
  };

  const handleSelectChange = time => {
    untilGetList(time);

    const index = calendarList.map(item => item.workDateStr).indexOf(dayjs(time).format('YYYY-MM-DD'));
    let isWeekend = time.day() === 6 || time.day() === 0;
    if (index !== -1 && calendarList[index].workFlag === '0') {
      isWeekend = true;
    }
    setChooseData({
      nowDate: time,
      showDate: dayjs(time).format('YYYY年MM月DD日') + ' ' + dayjs(time).format('dddd'),
      showDay: time.$D,
      isWeekend,
      morning:
        index !== -1
          ? [dayjs(calendarList[index].workStime, 'HH:mm'), dayjs(calendarList[index].workEtime, 'HH:mm')]
          : [dayjs('09:00', 'HH:mm'), dayjs('12:00', 'HH:mm')],
      afternoon:
        index !== -1
          ? [dayjs(calendarList[index].workStime2, 'HH:mm'), dayjs(calendarList[index].workEtime2, 'HH:mm')]
          : [dayjs('13:00', 'HH:mm'), dayjs('18:00', 'HH:mm')],
    });
  };

  const handleDateChange = date => {
    untilGetList(date);
  };

  /********************************************************异步方法*/
  //设为工作日/非工作日
  const handleClickSetDay = async () => {
    const res = await recordCalendar({
      workDateStr: dayjs(chooseData.nowDate).format('YYYY-MM-DD'),
      workFlag: chooseData.isWeekend ? '1' : '0',
    });
    if (res.code === 200) {
      //重新获取设置日期当月的数据
      message.success('设置成功！');
      asyncGetCalendar({
        startDate: dayjs(chooseData.nowDate).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(chooseData.nowDate).endOf('month').format('YYYY-MM-DD'),
      });
    }
  };

  //根据范围查询会计工作日历信息
  const asyncGetCalendar = async params => {
    const res = await getCalendarInfoByRange(params);
    setCalendarList(res.data);
  };

  //点击保存：设置工作时间
  const handleClickSave = async () => {
    const res = await recordWorkTime({
      workDateStr: dayjs(chooseData.nowDate).format('YYYY-MM-DD'),
      workStime: dayjs(chooseData.morning[0]).format('HH:mm'),
      workEtime: dayjs(chooseData.morning[1]).format('HH:mm'),
      workStime2: dayjs(chooseData.afternoon[0]).format('HH:mm'),
      workEtime2: dayjs(chooseData.afternoon[1]).format('HH:mm'),
    });

    if (res.code === 200) {
      //重新获取设置日期当月的数据
      message.success('保存成功！');
      asyncGetCalendar({
        startDate: dayjs(chooseData.nowDate).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(chooseData.nowDate).endOf('month').format('YYYY-MM-DD'),
      });
    }
  };
  /********************************************************工具方法*/
  const untilGetList = date => {
    const year = dayjs(date).year();
    const month = dayjs(date).month() + 1;

    if (year !== nowDate.year || month !== nowDate.month) {
      //此时重新获取当前月日历数据
      setNowDate({
        year,
        month,
      });
      asyncGetCalendar({
        startDate: dayjs(date).startOf('month').format('YYYY-MM-DD'),
        endDate: dayjs(date).endOf('month').format('YYYY-MM-DD'),
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgLayout,
      }}
    >
      <PageContainer
        fixedHeader
        style={{
          backgroundColor: token.colorBgLayout,
        }}
        header={{
          title: '会计工作日历',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            borderRadius: token.borderRadius,
          }}
          className="account_work_calendar_calendar"
        >
          <Calendar
            cellRender={cellRender}
            fullCellRender={handleFullCellRender}
            mode="month"
            onPanelChange={handleDateChange}
            onChange={handleSelectChange}
          />

          <div className="account_work_calendar_module">
            <div className="account_work_calendar_module_header">{chooseData.showDate}</div>
            <div className="account_work_calendar_module_content">
              <div className="account_work_calendar_module_content_day">{chooseData.showDay}</div>
              <div className="account_work_calendar_module_content_title">设置工作时间：</div>

              <div className="account_work_calendar_module_content_date">
                上午：
                <TimePicker.RangePicker
                  format="HH:mm"
                  value={chooseData.morning}
                  onChange={dates =>
                    setChooseData({
                      ...chooseData,
                      morning: dates,
                    })
                  }
                  hideDisabledOptions={true}
                  defaultValue={[dayjs('09:00', 'HH:mm'), dayjs('12:00', 'HH:mm')]}
                  disabledTime={() => ({ disabledHours: () => [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] })}
                />
              </div>

              <div className="account_work_calendar_module_content_date">
                下午：
                <TimePicker.RangePicker
                  format="HH:mm"
                  hideDisabledOptions={true}
                  value={chooseData.afternoon}
                  onChange={dates =>
                    setChooseData({
                      ...chooseData,
                      afternoon: dates,
                    })
                  }
                  defaultValue={[dayjs('13:00', 'HH:mm'), dayjs('18:00', 'HH:mm')]}
                  disabledTime={() => ({ disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] })}
                />
              </div>

              <div className="account_work_calendar_module_content_buttons">
                <Popconfirm
                  description={
                    chooseData.isWeekend
                      ? `确定将非工作日${chooseData.showDate}设为工作日吗？`
                      : `确定将工作日${chooseData.showDate}设为非工作日吗？`
                  }
                  onConfirm={handleClickSetDay}
                >
                  <Button size="small">{chooseData.isWeekend ? '设置为工作日' : '设置为非工作日'} </Button>
                </Popconfirm>

                <Button onClick={handleClickSave} className="button" size="small">
                  保存
                </Button>
              </div>
            </div>

            <div className="account_work_calendar_module_footer">
              <div className="account_work_calendar_module_content_title">系统默认工作时间</div>
              <div>上午：09：00 至 12:00</div>
              <div>下午：13：00 至 18:00</div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
