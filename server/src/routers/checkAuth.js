const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  // const user = req.session?.user;
  const user = { login: 'q@q', id: 2 };
  // const user = null;
  console.log('userCheck', user);
  res.json({ user });
});

module.exports = route;
