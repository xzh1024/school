const Controller = require('egg').Controller;

class ProductController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'product'
    }

    async detail() {
        const { ctx } = this;

        // console.log(ctx.query)
        ctx.body = `id=${ctx.query.id}`;
    }

    async detai2() {
        const { ctx } = this;

        console.log(ctx.params)
        ctx.body = 'info';
    }
}


module.exports = ProductController;