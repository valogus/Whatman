/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      junior_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Projects',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
    await queryInterface.createTable('UsersProjects', attributes);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UsersProjects');
  },
};
