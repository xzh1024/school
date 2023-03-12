import { reactive, ref } from "vue";
import {
  svcAppletMemberCardPageGet,
  SvcAppletMemberCardPageGetResponse
} from "@/api/card";
import useFuncProxy from "@/hooks/useFuncProxy";

type PageDataType = {
  pageNum: number;
  pageSize: number;
  pageType?: string;
};

export function useCard() {
  const pageData = reactive<PageDataType>({
    pageNum: 1,
    pageSize: 10,
    pageType: "default"
  });
  const paging = ref();
  const cardList = ref<SvcAppletMemberCardPageGetResponse["rows"]>([]);
  const [getCardList] = useFuncProxy(async (pageData: PageDataType) => {
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletMemberCardPageGet({
      pageNum: String(pageData.pageNum),
      pageSize: String(pageData.pageSize),
      status: pageData.pageType === "default" ? "" : "1"
    });
    // cardList.value = d.rows;
    paging.value?.complete(d.rows);
    uni.hideLoading();
  });

  function queryList(pageNum: number) {
    pageData.pageNum = pageNum;
    getCardList(pageData);
  }
  return {
    paging,
    pageData,
    cardList,
    getCardList,
    queryList
  };
}
