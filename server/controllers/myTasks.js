const {
  User, Task, UsersTask, Projects,
} = require('../db/models');

exports.allTasksUser = async (req, res) => {
  const author = req.params?.id;
  console.log('author', author);
  try {
    const tasks = await UsersTask.findAll(
      {
        where: { junior_id: author },
        // where: { project_id: author },
        // attributes: ['id', 'title', 'description'],
        include: { model: Task },
        raw: true,
      },
    );

    console.log('▶ ⇛ tasks', tasks);
    res.status(200).json(tasks);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
};
