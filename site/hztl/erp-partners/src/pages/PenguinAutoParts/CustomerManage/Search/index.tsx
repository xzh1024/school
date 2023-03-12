import React from 'react'
import { AnyAction } from "redux";
import { connect, Dispatch } from "dva";
import { WrappedFormUtils } from "antd/lib/form/Form";
import styles from "./index.scss";
import { CustomerConnectState } from "../models";
import { CustomerModel, CustomerParamModel } from "@/constant";
import { Row, Col, Form, Select, Input, Button, Divider, Checkbox, DatePicker } from "antd";
import moment from "moment";

export interface FormProps {
  list: CustomerModel[];
  search: CustomerParamModel;
  form: WrappedFormUtils;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
  totalSize: number;
  selectedRows: CustomerModel[];
  checkAll: boolean;
}

const CustomerManageSearch: React.FC<FormProps> = props => {
  const {
    list,
    form,
    search,
    loading,
    dispatch,
    totalSize,
    selectedRows,
    checkAll,
  } = props;
  const { resetFields, validateFields, getFieldDecorator } = form;

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      let bindDateStart = "";
      let bindDateEnd = "";
      const bindDateList = values["bindDateList"] || [];
      bindDateList.forEach((momentItem: any, index: number) => {
        switch (index) {
          case 0:
            bindDateStart = momentItem.format("YYYY-MM-DD");
            break;
          case 1:
            bindDateEnd = momentItem.format("YYYY-MM-DD");
            break;
          default:
            break;
        }
      });
      dispatch({
        type: "customer/searchChange",
        payload: {
          erpName: values["erpName"],
          name: values["name"],
          bindStatus: values["bindStatus"],
          bindDateStart,
          bindDateEnd,
        }
      });
    });
  }

  function handleReset() {
    resetFields();
    dispatch({
      type: "customer/saveSearch",
      payload: {
        erpName: "",
        name: "",
        bindStatus: 0,
        bindDateStart: "",
        bindDateEnd: "",
      }
    });
  }

  function handleAll(e: any) {
    dispatch({
      type: "customer/saveCheckAll",
      payload: e.target.checked,
    });
  }

  // 显示绑定/换绑弹框
  const showBindDialog = (isBind: boolean = false) => {
    dispatch({
      type: "customer/startBindDialog",
      payload: checkAll ? {customersCond: {...search}} : {customers: [...selectedRows]},
      isBind,
    })
  }

  // 显示解绑弹框
  const showUnbindDialog = () => {
    dispatch({
      type: "customer/startUnbindDialog",
      payload: checkAll ? {customersCond: {...search}} : {customers: selectedRows.map(item => item.id)},
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  // 批量操作按钮禁用判断
  const operationButtonDisabled = (type: "bind" | "unbind") => {
    let disabled = true;
    if (checkAll) {
      if (totalSize) {
        disabled = false;
      }
    } else {
      if (selectedRows.length) {
        if (selectedRows.length && list.length) {
          let unbindCount = 0;
          let bindCount = 0;
          selectedRows.forEach(item => {
            if (item.erpId) {
              ++unbindCount;
            } else {
              ++bindCount;
            }
          });
          switch (type) {
            case "bind": {
              if (bindCount) {
                disabled = false;
              }
              break;
            }
            case "unbind": {
              if (unbindCount) {
                disabled = false;
              }
              break;
            }
            default:
              break;
          }
        }
      }
    }
    return disabled;
  }

  return (
    <Form className={styles.form_container} {...formItemLayout} onSubmit={handleSearch}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item label="往来单位">
            {getFieldDecorator("erpName", {
              initialValue: search.erpName,
            })(<Input placeholder="往来单位名称/编码" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="平台用户名">
            {getFieldDecorator("name", {
              initialValue: search.name,
            })(<Input placeholder="平台用户名称" />)}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item label="绑定状态">
            {getFieldDecorator("bindStatus", {
              initialValue: search.bindStatus,
            })(<Select placeholder="全部">
              <Select.Option value={0}>全部</Select.Option>
              <Select.Option value={1}>已绑定</Select.Option>
              <Select.Option value={2}>未绑定</Select.Option>
            </Select>)}
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="绑定日期">
            {getFieldDecorator("bindDateList", {
              initialValue: search.bindDateStart ? [moment(search.bindDateStart, "YYYY-MM-DD"), moment(search.bindDateEnd, "YYYY-MM-DD")] : null,
            })(<DatePicker.RangePicker />)}
          </Form.Item>
        </Col>
      </Row>
      <Divider className={styles.Divider} />
      <Row>
        <Col span={18}>
          <Checkbox onChange={handleAll} checked={checkAll}>全选当前查询结果</Checkbox>
          <Divider type="vertical" />
          <span>已选中{checkAll ? totalSize : selectedRows.length}条</span>
          <Divider type="vertical" />
          <span>批量操作</span>
          <Button
            type="primary"
            className={styles.m_l_10}
            disabled={operationButtonDisabled("unbind")}
            onClick={showUnbindDialog}
          >
            解绑
          </Button>
          <Button
            type="primary"
            className={styles.m_l_10}
            disabled={operationButtonDisabled("unbind")}
            onClick={() => (showBindDialog(true))}
          >
            换绑
          </Button>
          <Button
            type="primary"
            className={styles.m_l_10}
            disabled={operationButtonDisabled("bind")}
            onClick={() => (showBindDialog())}
          >
            绑定
          </Button>
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            清空条件
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default connect(({ customer, loading }: CustomerConnectState) => ({
  list: customer.list,
  search: customer.search,
  totalSize: customer.totalSize,
  selectedRows: customer.selectedRows,
  checkAll: customer.checkAll,
  loading: loading.effects["customer/fetchData"],
}))(CustomerManageSearch);
