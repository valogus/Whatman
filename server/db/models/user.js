const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Project, UsersProject, Task, UsersTask, Comment,
    }) {
      User.hasMany(Project, { foreignKey: 'author' });
      User.belongsToMany(Project, { through: UsersProject, foreignKey: 'junior_id', otherKey: 'project_id' });
      User.hasMany(UsersProject, { foreignKey: 'junior_id' });
      User.belongsToMany(Task, { through: UsersTask, foreignKey: 'junior_id', otherKey: 'task_id' });
      User.hasMany(UsersTask, { foreignKey: 'junior_id' });
      User.belongsToMany(Task, { through: Comment, foreignKey: 'UserId', otherKey: 'task_id' });
      User.hasMany(Comment, { foreingKey: 'UserId' });
    }
  }

  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'User',
  };
  User.init(attributes, options);
  return User;
};
