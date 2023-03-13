import React, { Dispatch } from "react";
import { Table, Modal, Input, Button, message } from "antd";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PaginationData, StaffModel, StaffAuthCodeModel } from "@/constant";
import { PaginationConfig } from "antd/lib/table/interface";
import { StaffConnectState } from "../models";
import styles from "./index.scss";
import copy from "copy-to-clipboard";
export interface ElectricityTableProps {
  dispatch: Dispatch<AnyAction>;
  list: StaffModel[];
  authCodeList: StaffAuthCodeModel[];
  totalSize: number;
  paginationData: PaginationData;
  loading: boolean | undefined;
  selectedRowKeys: string[] | number[];
  authCodeVisible: boolean;
  authCodeLoading: boolean | undefined;
  authRelieveVisible: boolean;
  authRelieveLoading: boolean | undefined;
}

const AuthManageTable: React.FC<ElectricityTableProps> = props => {
  const {
    list,
    authCodeList,
    selectedRowKeys,
    totalSize,
    paginationData,
    dispatch,
    loading,
    authCodeVisible,
    authCodeLoading,
    authRelieveVisible,
    authRelieveLoading,
  } = props;

  const showAuthCode = (data: StaffModel) => {
    dispatch({
      type: "staff/fetchAuthCodeList",
      payload: {
        ids: [data.id],
      },
    })
  }
  const hideAuthCode = () => {
    dispatch({
      type: "staff/saveAuthCodeVisible",
      payload: false,
    })
  }

  const showAuthRelieve = (data: StaffModel) => {
    dispatch({
      type: "staff/authRelieveChange",
      payload: {
        ids: [data.id],
      },
    })
  }
  const hideAuthRelieve = () => {
    dispatch({
      type: "staff/saveAuthRelieveVisible",
      payload: false,
    })
  }
  const confirmAuthRelieve = () => {
    dispatch({
      type: "staff/confirmAuthRelieve"
    })
  }

  const columns = [
    {
      title: "操作",
      dataIndex: "authed",
      render: (authed: boolean, data: StaffModel) => {
        return authed ? (<span className={styles.button_danger} onClick={() => {showAuthRelieve(data)}}>解除授权</span>) : (<span className={styles.button_success} onClick={() => {showAuthCode(data)}}>获取授权码</span>)
      },
    },
    {
      title: "绑定状态",
      dataIndex: "authed",
      key: "status",
      render: (authed: boolean) => (<span>{authed ? "已授权绑定" : "未授权绑定"}</span>),
    },
    {
      title: "员工编号",
      dataIndex: "code",
    },
    {
      title: "员工姓名",
      dataIndex: "name",
    },
    {
      title: "所属部门",
      dataIndex: "department",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
    },
    {
      title: "入职日期",
      dataIndex: "entryDate",
    },
  ];
  

  const onpaginationChange = (pagination: PaginationConfig) => {
    dispatch({
      type: "staff/paginationDataChange",
      payload: pagination,
    });
  };

  const pagination: PaginationConfig = {
    showSizeChanger: true,
    ...paginationData,
    total: totalSize,
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: string[] | number[]) =>
      dispatch({
        type: "staff/saveSelectedRowKeys",
        payload: selectedRowKeys,
      }),
  };

  async function copyAuthCode(data: StaffAuthCodeModel | StaffAuthCodeModel[]) {
    let text = "";
    if(Array.isArray(data)) {
      data.forEach((item, index) => {
        if(index) {
          text += `\n${item.staffName}：${item.authCode}`;
        } else {
          text += `${item.staffName}：${item.authCode}`;
        }
      })
    } else {
      text = `${data.staffName}：${data.authCode}`;
    }
    if (copy(text)) {
      message.success("复制成功");
    } else {
      message.error("复制失败");
    }
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
        title="员工授权码"
        visible={authCodeVisible}
        confirmLoading={authCodeLoading}
        onCancel={hideAuthCode}
        className={styles.auth_code_modal}
        footer={<div style={{textAlign: "center"}}>
          <Button key="submit" type="primary" onClick={() => (copyAuthCode(authCodeList))}>
            一键复制全部
          </Button>
        </div>}
      >
        <div className={styles.cell_list}>
          {authCodeList.map(item => (
            <div className={styles.cell} key={item.staffId}>
              <div>
                <span>员工姓名：</span>
                <span>{item.staffName}</span>
              </div>
              <div className={styles.cell_content}>
                <span>授权码：</span>
                <Input defaultValue={item.authCode} disabled />
                <Button type="primary" onClick={() => (copyAuthCode(item))}>复制</Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="你确定要解除这些员工的绑定吗？"
        visible={authRelieveVisible}
        confirmLoading={authRelieveLoading}
        onCancel={hideAuthRelieve}
        footer={null}
      >
        <p>解除后对应的员工将不能再使用思锐的价格库存进行报价！</p>
        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <Button loading={loading} onClick={hideAuthRelieve}>取消</Button>
          <Button type="primary" style={{ marginLeft: 8 }} onClick={confirmAuthRelieve}>确定</Button>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ staff, loading }: StaffConnectState) => ({
  list: staff.list,
  authCodeList: staff.authCodeList,
  selectedRowKeys: staff.selectedRowKeys,
  totalSize: staff.totalSize,
  paginationData: staff.paginationData,
  authCodeVisible: staff.authCodeVisible,
  authRelieveVisible: staff.authRelieveVisible,
  loading: loading.effects["staff/fetchData"],
  authCodeLoading: loading.effects["staff/fetchAuthCodeList"],
  authRelieveLoading: loading.effects["staff/confirmAuthRelieve"],
}))(AuthManageTable);
