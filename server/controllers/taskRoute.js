const { Task } = require('../db/models');

exports.tasksColumns = async (req, res) => {
  const project = req.params?.id;
  try {
    const tasks = await Task.findAll(
      {
        where: {
          project_id: project,
        },
        raw: true,
      },
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).end();
  }
};
