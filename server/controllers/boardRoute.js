const { Project, UsersProject, Column } = require('../db/models');

// загрузка Доски по ID user
// ! Добавить проверку причасности юзера к доске
exports.boardsUser = async (req, res) => {
  const author = req.params?.id;
  try {
    const projects = await Project.findAll(
      {
        where: { author },
        attributes: ['id', 'title', 'author', 'fon'],
        // include: { model: UsersProject, where: { id: author }, attributes: ['email', 'login'] },
        raw: true,
      },
    );

    // Проекты где вы участвуете
    const partnerRequest = await UsersProject.findAll(
      {
        where: { junior_id: author },
        include: { model: Project, attributes: ['id', 'author', 'title', 'fon'] },
      },
    );

    const partnerBoardsData = partnerRequest.map((data) => data.dataValues.Project.dataValues);
    const partnerBoards = partnerBoardsData.filter((el) => el.author !== Number(author));

    res.status(200).json([projects, partnerBoards]);
  } catch (error) {
    res.status(500).json({ msg: 'Ошибка при получении досок' });
  }
};

// Добавление Доски
// router.post('/',
exports.addBoard = async (req, res) => {
  try {
    const newBoard = await Project.create(
      { title: req.body.title, author: req.body.author, fon: JSON.stringify(req.body.fon) },
    );

    await UsersProject.create({
      junior_id: req.body.author, project_id: newBoard.id,
    });

    // newBoard.id;
    const entries = ['К выполнению', 'В работе', 'Завершено'];

    entries.map(async (entrie, ind) => {
      await Column.create(
        { title: entrie, project_id: newBoard.id, order: ind },
      );
    });

    res.status(200).json({ newBoard });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Ошибка при добавление новой таблицы' });
  }
};

// Удаление Доски
// router.delete('/',
exports.delBoard = async (req, res) => {
  try {
    const id = req.body.delItem;
    const delBoard = await Project.destroy({ where: { id } });
    console.log('▶ ⇛ delBoard', delBoard);
    if (delBoard) {
      res.status(200).json({ msg: 'Ваш проект удален' });
    } else {
      res.status(300).json({ msg: 'Не удалось удалить проект' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Ошибка при Удалении доски' });
  }
};
