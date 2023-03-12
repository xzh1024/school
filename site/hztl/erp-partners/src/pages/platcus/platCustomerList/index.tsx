import React, { Component } from "react";
import { Form, Menu, Layout } from "antd";
import { connect, Dispatch } from "dva";
import { AnyAction } from "redux";
import PlatSearchForm from "../PartSearchForm";
import TableBasic from "../TableBasic";
import RelevanceDialog from "../RelevanceDialog"
import { PlatConnectState } from "../models";

const { Content, Sider } = Layout;

interface PartProps {
  dispatch: Dispatch<AnyAction>;
  visible: boolean;
  currentStep: number;
}

const EnhancedForm = Form.create()(PlatSearchForm);

class PartList extends Component<PartProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "platList/fetchData"
    })
  }
  render() {
    return (
      <Layout className="full-height">
        <Content className="full-height" style={{ padding: "10px 16px" }}>
          <EnhancedForm />
          <TableBasic />
          <RelevanceDialog />
        </Content>
      </Layout>
    );
  }
}

export default connect(({ platList }: PlatConnectState) => ({
  visible: platList.visible
}))(PartList);
