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

const DialogSearchForm: React.FC<FormProps> = props => {
  const {
    form,
    loading,
    dispatch,
  } = props;
  const { resetFields, validateFields, getFieldDecorator } = form;

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      dispatch({
        type: "platList/searchDialogData",
        payload: values
      })
    });
  }

  return (
    <Form className={styles.container} onSubmit={handleSearch}>
      <Row gutter={24}>
        <Col span={16}>
          <Form.Item label="平台客户名称">
            {getFieldDecorator("name", {})(<Input placeholder="平台客户名称" />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: "12px 0" }} />
    </Form>
  );
};

export default connect(({ platList, loading }: PlatConnectState) => ({
  searchData: platList.search,
  loading: loading.effects["platList/fetchData"],
}))(DialogSearchForm);
