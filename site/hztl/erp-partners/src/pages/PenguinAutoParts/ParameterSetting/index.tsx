import React, { Component } from "react";
import CardItem from "@/components/CardItem";
import { Button } from "antd";
import SettingForm from "./SettingForm";
import { connect, Dispatch } from "dva";
import { AnyAction } from "redux";
import { ParameterSettingConnectState } from "./models";
import { PriceTypeModel } from "@/constant";
import router from "umi/router";
import styles from "./index.scss";

// const settingFormRef = React.createRef();

interface ParameterSettingProps {
  dispatch: Dispatch<AnyAction>;
  loading: boolean | undefined;
  priceTypeList: PriceTypeModel[];
}

class ParameterSetting extends Component<ParameterSettingProps> {
  private settingFormRef = React.createRef<any>();
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "parameterSetting/getPartsStores" }); // 获取配件仓库列表
    dispatch({ type: "parameterSetting/fetchPriceTypes" }); // 获取价格类型列表
    dispatch({ type: "parameterSetting/loadSetting" });
  }

  save = () => {
    const form = this.settingFormRef.current;
    const { dispatch } = this.props;
    form.validateFields((err: boolean, values: any) => {
      if (err) {
        return;
      }
      dispatch({
        type: "parameterSetting/fetchSaveSetting",
        payload: values,
      });
    })
  }

  handleReset = () => {
    const form = this.settingFormRef.current;
    form.resetFields();
    const { dispatch, priceTypeList } = this.props;
    const findData = priceTypeList.find(item => item.name === "零售价");
    dispatch({
      type: "parameterSetting/setSettingParam",
      payload: {
        warehouses: [],
        priceType: findData ? findData.code : "",
        auto: false,
        autoPriceZero: false,
        autoQtyZero: false,
        autoNewCustomer: false,
      },
    });
  }

  render() {
    const { loading } = this.props;
    
    return (
      <div style={{boxSizing: "border-box", height: "100%", padding: "8px"}}>
        <CardItem>
          {{
            content: (
              // <SettingForm ref="settingForm" />
              <SettingForm ref={this.settingFormRef} />
            ),
            title: "参数设置",
            extra: (<div>
              <Button
                type="primary"
                style={{marginRight: "10px"}}
                onClick={this.save}
                loading={loading}
              >
                保存
              </Button>
              <Button
                type="primary"
                onClick={this.handleReset}
              >
                重置
              </Button>
            </div>)
          }}
        </CardItem>
        <div className={styles.button_back} onClick={() => router.push("/")}>&lt;&lt;&nbsp;返回平台目录</div>
      </div>
    )
  }
}

export default connect(({  parameterSetting, loading }: ParameterSettingConnectState) => ({
  priceTypeList:parameterSetting.priceTypeList,
  loading:loading.effects["parameterSetting/loadSetting"],
}))(ParameterSetting);
