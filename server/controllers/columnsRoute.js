const { Column } = require('../db/models');
const { Task, UsersProject } = require('../db/models');

exports.isCan = async (req, res) => {
  const { id, userId } = req.params;
  const isCan = await UsersProject.findOne({ where: { project_id: id, junior_id: userId } });
  if (isCan) {
    res.status(200).json({ can: true });
  } else {
    res.status(400).json({ can: false });
  }
};

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

exports.editColumnTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (title) {
    await Column.update({
      title,
    }, { where: { id }, raw: true });
    res.status(200).json({ update: true });
  } else {
    res.status(400).json({ update: false });
  }
};

exports.columnPost = async (req, res) => {
  const { title, project_id, order } = req.body;
  console.log(req.body);
  if (title) {
    const column = await Column.create({ title, project_id, order });
    const sendColumn = await Column.findOne(
      {
        where: { id: column.id },
        include: [{
          model: Task,
        }],
        order: [[{ model: Task }, 'order', 'ASC']],
      },
    );
    res.status(201).json(sendColumn);
  } else {
    res.status(400).json({ created: false });
  }
};

exports.columnDelete = async (req, res) => {
  const delColumn = await Column.destroy({ where: { id: Number(req.params.id) } });
  if (delColumn) {
    res.json({ deleted: true });
  } else {
    res.status(404).json({ delete: false });
  }
};
