import useStores from '@/store';
import { Card, Col, Pagination, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react';

const Cards = () => {
  const { defaultAddress } = useStores();
  const { loading, dataSource, selectedRow, pageCurrent, pageSize, total } = defaultAddress;
  const defaultLogo = <div className="default-location-logo"></div>;

  const handleClick = item => {
    defaultAddress.selectedRow = item;
    defaultAddress.selectedRowKeys = [item.acquirerId];
  };

  const handlePageChange = (current, size) => {
    defaultAddress.pageCurrent = current;
    defaultAddress.pageSize = size;
    defaultAddress.getList();
  };

  return (
    <div className="default-cards-container">
      <Row gutter={15}>
        {dataSource.map((item, index) => (
          <Col key={index} xxl={6} xs={24} lg={12} xl={8}>
            <Card
              loading={loading}
              onClick={() => handleClick(item)}
              className={
                selectedRow?.acquirerId === item.acquirerId ? 'active default-cards-item' : 'default-cards-item'
              }
            >
              <Card.Meta
                avatar={defaultLogo}
                title={item.acquirerName}
                description={
                  <div>
                    <Tooltip title={item.acquirerAddress}>{item.acquirerAddress}</Tooltip>
                    <div>管理员：{item.managerName}</div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="default-cards-container-pagination">
        <Pagination
          current={pageCurrent}
          pageSize={pageSize}
          total={total}
          showTotal={total => `共${total}条数据`}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default observer(Cards);
