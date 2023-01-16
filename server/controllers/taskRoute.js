/* eslint-disable camelcase */
const { Task, Comment, User } = require('../db/models');

// exports.tasksColumns = async (req, res) => {
//   const project = req.params?.id;
//   try {
//     const tasks = await Task.findAll(
//       {
//         where: {
//           project_id: project,
//         },
//         raw: true,
//       },
//     );
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).end();
//   }
// };

exports.taskPut = async (req, res) => {
  const { id } = req.params;
  const { boardId } = req.body;
  const updateTaskPut = await Task.update(
    { column_id: boardId },
    {
      where: {
        id: Number(id),
      },
      raw: true,
      returning: true,
    },
  );
  const [, [task]] = updateTaskPut;
  res.json(task);
};

exports.taskDescription = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateDescriptionTask = await Task.update(
    { description },
    {
      where: {
        id: Number(id),
      },
      raw: true,
      returning: true,
    },
  );
  const [, [task]] = updateDescriptionTask;
  res.json(task);
};

exports.taskComments = async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.findAll(
    {
      where: {
        task_id: Number(id),
      },
      raw: true,
      include: {
        model: User,
        attributes: ['login'],
      },
    },
  );
  res.status(200).json(comments);
};

exports.addCommentToTask = async (req, res) => {
  const { title, task_id, UserId } = req.body;
  if (title) {
    const comment = await Comment.create({ title, task_id, UserId });
    res.status(201).json(comment);
  } else {
    res.status(400).json({ created: false });
  }
};

exports.addTaskToColumn = async (req, res) => {
  const { title, project_id, column_id } = req.body;
  if (title) {
    const newTask = await Task.create({ title, project_id, column_id });
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ created: false });
  }
};
