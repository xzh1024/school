import * as React from 'react';

import AccountOffSet from './accountingTreatment/accountOffSet.js';
import AccountOnSet from './accountingTreatment/accountOnSet.js';
import AccountTransferEmp from './accountingTreatment/accountTransferEmp.js';
import AccountWrestRecord from './accountingTreatment/accountWrestRecord.js';
import DispatchGeneralLedger from './accountingTreatment/dispatchGeneralLedger.js';
import DispatchManagement from './accountingTreatment/dispatchManagement.js';
import GroupInfo from './accountingTreatment/groupInfo.js';
import GroupWork from './accountingTreatment/groupWork.js';
import NewInvoiceMonitoring from './accountingTreatment/newInvoiceMonitoring.js';
import PersonalBusiness from './accountingTreatment/personalBusiness.js';
import PostManagement from './accountingTreatment/postManagement.js';
import RushBuyOrder from './accountingTreatment/rushBuyOrder.js';
import SnowBeerMonitoring from './accountingTreatment/snowBeerMonitoring.js';
import TaskPoolMonitoring from './accountingTreatment/taskPoolMonitoring.js';
import AiDriverFare from './ai/aiDriverFare.js';
import AiSubmit from './ai/aiSubmit.js';
import ComprehensiveQuery from './comprehensiveQuery.js';
import ConfigStore from './configStore.js';
import Backlog from './electronicImage/backlog.js';
import Processed from './electronicImage/processed.js';
import TapeScanning from './electronicImage/tapeScanning.js';
import GlobalStore from './globalStore.js';
import HistoryData from './historyData.js';
import Layout from './layout.js';
import Bills from './myBill/bills.js';
import BillsProcessed from './myBill/billsProcessed.js';
import PendApproval from './myBill/pendApproval.js';
import PendFeedback from './myBill/pendFeedback.js';
import PendProcess from './myBill/pendProcess.js';
import PendRead from './myBill/pendRead.js';
import SubsidyCalendar from './myBill/subsidyCalendar.js';
import CapitalPool from './paymentDesk/capitalPool.js';
import AddressManagement from './receipt/addressManagement.js';
import DefaultAddress from './receipt/defaultAddress.js';
import PhysicalReception from './receipt/physicalReception.js';
import PresentationManagement from './receipt/presentationManagement.js';
import ReceiptManagement from './receipt/receiptManagement.js';
import ReturnExpress from './receipt/returnExpress.js';
import ReturnExpressWithoutEdit from './receipt/returnExpressWithoutEdit.js';
import TrendLayoutConfig from './trendLayoutConfig.js';
class Stores {
	accountOffSet = new AccountOffSet();
	accountOnSet = new AccountOnSet();
	accountTransferEmp = new AccountTransferEmp();
	accountWrestRecord = new AccountWrestRecord();
	dispatchGeneralLedger = new DispatchGeneralLedger();
	dispatchManagement = new DispatchManagement();
	groupInfo = new GroupInfo();
	groupWork = new GroupWork();
	newInvoiceMonitoring = new NewInvoiceMonitoring();
	personalBusiness = new PersonalBusiness();
	postManagement = new PostManagement();
	rushBuyOrder = new RushBuyOrder();
	snowBeerMonitoring = new SnowBeerMonitoring();
	taskPoolMonitoring = new TaskPoolMonitoring();
	aiDriverFare = new AiDriverFare();
	aiSubmit = new AiSubmit();
	comprehensiveQuery = new ComprehensiveQuery();
	configStore = new ConfigStore();
	backlog = new Backlog();
	processed = new Processed();
	tapeScanning = new TapeScanning();
	globalStore = new GlobalStore();
	historyData = new HistoryData();
	layout = new Layout();
	bills = new Bills();
	billsProcessed = new BillsProcessed();
	pendApproval = new PendApproval();
	pendFeedback = new PendFeedback();
	pendProcess = new PendProcess();
	pendRead = new PendRead();
	subsidyCalendar = new SubsidyCalendar();
	capitalPool = new CapitalPool();
	addressManagement = new AddressManagement();
	defaultAddress = new DefaultAddress();
	physicalReception = new PhysicalReception();
	presentationManagement = new PresentationManagement();
	receiptManagement = new ReceiptManagement();
	returnExpress = new ReturnExpress();
	returnExpressWithoutEdit = new ReturnExpressWithoutEdit();
	trendLayoutConfig = new TrendLayoutConfig();
}

/**
 * 请勿改动由此往上的代码！！！！！！
 * store插件自动生成代码
 * 新增store步骤：
 * 1.在store目录或目录下的文件夹下创建一个xx.js文件 注: 文件名称不能与现有的文件名称相同！！！！！！
 * 2.在业务代码中使用创建好的store			例如：创建user.js 则使用 const { user } = useStore();
 * 3.保存代码后触发webpack编译 store会自动引入
 */
const stores = new Stores();

export const StoreContext = React.createContext(stores);

export const StoresProvider = ({ children }) => (
  <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
);

const useStores = () => React.useContext(StoreContext);

export default useStores;
