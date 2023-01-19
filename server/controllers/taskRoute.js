/* eslint-disable camelcase */
const {
  Task, Comment, User, UsersTask,
} = require('../db/models');

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

exports.taskAuthor = async (req, res) => {
  const { id } = req.params;
  const login = await User.findByPk(id);
  res.status(200).json(login);
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
  const {
    title, project_id, column_id, order, author_id,
  } = req.body;
  if (title) {
    const newTask = await Task.create({
      title, project_id, column_id, order, description: '', author_id,
    });
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ created: false });
  }
};

exports.deleteTask = async (req, res) => {
  const delTask = await Task.destroy({ where: { id: Number(req.params.id) } });
  if (delTask) {
    const { id, column_id, order } = req.body;
    await Task.update(
      { column_id, order },
      { where: { id } },

    );

    res.json({ deleted: true });
  } else {
    res.status(404).json({ delete: false });
  }
};

exports.addExecutorToTask = async (req, res) => {
  const { junior_id, task_id } = req.body;
  const izZap = await UsersTask.findOne({
    where: {
      task_id,
    },
  });
  if (izZap) {
    await UsersTask.update(
      { junior_id, task_id },
      {
        where: { task_id },
        raw: true,
        returning: true,
      },
    );
    res.json({ updated: true });
  } else {
    console.log('Такой записи еще нет');
    await UsersTask.create({ junior_id, task_id });
    res.status(201).json({ created: true });
  }
};

exports.taskExecutor = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    raw: true,
    include: {
      model: UsersTask,
      where: {
        task_id: id,
      },
    },
  });
  res.status(200).json(user);
};

exports.ediTitleTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (title) {
    await Task.update(
      { title },
      {
        where: { id },
        raw: true,
        returning: true,
      },
    );
    res.status(200).json({ updated: true });
  } else {
    res.status(404).json({ updated: false });
  }
};
