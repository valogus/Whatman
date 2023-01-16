const { Column } = require('../db/models');
const { Task } = require('../db/models');

exports.boardColumns = async (req, res) => {
  const project = req.params?.id;

  try {
    const columns = await Column.findAll(
      {
        where: { project_id: project },
        include: [{
          model: Task,
        }],
        order: [[{ model: Task }, 'order', 'ASC']],
      },
    );
    columns.sort((a, b) => a.order - b.order);
    console.log(columns);
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).end();
  }
};

exports.columnPut = async (req, res) => {
  console.log(req.body);
  const promises = req.body.map((el) => {
    const { id, order } = el;
    return Column.update(
      { order },
      { where: { id } },
    );
  });
  await Promise.all(promises);
  res.status(200).json(promises);
};
