import React from "react";
import { connect } from "dva";
import { Form, Select, Switch, Icon, Tooltip } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { ParameterSettingConnectState } from "../models";
import styles from "./index.scss"
import { PartsStoreModel, PartnerModel, PriceTypeModel } from "@/constant";

interface FormProps {
  form: WrappedFormUtils;
  formData: PartnerModel;
  priceTypeList: PriceTypeModel[];
  storeList: PartsStoreModel[];
  isTL:boolean;
  validateFields: any;
}

const { Option } = Select;
const ParameterSettingForm: React.FC<FormProps> = props => {
  const { form, formData, priceTypeList, storeList } = props;
  const { getFieldDecorator } = form;
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
  };

  const warehousesLabelNode = (
    <span>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、在报价时需要获取配件的库存，此处是设置获取库存的仓库，如：配件A 性质‘完好’，在001仓库库存为‘10’ 002仓库库存为‘5’，支持报价的仓库为001，则报价时获取到的配件A库存为10而非15；</p>
            <p>2、注意：报价时默认只匹配配件性质为‘完好’的配件。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      支持报价的库存仓库
    </span>
  );
  const priceTypeLabelNode = (
    <span>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、新客户定义：企鹅汽配中未绑定ERP往来单位的客户为新客户，员工在给新客户报价时默认按此处设置的价格类型来进行报价。</p>
            <p>2、老客户定义：已绑定ERP往来单位的客户为老客户，在报价时默认按ERP中对应的往来单位享受的价格体系进行报价，不单独在此处进行设置。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      新客户默认享受的价格类型
    </span>
  );
  const autoLabelNode = (
    <span onClick={e => e.preventDefault()}>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、若启用则当客户询价时可自动根据设置好的参数进行自动回复价格。</p>
            <p>2、若不启用则不自动回复价格。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      是否启用自动报价
    </span>
  );
  const autoPriceZeroLabelNode = (
    <span onClick={e => e.preventDefault()}>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、若允许，则当配件对应的客户享受的价格为0或无价格时会直接按0价格回复。</p>
            <p>2、若不允许，则当匹配的配件对应的客户享受的价格为0或无价格时则不对该配件自动回复价格。</p>
            <p>3、因为价格为0或无价格而未自动回复报价的配件会记录到报价篮的‘报价失败’中。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      价格为0的配件是否允许自动报价
    </span>
  );
  const autoQtyZeroLabelNode = (
    <span onClick={e => e.preventDefault()}>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、若允许，则当配件的库存为0或无库存记录时会自动回复价格。</p>
            <p>2、若不允许，则当配件库存为0或无库存记录时则不对该配件自动回复价格。</p>
            <p>3、因为库存为0或无库存记录而未自动回复报价的配件会记录到报价篮的‘报价失败’中。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      库存为0的配件是否允许自动报价
    </span>
  );
  const autoNewCustomerLabelNode = (
    <span onClick={e => e.preventDefault()}>
      <Tooltip
        placement="leftBottom"
        title={(
          <div>
            <p>1、若允许，则新客户询价时会自动按设置的享受价格进行自动回复价格。</p>
            <p>2、若不允许，则新客户询价时始终不会自动回复价格。</p>
          </div>
        )}
        arrowPointAtCenter
      >
        <Icon type="question-circle" theme="filled" />
      </Tooltip>
      新客户是否允许自动报价
    </span>
  );
  return (
    <Form {...formItemLayout} className={styles.setting_form}>
      <div className={styles.setting_title}>报价基础设置</div>
      <Form.Item label={warehousesLabelNode}>
        {getFieldDecorator("warehouses", {
          initialValue: formData.warehouses
        })(
          <Select placeholder="全部" mode="multiple" maxTagCount={1} allowClear>
            {storeList.map((item, index) => {
              return (<Option value={item.depotNo} key={index}>{item.depotName}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label={priceTypeLabelNode}>
        {getFieldDecorator("priceType", {
          initialValue: formData.priceType
        })(
          <Select placeholder="请选择">
            {priceTypeList.map((item, index) => {
              return (<Option value={item.code} key={index}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <div className={styles.setting_title}>自动报价设置</div>
      <Form.Item label={autoLabelNode}>
        {getFieldDecorator("auto", {
          valuePropName: "checked",
          initialValue: formData.auto
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </Form.Item>
      <Form.Item label={autoPriceZeroLabelNode}>
        {getFieldDecorator("autoPriceZero", {
          valuePropName: "checked",
          initialValue: formData.autoPriceZero
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </Form.Item>
      <Form.Item label={autoQtyZeroLabelNode}>
        {getFieldDecorator("autoQtyZero", {
          valuePropName: "checked",
          initialValue: formData.autoQtyZero
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </Form.Item>
      <Form.Item label={autoNewCustomerLabelNode}>
        {getFieldDecorator("autoNewCustomer", {
          valuePropName: "checked",
          initialValue: formData.autoNewCustomer
        })(
          <Switch checkedChildren="是" unCheckedChildren="否" />
        )}
      </Form.Item>
    </Form>
  );
};
const SettingFormBase = connect(({  parameterSetting }: ParameterSettingConnectState) => ({
  formData:parameterSetting.formData,
  priceTypeList:parameterSetting.priceTypeList,
  storeList:parameterSetting.storeList,
}))(ParameterSettingForm);

const SettingForm = Form.create()(SettingFormBase);
export default SettingForm;
