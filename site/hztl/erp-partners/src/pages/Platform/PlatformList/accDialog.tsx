import { Steps, Form, Modal } from "antd";
import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { connect } from "dva";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { FormCreateRef, FormCreateProps } from "@/constant";

import style from "./accDialog.scss";
import { createEleSteps } from "../models/platformList";
import { PlatformConnectState } from "../models";
import GetDealerIdForm from "./GetDealerIdForm";
import PartnerForm, { PartnerFormProps } from "../PartnerForm";

const { Step } = Steps;
export interface StepsProps {
  partnerKey: string;
  visible: boolean;
  current: number;
  dispatch: Dispatch<AnyAction>;
}

const EnhancedGetDealerIdForm = Form.create<FormCreateProps>()(GetDealerIdForm);
const EnhancedPartnerForm = Form.create<PartnerFormProps>()(PartnerForm);
const CreateSteps: React.FC<StepsProps> = props => {
  const { current, visible, partnerKey, dispatch } = props;
  const dealerForm = React.useRef<FormCreateRef<never>>(null);
  const partnerForm = React.useRef<FormCreateRef<Pick<PartnerFormProps, "formData">>>(null);

  function preStep() {
    switch (current) {
      case 0:
        dispatch({
          type: "platformList/cancleStep",
        });
        break;
      case 1:
        dispatch({
          type: "platformList/preStep",
        });
        break;
    }
  }
  
  function nextStep() {
    switch (current) {
      case 0:
        if (dealerForm && dealerForm.current) {
          const { validateFields }: WrappedFormUtils = dealerForm.current.getForm();
          validateFields((err, values) => {
            if (!err) {
              dispatch({
                type: "platformList/getDealerParams",
                payload: values,
              });
            }
          });
        }
        break;
      case 1:
        if (partnerForm && partnerForm.current) {
          const { validateFields }: WrappedFormUtils = partnerForm.current.getForm();
          validateFields((err, values) => {
            let obj = Object.assign({},values,{priceTypes :[values.priceType]});
            if (!err) {
              dispatch({
                type: "platformList/createEle",
                payload: obj,
              });
            }
          });
        }
        break;
    }
  }
  return (
    <Modal
      title="三方电商平台授权"
      visible={visible}
      maskClosable={false}
      destroyOnClose
      width={600}
      onCancel={preStep}
      onOk={nextStep}
      cancelText={current === 0 ? "取消" : "上一步"}
      okText={current < createEleSteps.length - 1 ? "下一步" : "完成"}
    >
      <div className={style.container}>
        <Steps current={current}>
          {createEleSteps.map(item => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>
        {current === 0 && <EnhancedGetDealerIdForm ref={dealerForm} />}
        {current === 1 && <EnhancedPartnerForm formData={{ partnerKey }} ref={partnerForm} />}
      </div>
    </Modal>
  );
};

export default connect(({ platformList }: PlatformConnectState) => ({
  visible: platformList.isOpend,
  current: platformList.currentStep,
  partnerKey: platformList.partnerKey,
}))(CreateSteps);
