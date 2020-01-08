import {IConfig} from "./interface/IConfig";
import store from "../../store";

export default class Config {
    public static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    private static instance: Config;
    private config = {} as IConfig;
    private isInited: boolean = false;

    //
    public getConfig(): IConfig {
        // const config = {
        //     ...store.state.systemConfig
        // };
        // if (!config) {
        //     console.error("RouterConfig is null");
        // }
        // return {
        //     ...config
        // };
        return this.config;
    }

    //
    public init(config: IConfig): void {
        if (this.isInited) {
            console.error("SystemConfig is ready init");
            return;
        }
        this.config = config
    }

    public getLoginHtmlUrl() {
        return process.env.WEB_PREFIX + 'index.html?v=' + new Date().getTime();
    }

    public getMainHtmlUrl() {
        return process.env.WEB_PREFIX + 'main.html?v=' + new Date().getTime();
    }

    public getMapConfigUrl(fileName: string) {
        return process.env.WEB_PREFIX + 'map_config/' + fileName + '?v=' + new Date().getTime();
    }

    public getFAQUrl() {
        return process.env.WEB_PREFIX + "foplayer/FAQ.docx?v=" + new Date().getTime();
    }
}
