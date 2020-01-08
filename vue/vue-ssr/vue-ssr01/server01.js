const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })

    renderer.renderToString(app, (err, html) => {
        console.log(app);
        console.log('--------------------------------------');
        console.log(html);
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Hello</title>
            </head>
            <body>${html}</body>
          </html>
        `)
    })
})

server.listen(8080, function () {
    console.log('服务器已启动...');
})
