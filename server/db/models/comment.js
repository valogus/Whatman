const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Task }) {
      Comment.belongsTo(User, { foreignKey: 'user_id' });
      Comment.belongsTo(Task, { foreignKey: 'task_id' });
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
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'Comment',
    tableName: 'Comments',
  };
  Comment.init(attributes, options);
  return Comment;
};
