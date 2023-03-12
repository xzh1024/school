import { RouteConfig } from "vue-router";

export interface HztlRouteConfig extends RouteConfig {
  hidden?: boolean;
  children?: HztlRouteConfig[];
  icon?: string;
  meta?: {
    title?: string;
    perm?: string | number;
  };
}
