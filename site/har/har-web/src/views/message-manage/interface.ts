export class MessageManageListReq {
  // { string } 项目id
  projectId = '';
  // { string } 消息标题
  title = '';
  // { string } 重要程度0：普通；1：重要；2：紧急
  messageLevel = '';
  // { string } 是否置顶1：是；0：否；
  onTop = '';
  // { string } 消息类型1：公告；2：通知；3：内部通知
  category = '';
  // { string } 接收对象类型0指定；1全部
  targetType = 1;
  // { string } 状态;0草稿；1待发布；2已发布；3已撤回；4已下架;
  status = '';
  // { string } 发布时间yyyy-MM-ddHH:mm:ss
  publishStartTime = '';
  // { string } 截止时间yyyy-MM-ddHH:mm:ss
  publishEndTime = '';
}

export class MessageManageAddOrUpdateMessageReq {
  // { number } 消息id，更新时使用
  id = null;
  // { number } 项目id
  projectId = null;
  // { number } 消息类型1：公告；2：通知；3：内部通知
  category = null;
  // { string } 发布时间yyyy-MM-ddHH:mm:ss
  publishStartTime = '';
  // { string } 截止时间yyyy-MM-ddHH:mm:ss
  publishEndTime = '';
  // { number } 重要程度0：普通；1：重要；2：紧急
  messageLevel = 0;
  // { number } 是否置顶1：是；0：否；
  onTop = 0;
  // { number } 接收对象类型0指定；1全部(内部通知时可不填)
  targetType = 1;
  // { Array<number> } 店铺id集合(内部通知时可不填) ,Long
  storeIds = [];
  // 附件列表对象
  attachmentFiles = [];
  // { string } 消息标题
  title = '';
  // { string } 消息正文
  content = '';
  // { Array<string> } 附件,oss文件id ,String
  attachments = [];
  // { boolean } 是否发布true是false否
  publishFlag = false;
}
