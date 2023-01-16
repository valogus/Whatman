const { Task } = require('../db/models');

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
