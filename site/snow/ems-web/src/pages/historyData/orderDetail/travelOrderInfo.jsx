import { getTravelOrderInfo } from '@api/historyData';
import Table from '@c/proTable';
import { Spin, Tabs } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';

const FlightTable = props => {
  const { dataSource = [] } = props;

  const columns = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '航班号',
      width: 140,
      dataIndex: 'fligh',
    },
    {
      title: '状态',
      width: 140,
      dataIndex: 'status',
    },
    {
      title: '票价',
      width: 140,
      dataIndex: 'amount',
    },
    {
      title: '退改费',
      width: 140,
      dataIndex: 'changeAmount',
    },
    {
      title: '起飞时间',
      width: 140,
      dataIndex: 'takeoffTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '到达时间',
      width: 140,
      dataIndex: 'arrivalTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '出发城市',
      width: 140,
      dataIndex: 'dCityName',
    },
    {
      title: '到达城市',
      width: 140,
      dataIndex: 'aCityName',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
      cardProps={{
        style: { padding: 0 },
      }}
      pagination={false}
      hideTools
    ></Table>
  );
};

const HotelTable = props => {
  const { dataSource = [] } = props;

  const columns = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '状态',
      width: 140,
      dataIndex: 'status',
    },
    {
      title: '支付方式',
      width: 140,
      dataIndex: 'payType',
    },
    {
      title: '入住时间',
      width: 140,
      dataIndex: 'startTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '离店时间',
      width: 140,
      dataIndex: 'endTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '入住天数',
      width: 140,
      dataIndex: 'roomDays',
    },
    {
      title: '入住城市',
      width: 140,
      dataIndex: 'cityName',
    },
    {
      title: '房型',
      width: 140,
      dataIndex: 'roomName',
    },
    {
      title: '总价',
      width: 140,
      dataIndex: 'amountRMB',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
      cardProps={{
        style: { padding: 0 },
      }}
      pagination={false}
      hideTools
    ></Table>
  );
};

const TrainTable = props => {
  const { dataSource = [] } = props;

  const columns = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      render: (value, record, index) => index + 1,
    },
    {
      title: '车次号',
      width: 140,
      dataIndex: 'trainName',
    },
    {
      title: '订单状态',
      width: 140,
      dataIndex: 'status',
    },
    {
      title: '退票状态',
      width: 140,
      dataIndex: 'refundTicketStatus',
    },
    {
      title: '改签状态',
      width: 140,
      dataIndex: 'changeTicketStatus',
    },
    {
      title: '订单总额',
      width: 140,
      dataIndex: 'orderAmount',
    },
    {
      title: '出发时间',
      width: 140,
      dataIndex: 'departureDateTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '到达时间',
      width: 140,
      dataIndex: 'arrivalDateTime',
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '出发城市',
      width: 140,
      dataIndex: 'departureCityName',
    },
    {
      title: '到达城市',
      width: 140,
      dataIndex: 'arrivalCityName',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
      cardProps={{
        style: { padding: 0 },
      }}
      pagination={false}
      hideTools
    ></Table>
  );
};

function Index({ claimBase }) {
  const { historyData } = useStores();
  const { claimUrlParams, currentRecord } = historyData;
  const [flight, setFlight] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [train, setTrain] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(claimUrlParams, 3333332);
    getInfo(currentRecord.claimId);
  }, []);

  const getInfo = claimId => {
    setLoading(true);
    getTravelOrderInfo(claimId)
      .then(res => {
        setFlight(res.data.flight);
        setHotel(res.data.hotel);
        setTrain(res.data.train);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTabs = () => [
    {
      key: '1',
      label: '机票信息',
      sort: 1,
      children: <FlightTable dataSource={flight} />,
    },
    {
      key: '2',
      label: '酒店信息',
      sort: 2,
      children: <HotelTable dataSource={hotel} />,
    },
    {
      key: '3',
      label: '火车信息',
      sort: 2,
      children: <TrainTable dataSource={train} />,
    },
  ];

  return (
    <Spin spinning={loading}>
      <Tabs defaultActiveKey="1" items={getTabs()} className="order-detail-table"></Tabs>
    </Spin>
  );
}

export default observer(Index);
