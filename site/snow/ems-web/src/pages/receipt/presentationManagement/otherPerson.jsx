import useStores from '@/store';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Drawer } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import DrawerContent from './drawer-content';
import Table from './otherPersonTable';
import Search from './search';

const OtherPerson = ({ buttons }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { presentationManagement } = useStores();
  const { cacheDataSource } = presentationManagement;

  const openDrawer = () => {
    setShowDrawer(true);
  };

  const handleSendExpress = () => {
    presentationManagement.showExpressModal = true;
    presentationManagement.expressByDrawer = true;
  };

  return (
    <>
      <div className="p-4 pt-6 mb-4 bg-white">
        <Search buttons={buttons} />
        <Divider />
      </div>
      <div className="bg-white">
        <Badge count={cacheDataSource.length || null} className="presentation-temporary">
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
              <Button type="primary" size="small" onClick={handleSendExpress} disabled={cacheDataSource.length === 0}>
                提交邮寄
              </Button>
            </>
          }
        >
          <DrawerContent />
        </Drawer>
      </div>
    </>
  );
};

export default observer(OtherPerson);
