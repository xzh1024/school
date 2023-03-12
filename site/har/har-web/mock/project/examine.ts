import { create, resData, mockList } from '../utils';
import { mock } from 'mockjs';

export default create([
  //审批数据
  {
    url: '/cbd-api-project/page/approval/data',
    method: 'GET',
    response: resData({
      todoNum: '@integer(10, 100)',
      doNum: '@integer(10, 100)',
      ownNum: '@integer(10, 100)',
      copyNum: '@integer(10, 100)'
    })
  },
  //审批列表
  {
    url: '/cbd-api-project/page/approval/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'processInstanceId': '@increment(1)',
          'username': '@cname',
          'userRole|1': ['开发', '测试', '运营'],
          'avatar': '@image',
          'dataCode': '@integer(11222, 101010111)',
          'approvalCode': '@integer(10, 52100)',
          'approvalType': '@integer(1, 2)',
          'approvalName|1': ['流程111', '流程222', '流程333'],
          'createTime': '@datetime',
          'data': '@word(15, 50)',
          'status|1': [-1, '@integer(1, 4)']
        },
        { pageNum: 1, pageSize: 20 }
      )
    )
  },
  //审批详情
  {
    url: '/cbd-api-project/page/approval/info',
    method: 'GET',
    response: resData({
      'approvalType': '@integer(1, 2)',
      'dataJson': '',
      'nodeImg':
        '<?xml version="1.0" encoding="UTF-8"?>\n<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" typeLanguage="http://www.w3.org/2001/XMLSchema" expressionLanguage="http://www.w3.org/1999/XPath" targetNamespace="http://activiti.org/bpmn" id="sample-diagram" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">\n  <process id="Process_1671855213399" name="合同审批" isExecutable="true">\n    <startEvent id="Event_08bm6xh" name="开始"></startEvent>\n    <sequenceFlow id="Flow_1u3zuns" sourceRef="Event_08bm6xh" targetRef="Activity_0ijofaq"></sequenceFlow>\n    <userTask id="Activity_0ijofaq" name="审批节点1" flowable:candidateUsers="hporphinobadqgyxyu1yuvr50zoub1gt9i1qi9yh572piu6kus5b68mwrfch,k5b7nhxtj2qjz98ndjpcx3f9nlx9dzxdd02r5klbzbzb214l0asov7gxgef1,efb5bcc6-5e7c-11ed-9538-3a9684733ae5" xmlns:flowable="http://flowable.org/bpmn" flowable:dataType="USERS" flowable:text="张三,王二,若依" flowable:multiLoopType="Null" flowable:isSequential="false"></userTask>\n    <sequenceFlow id="Flow_0chq4sc" sourceRef="Activity_0ijofaq" targetRef="Activity_1h0lecu"></sequenceFlow>\n    <userTask id="Activity_1h0lecu" name="审批节点2" flowable:candidateGroups="s5dl7wkmjcsabwu97u2wk8el7b9t0q1nxurev400vh9oedqg4t,ah34csw1s7e96f15bldlcupq24x9fvbb49ssny83b34mgdjgu5,20ee079a-6c86-11ed-9538-3a9684733ae5" xmlns:flowable="http://flowable.org/bpmn" flowable:dataType="ROLES" flowable:text="管理员,财务,研发" flowable:multiLoopType="Null" flowable:isSequential="false"></userTask>\n    <endEvent id="Event_1g1dzb5" name="结束"></endEvent>\n    <sequenceFlow id="Flow_038cx4z" sourceRef="Activity_1h0lecu" targetRef="Event_1g1dzb5"></sequenceFlow>\n  </process>\n  <bpmndi:BPMNDiagram id="BPMNDiagram_Process_1671855213399">\n    <bpmndi:BPMNPlane bpmnElement="Process_1671855213399" id="BPMNPlane_Process_1671855213399">\n      <bpmndi:BPMNShape bpmnElement="Event_08bm6xh" id="BPMNShape_Event_08bm6xh">\n        <omgdc:Bounds height="36.0" width="36.0" x="222.0" y="112.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Activity_0ijofaq" id="BPMNShape_Activity_0ijofaq">\n        <omgdc:Bounds height="80.0" width="100.0" x="310.0" y="90.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Activity_1h0lecu" id="BPMNShape_Activity_1h0lecu">\n        <omgdc:Bounds height="80.0" width="100.0" x="470.0" y="90.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape bpmnElement="Event_1g1dzb5" id="BPMNShape_Event_1g1dzb5">\n        <omgdc:Bounds height="36.0" width="36.0" x="632.0" y="112.0"></omgdc:Bounds>\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge bpmnElement="Flow_1u3zuns" id="BPMNEdge_Flow_1u3zuns">\n        <omgdi:waypoint x="258.0" y="130.0"></omgdi:waypoint>\n        <omgdi:waypoint x="310.0" y="130.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_0chq4sc" id="BPMNEdge_Flow_0chq4sc">\n        <omgdi:waypoint x="410.0" y="130.0"></omgdi:waypoint>\n        <omgdi:waypoint x="470.0" y="130.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge bpmnElement="Flow_038cx4z" id="BPMNEdge_Flow_038cx4z">\n        <omgdi:waypoint x="570.0" y="130.0"></omgdi:waypoint>\n        <omgdi:waypoint x="632.0" y="130.0"></omgdi:waypoint>\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</definitions>',
      'processInfoList|1-3': [
        {
          'username': '@name',
          'userRole|1': ['开发', '测试', '运营'],
          'avatar': '@image',
          'auditTime': '@datetime',
          'remarks': '@cword(10)',
          'signatureUrl': '@image'
        }
      ],
      'bizInfo': {
        type: 'contractOfIntention',
        info: {
          approvalType: 'contractOfIntention',
          brandId: 10,
          brandName: '999',
          contractCode: 'YXHT2022123000002',
          contractId: 38,
          contractRemark: '测试',
          estateFloorage: 50,
          estateName: '1903-2',
          estateUseArea: 50,
          expenseList: [
            {
              billGenDate: 9,
              expenseId: 1950,
              expenseName: '租金',
              lateFeeInfo:
                '账单生成日期之后20月未缴纳费用，以每天3.00元计算滞纳金；滞纳金含税：3.00%',
              paymentInfo: '提前1月',
              rentFreeInfo: '2023-01期间，每期免租500.00元',
              settlementInfo: '2023-01-30~2024-01-30期间以销售额的2.00%计租；',
              stageEnd: '2024-01-30',
              stageId: 25,
              stageStart: '2023-01-30',
              tax: 5,
              taxFlag: 0
            }
          ],
          expenseNum: 1,
          floorName: '房天下大厦19F',
          formatId: 1,
          formatName: '餐饮',
          intentionInfo:
            '2023年01月11日前，需缴纳bbbbbbb500.00，其中，bbbbbbb含税：3.00%',
          leaseEndDate: '2024-01-30',
          leaseStartDate: '2023-01-30',
          mainEstateName: '1903-2',
          merchantId: 1,
          merchantName: '呆头鹅1',
          refundInfo: '321321',
          signDate: '2023-01-30',
          storeId: 45,
          storeName: '测试店铺777',
          verifyRemark: '12',
          version: 3,
          resourceList: [
            {
              id: '@id',
              name: '@cname',
              type: 'image/png',
              size: 2000,
              previewAddress:
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fcd%2F05%2Fdc%2Fcd05dc90a63739a47d7b301a02205b7e.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659605861&t=871aa99d3ab19c912092b6c79366e371'
            }
          ]
        }
      }
    })
  },
  //撤销审批
  {
    url: '/cbd-api-project/page/approval/revoke',
    method: 'POST',
    response: resData({})
  },
  //驳回审批
  {
    url: '/cbd-api-project/page/approval/reject',
    method: 'POST',
    response: resData({})
  },
  //转签
  {
    url: '/cbd-api-project/page/approval/transfer',
    method: 'POST',
    response: resData({})
  },
  //审批加签
  {
    url: '/cbd-api-project/page/approval/sign',
    method: 'POST',
    response: resData({})
  },
  //同意审批
  {
    url: '/cbd-api-project/page/approval/agree',
    method: 'POST',
    response: resData({})
  },
  //加签转签用户列表
  {
    url: '/cbd-api-project/page/approval/user',
    method: 'GET',
    response: resData(
      mock({
        'list|1-10': [
          {
            'userCode': '@id',
            'username': '@cname',
            'deptName|1': ['技术部', '运营部', '设计部'],
            'roleName|1': ['主管', '运营', '经理', '总监'],
            'avatar': '@image',
            'phoneNumber': '15812345678'
          }
        ]
      }).list
    )
  }
]);
