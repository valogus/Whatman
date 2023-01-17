/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'John1 Doe',
        password: 'false123',
        email: 'wqwe@mail.ru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'John2 Due',
        password: 'false123',
        email: '1wqwe@mail.ru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'John3 Dae',
        password: 'false123',
        email: '2wqwe@mail.ru',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Projects', [
      {
        title: 'Whatman',
        author: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Jirlo',
        author: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('UsersProjects', [
      {
        junior_id: 1,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        junior_id: 1,
        project_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        junior_id: 3,
        project_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Columns', [
      {
        title: 'К выполнению',
        project_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'В работе',
        project_id: 1,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Завершено',
        project_id: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'засидить бд',
        description: 'Я не знаю что написать',
        project_id: 1,
        column_id: 1,
        order: 0,
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'пиво',
        description: 'сходить купить уже пиво',
        project_id: 1,
        column_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Артем',
        description: 'побороть лень',
        project_id: 1,
        column_id: 1,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Писать клиент',
        description: 'Я не знаю что написать2',
        project_id: 1,
        column_id: 2,
        order: 0,
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Деплой',
        description: '',
        project_id: 1,
        column_id: 2,
        order: 1,
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('UsersTasks', [
      {
        junior_id: 1,
        task_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        junior_id: 1,
        task_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        junior_id: 1,
        task_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        junior_id: 3,
        task_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Comments', [
      {
        title: 'Надо сделать за сегодня',
        UserId: 1,
        task_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Dead line 2 недели',
        UserId: 2,
        task_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Надо сделать до завтра',
        UserId: 1,
        task_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Comments', null, {});

    await queryInterface.bulkDelete('UsersTasks', null, {});

    await queryInterface.bulkDelete('Tasks', null, {});

    await queryInterface.bulkDelete('Columns', null, {});

    await queryInterface.bulkDelete('UsersProjects', null, {});

    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
