const {
  User, UsersProject, UsersTask, Task,
} = require('../db/models');

// загрузка Доски по ID user
// router.get('/:id',
exports.getUsersProject = async (req, res) => {
  const project_id = req.params.id;
  try {
    const usersproject = await UsersProject.findAll(
      {
        where: { project_id },
        include: [{ model: User, attributes: ['login'] }],
        raw: true,
      },
    );
    console.log('▶ ⇛ usersproject', usersproject);
    res.status(200).json(usersproject);
  } catch (error) {
    res.status(500).end();
  }
};

exports.putUserProject = async (req, res) => {
  const junior_id = req.params.id;
  const project_id = req.body.id;
  console.log(junior_id, project_id);
  try {
    const users = await UsersProject.findAll(
      {
        where: { junior_id, project_id },
        raw: true,
      },
    );
    console.log(users);
    if (users[0]) res.status(300).json();
    const setUser = await UsersProject.create({ junior_id, project_id });
    console.log('created', setUser);
    res.status(200).json(setUser);
  } catch (error) {
    res.status(500).end();
  }
};

exports.deleteUserProject = async (req, res) => {
  const delUserProject = await UsersProject.destroy({ where: { junior_id: req.params.id } });
  const project_id = req.body.id;
  const tasksId = await Task.findAll({ where: { project_id }, raw: true });
  console.log(tasksId);
  const promises = tasksId.map((el) => {
    const { id } = el;
    return UsersTask.destroy({ where: { junior_id: req.params.id, task_id: id } });
  });
  await Promise.all(promises);
  if (delUserProject) {
    res.json({ deleted: true });
  } else {
    res.status(404).json({ delete: false });
  }
};
