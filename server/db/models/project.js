const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User, UsersProject, Column, Task,
    }) {
      Project.belongsTo(User, { foreignKey: 'author' });
      Project.belongsToMany(User, { through: UsersProject, foreignKey: 'project_id', otherKey: 'junior_id' });
      Project.hasMany(UsersProject, { foreignKey: 'project_id' });
      Project.hasMany(Column, { foreignKey: 'project_id' });
      Project.hasMany(Task, { foreignKey: 'project_id' });
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
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    fon: {
      type: DataTypes.STRING,
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
    modelName: 'Project',
    tableName: 'Projects',
  };
  Project.init(attributes, options);
  return Project;
};
