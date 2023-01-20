const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Project, Column, User, UsersTask, Comment,
    }) {
      Task.belongsTo(Project, { foreignKey: 'project_id' });
      Task.belongsToMany(User, { through: UsersTask, foreignKey: 'task_id', otherKey: 'junior_id' });
      Task.hasMany(UsersTask, { foreignKey: 'task_id' });
      Task.belongsToMany(User, { through: Comment, foreignKey: 'task_id', otherKey: 'UserId' });
      Task.hasMany(Comment, { foreignKey: 'task_id' });
      Task.belongsTo(Column, { foreignKey: 'column_id' });
      Task.belongsTo(User, { foreignKey: 'author_id' });
    }
  }

  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
        key: 'id',
      },
    },
    column_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Columns',
        key: 'id',
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  const options = {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks',
  };
  Task.init(attributes, options);
  return Task;
};
