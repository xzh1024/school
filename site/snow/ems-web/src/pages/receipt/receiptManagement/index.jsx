import useStores from '@/store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import MainContainer from '@c/mainContainer';
import { Badge, Button, Drawer, Modal } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import DrawerContent from './drawer-content';
import Express from './express-modal';
import Search from './search';
import Table from './table';

export default observer(function Index() {
  const [showExpress, setShowExpress] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const { receiptManagement, globalStore } = useStores();

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const baseButton = [
    {
      title: '提交邮寄',
      type: 'primary',
      onClick: () => {
        if (receiptManagement.selectedRowKeys.length === 0) {
          return window.$message.warning('请选择需要邮寄的单号');
        }
        setShowExpress(true);
      },
    },
    {
      title: '撤销邮寄',
      type: 'primary',
      onClick: () => {
        if (receiptManagement.selectedRowKeys.length === 0) {
          return window.$message.warning('请选择需要撤销邮寄的单号');
        }
        Modal.confirm({
          title: '确认撤销邮寄',
          content: null,
          okText: '撤销',
          cancelText: '取消',
          onOk: close => {
            close();
            receiptManagement.cancelPost({ userName: globalStore.userInfo.userName });
          },
          onCancel: close => {
            close();
          },
        });

        // setShowAdd(true);
      },
    },
  ];

  return (
    <MainContainer
      search={<Search buttons={baseButton} />}
      table={
        <div className="receipt-table">
          <Badge count={receiptManagement.cacheDataSource.length} className="presentation-temporary">
            <Button
              icon={<ShoppingCartOutlined style={{ fontSize: '32px' }} />}
              onClick={openDrawer}
              shape="circle"
              className="border-none block"
            >
              <div className="text-xs text-[#666666] scale-[.8]">暂存单据</div>
            </Button>
          </Badge>
          <Table />
          <Drawer
            title={'暂存报账单'}
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            closeIcon={null}
            extra={
              <>
                <Button
                  type="primary"
                  size="small"
                  disabled={!receiptManagement.cacheDataSource.length}
                  onClick={() => {
                    setShowExpress(true);
                  }}
                >
                  提交邮寄
                </Button>
              </>
            }
          >
            <DrawerContent />
          </Drawer>
        </div>
      }
      title="收单管理"
      otherChildren={showExpress ? <Express onCancel={() => setShowExpress(false)} isCache={showDrawer} /> : null}
    ></MainContainer>
  );
});
