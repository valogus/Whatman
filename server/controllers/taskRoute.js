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
  console.log(req.body);
  const promises = req.body.map((el) => {
    const { id, column_id, order } = el;
    return Task.update(
      { column_id, order },
      { where: { id } },
    );
  });
  await Promise.all(promises);
  // const updateTaskPut = await Task.update(
  //   { column_id: newElement.column_id, order: Number(newElement.order) },
  //   {
  //     where: {
  //       id: Number(id),
  //     },
  //     raw: true,
  //     returning: true,
  //   },
  // );
  // const updateoldTaskPut = await Task.update(
  //   { order: Number(oldElement.order) },
  //   {
  //     where: {
  //       id: Number(oldElement.id),
  //     },
  //     raw: true,
  //     returning: true,
  //   },
  // );
  // const [, [task]] = updateTaskPut;
  res.status(200).json(promises);
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
  const { title, project_id, column_id, order } = req.body;
  if (title) {
    const newTask = await Task.create({ title, project_id, column_id, order });
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ created: false });
  }
};
