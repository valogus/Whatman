// const bcrypt = require('bcrypt');
const { User } = require('../db/models');

exports.loginUser = async (req, res) => {
  const {
    email,
    //  password
  } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).send({ message: 'User does not exist' });
      return;
    }
    // const passCheck = await bcrypt.compare(password, user.password);
    // if (passCheck) {
    req.session.currentUserName = user.login;
    req.session.currentUserId = user.id;
    req.session.save(() => {
      res.json({ userName: user.login, userId: user.id });
    });
    // } else {
    //   res.status(500).send({ message: 'Incorrect email or password' });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// router.route('/logout')
//   .get((req, res) => {
//     const { userId } = req.session;

//     if (userId) {
//       try {
//         req.session.destroy();
//         res.clearCookie('user_uid');
//         res.sendStatus(200);
//       } catch (error) {
//         res.json({ error: error.message });
//       }
//     } else {
//       res.redirect('/');
//     }
//   });
