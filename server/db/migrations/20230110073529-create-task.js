/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      column_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Columns',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.createTable('Tasks', attributes);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tasks');
  },
};
