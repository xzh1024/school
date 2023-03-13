import projectConfig from '../config/registry/project';
import buildingConfig from '../config/registry/building';
// 项目名称
export const projectComponent = projectConfig.rule();
// 楼宇
export const buildingComponent = buildingConfig.rule();
