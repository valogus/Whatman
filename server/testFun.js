/* eslint-disable no-unused-vars */
const {
  User, Project, Task, Column, UsersProject, UsersTask, Comment,
} = require('./db/models');

async function getAllProjectbyUser() {
  const projects = await Project.findAll({ include: { model: User, where: { id: 1 } }, raw: true });
  console.log(projects);
}

async function getColumnsProjectTasks() {
  const result = await Column.findAll({
    where: {
      project_id: 1,
    },
    include: {
      model: Task,
    },
    raw: true,
  });
  console.log(result);
}

async function getUsersByTask() {
  const task = await Task.findAll(
    { where: { id: 1 }, include: { model: UsersTask, include: { model: User } }, raw: true },
  );
  console.log(task);
}

async function getCommentssByTask() {
  const task = await Task.findAll(
    {
      where: { id: 1 },
      include: { model: Comment, include: { model: User, attributes: ['login'] } },
      raw: true,
    },
  );
  console.log(task);
}

module.exports = {
  getAllProjectbyUser, getColumnsProjectTasks, getUsersByTask, getCommentssByTask,
};
