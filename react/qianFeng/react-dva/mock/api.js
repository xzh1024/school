export default {
  "GET /users": { name: "kerwin", age: 100, location: "chengdu" },
  "POST /users/login": (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    res.send({
      ok: username === "xzh" && password === "123456",
    });
  },
};
