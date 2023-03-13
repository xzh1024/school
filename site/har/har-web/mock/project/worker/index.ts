import { create, resData, mockList, mockList1 } from '../../utils';
import { mock } from 'mockjs';

export default create([
  //工单列表
  {
    url: '/cbd-api-project/estate/workOrder/template/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@increment(1)',
          'projectName': '@cname',
          'type|1': '@integer(1, 4)',
          'typeName': '@string',
          'name': '@string',
          'merchantCreateState|1': '@integer(1, 2)',
          'status|1': '@integer(1, 2)'
        },
        { pageNum: 1, pageSize: 20 }
      )
    )
  },
  //新增工单
  {
    url: '/cbd-api-project/estate/workOrder/template/add',
    method: 'POST',
    response: resData({})
  },
  //编辑工单
  {
    url: '/cbd-api-project/estate/workOrder/template/updateInfo',
    method: 'PUT',
    response: resData({})
  },
  //工单详情
  {
    url: `/cbd-api-project/estate/workOrder/template/info/:id`,
    method: 'GET',
    response: resData({
      id: '@increment(1)',
      projectId: '@increment(1)',
      projectName: '@cname',
      type: '@integer(1, 4)',
      typeName: '@cname',
      name: '@cname',
      remark: '@string',
      merchantCreateState: '@integer(1, 2)',
      sponsorUserId: '@increment(1)',
      applyScope: '@integer(1, 2)',
      closeRule: '@integer(1, 2)',
      fromContent:
        '{"form":{"form":{"layout":"horizontal","size":"small","label-align":"right","auto-label-width":false},"submitBtn":false,"resetBtn":false},"rule":[{"type":"formSys","field":"projectId","title":"项目名称","info":"","options":[],"props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"buildingId","title":"楼宇","info":"","options":[],"props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"formSys","title":"楼层","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"Fey81neq13e7a4","title":"铺位类型","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"F6wy1neq13fx5z","title":"铺位","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true}]}',
      bpmnXml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:flowable="http://flowable.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1675149771265" name="报事报修审批" isExecutable="true">
    <bpmn2:startEvent id="Event_0lhzk20" name="报事报修审批" />
    <bpmn2:sequenceFlow id="Flow_0xfgobb" sourceRef="Event_0lhzk20" targetRef="Activity_0vwjfkx" />
    <bpmn2:userTask xmlns:flowable="http://flowable.org/bpmn" id="Activity_0vwjfkx" name="处理1" flowable:assignee="\$\{initiator\}" flowable:dataType="INITIATOR" flowable:text="流程发起人" flowable:isSign="false" flowable:isTransfer="false" flowable:multiLoopType="Null" flowable:isSequential="false" />
    <bpmn2:sequenceFlow id="Flow_1uiusr7" sourceRef="Activity_0vwjfkx" targetRef="Activity_04n1a8v" />
    <bpmn2:endEvent id="Event_1l68chu" />
    <bpmn2:sequenceFlow id="Flow_0kkvaox" sourceRef="Activity_04n1a8v" targetRef="Event_1l68chu" />
    <bpmn2:userTask xmlns:flowable="http://flowable.org/bpmn" id="Activity_04n1a8v" name="处理2" flowable:assignee="\$\{initiator\}" flowable:dataType="INITIATOR" flowable:text="流程发起人" flowable:isSign="true" flowable:isTransfer="false" flowable:multiLoopType="Null" flowable:isSequential="false" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Process_1675149771265">
    <bpmndi:BPMNPlane id="BPMNPlane_Process_1675149771265" bpmnElement="Process_1675149771265">
      <bpmndi:BPMNShape id="BPMNShape_Event_0lhzk20" bpmnElement="Event_0lhzk20">
        <dc:Bounds x="262" y="172" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Activity_0vwjfkx" bpmnElement="Activity_0vwjfkx">
        <dc:Bounds x="230" y="270" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Event_1l68chu" bpmnElement="Event_1l68chu">
        <dc:Bounds x="262" y="552" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_Activity_04n1a8v" bpmnElement="Activity_04n1a8v">
        <dc:Bounds x="230" y="410" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="BPMNEdge_Flow_0xfgobb" bpmnElement="Flow_0xfgobb">
        <di:waypoint x="280" y="208" />
        <di:waypoint x="280" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_Flow_1uiusr7" bpmnElement="Flow_1uiusr7">
        <di:waypoint x="280" y="350" />
        <di:waypoint x="280" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_Flow_0kkvaox" bpmnElement="Flow_0kkvaox">
        <di:waypoint x="280" y="490" />
        <di:waypoint x="280" y="552" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`,
      nodeImg: '@string',
      nodeData: []
    })
  },
  //删除工单
  {
    url: '/cbd-api-project/estate/workOrder/template/remove/:id',
    method: 'DELETE',
    response: resData({})
  },
  //修改工单状态（启用/停用）
  {
    url: '/cbd-api-project/estate/workOrder/template/updateStatus',
    method: 'PUT',
    response: resData({})
  },
  // 编辑工单模板
  {
    url: '/cbd-api-project/estate/workOrder/template/updateOther',
    method: 'PUT',
    response: resData({})
  },
  //工单管理列表
  {
    url: '/cbd-api-project/estate/workOrder/record/list',
    method: 'GET',
    response: resData(
      mockList(
        {
          'id': '@increment(1)',
          'projectName': '@cname',
          'recordCode': '@uuid',
          'type|1': '@integer(1, 4)',
          'typeName': '@string',
          'name': '@string',
          'urgency': '@integer(1, 3)',
          'urgencyName': '@string',
          'userName': '@string',
          'subTime': '@date',
          'currentNode': '@string',
          'currentNodeId': '@increment(1)',
          'status': '@integer(0, 5)',
          'statusName': '@string',
          'timeoutState': '@integer(1, 2)',
          'timeoutStateName': '@string',
          'completeTime': '@date'
        },
        { pageNum: 1, pageSize: 10 }
      )
    )
  },
  // 工单列表删除
  {
    url: '/cbd-api-project/estate/workOrder/record/remove/:id',
    method: 'DELETE',
    response: resData({})
  },
  // 添加工单
  {
    url: '/cbd-api-project/estate/workOrder/record/save',
    method: 'POST',
    response: resData({})
  },
  // 提交工单
  {
    url: '/cbd-api-project/estate/workOrder/record/submit',
    method: 'POST',
    response: resData({})
  },
  // 同意
  {
    url: '/cbd-api-project/estate/workOrder/record/agree',
    method: 'PUT',
    response: resData({})
  },
  // 编辑工单
  {
    url: '/cbd-api-project/estate/workOrder/record/update',
    method: 'PUT',
    response: resData({})
  },
  // 工单详情
  {
    url: '/cbd-api-project/estate/workOrder/record/info/:id',
    method: 'get',
    response: resData({
      id: '@increment(1)',
      urgency: '@integer(1, 3)',
      fromDataContent:
        '{"form":{"form":{"layout":"horizontal","size":"small","label-align":"right","auto-label-width":false},"submitBtn":false,"resetBtn":false},"rule":[{"type":"formSys","field":"projectId","title":"项目名称","value":"1","info":"","options":[],"props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"buildingId","title":"楼宇","info":"","options":[{"value":"1","label":"楼宇一"},{"value":"2","label":"楼宇二"}],"value":"2","props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"formSys","title":"楼层","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"Fey81neq13e7a4","title":"铺位类型","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"F6wy1neq13fx5z","title":"铺位","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true}]}',
      instanceId: '@increment(1)',
      templateId: '@id',
      currentNodeInfo: { nodeName: '@ctitle' }
    })
  },
  // 催办
  {
    url: '/cbd-api-project/estate/workOrder/record/urge',
    method: 'PUT',
    response: resData({})
  },
  // 项目列表
  {
    url: '/cbd-api-project/template/project/select',
    method: 'GET',
    response: resData(
      mockList1({
        label: '@cname',
        value: '@increment(1)'
      })
    )
  },
  // 楼宇列表
  {
    url: '/cbd-api-project/template/building/select',
    method: 'GET',
    response: resData(
      mockList1({
        label: '@cname',
        value: '@increment(1)'
      })
    )
  },
  // 指派
  {
    url: '/cbd-api-project/estate/workOrder/record/assign',
    method: 'PUT',
    response: resData({})
  },
  // 模板详情
  {
    url: '/cbd-api-project/estate/workOrder/record/template/info/:id',
    method: 'GET',
    response: resData(
      mock({
        'id|+1': 1,
        'projectId': '@id',
        'projectName': '@cname',
        'type': '@pick([1,2,3,4])',
        'typeName': '@pick(["报事报修","巡场","进场装修","撤场"])',
        'name': '@ctitle',
        'remark': '@cparagraph',
        'merchantCreateState': '@pick([1,2])',
        'sponsorUserId': '@id',
        'applyScope': '@pick([1,2])',
        'closeRule': '@pick([1,2])',
        'fromContent':
          '{"form":{"form":{"layout":"horizontal","size":"small","label-align":"right","auto-label-width":false},"submitBtn":false,"resetBtn":false},"rule":[{"type":"formSys","field":"projectId","title":"项目名称","value":"1","info":"","options":[],"props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"buildingId","title":"楼宇","info":"","options":[{"value":"1","label":"楼宇一"},{"value":"2","label":"楼宇二"}],"value":"2","props":{},"on":{},"children":[],"hidden":false,"display":true},{"type":"formSys","field":"formSys","title":"楼层","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"Fey81neq13e7a4","title":"铺位类型","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true},{"type":"formSys","field":"F6wy1neq13fx5z","title":"铺位","info":"","_fc_drag_tag":"formSys","hidden":false,"display":true}]}',
        'bpmnXml': '',
        'nodeImg': '',
        'nodeData|1-10': [
          {
            'id|+1': 1,
            'nodeId': '@id',
            'nodeName': '@ctitle',
            'nodeEvent': '@ctitle',
            'startNodeProcessor': '@cname',
            'processor': '@cname',
            'assignRule': '@pick([1,2])',
            'assignMsgType': '@pick([1,2])',
            'nodeAging': '@integer(10,600)',
            'interimNoticeTime': '@integer(10,600)',
            'timeoutHandler': '@pick([1,2,3])'
          }
        ]
      })
    )
  },
  // 流程信息
  {
    url: '/cbd-api-project/estate/workOrder/record/instanceInfo/:instanceId',
    method: 'GET',
    response: resData({
      code: '@id',
      status: '@pick([0,1,2,3,4])',
      processInstanceId: '@id',
      taskId: '@id',
      bizInfo: {
        type: '@pick(["floorAdjust","investPlan"])',
        info: {}
      },
      nodeImg: '',
      historyInstanceInfoList: [],
      buttons: '@pick(["revoke","sign","transfer","reject","agree"])'
    })
  },
  // 撤销
  {
    url: '/cbd-api-project/estate/workOrder/record/cancel',
    method: 'PUT',
    response: resData({})
  },
  // 关闭
  {
    url: '/cbd-api-project/estate/workOrder/record/close',
    method: 'PUT',
    response: resData({})
  }
]);
