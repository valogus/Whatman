const express = require('express');

const router = express.Router();
// const {Sequelize} = require('')
const { Project, User } = require('../../db/models');

// загрузка Доски с вопросами
router.get('/:id', async (req, res) => {
  const author = req.params?.id;
  console.log('▶ ⇛ author', author);
  try {
    const projects = await Project.findAll(
      {
        attributes: ['id', 'title'],
        include: { model: User, where: { id: author }, attributes: ['email', 'login'] },
        raw: true,
      },
    );
    console.log('▶ ⇛ projects', projects);

    // const allTopics = await Topic.findAll();

    // res.status('200').json({ allBord, allTopics });
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
// Статистика игроков
router.get('/stat', async (req, res) => {
  try {
    const allStat = await Statistic.findAll(
      {
        attributes: [Sequelize.fn('max', Sequelize.col('totalScore')), 'user_id'],
        // order: [['totalScore', 'DESC']],
        group: ['user_id', 'User.id'],
        raw: true,
        include: {
          model: User,
          attributes: ['login'],
        },
        limit: 5,
      },
    )
      .then((data) => data);
    allStat.sort((a, b) => b.max - a.max);
    res.status('200').json(allStat);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;
