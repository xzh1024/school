export default [
  {
    url: "/Login",
    method: "post",
    // open: true,
    data: {
      code: "ok",
      data: {
        userId: 1,
        userName: "mock用户",
        companyId: 1,
        companyName: "mock公司"
      }
    }
  }
];
