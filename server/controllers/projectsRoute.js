const { UsersProject, User, Task } = require('../db/models');

exports.getAllUserByProject = async (req, res) => {
  const { id } = req.params;
  const users = await UsersProject.findAll(
    {
      where: {
        project_id: id,
      },
      raw: true,
      include: {
        model: User,
        attributes: ['login'],
      },
    },
  );
  res.status(200).json(users);
};
