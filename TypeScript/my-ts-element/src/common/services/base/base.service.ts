import axios, {AxiosRequestConfig} from "axios";
import {ServiceType} from "./service.type";
import Vue from "vue";
import qs from "qs";

// import Config from "../../config/Config";
// import {IConfig} from "../../config/interface/IConfig";

const CancelToken = axios.CancelToken;
// `paramsSerializer` is an optional function in charge of serializing `params`
// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
function paramsSerializer(params: any) {
    return qs.stringify(params, {arrayFormat: 'repeat'})
}

/**
 * 所有service的基类
 */
Vue.prototype.$httpRequestList = [];

export abstract class BaseService {
    public abstract readonly name: ServiceType;
    protected axios = axios;

    constructor() {
    }

    protected request = (config: AxiosRequestConfig): Promise<any> => {
        return this.axios({
            paramsSerializer,
            ...config,
            cancelToken: new CancelToken(function executor(c: () => void) {
                Vue.prototype.$httpRequestList.push(c)
            })
        }).then((res) => {
            return res.data;
        });
    };
}
