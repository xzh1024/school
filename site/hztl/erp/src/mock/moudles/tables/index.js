export default [
  {
    module: "erp",
    url: "/tables",
    method: "post",
    // open: true,
    data: {
      code: "ok",
      data: {
        total: 100,
        size: 10,
        page: 1,
        list: [
          {
            date: "2018-12-28",
            name: "王小虎",
            province: "北京",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
            tag: "家"
          },
          {
            date: "2018-12-29",
            name: "王小虎",
            province: "成都",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
            tag: "公司"
          },
          {
            date: "2018-12-30",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
            tag: "家"
          },
          {
            date: "2018-12-",
            name: "王小虎",
            province: "杭州",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
            tag: "公司"
          }
        ]
      }
    }
  }
];
