const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Project }) {
      UsersProject.belongsTo(User, { foreignKey: 'junior_id' });
      UsersProject.belongsTo(Project, { foreignKey: 'project_id' });
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
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Projects',
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
    modelName: 'UsersProject',
    tableName: 'UsersProjects',
  };
  UsersProject.init(attributes, options);
  return UsersProject;
};
