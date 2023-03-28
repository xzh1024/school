const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');
const Scchema = buildSchema(`
  type Account {
    name: String,
    age: Int,
    sex: Boolean,
    location: String
  }

  type Film {
    id: Int,
    name: String,
    poster: String,
    price: Int
  }

  type Query {
    hello: String,
    getAge: Int,
    getAllNames: [String],
    getAllAges: [Int],
    getAccountInfo: Account,
    getNowplayingList: [Film],
    getFilmDetail(id: Int!): Film
  }
`);
const faskeDb = [
  {
    id: 1,
    name: '111',
    poster: 'http://1111',
    price: 100
  },
  {
    id: 2,
    name: '222',
    poster: 'http://2222',
    price: 200
  },
  {
    id: 3,
    name: '333',
    poster: 'http://3333ß',
    price: 300
  }
];
// 处理器
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
  },
  getAccountInfo: () => {
    return {
      name: '小明',
      age: 18,
      sex: true,
      location: '中国'
    };
  },
  getNowplayingList: () => {
    return faskeDb;
  },
  getFilmDetail: (obj) => {
    console.log(obj);
    const { id } = obj;
    return faskeDb.find((item) => item.id === id);
  }
};

const app = express();

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
