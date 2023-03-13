import React from "react";
import { connect } from "dva";
import { Form, Row, Col, Input, Button, Divider, message, Select } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Dispatch, AnyAction } from "redux";
import { PartnerModel } from "@/constant";
import styles from "./index.scss";
import { PlatConnectState } from "../models";
import { PartSearchModel } from "../models/part";

export interface FormProps {
  searchData: PartSearchModel;
  form: WrappedFormUtils;
  eleList: PartnerModel[];
  activeTab: string;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
}
const { Option } = Select;
const PlatSearchForm: React.FC<FormProps> = props => {
  const {
    form,
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
      // 获取当前values去匹配数组筛选数组
      dispatch({
        type: "platList/searchChange",
        payload: values
      })
    });
  }

  function handleChange(value: string) {
    console.log(value)
  }

  return (
    <Form className={styles.container} onSubmit={handleSearch}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="平台名称">
            {getFieldDecorator(
              "partnerKey",
              { initialValue: "HNW" },
            )(
              <Select onChange={handleChange}>
                <Option value="HNW">华诺威</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="平台客户名称">
            {getFieldDecorator("name", {})(<Input placeholder="平台客户名称" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="平台客户联系人">
            {getFieldDecorator("contacts", {})(<Input placeholder="平台客户联系人" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="平台客户地区">
            {getFieldDecorator("address", {})(<Input placeholder="平台客户地区" />)}
          </Form.Item>
        </Col>
      </Row>
      <Divider className={styles.Divider} />
      <div style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
          查询
          </Button>
        <Button style={{ marginLeft: 8 }} onClick={handleReset}>
          清空条件
          </Button>
      </div>
    </Form>
  );
};

export default connect(({ platList, loading }: PlatConnectState) => ({
  searchData: platList.search,
  loading: loading.effects["platList/fetchData"],
}))(PlatSearchForm);
