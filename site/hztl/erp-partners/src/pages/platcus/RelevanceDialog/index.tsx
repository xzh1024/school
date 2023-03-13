import React, { Dispatch } from "react";
import { Table, Modal, Form, Radio } from "antd";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PlatConnectState } from "../models";
import { PartSearchModel } from "../models/part";
import DialogForm from "../DialogForm";
import { RadioChangeEvent } from 'antd/lib/radio';
import { PaginationConfig } from "antd/lib/table/interface";
import { PaginationData } from "@/constant";

export interface PlatDialogProps {
  dispatch: Dispatch<AnyAction>;
  data: PartSearchModel[];
  loading: boolean | undefined;
  visible: boolean;
  selectedCustomer: PartSearchModel;
  totalSize: number;
  paginationData: PaginationData;
}

const DialogFormComponent = Form.create()(DialogForm);

const PlatDailog: React.FC<PlatDialogProps> = props => {

  const { dispatch, data, loading, visible, selectedCustomer, paginationData, totalSize } = props;


  function handleCancel() {
    dispatch({
      type: "platList/updateDialogVisible"
    })
  }

  function handleOk() {
    dispatch({
      type: "platList/relevelCustomer"
    })
  }
  function onChange(e: RadioChangeEvent) {
    dispatch({
      type: "platList/saveSelectedCustomer",
      payload: e.target.value
    })
  }

  const columns = [
    {
      title: "",
      dataIndex: "id+name",
      render: (text: any, record: any) => (
        <Radio value={record} />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
    }, {
      title: "编码",
      dataIndex: "code",
    }, {
      title: "名称",
      dataIndex: "name",
    }
  ];

  const onpaginationChange = (pagination: PaginationConfig) => {
    dispatch({
      type: "platList/paginationDataChange",
      payload: pagination,
    });
  };

  const pagination: PaginationConfig = {
    showSizeChanger: true,
    ...paginationData,
    total: totalSize,
  };

  return (
    <Modal
      title="关联客户"
      width="1000px"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <DialogFormComponent />
      <Radio.Group onChange={onChange} value={selectedCustomer}>
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 400px)" }}
          rowKey="partId"
          bordered
          loading={loading}
          pagination={pagination}
          onChange={onpaginationChange}
        />
      </Radio.Group>
    </Modal>

  );
};

export default connect(({ platList, loading }: PlatConnectState) => ({
  data: platList.customerList,
  loading: loading.effects["platList/fetchData"],
  visible: platList.visible,
  selectedCustomer: platList.selectedCustomer
}))(PlatDailog);
