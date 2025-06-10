import { DownloadOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import MainContainer from '@c/mainContainer';
import useStores from '@s/index';
import { bulkDownloadQrcode } from '@u/qrCode';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import AddModal from './add-modal';
import Search from './search';
import Table from './table';
import Update from './update-modal';

const Index = () => {
  const { addressManagement } = useStores();
  const { selectedRows } = addressManagement;
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const baseButton = [
    {
      icon: <DownloadOutlined />,
      title: '二维码批量下载',
      type: 'primary',
      onClick: () => {
        if (selectedRows.length === 0) {
          return window.$message.warning('请选择数据');
        }
        donwloadQrCode();
      },
    },
    {
      icon: <PlusOutlined />,
      title: '新增',
      type: 'primary',
      onClick: () => {
        setShowAdd(true);
      },
    },
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);
        runInAction(() => {
          addressManagement.formSearch = params;
          addressManagement.pageCurrent = 1;
          addressManagement.getList();
        });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        runInAction(() => {
          addressManagement.pageCurrent = 1;
          addressManagement.formSearch = {};
          addressManagement.selectedRowKeys = [];
          addressManagement.selectedRows = [];
          addressManagement.getList();
        });
      },
    },
  ];

  useEffect(() => {
    addressManagement.getList();
    addressManagement.getOuOptions();
    addressManagement.getDepartmentOptions();
  }, []);

  const donwloadQrCode = async () => {
    if (!selectedRows || selectedRows.length === 0) {
      return window.$message.warning('请选择行数据');
    }
    const urls = selectedRows.map(row => `${process.env.REACT_APP_QRCODE_URL}/?acquirerId=${row.acquirerId}`);
    const filesName = selectedRows.map(row => row.acquirerName);
    bulkDownloadQrcode({
      urls,
      filesName,
    });
  };

  return (
    <MainContainer
      search={<Search buttons={baseButton} />}
      table={<Table showUpdate={setShowUpdate} />}
      title="收单柜管理"
      otherChildren={
        <>
          {showAdd ? <AddModal onCancel={() => setShowAdd(false)} /> : null}
          {showUpdate ? <Update onCancel={() => setShowUpdate(false)} /> : null}
        </>
      }
    ></MainContainer>
  );
};

export default observer(Index);
