import { ReloadOutlined } from '@ant-design/icons';
import { getPostStatusList, refreshPostStatus, switchPostStatus } from '@api/accountingTreatment/postManagement';
import { Drawer, Spin, Switch, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function Index({ showPostStatus = false, onClose }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    showPostStatus && getList();
  }, [showPostStatus]);

  const getList = () => {
    setLoading(true);

    getPostStatusList()
      .then(res => {
        setList(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const switchPost = (isOpen, record) => {
    setLoading(true);
    switchPostStatus({
      transferStatus: isOpen ? 'OPEN' : 'CLOSE',
      businessTypeCode: record.businessTypeCode,
    })
      .then(res => {
        getList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const refresh = record => {
    setLoading(true);
    refreshPostStatus(record.businessTypeCode)
      .then(res => {
        getList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Drawer title="顶岗状态" open={showPostStatus} onClose={onClose}>
      <Spin spinning={loading}>
        <div className="h-full flex flex-col overflow-y-scroll">
          {list.map((item, index) => {
            return (
              <div key={index} className="bg-slate-100 py-2 px-4 rounded-lg mb-2">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-base">
                    <span>{item.businessTypeName}</span>
                    <Tooltip title="刷新缓存">
                      <ReloadOutlined onClick={() => refresh(item)} className="text-sm ml-2 cursor-pointer" />
                    </Tooltip>
                  </div>

                  <div>
                    <Switch
                      checkedChildren="打开"
                      unCheckedChildren="关闭"
                      defaultChecked={item.transferStatus === 'OPEN'}
                      onChange={checked => switchPost(checked, item)}
                    ></Switch>
                  </div>
                </div>
                <div className="text-sm text-[#666666] leading-6">
                  <span>业务循环编码：</span>
                  <span className="font-semibold">{item.businessTypeCode}</span>
                </div>
                <div className="text-sm text-[#666666] leading-6">
                  <span>最后更新时间：</span>
                  <span className="font-semibold">{dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Spin>
    </Drawer>
  );
}
