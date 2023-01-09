#!/bin/bash
#  Файл выпонняет установку sequelize для postgres, express, ReactSSR

# Для того что бы все сработало:
# 1) chmod +x Express-ReactSSR-sequelize.sh  // файл по умолчанию не исполняемый, перед запуском выполнить эту команду в консоли где расположен файл.
# 2) кидаете его в корень нового проекта.
# 3) Теперь файл можно запускать, введя ./Express-ReactSSR-sequelize.sh в консоли.

mkdir -p server

cd server

npm init -y

echo '{
  "name": "Express-ReactSSR",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js --ignore session --ext js,jsx,json",
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}' > package.json



npm i sequelize pg pg-hstore dotenv express morgan @babel/cli @babel/core @babel/preset-react @babel/register @babel/preset-env react react-dom
npm i -D sequelize-cli nodemon
npx create-gitignore node
npm i session-file-store express-session
npm i bcrypt
npm install cors
npm i axios


echo "const path = require('path');
require('dotenv').config()
 module.exports = {
 'config': path.resolve('db', 'dbconfig.json'),
 'models-path': path.resolve('db', 'models'),
 'seeders-path': path.resolve('db', 'seeders'),
 'migrations-path': path.resolve('db', 'migrations')
 };" > .sequelizerc


npx sequelize init

echo '{
  "development": {
    "use_env_variable": "DEV_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "use_env_variable": "TEST_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "PROD_DB_URL",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "seederStorage": "sequelize",
  "seederStorageTableName": "SequelizeData"
}' > ./db/dbconfig.json


echo "const { sequelize } = require('./models');
module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('База данных успешно подключена.');
  } catch (error) {
    console.error('База не подключена.', error.message);
  }
};" > ./db/dbCheck.js  

echo '
PORT=3100
COOKIE_SECRET=ee29adc3165fecb20efe
DEV_DB_URL=postgres://admindb:admindb@localhost:5432/dbName
TEST_DB_URL=postgres://username:password@localhost:5432/dbName
PROD_DB_URL=postgres://username:password@localhost:5432/dbName' > .env 

echo '
PORT=3100
COOKIE_SECRET=ee29adc3165fecb20efe
DEV_DB_URL=postgres://admindb:admindb@localhost:5432/dbName
TEST_DB_URL=postgres://username_testdb:password@localhost:5432/dbName
PROD_DB_URL=postgres://username:password@server.com/dbName' > .env_example

echo "const express = require('express'); 
const app = express(); 
require('@babel/register');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 


//импорт вспомогательных ф-й
const dbCheck = require('./db/dbCheck');


 // вызов функции проверки соединения с базоый данных
dbCheck();

//подключаем сессию и файлсторадже для хранения куки
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// ! подключаем сессию и файлсторадже для хранения куки в РЕАКТЕ
const corsOptions = {
  credentials: true, 
  origin: 'http://localhost:3000'
}

// app.use(cors());
app.use(cors(corsOptions));
app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//создаем куки
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
  console.log('\n\x1b[33m', 'req.session.user :', req.session?.user);
  res.locals.username = req.session?.user?.name;
  next();
});



const PORT = process.env.PORT || 3100;
app.listen(PORT, (err) => {
  if (err) return console.log('Ошибка запуска сервера.', err.message)
  console.log(\`Сервер запущен на http://localhost:\${PORT} \`);
});" > app.js


echo '{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": { "node": "14" },
          "modules": false
        }
      ],
      "@babel/preset-react"
    ]
  }' > .babelrc


cd ..
npx create-react-app react-app --use-npm

cd react-app

npm i react-router-dom
npm install react-bootstrap bootstrap
npm i redux react-redux 
npm install reducer-redux









