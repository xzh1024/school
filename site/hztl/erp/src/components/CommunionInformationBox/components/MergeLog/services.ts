import request from "@/utils/request";
import { PageData, BackEndPageParams } from "@/constants/interface";
import { MergeLogItem, MergeLogListFilters } from "./constants";

interface MergeLogListParams extends MergeLogListFilters, BackEndPageParams {
  coopId: number;
}

class MergeLogService {
  fetchList(params: MergeLogListParams): Promise<PageData<MergeLogItem>> {
    return request({
      url: "cooperators/merge-logs",
      method: "get",
      params
    });
  }
}

export default new MergeLogService();
