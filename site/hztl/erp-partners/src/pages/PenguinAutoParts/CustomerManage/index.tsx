import React, { Component } from "react";
import { AnyAction } from "redux";
import { connect, Dispatch } from "dva";
import router from "umi/router";
import styles from "./index.scss";
import CustomerManageSearch from "./Search";
import CustomerManageTable from "./Table";
import { CustomerConnectState } from "./models";
import { StaffBaseModel } from "@/constant";
import { Form } from "antd";

interface PartProps {
  dispatch: Dispatch<AnyAction>;
  visible: boolean;
  currentStep: number;
  searchData: StaffBaseModel;
}

const EnhancedForm = Form.create()(CustomerManageSearch);

class CustomerManage extends Component<PartProps> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({type: "customer/fetchData"});
  }

  render() {
    return (
      <div className={styles.container}>
        <EnhancedForm />
        <CustomerManageTable />
        <div className={styles.button_back} onClick={() => router.push("/")}>&lt;&lt;&nbsp;返回平台目录</div>
      </div>
    )
  }
}

export default connect(({ customer }: CustomerConnectState) => ({
  search: customer.search,
}))(CustomerManage);
