import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Select, Alert, Col, Row, Button } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { UnOpenPartnerModel } from "@/constant";
import styles from "./getDealerIdForm.scss";
import { Dispatch, AnyAction } from "redux";
import { EleConnectState } from "../models";

export interface DealerIdFormProps {
  cutDown: number;
  form: WrappedFormUtils;
  unOpenPartnerList: UnOpenPartnerModel[];
  partnerKey: string;
  dispatch: Dispatch<AnyAction>;
  initialLoading: boolean | undefined;
  partnerKeyLoading: boolean | undefined;
}

const { Option } = Select;

class BasicCreateEleForm extends Component<DealerIdFormProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "eleSteps/fetchUnOpenPartnerList",
    });
  }

  changePartnerKey = (value: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: "eleSteps/changePartnerKey",
      payload: value,
    });
  };

  sendSms = () => {
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    validateFields(["partnerKey", "phone"], (err, values) => {
      if (!err) {
        dispatch({
          type: "sms/sendSms",
          payload: values,
        });
      }
    });
  };

  render() {
    const { form, unOpenPartnerList, partnerKey, cutDown, initialLoading } = this.props;

    if (initialLoading) {
      return null;
    }

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 13,
      },
    };

    const curPartner = unOpenPartnerList.find(item => item.key === partnerKey) || {};
    const { tips, verifyMode } = curPartner;

    return (
      <React.Fragment>
        <Row style={{ marginTop: 10 }}>
          <Col span={13} offset={8}>
            {tips && <Alert message={tips} type="warning" />}
          </Col>
        </Row>
        <Form {...formItemLayout} className={styles.container}>
          <Form.Item label="电商名称">
            {getFieldDecorator("partnerKey", {
              initialValue: partnerKey,
            })(
              <Select onChange={this.changePartnerKey} placeholder="电商名称">
                {unOpenPartnerList.map(item => (
                  <Option key={item.key} value={item.key}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          {verifyMode === "input" && (
            <Form.Item label="电商账号ID">
              {getFieldDecorator("dealerId", {
                rules: [{ required: true, message: "电商账号ID必填！" }],
              })(<Input placeholder="电商账号ID" />)}
            </Form.Item>
          )}
          {verifyMode === "password" && (
            <React.Fragment>
              <Form.Item label="账号">
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "账号必填！" }],
                })(<Input placeholder="账号" />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码必填！" }],
                })(<Input placeholder="密码" />)}
              </Form.Item>
            </React.Fragment>
          )}
          {verifyMode === "captcha" && (
            <React.Fragment>
              <Form.Item label="电商手机号">
                {getFieldDecorator("phone", {
                  rules: [{ required: true, message: "手机号必填！" }],
                })(<Input placeholder="电商手机号" />)}
              </Form.Item>
              <Form.Item label="验证码">
                <Row gutter={8}>
                  <Col span={14}>
                    {getFieldDecorator("smsCaptcha", {
                      rules: [{ required: true, message: "验证码必填!" }],
                    })(<Input />)}
                  </Col>
                  <Col span={10}>
                    <Button onClick={this.sendSms} block disabled={!!cutDown}>
                      {cutDown ? `${cutDown}秒` : "获取验证码"}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </React.Fragment>
          )}
          {verifyMode === "key" && (
            <Form.Item label="授权码">
              {getFieldDecorator("key", {
                rules: [{ required: true, message: "授权码必填！" }],
              })(<Input placeholder="授权码" />)}
            </Form.Item>
          )}
          {verifyMode === "companyWithCode" && (
            <React.Fragment>
              <Form.Item label="公司编码">
                {getFieldDecorator("dealerId", {
                  rules: [{ required: true, message: "公司编码必填！" }],
                })(<Input placeholder="公司编码" />)}
              </Form.Item>
              <Form.Item label="公司名称">
                {getFieldDecorator("dealerName", {
                  rules: [{ required: true, message: "公司名称必填！" }],
                })(<Input placeholder="公司名称" />)}
              </Form.Item>
              <Form.Item label="授权码">
                {getFieldDecorator("authCode", {
                  rules: [{ required: true, message: "授权码必填！" }],
                })(<Input placeholder="授权码" />)}
              </Form.Item>
            </React.Fragment>
          )}
          {verifyMode === "passwordWithCompany" && (
            <React.Fragment>
              <Form.Item label="账号">
                {getFieldDecorator("userName", {
                  rules: [{ required: true, message: "账号必填！" }],
                })(<Input placeholder="账号" />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码必填！" }],
                })(<Input placeholder="密码" />)}
              </Form.Item>
              <Form.Item label="公司名称">
                {getFieldDecorator("company", {
                  rules: [{ required: true, message: "公司名称必填！" }],
                })(<Input placeholder="公司名称" />)}
              </Form.Item>
              <Form.Item label="负责人">
                {getFieldDecorator("chargeMan")(<Input placeholder="负责人" />)}
              </Form.Item>
            </React.Fragment>
          )}
          {verifyMode === "phone" && (
            <React.Fragment>
              <Form.Item label="手机号">
                {getFieldDecorator("phone", {
                  rules: [{ required: true, message: "手机号必填！" }],
                })(<Input placeholder="手机号" />)}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "密码必填！" }],
                })(<Input placeholder="密码" />)}
              </Form.Item>
            </React.Fragment>
          )}
        </Form>
      </React.Fragment>
    );
  }
}

const CreateEleForm = connect(({ eleSteps, loading, sms }: EleConnectState) => ({
  unOpenPartnerList: eleSteps.unOpenPartnerList,
  partnerKey: eleSteps.partnerKey,
  cutDown: sms.cutDown,
  partnerKeyLoading: loading.effects["eleSteps/getPartnerKey"],
  initialLoading: loading.effects["eleSteps/fetchUnOpenPartnerList"],
}))(BasicCreateEleForm);

export default CreateEleForm;
