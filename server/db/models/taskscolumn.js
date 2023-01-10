const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TasksColumn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Column, Task }) {
      TasksColumn.belongsTo(Column, { foreignKey: 'column_id' });
      TasksColumn.belongsTo(Task, { foreignKey: 'task_id' });
    }
  }

  const attributes = {
    column_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Columns',
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
    modelName: 'TasksColumn',
  };
  TasksColumn.init(attributes, options);
  return TasksColumn;
};
