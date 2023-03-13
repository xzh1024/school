import React, { Dispatch, Component } from "react";
import router from "umi/router";
import { PlatformConnectState } from "../models"
import { connect } from "dva";
import { AnyAction } from "redux";
import styles from "./index.scss";
import {  Icon,Tooltip, Switch, Button, Modal, Input, message } from "antd";
import ClipboardJS from "clipboard";
import { PlatFormListModel, UnPlatFormListModel  } from "@/constant";
import DialogForm from "../PlatSetting";
import AccDialog from "./accDialog";
// import CreateSteps from "../../Electricity/EleSteps";

interface PlatformProps {
  dispatch: Dispatch<AnyAction>;
  authedData: PlatFormListModel[];
  unauthedData: UnPlatFormListModel[];
  dialogShow:boolean;
  code:string;
  token:string;
  branchMode:boolean;
}

interface PlatformState {
  visible: boolean;
  accreditVisible: boolean;//通联
  showAccredit: object;
}
let clipboard:any = null;
const text = <span>1. 已按分公司授权，不能修改为按账套授权；<br/>2. 按账套授权修改为按分公司授权时，需要重新登录ERP。</span>;
const { confirm } = Modal;
class PlatformList extends Component<PlatformProps, PlatformState> {
  state = {
    visible: false,
    accreditVisible: false,
    showAccredit: { url: "", code: "",name:"" ,domain:""} ,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "platformList/loadData" })//获取已开通的数据
    dispatch({ type: "platformList/loadDataUnauthed" })//获取未开通的数据
    dispatch({ type: "platformList/getStoreList" })//获取仓库数据
    dispatch({ type: "platformList/getPropertyList" })//获取配件数据
    dispatch({ type: "platformList/getPriceList" })//获取价格类型数据
    dispatch({ type: "platformList/getBase" })//获取公司授权开关接口
    

    setTimeout(()=>{
      clipboard = new ClipboardJS("#copy-inline-btn");
    },1000)
  }
  private get authedList() {
    const { authedData } = this.props;
    return authedData
  }
  private get unauthedList() {
    const { unauthedData } = this.props;
    return unauthedData
  }
  private get branchModeBool() {
    const { branchMode } = this.props;
    return branchMode
  }
  checkThird = () => {
    this.setState({
      visible: true,
    });
  }
  clearStock = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "platformList/clearStock",
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  toManage = (item: PlatFormListModel) => {//参数设置
    if(item.verifyMode === "staffAuth") {
      router.push("/penguinAutoParts/authManage");
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type:"platformList/openDialog",
      payload: {
        partnerKey: item.partnerKey ,
        isTL:item.isTL?item.isTL:false,
        domain:item.domain
      }
    })
  }
  toPlatform = (item:any,type:any) => {//进入平台
    const { dispatch } = this.props;

    if(type && item.isTL){
      dispatch({
        type:"platformList/getAuthToken",
        payload: { partnerKey: item.partnerKey, allianceId: item.allianceId }
      })
    }
    let url = item.domain;
    setTimeout(()=>{
      if(url){
        // let URL = type ? url.replace('https://','http://') : url;
        let URL = url;
        this.handleFeedBack(URL,item.partnerKey || item.key,type);
      }else{
        message.error("链接不存在");
      }
    },400);


  }
  handleFeedBack = (URL:string | undefined,partnerKey:string,type:any) =>{
    const { token } = this.props;
    let url = "";
    let Token = type ? encodeURIComponent(token) : '';
    // let configParams = JSON.parse(localStorage.getItem("configParams")+'');
    // const { serverUrl,dbAccount,corpID,parentCorpID } = configParams;
    if (process.env.NODE_ENV === "development") {
      // url = `localhost:8080/#/single_login?token=${Token}`;

      url = Token?`${URL}?token=${Token}&next=deal_search_list`:`${URL}`;
    } else {
      url = Token?`${URL}?token=${Token}&next=deal_search_list`:`${URL}`;
      // url = `${URL}/#/single_login?token=${Token}&serverUrl=${serverUrl}&dbAccount=${dbAccount}&corpID=${corpID}&parentCorpID=${parentCorpID}&partnerKey=${partnerKey}`;
    }
    window.open(url);
  }
  toAccredit = (item: any) => {//点击授权按钮
    if(item.verifyMode === "staffAuth") {
      router.push('/penguinAutoParts/authManage');
      return;
    }
    const { dispatch } = this.props;
    if(!item.isTL) {
      dispatch({
        type:"platformList/openStep",//
      })
      dispatch({
        type:"platformList/changePartnerKey",//
        payload: item.key
      })
    }else{
      dispatch({
        type:"platformList/getAuthCode",//获取授权码
        payload: { partnerKey: item.key }
      })
      setTimeout(()=>{
        let code = sessionStorage.getItem("code");
        if(code){
          let obj = {
            url:item.logo,
            code:code,
            name:item.name,
            domain:item.domain
          }
          this.setState({
            accreditVisible: true,
            showAccredit: obj
          })
        }
      },200)
    }


  }
  handleCancelAccredit = () => {//取消授权码
    const { dispatch } = this.props;
    dispatch({
      type:"platformList/cancelAuthCode",//获取授权码
    })
    this.setState({
      accreditVisible: false
    })
  }
  accredit = () => {
    //默认自动复制授权码，然后跳转
    var copyBtn = document.getElementById("copy-inline-btn");
    if (copyBtn) {
      copyBtn.click();
    }
    //判断跳转
    let url = this.state.showAccredit.domain;
    window.open(url);
  }

  dialogCancel = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type:"platformList/closeDialog",
      payload: { dialogShow: false }
    })
  }
  copyLicenseCode = () => {
    const clipboard = new ClipboardJS("#copy-inline-btn");
    clipboard.on("success", (res) => {
      message.success('复制成功');
      clipboard.destroy();
    });
    clipboard.on("error", () => {
      message.success('复制失败，请手动复制');
      clipboard.destroy();
    });
  }
  switchChange = (checked: boolean, event: Event)=>{
    const { dispatch } = this.props;
    if(checked){
      confirm({
        title: '切换为分公司授权模式后不能切换回账套授权模式，是否确认切换？',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          dispatch({
            type:"platformList/postBranchMode"
          })
          dispatch({
            type:"platformList/saveBase",
            payload: {
              branchMode:true
            },
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
  render() {

    return (
      <div className={styles.list_box}>
        <div className={styles.header_content}>
          <span className={styles.header_title}>
            平台目录
          </span>
          <div className={styles.header_right}>
            <span className={styles.header_right_tip}>
              <Tooltip   title={text}>
                <span className={styles.header_right_tip_icon}>
                  <Icon type="question-circle" theme="outlined" />
                </span>
              </Tooltip>
              是否按分店授权
            </span>
            <span className={styles.header_right_switch}>
              <Switch   
                checkedChildren="开启" 
                unCheckedChildren="关闭" 
                disabled={this.branchModeBool} 
                onChange={this.switchChange} 
                checked={this.branchModeBool}
              />
            </span>
            {/* <Tooltip  className={styles.header_right_tip} title={text}>
              <span >说明</span>
            </Tooltip> */}
            <Button className={styles.header_button} size="large" style={{marginRight: "20px"}} onClick={this.clearStock}>同步全部库存</Button>
            <Button className={styles.header_button} size="large" onClick={this.checkThird}>查看三方电商平台授权操作手册</Button>
          </div>
        </div>
        {(this.authedList && this.authedList.length>0) &&
          <div className={styles.authed_div}>
            <p className={styles.title}>已授权平台</p>
            {this.authedList.map((item, index) => {
              return (
                <div className={styles.platform} key={item.partnerKey}>
                  <a
                    className={styles.platform_logo}
                  >
                    <div>
                      <img src={item.logo} alt={item.partnerName}/>
                    </div>
                  </a>
                  <div className={styles.platform_slot}>
                    {item.verifyMode === "staffAuth" ? "" : <span onClick={() => { this.toPlatform(item,1) }}>进入平台</span>}
                    <span onClick={() => { this.toManage(item) }}>参数设置</span>
                  </div>
                </div>
              )
            })}
          </div>}
        {(this.unauthedList && this.unauthedList.length>0) &&
          <div className={styles.authed_div}>
            <p className={styles.title}>未授权平台</p>
            {this.unauthedList.map((item, index) => {
              return (
                <div className={styles.platform} key={item.key}>
                  <a
                    className={styles.platform_logo}
                  >
                    <div>
                      <img src={item.logo} alt={item.name}/>
                    </div>
                  </a>
                  <div className={styles.platform_slot}>
                    {item.verifyMode === "staffAuth" ? "" : <span onClick={() => { this.toPlatform(item,0) }}>进入平台</span>}
                    <span onClick={() => { this.toAccredit(item) }}>点击授权</span>
                  </div>
                </div>
              )
            })}
          </div>}
        <Modal
          title="三方电商平台授权操作手册"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          className={styles.modalStyle}
          width="50%"
          footer={null}
          maskClosable={false}
        >
          <p>当前平台菜单页仅列出了ERP已经完成对接的三方平台，并按已授权的平台和未授权的平台分类展示</p>
          <h1>一、平台账号授权操作：</h1>
          <p className={styles.title}>1、在未授权的平台中找到您需要授权的三方平台</p>
          <p className={styles.title}>2、点击【点击授权】按钮，弹出授权弹框，在弹框中复制“授权码”或填入平台账号密码或秘钥完成授权</p>
          <p className={styles.title_content}>在授权平台时可能会因为不同的平台而采取不同的授权方式，下列为两种授权方式的操作说明：</p>
          <p className={styles.main_content}>（1）通过获取授权码：在授权弹框中获取“授权码”点击【复制】按钮复制“授权码”，然后点击【去授权】按钮页面跳转到对应的三方平台
                                                            登录/注册并在对应的页面去粘贴“授权码”完成授权，最后返回到平台菜单页，刷新页面</p>
          <p className={styles.main_content}>（2）通过填入账号密码等信息：在授权弹框中填入对应的三方平台账号密码或秘钥（注意：有的平台可能需要填账号密码、有的平台可能
                                                            需要填秘钥、ID等，因平台而异），然后点击【确定】完成授权</p>
          <p className={styles.title_content}>注意：如果您没注册某平台账号，需要您先在该平台上去注册账号才能进行授权。</p>
          <h1>二、平台管理：</h1>
          <p className={styles.title}>1、在已授权的平台中找到您需要进行参数设置或配件上/下架操作的三方平台</p>
          <p className={styles.title}>2、点击【平台管理】按钮，页面跳转到配件上/下架管理页面在此页面中可进行以下操作：</p>
          <p className={styles.main_content}>（1）各种参数设置：点击页面右上角的【参数设置】按钮打开设置页面，在此页面中进行各种参数值的设置，每一项参数均有自带的默认值，
                                                            点击每个参数模块的“问号”图标，可查看每项参数的注释，当您有需要时可对对应的参数值进行调整。</p>
          <p className={styles.main_content}>（2）配件上/下架操作：在配件上/下架管理页面有两个页签“未上架配件”“已上架配件”这是两个配件列表页，用来表示ERP中的配件哪些为
                                                            已上架到平台的配件，哪些为还未上架到平台的配件，在“未上架配件”列表中可勾选配件点击【上架选中的配件】按钮即可完成上架，也可点击【全部配件上架】按钮直接将列表中所有配件上架</p>
          <p className={styles.title_content}>注意：配件能不能成功上架还要受一些参数值的控制，所以建议您在上架配件前先进入“参数设置”页面按需调整参数值</p>
          <h1>三、进入平台：</h1>
          <p className={styles.title}>1、完成上面两点的操作，您就可以在“平台菜单页”中点击【进入平台】按钮直接进入到对应的三方平台了</p>
          <p className={styles.warning}>友情提示：如果您对上述操作手册还有疑问，可联系我们的客服人员或销售人员进行咨询，欢迎您的来电！客服电话： 010-60219478/9479</p>
        </Modal>
        <Modal
          title="三方电商平台授权"
          visible={this.state.accreditVisible}
          onCancel={this.handleCancelAccredit}
          width="600px"
          className={styles.accreditModal}
          maskClosable={false}
          okText="去授权"
          onOk={this.accredit}
        >
          <img src={this.state.showAccredit.url} alt={this.state.showAccredit.name} />
          <div className={styles.img_bottom_line} />
          <div className={styles.code_content}>
            <label>授权码：</label>
            <Input readOnly size="small" className={styles.copy_input} value={this.state.showAccredit.code} />
            <Button size="small" onClick={this.copyLicenseCode} id="copy-inline-btn" data-clipboard-text={this.state.showAccredit.code} >复制</Button>
          </div>
          <div className={styles.copy_tips}>授权码有效时间为24小时，如超过24小时请重新获取授权码授权</div>
        </Modal>
        <Modal
          title="上架参数设置"
          visible={this.props.dialogShow}
          onCancel={this.dialogCancel}
          width="600px"
          className={styles.modalStyle}
          maskClosable={false}
          footer={null}
        >
          <DialogForm />
        </Modal>

        <AccDialog  />
        {/* <CreateSteps  /> */}
      </div>
    );
  }
}
export default connect(({ platformList }: PlatformConnectState) => ({
  authedData: platformList.list,
  unauthedData: platformList.unAuthed,
  dialogShow: platformList.dialogShow,
  code: platformList.code,
  token: platformList.token,
  branchMode: platformList.branchMode,
}))(PlatformList);
