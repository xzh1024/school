import { Steps, Form, Modal } from "antd";
import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { connect } from "dva";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { FormCreateRef, FormCreateProps } from "@/constant";

import style from "./index.scss";
import { createEleSteps } from "../models/eleSteps";
import { EleConnectState } from "../models";
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
          type: "eleSteps/cancleStep",
        });
        break;
      case 1:
        dispatch({
          type: "eleSteps/preStep",
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
                type: "eleSteps/getDealerParams",
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
            if (!err) {
              dispatch({
                type: "eleSteps/createEle",
                payload: values,
              });
            }
          });
        }
        break;
    }
  }

  return (
    <Modal
      title={current === 0 ? "新增电商" : "电商设置"}
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

export default connect(({ eleSteps }: EleConnectState) => ({
  current: eleSteps.currentStep,
  visible: eleSteps.isOpend,
  partnerKey: eleSteps.partnerKey,
}))(CreateSteps);
