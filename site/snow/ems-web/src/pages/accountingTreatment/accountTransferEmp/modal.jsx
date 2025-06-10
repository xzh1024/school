import { dataDictPUT,dataDict,maplistpag,findByType} from '@api/accountingTreatment/accountTransferEmp';
import UserSelect from '@c/userSelectByTree';
import { Form, Input, Modal, Select, message ,Grid,Col, Row,Spin} from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React,{ useEffect, useState,useRef,useMemo} from 'react';
import useStores from '../../../store';
import debounce from 'lodash/debounce';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const optionsed = [
  {
    value: 'Y',
    label: '是',
  },
  {
    value: 'N',
    label: '否',
  }
];

const STATUS_OPTIONS = [
  {
    label: '框架核心',
    value: 'FRAMEWORK_CORE',
  },
  {
    label: '用户管理',
    value: 'FRAMEWORK_USERMGR',
  },
  {
    label: '系统管理',
    value: 'FRAMEWORK_SYSMGR',
  },
  {
    label: '流程平台',
    value: 'FRAMEWORK_PROCESS',
  },
 
];

function Index() {
  const [form] = Form.useForm();
  const { accountTransferEmp } = useStores();
  const { currentRecord ,modaltitle} = accountTransferEmp;
  const [workItemId, setWorkItemId] = useState('');
  const [currentStepId, setCurrentStepId] = useState('');
  const [loading, setLoading] = useState(false);
  const [neddisabled, seneddisabled] = useState(false);
  const [optionstime, set0ptionstime] = useState([]);
  const [optionscar, setoptionscar] = useState([]);
  const [options, setOptions] = useState([]);
  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    console.log(props,'props');
    
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          console.log('newOptions11', newOptions,value);
          newOptions=newOptions.data.records;

          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  }
  async function fetchUserList(username) {
    console.log(username,'username');
    let parms={
      "pageIndex": 1,
      "pageSize": 100,
      localValue:username
    };
   let a= maplistpag(parms);
      return  await a;

    // console.log('fetching user', username);
    // return fetch('https://randomuser.me/api/?results=5')
    //   .then((response) => response.json())
    //   .then((body) =>
    //     body.results.map((user) => ({
    //       label: `${user.name.first} ${user.name.last}`,
    //       value: user.login.username,
    //     })),
    //   );
  }
  const [value, setValue] = useState([]);

  useEffect(() => {
    console.log(currentRecord, 3333);
    if (modaltitle === '修改数据') {
      seneddisabled(true);
    }
    findByType('CAR_TYPE').then(res=>{
      setoptionscar(res.data);
    });
    findByType('CAR_TIME').then(res=>{
      set0ptionstime(res.data);
    });
    let parms={
      "pageIndex": 1,
      "pageSize": 100,
    };
    maplistpag(parms).then(res=>{
      setOptions(res.data.records);
    });
    setLoading(false);    
  }, [findByType]);

  const handleOk = () => {
    if(modaltitle === '详细描述'){
      runInAction(() => {
        accountTransferEmp.showModal = false;   
      });
      return;
    }
    console.log(form.validateFields(),9999);
    form.validateFields().then(values => {
      console.log(values);
      if(modaltitle === '新增数据'){
        values.workLimiteLocation= values.workLimiteLocationDesc.value;
        values.workLimiteLocationDesc= values.workLimiteLocationDesc.label;
      };
      const data = {
        ...accountTransferEmp.currentRecord,
        ...values,    
      };
      setLoading(true);
        let  undatacode=modaltitle === '新增数据' ? dataDict:dataDictPUT;
         undatacode(data).then(res => {
        message.success('操作成功');
        setLoading(false);
        runInAction(() => {
          accountTransferEmp.showModal = false;
          accountTransferEmp.currentRecord = {};
          accountTransferEmp.getTableList();
        });
      }).catch(() => setLoading(false));
    }).then(()=>{
  
    });
  };
  const handleCancel = () => {
    runInAction(() => {
      accountTransferEmp.showModal = false;
    });
  };
  

  return (
    <Modal
      title={modaltitle}
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width={800}
    > 
      {modaltitle === '详细描述' ? <div> 
        <Row>
        <Col span={24}>{currentRecord.positionClass}</Col>
        <Col span={24}>{`1.${currentRecord.hasAirCar === "Y"?'马上接送机场景可用：是否匹配航班|是，是否关联审批单|否，是否选择成本中心|是，是否公司账户支付|是': "马上接送机场景不可用"}，车型管控：超标管控方式|不可预订，可订车型|${currentRecord.carTypeDesc}`}</Col>
        <Col span={24}>{`2.${currentRecord.hasOfficeCar === "Y"? `公出用车场景可用：用车日期管控|是，用车时间|是，是否关联审批单|是，是否选择成本中心|是，是否公司账户支付|是，车型管控：超标管控方式|不可预订，可订车型|${currentRecord.carTypeDesc}`: "公出用车场景不可用"}`}</Col>
        <Col span={24}>{`3.${currentRecord.hasWorkCar === "Y"? `因公晚间用车场景可用：用车日期管控|否，是否关联审批单|否，是否选择成本中心|是，是否公司账户支付|是，加班地址是否限制|是，加班地址管控范围|半径一公里内,<br/>&nbsp;&nbsp;&nbsp;用车时间：${currentRecord.workLimiteTimeDesc}，用车地点：${currentRecord.workLimiteLocationDesc}，车型管控：超标管控方式|不可预订，可订车型|${currentRecord.carTypeDesc}`: "因公晚间用车场景不可用"}`}</Col>
        <Col span={24}>{`4.${currentRecord.hasTrainCar === "Y"? `马上接送火车场景可用：是否匹配火车|否，用车日期管控|是，用车时间|是，是否关联审批单|是，是否选择成本中心|是，是否公司账户支付|是，车型管控：超标管控方式|不可预订，可订车型|${currentRecord.carTypeDesc}`: `马上接送火车场景不可用，车型管控：超标管控方式|不可预订，可订车型|${currentRecord.carTypeDesc}`}`}</Col>
          {currentRecord.hsTrain==='Y'&&<Col span={24}>{`5、可预订火车票舱位等级：${currentRecord.positionClass === "Y"? `硬座、软座、一等座、二等座、硬卧、软卧、一等软座、二等软座、一等卧、二等卧`: `硬座、软座、二等座、硬卧、二等软座、二等卧`}`}</Col>}   
      </Row>

      </div> : <Form form={form} {...layout} className="pt-6" initialValues={currentRecord}>
         <Row gutter={16}>
            <Col span={12}> 
                <Form.Item label="马上接送机:" name="hasAirCar" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180 }} options={optionsed} allowClear  disabled={neddisabled}  />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="马上接送火车:" name="hasTrainCar" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} options={optionsed} allowClear  disabled={neddisabled}  />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="公出用车:" name="hasOfficeCar" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} options={optionsed} allowClear  disabled={neddisabled}  />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="因公晚间用车:" name="hasWorkCar" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} options={optionsed} allowClear  disabled={neddisabled}  />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="润出行是否配置:" name="ctripHold" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} options={optionsed} allowClear   />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="可预订火车票:" name="hsTrain" style={{ width: 800}}  rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} options={optionsed} allowClear   />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="因公晚间用车时间:" name="workLimiteTimeDesc" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}} disabled={neddisabled}  options={optionstime} allowClear  fieldNames={{ label: 'dictName', value: 'dictCode' }}  />
                </Form.Item>
            </Col>
            <Col span={12}> 
                <Form.Item label="可用车型:" name="carTypeDesc" style={{width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                    <Select  style={{ width: 180}}  disabled={neddisabled} options={optionscar}  fieldNames={{ label: 'dictName', value: 'dictCode' }} allowClear   />
                </Form.Item>
            </Col>
            <Col span={24}> 
                <Form.Item label="因公晚间用车地点:" name="workLimiteLocationDesc" style={{ width: 800}} required rules={[{ required: true, message: '请选择' }]}>          
                <DebounceSelect
        
            showSearch="false"
            value={value}
            disabled={neddisabled}
            placeholder="请输入地址编码或名称"
            fetchOptions={fetchUserList}
            fieldNames={{ label: 'localName', value: 'localCode' }}
            onChange={(newValue) => {
              console.log(setValue);
              setValue(newValue);
            }}
      style={{
        width: '100%',
      }}
      allowClear
    />
                </Form.Item>
            </Col>
          
     
      
         
          
        </Row>
      </Form>}
      
    </Modal>
  );
}

export default observer(Index);
