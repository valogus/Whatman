const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.registerUser = async (req, res) => {
  const { login, email, password } = req.body;
  console.log(req.body);
  const hash = await bcrypt.hash(password, 10);

  try {
    const searchUserName = await User.findOne({ where: { login } });
    const searchUserMail = await User.findOne({ where: { email } });
    console.log(searchUserName);
    if (searchUserName) return res.status(501).json();
    if (searchUserMail) return res.status(502).json();
    const newUser = await User.create({ login, email, password: hash });
    req.session.currentUserName = newUser.login;
    req.session.currentUserId = newUser.id;
    req.session.save(() => {
      res.json({ userName: newUser.login, userId: newUser.id });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
