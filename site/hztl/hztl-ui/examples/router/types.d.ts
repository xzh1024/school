import { RouteConfig } from "vue-router";

export interface HztlRouteConfig extends RouteConfig {
  isHide?: boolean;
  children?: HztlRouteConfig[];
  icon?: string;
  meta?: {
    title?: string;
    perm?: number[];
  };
}
