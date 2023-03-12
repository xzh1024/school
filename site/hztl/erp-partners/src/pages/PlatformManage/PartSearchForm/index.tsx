import React from "react";
import { connect } from "dva";
import { Form, Row, Col, Input, Button, Divider, message, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { PART_UP_STATE } from "@/constant";
import { Dispatch, AnyAction } from "redux";
import { PartnerModel } from "@/constant";
import styles from "./index.scss";
import { PartConnectState } from "../models";

export interface FormProps {
  form: WrappedFormUtils;
  eleList: PartnerModel[];
  activeTab: string;
  disableAllBtn: boolean;
  disableSelectedBtn: boolean;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
}

const { Option } = Select;
const InputGroup = Input.Group;

const PartSearchForm: React.FC<FormProps> = props => {
  const {
    form,
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
      if(err){
      }else{
          dispatch({
            type: "part/searchChange",
            payload: values,
          });
      }
    });
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
          <Form.Item label="库存">
            <InputGroup compact>
            <Row className={styles.width100}>
              <Col span={6}>
                {getFieldDecorator(
                  "partnerKey",
                  {},
                  )(
                  <Select className={`${styles.width100} ${styles.qty_select}`} placeholder="库存">
                    {eleList.map(item => (
                    <Option key={item.partnerKey} value={item.partnerKey}>
                        {item.partnerName}
                    </Option>
                    ))}
                  </Select>,
                )}
              </Col>
              <Col span={18}>
                {getFieldDecorator("qty", {})(<Input className={styles.qty_input} placeholder="库存数量" />)}
              </Col>
            </Row>
              
              
            </InputGroup>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="价格是否为0">
            {getFieldDecorator(
              "partnerKey",
              {},
            )(
              <Select placeholder="价格是否为0">
                {eleList.map(item => (
                  <Option key={item.partnerKey} value={item.partnerKey}>
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
                下架选中配件
              </Button>
              <Button onClick={unpublishParts(true)} disabled={disableAllBtn} type="primary">
                下架所有配件
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
