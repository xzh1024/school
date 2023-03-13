import { quickAddPositions } from "@/api/store/settings";

interface ReqParams {
  warehouseId: number;
  name: string;
}

function quickGetPositions(params: ReqParams[]) {
  return new Promise((resovle: Function) => {
    quickAddPositions(params)
      .then((res: number[]) => {
        resovle(res);
      })
      .catch(() => {
        resovle(null);
      });
  });
}

export default quickGetPositions;
