import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";

const router = new KoaRouter();

// export const get = (path: string) => {
//   return (target, property) => {
//     router["get"](path, target[property]);
//   };
// };

const method = (router: KoaRouter) => (method: string) => (path: string) => {
  return (target, property) => {
    router[method](path, target[property]);
  };
};

// export const get = method("get");
// export const post = method("post");
const decorte = method(router);
export const get = decorte("get");
export const post = decorte("post");

export const load = (folder: string): KoaRouter => {
  const extname = ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach(item => require(item));
  return router;
};
