import React, { Component } from "react";
import { AnyAction } from "redux";
import { connect, Dispatch } from "dva";
import router from "umi/router";
import styles from "./index.scss";
import AuthManageSearch from "./Search";
import AuthManageTable from "./Table";
import { StaffConnectState } from "./models";
import { StaffBaseModel } from "@/constant";
import { Form } from "antd";

interface PartProps {
  dispatch: Dispatch<AnyAction>;
  visible: boolean;
  currentStep: number;
  searchData: StaffBaseModel;
}

const EnhancedForm = Form.create()(AuthManageSearch);

class AuthManage extends Component<PartProps> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({type: "staff/fetchData"});
  }

  render() {
    return (
      <div className={styles.auth_manage}>
        <EnhancedForm />
        <AuthManageTable />
        <div className={styles.button_back} onClick={() => router.push("/")}>&lt;&lt;&nbsp;返回平台目录</div>
      </div>
    )
  }
}

export default connect(({ staff }: StaffConnectState) => ({
  search: staff.search,
}))(AuthManage);
