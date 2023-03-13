import {CbdApiProjectFormalContractFileSavePostRequest} from '@/api';
import {genUUID} from '@/utils';

export type MisContractFileDetailVoType =
  Required<CbdApiProjectFormalContractFileSavePostRequest>['misContractFileDetailVos'][number];

export class MisContractFileDetailVo implements MisContractFileDetailVoType {
  uid = genUUID();
  // { number } 资源ID
  fileId = '';
  // { string } 附件名称
  fileName = '';
  // { string } 附件访问地址
  fileUrl = '';
  // { string } 描述
  describe = '';
  // { number } 上传进度
  uploadRage = -2;
}

export class FileSaveReq
  implements CbdApiProjectFormalContractFileSavePostRequest
{
  // { number } 合同ID
  contractId = -1;
  // { number } 提交类型1、保存2、下一步
  type = 1;
  // { string } 资源code
  resourceCode = '';
  // { Array<object> } 铺位明细 ,MisContractFileDetailVo
  misContractFileDetailVos: MisContractFileDetailVo[] = [];
}
