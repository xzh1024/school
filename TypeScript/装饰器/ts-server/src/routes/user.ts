import * as Koa from "koa";
import koaBody from "koa-body";
import { get, post } from "../utils/router-decor";

const users = [
  {
    name: "tom"
  }
];

export default class User {
  @get("/users")
  // @menu("/用户管理")
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      data: users
    };
  }

  @post("/users")
  public add(ctx: Koa.Context) {
    users.push(ctx.resquest.body);
    ctx.body = {
      ok: 1
    };
  }
}
