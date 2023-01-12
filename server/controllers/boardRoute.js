const { Project } = require('../db/models');

// загрузка Доски по ID user
// router.get('/:id',
exports.boardsUser = async (req, res) => {
  const author = req.params?.id;
  console.log('▶ ⇛ author', author);
  try {
    const projects = await Project.findAll(
      {
        where: { author },
        attributes: ['id', 'title'],
        // include: { model: User, where: { id: author }, attributes: ['email', 'login'] },
        raw: true,
      },
    );
    console.log('▶ ⇛ projects', projects);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).end();
  }
};

// Добавление Доски
// router.post('/',
exports.addBoard = async (req, res) => {
  console.log('ADD BOARD', req.body);
  try {
    const newBoard = await Project.create({ title: req.body.title, author: req.body.author });
    console.log('▶ ⇛ newBoard', newBoard.dataValues);
    res.status(200).json({ newBoard });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
