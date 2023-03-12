import React, { Component } from "react";
import { Form,  Button, Row, Col,  Select, Divider } from "antd";
import { connect, Dispatch } from "dva";
import { AnyAction } from "redux";
import { PlatformConnectState } from "../models";
import styles from "./index.scss"
import { WrappedFormUtils } from "antd/lib/form/Form";
import { PartsStoreModel,PartnerModel,PriceTypeModel } from "@/constant";
import router from 'umi/router';
import { func } from 'prop-types';


interface FormProps {
  form: WrappedFormUtils;
  formData: PartnerModel;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
  storeList: PartsStoreModel[];
  priceList:PriceTypeModel[];
  priceZeroNotUpList:PriceTypeModel[];
  propertyList: string[];
  dialogShow:boolean;
  isTL:boolean;
}

const { Option } = Select;
const PartDialogForm: React.FC<FormProps> = props => {
  let { form, formData ,loading, dispatch, storeList, propertyList,priceList, priceZeroNotUpList, dialogShow } = props;
  const { validateFields, getFieldDecorator,setFieldsValue,resetFields } = form;

  // priceList = formData.isTL ? priceList : [{code: "alliance", name: "平台价"}];


  let defaultStoreList = new Array();//默认允许上传的仓库平台
  storeList.forEach(p =>{
    defaultStoreList.push(p.depotNo);
  })

  const tlPriceTypes = ["alliance","retail","p","p1","p2","p3","p4"];//通联平台
  // const ftlPriceTypes = ["alliance","retail","p","p1","p2","p3","p4"];//非通联平台
  const ftlPriceTypes = "alliance";//非通联平台
  let formList = {
    dealerId:formData.dealerId,
    status:formData.status,
    isTL:formData.isTL,
    // isTL:false,
    partnerKey: formData.partnerKey,
    toPreview: formData.toPreview?'1':'0',
    useGroupParts: formData.useGroupParts?'1':'0',
    autoUp: formData.autoUp?'1':'0',
    priceTypes: formData.priceTypes ? formData.priceTypes : (formData.isTL? tlPriceTypes : ftlPriceTypes),
    priceZeroNotUp: formData.priceZeroNotUp ? formData.priceZeroNotUp : [],
    properties: formData.properties ? formData.properties : ['完好'],
    store: formData.store ? formData.store : defaultStoreList,
  }
  // console.log('formList',formList);
  const { toPreview, useGroupParts, autoUp, priceTypes, priceZeroNotUp, store, properties, partnerKey, isTL  } = formList || {};
  const priceMode = isTL ? "multiple" : "default";

  const { domain } = formData
  function moreSetting() {//更多设置-->跳转到平台的设置页面
    validateFields((err, values) => {
      if (!err) {
        let paramObj = {
          ...formList,
          ...values,
          // priceTypes:isTL ? values.priceTypes : [values.priceTypes],
          autoUp:parseInt(values.autoUp) ? true : false,
          useGroupParts:parseInt(values.useGroupParts) ? true : false,
          toPreview:parseInt(values.toPreview) ? true : false,
        }
        let obj = {partnerKey,...paramObj};
        dispatch({
          type: "platformList/fetchSaveSetting",
          payload: obj,
        });
        handleFeedBack("/union_setting_page",partnerKey);//跳转到系统设置页
      }
    });
  }
  function handleFeedBack(URL:string,partnerKey:any) {
    let url = "";
    let configParams = JSON.parse(localStorage.getItem("configParams") +'');
    const { serverUrl,dbAccount,corpID,parentCorpID } = configParams;
    if (process.env.NODE_ENV === "development") {
      url = `http://localhost:8080/#${URL}?serverUrl=${serverUrl}
      &dbAccount=${dbAccount}&corpID=${corpID}&parentCorpID=${parentCorpID}
      &partnerKey=${partnerKey}`;
    } else {
      url = `${domain}/#${URL}?serverUrl=${serverUrl}
      &dbAccount=${dbAccount}&corpID=${corpID}&parentCorpID=${parentCorpID}
      &partnerKey=${partnerKey}`;
    }
    window.open(url);
  }
  function saveSetting(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        let paramObj = {
          ...formList,
          ...values,
          priceTypes:typeof(values.priceTypes) == 'string' ? [values.priceTypes] : values.priceTypes,
          autoUp:parseInt(values.autoUp) ? true : false,
          useGroupParts:parseInt(values.useGroupParts) ? true : false,
          toPreview:parseInt(values.toPreview) ? true : false,
        }
        let obj = {partnerKey,...paramObj};
        dispatch({
          type: "platformList/fetchSaveSetting",
          payload: obj,
        });
      }
    });
  }
  function changePriceType(value: string){
    let priceParms =new Array();
    for(let k of value){
      for(let j of priceList){
        if(k == j.code){
          priceParms.push(j);
        }
      }
    }
    dispatch({
      type: "platformList/changePriceType",
      payload: priceParms,
    });

  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 },
    },

  };
  return (
    <Form {...formItemLayout} className={styles.container}  onSubmit={saveSetting} >
      {partnerKey === "KS" && (
      <Form.Item className={styles.marginb_10} label="数据推送环境">
        {getFieldDecorator("toPreview", {
          rules:[{required:true,message:"请选择数据推送环境"}],
          initialValue: toPreview,
        })(
          <Select placeholder="数据推送环境">
            <Option value="0">正式环境</Option>
            <Option value="1">沙箱/预发布环境</Option>
          </Select>,
        ) }
      </Form.Item>
      )}
      <Form.Item className={styles.marginb_10} label="是否与总公司共用上架的配件">
        {getFieldDecorator("useGroupParts", {
          rules:[{required:true,message:"请选择是否与总公司共用上架的配件"}],
          initialValue: useGroupParts,
        })(
          <Select placeholder="是否与总公司共用上架的配件">
            <Option value="1">是</Option>
            <Option value="0">否</Option>
          </Select>,
        ) }
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="配件是否自动上架" >
        {getFieldDecorator("autoUp", {
          rules:[{required:true,message:"请选择配件是否自动上架"}],
          initialValue: autoUp
        })(
          <Select placeholder="配件是否自动上架">
            <Option value="1">是</Option>
            <Option value="0">否</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="同步到平台价格类型">
        {getFieldDecorator("priceTypes", {
          rules:[{required:true,message:"请选择同步到平台价格类型"}],
          initialValue: priceTypes
        })(
          <Select placeholder="同步到平台价格类型" mode={priceMode} onChange={changePriceType}>
            {priceList.map((item, index) => {
              return (<Option value={item.code} key={index}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="出库价格为0的不能上架">
        {getFieldDecorator("priceZeroNotUp", {
          initialValue: priceZeroNotUp
        })(
          <Select placeholder="出库价格为0的不能上架" mode="multiple">
            {priceZeroNotUpList.map(item => {
              return (<Option value={item.code} key={item.name}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="允许上架到平台的配件性质">
        {getFieldDecorator("properties", {
          rules:[{required:true,message:"请选择允许上架到平台的配件性质"}],
          initialValue: properties
        })(
          <Select placeholder="允许上架到平台的配件性质" mode="multiple">
            {propertyList.map((item, index) => {
              return (<Option value={item} key={index}>{item}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="允许上传库存到平台的仓库">
        {getFieldDecorator("store", {
          rules:[{required:true,message:"请选择允许上传库存到平台的仓库"}],
          initialValue: store
        })(
          <Select placeholder="允许上传库存到平台的仓库" mode="multiple">
            {storeList.map((item, index) => {
              return (<Option value={item.depotNo} key={index}>{item.depotName}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Divider className={styles.Divider} />
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading} >保存</Button>
          <Button style={{ marginLeft: 8 }} onClick={moreSetting}>更多设置</Button>
        </Col>
      </Row>
      <div className={styles.setting_tips}>
        <p>
          <span className={styles.tip_logo}>!</span>
          <span style={{ marginLeft: 6 }}>上架参数设置说明</span>
        </p>
          {"1、<是否与总公司共用上架的配件>配件到平台，做为分公司可直接共用总公司上架到平台的配件"}<br/>
          {"2、<配件是否自动上架>系统会将您当前的所有符合上面几个参数的配件信息自动上架到平台，当您有新增的配件时系统也会将符合上面几个参数设置的配件自动上架到平台"}<br/>
          {"3、<同步到平台的价格类型>选中的这些价格才同步到平台"}<br/>
          {"4、<出库价格为0的不能上架>当配件的这些价格类型为0时不能上架到平台，无论是手动上架还是自动上架"}<br/>
          {"5、<允许上架到平台的配件性质>选中的这些性质的配件能够上架到平台"}<br/>
          {"6、<允许上传库存到平台的仓库>选中的仓库才上传库存"}<br/>
      </div>

    </Form>
  );
};
const PartDialog = connect(({  platformList, loading }: PlatformConnectState) => ({
  propertyList:platformList.propertyList,
  storeList:platformList.storeList,
  priceList:platformList.priceList,
  priceZeroNotUpList:platformList.priceZeroNotUpList,
  partnerKey:platformList.partnerKey,
  formData:platformList.dialogData,
  dialogShow:platformList.dialogShow,
  loading:loading.effects["platformList/openDialog"],
}))(PartDialogForm);

const DialogForm = Form.create({
  onFieldsChange(props, changedFields) {
    console.log('onFieldsChange',props);
    console.log('changedFields',changedFields);

    // props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log('mapPropsToFields',props);
    // return {
    //   username: Form.createFormField({
    //     ...props.username,
    //     value: props.username.value,
    //   }),
    // };
  },
  onValuesChange(_, values) {
    // console.log('onValuesChange',values);
  },
})(PartDialog);
export default DialogForm
