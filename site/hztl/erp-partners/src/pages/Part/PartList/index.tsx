import React, { Component } from "react";
import { Form, Menu, Layout } from "antd";
import { connect, Dispatch } from "dva";
import { AnyAction } from "redux";
import { PART_UP_STATE } from "@/constant";
import PartSearchForm from "../PartSearchForm";
import TableBasic from "../TableBasic";
import { PartConnectState } from "../models";
import { SelectParam } from "antd/lib/menu";

const { Content, Sider } = Layout;

interface PartProps {
  dispatch: Dispatch<AnyAction>;
  visible: boolean;
  currentStep: number;
  activeTab: string;
}

const tabs = [
  {
    name: "未上架配件",
    key: PART_UP_STATE.noup,
  },
  {
    name: "已上架配件",
    key: PART_UP_STATE.up,
  },
];

const EnhancedForm = Form.create()(PartSearchForm);

class PartList extends Component<PartProps> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "partBaseData/fetchEleList",
    });
  }

  tabChange = (value: SelectParam) => {
    const { dispatch } = this.props;
    dispatch({
      type: "part/upStateChange",
      payload: value.key === PART_UP_STATE.up,
    });
  };

  render() {
    const { activeTab } = this.props;
    return (
      <Layout className="full-height">
        <Sider>
          <Menu theme="light" defaultSelectedKeys={[activeTab]} onSelect={this.tabChange}>
            {tabs.map(tab => (
              <Menu.Item key={tab.key}>{tab.name}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content className="full-height" style={{ padding: "10px 16px" }}>
          <EnhancedForm />
          <TableBasic />
        </Content>
      </Layout>
    );
  }
}

export default connect(({ part }: PartConnectState) => ({
  activeTab: part.isUp ? PART_UP_STATE.up : PART_UP_STATE.noup,
}))(PartList);
