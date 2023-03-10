/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
const express = require('express');

const app = express();
require('@babel/register');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// импорт вспомогательных ф-й

// вызов функции проверки соединения с базоый данных
// подключаем сессию и файлсторадже для хранения куки
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const dbCheck = require('./db/dbCheck');
const {
  getAllProjectbyUser, getColumnsProjectTasks, getUsersByTask, getCommentssByTask,
} = require('./testFun');

const boardRouter = require('./routes/boardRoute');
const taskRouter = require('./routes/taskRoute');
const columnsRouter = require('./routes/columnsRoute');
const checkAuth = require('./src/routers/checkAuth');
const logoutRout = require('./routes/logout');
const projectsRouter = require('./routes/projectsRoute');
const usersRoute = require('./routes/usersRoute');
const registrationRout = require('./routes/registration');
const loginRout = require('./routes/login');
const myTasks = require('./routes/myTasks');
const usersProjectRout = require('./routes/usersProjectRoute');

dbCheck();

app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// создаем куки
// время жизни cookies, ms (10 дней)
const sessionConfig = {
  name: 'sid',
  store: new FileStore({}),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10,
  },
};

// мидлварка для сессии
app.use(session(sessionConfig));

// проверяем есть ли юзер на странице
app.use((req, res, next) => {
  console.log('\n\x1b[33m', 'req.session.user :', req.session);
  res.locals.username = req.session?.currentUserName;
  next();
});

// getUsersByTask();
app.use('/api/projects', projectsRouter);
app.use('/api/columns', columnsRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/board', boardRouter);
//app.use('/api/checkAuth', checkAuth);
app.use('/api/registration', registrationRout);
app.use('/api/login', loginRout);
app.use('/api/users', usersRoute);
app.use('/api/usersproject', usersProjectRout);
app.use('/', logoutRout);
app.use('/api/myTasks', myTasks);

const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message);
  return console.log(`Сервер запущен на http://localhost:${PORT} `);
});
