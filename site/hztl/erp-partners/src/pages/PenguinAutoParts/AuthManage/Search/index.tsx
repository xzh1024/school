import React from 'react'
import { AnyAction } from "redux";
import { connect, Dispatch } from "dva";
import { WrappedFormUtils } from "antd/lib/form/Form";
import styles from "./index.scss";
import { StaffConnectState } from "../models";
import { StaffModel, StaffBaseModel } from "@/constant";
import { Row, Col, Form, Select, Input, Button, Divider, Checkbox } from "antd";

export interface FormProps {
  list: StaffModel[];
  search: StaffBaseModel;
  form: WrappedFormUtils;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
  totalSize: number;
  selectedRowKeys: number[];
  checkAll: boolean;
}

const AuthManageSearch: React.FC<FormProps> = props => {
  const {
    list,
    form,
    search,
    loading,
    dispatch,
    totalSize,
    selectedRowKeys,
    checkAll,
  } = props;
  const { resetFields, validateFields, getFieldDecorator } = form;

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: "staff/searchChange",
        payload: {
          ...values
        }
      });
    });
  }

  function handleReset() {
    resetFields();
    dispatch({
      type: "staff/saveSearch",
      payload: {
        name: "",
        code: "",
        department: "",
        bindStatus: 0,
      }
    });
  }

  function handleAll(e: any) {
    dispatch({
      type: "staff/saveCheckAll",
      payload: e.target.checked,
    });
  }

  // 显示员工授权码弹框
  const showAuthCode = () => {
    dispatch({
      type: "staff/fetchAuthCodeList",
      payload: checkAll ? {...search} : {ids: [...selectedRowKeys]},
    })
  };
  // 显示解除授权弹框
  const showAuthRelieve = () => {
    dispatch({
      type: "staff/authRelieveChange",
      payload: checkAll ? {...search} : {ids: [...selectedRowKeys]},
    })
  };

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
  const authDisabled = (type: "getting" | "relieve") => {
    let disabled = true;
    if (checkAll) {
      if (totalSize) {
        disabled = false;
      }
    } else {
      if (selectedRowKeys.length) {
        if (selectedRowKeys.length && list.length) {
          let gettingCount = 0;
          let relieveCount = 0;
          selectedRowKeys.forEach(id => {
            const findData = list.find(item => item.id === id);
            if (findData) {
              if (findData.authed) {
                ++relieveCount;
              } else {
                ++gettingCount;
              }
            }
          });
          switch (type) {
            case "getting": {
              if (gettingCount) {
                disabled = false;
              }
              break;
            }
            case "relieve": {
              if (relieveCount) {
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
          <Form.Item label="员工姓名">
            {getFieldDecorator("name", {
              initialValue: search.name,
            })(<Input placeholder="员工姓名" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="员工编号">
            {getFieldDecorator("code", {
              initialValue: search.code,
            })(<Input placeholder="员工编号" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="所属部门">
            {getFieldDecorator("department", {
              initialValue: search.department,
            })(<Input placeholder="所属部门" />)}
          </Form.Item>
        </Col>
        <Col span={6}>
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
      </Row>
      <Divider className={styles.Divider} />
      <Row>
        <Col span={18}>
          <Checkbox onChange={handleAll} checked={checkAll}>全选当前查询结果</Checkbox>
          <Divider type="vertical" />
          <span>已选中{checkAll ? totalSize : selectedRowKeys.length}条</span>
          <Divider type="vertical" />
          <span className={styles.m_r_10}>批量操作</span>
          <Button
            type="primary"
            className={styles.m_r_10}
            disabled={authDisabled("getting")}
            onClick={showAuthCode}
          >
            获取授权码
          </Button>
          <Button type="primary" disabled={authDisabled("relieve")} onClick={showAuthRelieve}>
            解除授权
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

export default connect(({ staff, loading }: StaffConnectState) => ({
  list: staff.list,
  search: staff.search,
  totalSize: staff.totalSize,
  selectedRowKeys: staff.selectedRowKeys,
  checkAll: staff.checkAll,
  loading: loading.effects["staff/fetchData"],
}))(AuthManageSearch);
