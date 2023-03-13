import React, { Component } from "react";
import { connect } from "dva";
import { Form, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Dispatch, AnyAction } from "redux";
import { UnOpenPartnerModel, PartsStoreModel, PriceTypeModel, PartnerModel } from "@/constant";
import styles from "./index.scss";
import { PlatformConnectState } from "../models";

export interface FormProps {
  form: WrappedFormUtils;
  formData: PartnerModel;
  partsPropertyList: string[];
  partsStoreList: PartsStoreModel[];
  partsPriceList: PriceTypeModel[];
  partnerList: UnOpenPartnerModel[];
  dispatch: Dispatch<AnyAction>;
  saveLoading: boolean | undefined;
}
export interface PartnerFormProps {
  form: WrappedFormUtils;
  formData: PartnerModel;
}

const { Option } = Select;

class PartnerForm extends Component<FormProps> {
  componentDidMount() {
    const { 
      dispatch, 
      partsPropertyList, 
      // partsPriceList 
    } = this.props;
    dispatch({
      type: "platformList/loadDataUnauthed",
    });

    if (partsPropertyList.length === 0) {
      dispatch({
        type: "platformList/getPropertyList",
      });
    }
    // if (partsPriceList.length === 0) {
    //   dispatch({
    //     type: "platformList/getPriceList",
    //   });
    // }
  }

  render() {
    const {
      form,
      formData,
      partnerList,
      partsPropertyList,
      // partsPriceList,
      partsStoreList,
    } = this.props;
    let partsPriceList = [
      {code:"alliance",name:"平台价"}
    ]
    const { getFieldDecorator } = form;

    const { partnerKey, priceType, store, properties } = formData || {};

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 13,
      },
    };

    return (
      <Form {...formItemLayout} className={styles.container}>
        <Form.Item label="电商名称">
          {getFieldDecorator("partnerKey", {
            initialValue: partnerKey,
          })(
            <Select disabled placeholder="电商名称">
              {partnerList.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="授权价格类型">
          {getFieldDecorator("priceType", {
            initialValue: priceType,
            rules: [{ required: true, message: "授权价格类型必须！" }],
          })(
            <Select>
              {partsPriceList.map(item => (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="授权配件性质" extra="选择想要共享到电商的配件性质">
          {getFieldDecorator("properties", {
            initialValue: properties,
            rules: [{ required: true, message: "授权配件性质必须！", type: "array" }],
          })(
            <Select mode="multiple">
              {partsPropertyList.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="授权配件仓库">
          {getFieldDecorator("store", {
            initialValue: store,
            rules: [{ required: true, message: "授权配件仓库必须！", type: "array" }],
          })(
            <Select mode="multiple">
              {partsStoreList.map(item => (
                <Option key={item.depotNo} value={item.depotNo}>
                  {item.depotName}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const ElectricityForm = connect(
  ({ platformList }: PlatformConnectState) => ({
    partsPropertyList: platformList.propertyList,
    partsStoreList: platformList.storeList,
    // partsPriceList: platformList.priceList,
    partnerList:platformList.unAuthed,
    partnerKey:platformList.partnerKey,
    
  }),
)(PartnerForm);

export default ElectricityForm;
