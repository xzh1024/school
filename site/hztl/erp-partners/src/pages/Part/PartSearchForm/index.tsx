import React from "react";
import { connect } from "dva";
import { Form, Row, Col, Input, Button, Divider, message, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { PART_UP_STATE } from "@/constant";
import { Dispatch, AnyAction } from "redux";
import { PartnerModel } from "@/constant";
import styles from "./index.scss";
import { PartConnectState } from "../models";
import { PartSearchModel } from "../models/part";

export interface FormProps {
  searchData: PartSearchModel;
  form: WrappedFormUtils;
  eleList: PartnerModel[];
  activeTab: string;
  disableAllBtn: boolean;
  disableSelectedBtn: boolean;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
}

const { Option } = Select;

const PartSearchForm: React.FC<FormProps> = props => {
  const {
    form,
    searchData,
    eleList,
    activeTab,
    disableAllBtn,
    disableSelectedBtn,
    loading,
    dispatch,
  } = props;
  const { resetFields, validateFields, getFieldDecorator } = form;

  function handleReset() {
    resetFields();
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      if(!values.partnerKey) {
        message.error("请选择授权电商!");
      } else {
        let partnerKey = null;
        for(let k of eleList){
          if(values.partnerKey == k.partnerName){
            partnerKey = k.partnerKey;
          }
        }
        dispatch({
          type: "part/searchChange",
          payload: {
            ...values,
            partnerKey: partnerKey,
          }
        });
      }
    });
  }

  function partnerChange(value: string) {
    if (!value) {
      dispatch({
        type: "part/clearData",
      });
    } else {
      let partnerKey = null;
      for(let k of eleList){
        if(value == k.partnerName){
          partnerKey = k.partnerKey;
        }
      }
      dispatch({
        type: "part/searchChange",
        payload: {
          ...searchData,
          partnerKey: partnerKey,
        },
      });
    }
  }

  const publishParts = (isPublishAll = false) => () => {
    dispatch({
      type: "part/publish",
      payload: isPublishAll,
    });
  };

  const unpublishParts = (isPublishAll = false) => () => {
    dispatch({
      type: "part/unpublish",
      payload: isPublishAll,
    });
  };

  return (
    <Form className={styles.container} onSubmit={handleSearch}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="配件名称">
            {getFieldDecorator("name", {})(<Input placeholder="ERP/原厂/标准名称" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="配件品牌">
            {getFieldDecorator("brand", {})(<Input placeholder="配件品牌" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="配件编码">
            {getFieldDecorator("code", {})(<Input placeholder="配件编码" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="电商名称">
            {getFieldDecorator(
              "partnerKey",
              {},
            )(
              <Select onChange={partnerChange} placeholder="电商名称">
                {eleList.map((item,index) => (
                  <Option key={item.partnerName} value={item.partnerName}>
                    {item.partnerName}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Divider className={styles.Divider} />
      <Row>
        <Col span={12}>
          {activeTab === PART_UP_STATE.noup ? (
            <div>
              <Button
                onClick={publishParts()}
                disabled={disableSelectedBtn}
                type="primary"
                style={{ marginRight: 10 }}
              >
                上架选中配件
              </Button>
              <Button onClick={publishParts(true)} disabled={disableAllBtn} type="primary">
                上架所有配件
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={unpublishParts()}
                disabled={disableSelectedBtn}
                type="primary"
                style={{ marginRight: 10 }}
              >
                取消上架选中配件
              </Button>
              <Button onClick={unpublishParts(true)} disabled={disableAllBtn} type="primary">
                取消上架所有配件
              </Button>
            </div>
          )}
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清空条件
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(({ part, partBaseData, loading }: PartConnectState) => ({
  activeTab: part.isUp ? PART_UP_STATE.up : PART_UP_STATE.noup,
  eleList: partBaseData.eleList,
  searchData: part.search,
  disableAllBtn: part.list.length === 0,
  disableSelectedBtn: part.selectedRowKeys.length === 0,
  loading: loading.effects["part/fetchData"],
}))(PartSearchForm);
