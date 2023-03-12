import React, { Dispatch } from "react";
import { Table, Tag, Modal, Form } from "antd";
import { connect } from "dva";
import { AnyAction } from "redux";
import { PartnerModel, FormCreateRef, PriceTypeModel, PartsStoreModel } from "@/constant";
import { EleConnectState } from "../models";
import PartnerForm, { PartnerFormProps } from "../PartnerForm";

export interface ElectricityTableProps {
  dispatch: Dispatch<AnyAction>;
  data: PartnerModel[];
  partsPriceList: PriceTypeModel[];
  className: string | undefined;
  visible: boolean;
  formData: PartnerModel;
  partsStoreList: PartsStoreModel[];
}

const EnhancedForm = Form.create<PartnerFormProps>()(PartnerForm);
const ElectricityTable: React.FC<ElectricityTableProps> = props => {
  const { data, formData, className, partsPriceList, partsStoreList, dispatch, visible } = props;

  const partnerForm = React.useRef<FormCreateRef<Pick<PartnerFormProps, "formData">>>(null);
  function handleOk() {
    if (partnerForm && partnerForm.current) {
      const { validateFields } = partnerForm.current.getForm();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: "eleForm/saveEditData",
            payload: values,
          });
        }
      });
    }
  }

  const editData = (data: PartnerModel) => () => {
    dispatch({
      type: "eleForm/openEdit",
      payload: data,
    });
  };

  function handleCancel() {
    dispatch({
      type: "eleForm/closeEdit",
    });
  }

  const columns = [
    {
      title: "电商名称",
      dataIndex: "partnerName",
    },
    {
      title: "授权价格类型",
      dataIndex: "priceType",
      render: (text: string) => {
        const curPrice = partsPriceList.find(item => item.code === text);
        return curPrice && curPrice.name;
      },
    },
    {
      title: "授权配件性质",
      dataIndex: "properties",
      render: (text: string[]) => {
        const list = text || [];
        return list.map((item, index) => <Tag key={index}>{item}</Tag>)
      },
    },
    {
      title: "授权配件仓库",
      dataIndex: "store",
      render: (text: string[]) => {
          const list = text || [];
        return list.map((item, index) => {
          const store = partsStoreList.find(it => item === it.depotNo);
          return store ? <Tag key={index}>{store.depotName}</Tag> : null;
        });
        },
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text: number, record: PartnerModel) => (
        <span>
          <a onClick={editData(record)}>编辑</a>
        </span>
      ),
    },
  ];

  return (
    <div className={`container-block ${className}`}>
      <div id="components-table-demo-basic">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 100px)" }}
          rowKey="partnerKey"
          pagination={false}
        />
        <Modal
          title="编辑电商"
          visible={visible}
          maskClosable={false}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="取消"
          okText="保存"
          destroyOnClose
        >
          <EnhancedForm formData={formData} ref={partnerForm} />
        </Modal>
      </div>
    </div>
  );
};

export default connect(({ partnerBaseData, electricity, eleForm }: EleConnectState) => ({
  partsPriceList: partnerBaseData.partsPriceList,
  data: electricity.list,
  visible: eleForm.edit,
  formData: eleForm.data,
  partsStoreList: partnerBaseData.partsStoreList,
}))(ElectricityTable);
