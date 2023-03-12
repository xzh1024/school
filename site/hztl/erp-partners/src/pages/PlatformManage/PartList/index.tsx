import React, { Component } from "react";
import { Form, Menu, Layout, Modal, Button, Row, Col, Input, Select, Divider } from "antd";
import { connect, Dispatch } from "dva";
import { AnyAction } from "redux";
import { PART_UP_STATE } from "@/constant";
import PartSearchForm from "../PartSearchForm";
import TableBasic from "../TableBasic";
import { PartConnectState } from "../models";
import { SelectParam } from "antd/lib/menu";
import styles from "./index.scss"
import { WrappedFormUtils } from "antd/lib/form/Form";
import { PartsStoreModel } from "@/constant";

export interface FormProps {
  form: WrappedFormUtils;
  loading: boolean | undefined;
  dispatch: Dispatch<AnyAction>;
  storeList: PartsStoreModel[];
  propertyList: string[];
}

const { Option } = Select;
const PartDialogForm: React.FC<FormProps> = props => {
  const { form, loading, dispatch, storeList, propertyList } = props;
  const { validateFields, getFieldDecorator } = form;
  const priceType = [{ name: "零售价", value: "lingshou" }, { name: "平台价", value: "pigtai" }, { name: "批发价", value: "p" }, { name: "批发价一", value: "p1" }, { name: "批发价二", value: "p2" }, { name: "批发价三", value: "p3" }, { name: "批发价四", value: "p4" }]

  function moreSetting() {
    //跳转到平台的设置页面
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFields((err, values) => {
      if (err) {

      } else {
        // dispatch({
        //   type: "part/searchChange",
        //   payload: values,
        // });
      }
    });
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Form {...formItemLayout} className={styles.container} onSubmit={handleSearch}>
      <Form.Item className={styles.marginb_10} label="是否与总公司共用上架的配件">
        {getFieldDecorator("partnerKey", {})(
          <Select placeholder="是否与总公司共用上架的配件">
            <Option value="yes">是</Option>
            <Option value="no">否</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="配件是否自动上架">
        {getFieldDecorator("partnerKey", {})(
          <Select placeholder="配件是否自动上架">
            <Option value="yes">是</Option>
            <Option value="no">否</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="同步到平台价格类型">
        {getFieldDecorator("partnerKey", {})(
          <Select placeholder="同步到平台价格类型" mode="multiple">
            {priceType.map((item, index) => {
              return (<Option value={item.value} key={index}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="出库价格为0的不能上架">
        {getFieldDecorator("partnerKey", {})(
          <Select placeholder="出库价格为0的不能上架" mode="multiple">
            {priceType.map((item, index) => {
              return (<Option value={item.value} key={item.name}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Form.Item className={styles.marginb_10} label="同步到平台价格类型">
        {getFieldDecorator("partnerKey", {})(
          <Select placeholder="同步到平台价格类型" mode="multiple">
            {priceType.map((item, index) => {
              return (<Option value={item.value} key={item.value}>{item.name}</Option>)
            })}
          </Select>,
        )}
      </Form.Item>
      <Divider className={styles.Divider} />
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
          <Button style={{ marginLeft: 8 }} onClick={moreSetting}>更多设置</Button>
        </Col>
      </Row>
      <div className={styles.setting_tips}>
        上架参数设置说明
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
const DialogFormState = connect(({partBaseData}: PartConnectState) => ({
                  storeList: partBaseData.storeList,
                propertyList: partBaseData.propertyList
              }))(PartDialogForm);
              
const {Content, Header} = Layout;
                
interface PartProps {
                  dispatch: Dispatch<AnyAction>;
                  visible: boolean;
                  currentStep: number;
                  activeTab: string;
                }
interface PartState {
                    dialogVisible: boolean;
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
              const DialogForm = Form.create()(DialogFormState);
              
class PartList extends Component<PartProps, PartState> {
                    state = { dialogVisible: false }
  componentWillMount() {
    const {dispatch, location} = this.props;
    const param = {
                    partnerKey: location.query.key
                }
    dispatch({
                    type: "partBaseData/fetchEleList",
                  payload: param
                });
    dispatch({
                    type: "partBaseData/getPropertyList"
                });
    dispatch({
                    type: "partBaseData/getStoreList"
                });
              }
  tabChange = (value: SelectParam) => {
    const {dispatch} = this.props;
    dispatch({
                    type: "part/upStateChange",
                  payload: value.key === PART_UP_STATE.up,
                });
              };
  putawaySetting = () => {
                    //请求当前数据
                    this.setState({ dialogVisible: true })
                  }
                  handleCancel = () => {
                    this.setState({ dialogVisible: false })
                  }
                  render() {
    const {activeTab} = this.props;
                  return (
      <Layout className="full-height">
                    <Header className={styles.headerNoPadding}>
                      <Menu theme="light" defaultSelectedKeys={[activeTab]} onSelect={this.tabChange} mode="horizontal">
                        {tabs.map(tab => (
                          <Menu.Item key={tab.key}>{tab.name}</Menu.Item>
                        ))}
                      </Menu>
                      <span className={styles.putaway} onClick={this.putawaySetting}>上架参数设置</span>
                    </Header>
                    <Content className="full-height" style={{ padding: "10px 16px" }}>
                      <EnhancedForm />
                      <TableBasic />
                    </Content>
                    <Modal
                      title="三方电商平台授权操作手册"
                      visible={this.state.dialogVisible}
                      onCancel={this.handleCancel}
                      width="600px"
                      maskClosable={false}
                      footer={null}
                    >
                      <DialogForm />
                    </Modal>
                  </Layout>
                  );
                }
              }
              
export default connect(({part}: PartConnectState) => ({
                    activeTab: part.isUp ? PART_UP_STATE.up : PART_UP_STATE.noup,
                }))(PartList);
