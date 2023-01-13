const { Column } = require('../db/models');
const { Task } = require('../db/models');

exports.boardColumns = async (req, res) => {
  const project = req.params?.id;

  try {
    const columns = await Column.findAll(
      {
        where: { project_id: project },
        order: [['id', 'ASC']],
        include: {
          model: Task,
        },
      },
    );
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).end();
  }
};
