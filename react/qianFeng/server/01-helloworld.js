const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');
const Scchema = buildSchema(`
  type Query {
    hello: String,
    getAge: Int,
    getAllNames: [String],
    getAllAges: [Int],
  }
`);

const root = {
  hello: () => {
    // 通过数据库查
    const str = 'hello world';
    return str;
  },
  getAge: () => {
    return 18;
  },
  getAllNames: () => {
    return ['张三', '李四', '王五'];
  },
  getAllAges: () => {
    return [18, 20, 21];
  }
};

const app = express();

app.use('/home', function (req, res) {
  res.send('home data11111222');
});

app.use('/list', function (req, res) {
  res.send('list data');
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: Scchema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(3000, function () {
  console.log('启用3000端口。。。');
});
