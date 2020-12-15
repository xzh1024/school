import {BaseService} from './base/baseService';
import {ServiceType} from "./base/serviceType";

/**
 * 获取service的工厂
 */
export class ServiceFactory {
  public static getService<T extends BaseService>(name: ServiceType): T {
    const service = ServiceFactory.caches[name] as T;
    if(!service) {
      console.warn(`the service must be import its file before used, whose name is ${name}`);
    }
    return service;
  }

  public static initService(serivce: BaseService) {
    if (serivce.name == null || ServiceFactory.hasInit(serivce.name)) {
      throw new Error("service is already init or service-name is null!");
    }
    ServiceFactory.caches[serivce.name] = serivce;
  }

  /**
   * 此service是否已经初始化了
   * @param name
   */
  public static hasInit(name: string) {
    return !!ServiceFactory.caches[name]
  }

  private static caches: { [key: string]: BaseService } = {} as { [key: string]: BaseService };
}
