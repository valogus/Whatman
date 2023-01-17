/* eslint-disable camelcase */
const e = require('express');
const { Task, Comment, User } = require('../db/models');

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
