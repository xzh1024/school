const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHttp = require('express-graphql');
const Scchema = buildSchema(`
  type Film {
    id: Int,
    name: String,
    poster: String,
    price: Int
  }
  input FilmInput {
    name: String,
    poster: String,
    price: Int
  }

  type Query {
    getNowplayingList: [Film]
  }

  type Mutation {
    createFilm(input: FilmInput): Film,
    updateFilm(id: Int!, input: FilmInput): Film,
    deleteFilm(id: Int!): Int,
  }
`);
let faskeDb = [
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
  getNowplayingList: () => {
    return faskeDb;
  },
  createFilm: ({ input }) => {
    console.log(input);
    const obj = { ...input, id: faskeDb.length + 1 };
    faskeDb.push(obj);
    return obj;
  },
  updateFilm: ({ id, input }) => {
    console.log(input);
    const findData = faskeDb.find((item) => item.id === id);
    Object.assign(findData, input);
    return findData;
  },
  deleteFilm: ({ id }) => {
    faskeDb = faskeDb.filter((item) => item.id !== id);
    return 1;
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
