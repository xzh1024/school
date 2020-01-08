const Vue = require('vue')
const fs = require('fs')
const path = require('path')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()

const renderer = require('vue-server-renderer').createRenderer({
    // template: fs.readFileSync('./index.template.html', 'utf-8')
    template: fs.readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')
})

const createApp = require('./app')

server.get('*', (req, res) => {
    console.log(req.url);
    // const app = new Vue({
    //     data: {
    //         url: req.url
    //     },
    //     template: `<div>访问的 URL 是： {{ url }}</div>`
    // })
    const context = {
        title: '公益服_公益服手游_变态手游公益服_185SY手游公益服',
        meta: `
            <meta name="keywords" content="公益服,公益服手游,变态手游公益服,185SY手游公益服"/>
            <meta name="description" content="185SY手游公益服，千万玩家首选的变态手游公益服平台，权威公益服手游，变态手游公益服大全，益起玩手游公益服盒子让你随时随地玩不停！"/>
          `
    }

    const app = createApp({ url: req.url })

    renderer.renderToString(app, context, (err, html) => {
        console.log(context)
        console.log(html) // html 将是注入应用程序内容的完整页面
        res.end(html);
    })

    // renderer.renderToString(app, (err, html) => {
    //     console.log(app);
    //     console.log('--------------------------------------');
    //     console.log(html);
    //     if (err) {
    //         res.status(500).end('Internal Server Error')
    //         return
    //     }
    //     res.end(`
    //       <!DOCTYPE html>
    //       <html lang="en">
    //         <head>
    //             <meta charset="utf-8">
    //             <title>Hello</title>
    //         </head>
    //         <body>${html}</body>
    //       </html>
    //     `)
    // })
})

server.listen(8080, function () {
    console.log('服务器已启动...');
})



