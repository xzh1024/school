import { create, mockList1, resData } from '../utils';

export default create([
  {
    url: '/cbd-api-project/message-manage/list',
    method: 'GET',
    response: resData({
      total: 1,
      rows: [
        {
          // { number } 消息id，更新时使用
          id: -1,
          // { number } 项目id
          projectId: 1,
          // { string } 项目名称
          projectName: 'MOCK项目',
          // { number } 消息类型1：公告；2：通知；3：内部通知
          category: 1,
          // { string } 发布时间yyyy-MM-ddHH:mm:ss
          publishStartTime: '2022-05-04 05:07:00',
          // { string } 截止时间yyyy-MM-ddHH:mm:ss
          publishEndTime: '2022-06-04 05:07:00',
          // { number } 重要程度0：普通；1：重要；2：紧急
          messageLevel: 1,
          // { number } 接收对象类型0指定；1全部
          targetType: 1,
          // { number } 是否置顶1：是；0：否；
          onTop: 1,
          // { string } 消息标题
          title: '退钱',
          // { number } 状态;0草稿；1待发布；2已发布；3已撤回；4已下架;
          status: 1
        }
      ]
    })
  },
  {
    url: '/cbd-api-project/message-manage/addOrUpdateMessage',
    method: 'POST',
    response: resData({})
  },
  {
    url: '/cbd-api-project/message-manage/info/-1',
    method: 'GET',
    response: resData({
      // { Array<object> } 店铺集合 ,MessageStores
      stores: [1],
      // { string } 消息正文
      content: '全体成员到前台领取大礼包',
      // { Array<object> } 附件,oss文件id ,GetResourceFilesResp
      attachments: [],
      // { number } 消息id，更新时使用
      id: null,
      // { number } 项目id
      projectId: 1,
      // { string } 项目名称
      projectName: 'null',
      // { number } 消息类型1：公告；2：通知；3：内部通知
      category: 1,
      // { string } 发布时间yyyy-MM-ddHH:mm:ss
      publishStartTime: '2022-05-04 05:04:05',
      // { string } 截止时间yyyy-MM-ddHH:mm:ss
      publishEndTime: '2022-08-04 05:04:05',
      // { number } 重要程度0：普通；1：重要；2：紧急
      messageLevel: 1,
      // { number } 是否置顶1：是；0：否；
      onTop: 1,
      // { number } 接收对象类型0指定；1全部
      targetType: 0,
      // { string } 消息标题
      title: '重要通知',
      // { number } 状态;0草稿；1待发布；2已发布；3已撤回；4已下架;
      status: 2
    })
  },
  {
    url: '/cbd-api-project/message-manage/switchStatus',
    method: 'PUT',
    response: resData({})
  },
  {
    url: '/cbd-api-project/message-manage/delete',
    method: 'DELETE',
    response: resData({})
  }
]);
