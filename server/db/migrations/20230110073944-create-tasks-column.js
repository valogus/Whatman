/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      column_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Columns',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      task_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Tasks',
          key: 'id',
        },
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
    await queryInterface.createTable('TasksColumns', attributes);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('TasksColumns');
  },
};
