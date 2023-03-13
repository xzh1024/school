import React, { Dispatch, Component } from "react";
import { Button } from "antd";
import { PartnerModel } from "@/constant";
import styles from "./index.scss";
import { connect } from "dva";
import { AnyAction } from "redux";
import TableBasic from "../TableBasic";
import CreateSteps from "../EleSteps";

interface ElectricityProps {
  dispatch: Dispatch<AnyAction>;
}

interface ElectricityState {
  editVisible: boolean;
  curElectricity: PartnerModel | undefined;
}

class ElectricityList extends Component<ElectricityProps, ElectricityState> {
  state = { editVisible: false, curElectricity: undefined };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "electricity/loadData",
    });
    dispatch({
      type: "partnerBaseData/fetchPartsPariceList",
    });

    dispatch({
      type: "partnerBaseData/fetchPartsStoreList",
    });
  }

  showModal = () => {
    this.setState({
      editVisible: true,
    });
  };

  createEle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "eleSteps/openStep",
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "eleSteps/cancleStep",
    });
  };

  render() {
    return (
      <div className={styles.container} style={{ padding: "10px 16px" }}>
        {/* <WrappedElectricitySearchForm>
          <Button type="primary">新增电商设置</Button>
        </WrappedElectricitySearchForm> */}
        <div className="container-block">
          <Button type="primary" onClick={this.createEle}>
            新增电商设置
          </Button>
        </div>
        <TableBasic className={styles.flexauto} />
        <CreateSteps />
      </div>
    );
  }
}

export default connect()(ElectricityList);
