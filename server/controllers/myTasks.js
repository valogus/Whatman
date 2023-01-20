const {
  Task, UsersTask,
} = require('../db/models');

exports.allTasksUser = async (req, res) => {
  const author = req.params?.id;
  console.log('author', author);
  try {
    const tasks = await UsersTask.findAll(
      {
        where: { junior_id: author },
        include: {
          model: Task,
        },
      },
    );

    const onlyTasks = tasks.map((el) => el.Task);
    console.log('▶ ⇛ tasks', onlyTasks);
    res.status(200).json(onlyTasks);
  } catch (error) {
    res.status(500).end();
  }
};
