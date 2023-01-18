const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.§
     */
    static associate({ User, Task }) {
      UsersTask.belongsTo(User, { foreignKey: 'junior_id' });
      UsersTask.belongsTo(Task, { foreignKey: 'task_id' });
    }
  }

  const attributes = {
    junior_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tasks',
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
    modelName: 'UsersTask',
    tableName: 'UsersTasks',
  };
  UsersTask.init(attributes, options);
  return UsersTask;
};
