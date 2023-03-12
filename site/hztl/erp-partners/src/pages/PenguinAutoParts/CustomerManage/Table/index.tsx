import React, { Dispatch } from "react";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PaginationData, CustomerModel, ErpCustomerModel, ErpCustomerBaseModel } from "@/constant";
import { PaginationConfig } from "antd/lib/table/interface";
import { CustomerConnectState } from "../models";
import styles from "./index.scss";
import { Table, Modal, Button, Select } from "antd";
const { Option } = Select;

export interface ElectricityTableProps {
  dispatch: Dispatch<AnyAction>;
  list: CustomerModel[];
  erpCustomerList: ErpCustomerModel[];
  checkedErpCustomer: ErpCustomerBaseModel;
  bindDialogTitle: string;
  totalSize: number;
  paginationData: PaginationData;
  loading: boolean | undefined;
  selectedRows: CustomerModel[];
  bindVisible: boolean;
  bindLoading: boolean | undefined;
  unbindVisible: boolean;
  unbindLoading: boolean | undefined;
}

const CustomerManageTable: React.FC<ElectricityTableProps> = props => {
  const {
    list,
    erpCustomerList,
    checkedErpCustomer,
    bindDialogTitle,
    selectedRows,
    totalSize,
    paginationData,
    dispatch,
    loading,
    bindVisible,
    bindLoading,
    unbindVisible,
    unbindLoading,
  } = props;

  const showBindDialog = (data: CustomerModel, isBind: boolean = false) => {
    dispatch({
      type: "customer/startBindDialog",
      payload: {...data},
      isBind,
    })
  }
  const hideBindDialog = () => {
    dispatch({
      type: "customer/hideBindDialog",
    })
  }
  const submitBind = () => {
    dispatch({
      type: "customer/submitBind",
    })
  }

  const showUnbindDialog = (data: CustomerModel) => {
    dispatch({
      type: "customer/startUnbindDialog",
      payload: {
        customers: [data.id],
      },
    })
  }
  const hideUnbindDialog = () => {
    dispatch({
      type: "customer/saveUnbindVisible",
      payload: false,
    })
  }
  const submitUnbind = () => {
    dispatch({
      type: "customer/submitUnbind"
    })
  }

  const columns = [
    {
      title: "操作",
      dataIndex: "erpId",
      render: (erpId: string, data: CustomerModel) => {
        return erpId ? (
          <React.Fragment>
            <span className={styles.button_danger} onClick={() => {showUnbindDialog(data)}}>解绑</span>
            <span className={styles.button_danger} onClick={() => {showBindDialog(data, true)}}>换绑</span>
          </React.Fragment>
        ) : (<span className={styles.button_success} onClick={() => {showBindDialog(data)}}>绑定</span>)
      },
    },
    {
      title: "平台用户名",
      dataIndex: "name",
    },
    {
      title: "绑定状态",
      dataIndex: "erpId",
      key: "status",
      render: (erpId: string) => (<span>{erpId ? "已授权" : "未授权"}</span>),
    },
    {
      title: "ERP往来单位编码",
      dataIndex: "erpCode",
    },
    {
      title: "ERP往来单位名称",
      dataIndex: "erpName",
    },
    {
      title: "绑定日期",
      dataIndex: "bindDate",
    },
  ];

  const onpaginationChange = (pagination: PaginationConfig) => {
    dispatch({
      type: "customer/paginationDataChange",
      payload: pagination,
    });
  };

  const pagination: PaginationConfig = {
    showSizeChanger: true,
    ...paginationData,
    total: totalSize,
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map(item => item.id),
    onChange: (selectedRowKeys: string[] | number[], selectedRows: CustomerModel[]) => 
    dispatch({
      type: "customer/saveSelectedRows",
      payload: selectedRows,
    }),
  };

  const bindSelectSearch = (value: string) => {
    dispatch({
      type: "customer/loadErpCustomerList",
      payload: value
    });
  }
  const bindSelectChange = (value: string) => {
    const values = value.split("-");
    dispatch({
      type: "customer/saveCheckedErpCustomer",
      payload: {
        erpId: values[0],
        erpCode: values[1],
        erpName: values[2],
      },
    });
  }

  return (
    <div className="container-block" style={{ marginTop: 20 }}>
      <div id="components-table-demo-basic">
        <Table
          size="small"
          columns={columns}
          dataSource={list}
          scroll={{ y: "calc(100vh - 360px)" }}
          rowKey="id"
          rowSelection={rowSelection}
          pagination={pagination}
          onChange={onpaginationChange}
          loading={loading}
          bordered
        />
      </div>

      <Modal
        destroyOnClose
        title={bindDialogTitle}
        visible={bindVisible}
        confirmLoading={bindLoading}
        onCancel={hideBindDialog}
        footer={<div style={{textAlign: "center"}}>
          <Button loading={loading} onClick={hideBindDialog}>取消</Button>
          <Button key="submit" type="primary" style={{ marginLeft: 8 }} disabled={!checkedErpCustomer.erpId} onClick={submitBind}>确定</Button>
        </div>}
      >
        <div className={styles.bind_container}>
          <div className={styles.bind_label}>
            往来单位名称
          </div>
          <div className={styles.bind_content}>
            <Select
              defaultValue={checkedErpCustomer.erpId ? `${checkedErpCustomer.erpId}-${checkedErpCustomer.erpCode}-${checkedErpCustomer.erpName}` : ""}
              showSearch
              placeholder=""
              style={{ width: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={bindSelectSearch}
              onChange={bindSelectChange}
              notFoundContent={null}
            >
              {erpCustomerList.map(item => (
                <Option key={`${item.id}-${item.code}-${item.name}`}>{item.name}</Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
      <Modal
        title="你确定要解除这些往来单位的绑定关系吗？"
        visible={unbindVisible}
        confirmLoading={unbindLoading}
        onCancel={hideUnbindDialog}
        footer={null}
      >
        <p>解除后对应的客户将不能再使用思锐的价格库存进行报价！</p>
        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <Button loading={loading} onClick={hideUnbindDialog}>取消</Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={submitUnbind}>确定</Button>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ customer, loading }: CustomerConnectState) => ({
  list: customer.list,
  erpCustomerList: customer.erpCustomerList,
  checkedErpCustomer: customer.checkedErpCustomer,
  bindDialogTitle: customer.isBind ? "换绑" : "绑定",
  selectedRows: customer.selectedRows,
  totalSize: customer.totalSize,
  paginationData: customer.paginationData,
  bindVisible: customer.bindVisible,
  unbindVisible: customer.unbindVisible,
  loading: loading.effects["customer/fetchData"],
  bindLoading: loading.effects["customer/submitBind"],
  unbindLoading: loading.effects["customer/submitUnbind"],
}))(CustomerManageTable);
