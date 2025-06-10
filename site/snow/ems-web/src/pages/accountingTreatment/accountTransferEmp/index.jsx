import useStores from '@s/index';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Search from './search';
import Table from './table';
import Tablelat from './tablelat';
import Modal from './modal';
import { Tabs } from 'antd';

function Index() {
  const { accountTransferEmp } = useStores();
  const { showModal } = accountTransferEmp;
  const location = useLocation();

  //是否为独立页面
  const [isUnique, setIsUnique] = React.useState(false);
  const onChange = key => {
    console.log(key);
    accountTransferEmp.pageIndex = 1;
  };
  useEffect(() => {
    setIsUnique(location.pathname.startsWith('/unique'));
  }, []);
  const items = [
    {
      key: '1',
      label: '顶岗状态',
      children: (
        <div className={`w-full h-full bg-gray-100 ${isUnique ? 'p-6' : ''}`}>
          <div className="bg-white w-full rounded-lg p-6" data-aos="fade-up" data-aos-duration="800">
            <div className="mb-4 text-black-300 text-lg font-medium">顶岗状态</div>
            <Search />
            <Table />
            {showModal && <Modal />}
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: '营业管理',
      children: (
        <div className={`w-full h-full bg-gray-100 ${isUnique ? 'p-6' : ''}`}>
          <div className="bg-white w-full rounded-lg p-6" data-aos="fade-up" data-aos-duration="800">
            <div className="mb-4 text-black-300 text-lg font-medium">营业管理</div>
            <Tablelat />
          </div>
        </div>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default observer(Index);
