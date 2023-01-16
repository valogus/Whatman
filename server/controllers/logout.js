exports.userLogout = (req, res) => {
  try {
    if (req.session.currentUserName) {
      req.session.destroy(() => {
        res.clearCookie('sid');
        res.send({ message: 'Logout successful' });
      });
    } else {
      res.send({ message: 'You are not logged in' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
