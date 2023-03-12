import React, { Dispatch } from "react";
import { Table } from "antd";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PaginationData, PartModel } from "@/constant";
import { PaginationConfig } from "antd/lib/table/interface";
import { PartConnectState } from "../models";

export interface ElectricityTableProps {
  dispatch: Dispatch<AnyAction>;
  data: PartModel[];
  totalSize: number;
  paginationData: PaginationData;
  loading: boolean | undefined;
  selectedRowKeys: string[] | number[];
}

const PartTable: React.FC<ElectricityTableProps> = props => {
  const { data, selectedRowKeys, totalSize, paginationData, dispatch, loading } = props;

  const columns = [
    {
      title: "配件ID",
      dataIndex: "partId",
    },
    {
      title: "配件编码",
      dataIndex: "partNo",
    },
    {
      title: "配件名称",
      dataIndex: "partName",
    },
    {
      title: "配件品牌",
      dataIndex: "brand",
    },
    {
      title: "配件产地",
      dataIndex: "factory",
    },
    {
      title: "生产码",
      dataIndex: "partNoA",
    },
    {
      title: "保险认证分类",
      dataIndex: "insureCertType",
    },
  ];

  const onpaginationChange = (pagination: PaginationConfig) => {
    dispatch({
      type: "part/paginationDataChange",
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
        type: "part/saveSelectedRowKeys",
        payload: selectedRowKeys,
      }),
  };

  return (
    <div className="container-block" style={{ marginTop: 20 }}>
      <div id="components-table-demo-basic">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 400px)" }}
          rowKey="partId"
          rowSelection={rowSelection}
          pagination={pagination}
          onChange={onpaginationChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default connect(({ part, loading }: PartConnectState) => ({
  data: part.list,
  selectedRowKeys: part.selectedRowKeys,
  totalSize: part.totalSize,
  paginationData: part.paginationData,
  loading: loading.effects["part/fetchData"],
}))(PartTable);
