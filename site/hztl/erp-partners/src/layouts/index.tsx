import React, { Component } from "react";
import { connect, Dispatch } from "dva";
import { Layout } from "antd";
import { IRoute } from "umi-types";
import BaseMenu from "./BaseMenu";
import { AnyAction } from "redux";
import { BaseMenuConnectState } from "../models"

const { Content } = Layout;

export interface BasicProps {
  route: IRoute;
  location: Location;
  dispatch: Dispatch<AnyAction>;
  basePlatShow: boolean;
}

class BasicLayout extends Component<BasicProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    //初始化请求路有权限
    dispatch({
      type: "baseAuth/getPlatAuth"
    })
  }
  render() {
    if (this.props.location.pathname.indexOf("/penguinAutoParts/") !== -1 && this.props.route.path === "/") {
      return (
        <Layout className="full-height">
          <Content>{this.props.children}</Content>
        </Layout>
      )
    }
    return (
      <Layout className="full-height">
        <BaseMenu {...this.props} />
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
// const BasicLayout: React.FC<BasicProps> = props => {
//   return (
//     <Layout className="full-height">
//       <BaseMenu {...props} />
//       <Layout>
//         <Content>{props.children}</Content>
//       </Layout>
//     </Layout>
//   );
// };
export default connect(({ baseAuth }: BaseMenuConnectState) => ({
  basePlatShow: baseAuth.platShow,
}))(BasicLayout);
