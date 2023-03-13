import service, {
  AxiosRequestConfigEx
} from "@/common/interceptors/interceptorConfig";
import qs from "qs";

function paramsSerializer(params: any) {
  return qs.stringify(params, { arrayFormat: "repeat" });
}
export default function request(config: AxiosRequestConfigEx): Promise<any> {
  return service({
    paramsSerializer,
    ...config
  }).then(res => {
    return res.data;
  });
}
