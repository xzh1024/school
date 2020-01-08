// import Vue from "vue";
// import {NowResponseResult} from "../../core/params/result/ResponseResult";
import {ServiceType} from "./base/service.type";
import {BaseService} from "./base/base.service";
import {ServiceFactory} from "./ServiceFactory";
// import {VideoManagerParams, VideoManagerIdParams} from "../../core/params/VideoManagerParams";
// import {VideoModel, VideoTagModel, VideoAddModel, VideoUpdataParams, VideoDeleteParams} from "../../core/entity/VideoManager";


const serviceName = ServiceType.timeMovieService;

export class TimeMovieService extends BaseService {
    public readonly name = serviceName;

    constructor() {
        super();
    }

    // 正在热映
    public movieQuery(): Promise<any> {
        const params = {
            locationId: 290
        };
        return this.request({
            method: 'get',
            // showLoad: true,
            params: params,
            url: '/Showtime/LocationMovies.api'
        })
    }

    // 正在售票
    public movieQueryTicke(): Promise<any> {
        const params = {
            locationId: 880
        };
        return this.request({
            method: 'get',
            // showLoad: true,
            params: params,
            url: '/PageSubArea/HotPlayMovies.api'
        })
    }
}

if (!ServiceFactory.hasInit(serviceName)) {
    ServiceFactory.initService(new TimeMovieService());
}