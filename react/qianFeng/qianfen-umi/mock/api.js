export default {
  'GET /users': { name: 'kerwin', age: 100 },
  'POST /users/login': (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    res.send({
      ok: username === 'xzh' && password === '123456'
    });
  }
};
