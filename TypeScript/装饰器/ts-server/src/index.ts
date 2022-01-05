import * as Koa from "koa";
import * as bodify from "koa-body";
import * as Router from "koa-router";

const app = new Koa();
app.use(
  bodify({
    multipart: true,
    strict: true
  })
);

const router = new Router();
router.get("/abc", ctx => {
  ctx.body = "abc";
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("服务器启动。。。");
});
