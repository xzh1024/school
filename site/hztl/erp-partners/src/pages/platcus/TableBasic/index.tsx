import React, { Dispatch } from "react";
import { Table } from "antd";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PlatConnectState } from "../models";
import { RelevanceDataModel } from "../models/part"

export interface PlatListTableProps {
  dispatch: Dispatch<AnyAction>;
  data: RelevanceDataModel[];
  totalSize: number;
  loading: boolean | undefined;
}

const PlatTable: React.FC<PlatListTableProps> = props => {
  const { data, loading, dispatch } = props;

  function relevance(item: any) {
    //打开关联弹框
    dispatch({
      type: "platList/updateDialogVisible",
      payload: item
    })
  }

  const columns = [
    {
      title: "平台客户信息",
      children: [
        {
          title: "ID",
          dataIndex: "id",
        }, {
          title: "客户名称",
          dataIndex: "name",
        }, {
          title: "联系人",
          dataIndex: "contacts",
        }, {
          title: "联系电话",
          dataIndex: "phone",
        }, {
          title: "地区",
          dataIndex: "city",
          render: (text: any, record: any) => (
            <span>
              {record.province}{record.city && "/" + record.city}{record.district && "/" + record.district}
            </span>
          ),
        }, {
          title: "详细地址",
          dataIndex: "address",
        }
      ]
    },
    {
      title: "关联ERP客户信息", children: [
        {
          title: "客户编码",
          dataIndex: "erpCode",
        }, {
          title: "客户名称",
          dataIndex: "erpName",
        }, {
          title: "操作",
          dataIndex: "erpId",
          render: (text: any, record: any) => (
            <span style={{ color: "#3590ff", cursor: "pointer" }} onClick={() => { relevance(record) }}>关联</span>
          ),
          width: 100
        }
      ]
    }
  ];

  return (
    <div className="container-block" style={{ marginTop: 20 }}>
      <div id="components-table-demo-basic">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 400px)" }}
          rowKey="id"
          bordered
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default connect(({ platList, loading }: PlatConnectState) => ({
  data: platList.list,
  selectedRowKeys: platList.selectedRowKeys,
  totalSize: platList.totalSize,
  loading: loading.effects["platList/fetchData"],
}))(PlatTable);
