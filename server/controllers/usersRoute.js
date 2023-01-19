const { User, UsersProject } = require('../db/models');

// загрузка Доски по ID user
// router.get('/:id',
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(
      {
        attributes: ['id', 'email', 'login'],
        raw: true,
      },
    );
    console.log('▶ ⇛ users', users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).end();
  }
};

// exports.putUser = async (req, res) => {
//   const junior_id = req.params.id;
//   const project_id = req.body.id;
//   console.log(junior_id, project_id);
//   try {
//     const users = await UsersProject.findAll(
//       {
//         where: { junior_id, project_id },
//         raw: true,
//       },
//     );
//     console.log(users);
//     if (users[0]) res.status(300).json();
//     const setUser = await UsersProject.create({ junior_id, project_id });
//     console.log('created', setUser);
//     res.status(200).json(setUser);
//   } catch (error) {
//     res.status(500).end();
//   }
// };
