![image]([https://user-images.githubusercontent.com/112811051/215347300-40fee01b-09aa-40a9-b28b-a47aa49dea37.png](https://i.yapx.ru/VaNa0.png))
![Logo](https://i.yapx.ru/VaNa0.png)

# Whatman App

Whatman is a complete application (including Front and Backend) for collaborative project work using a kanban board. You can create and move (using Drag-n-Drop) boards, tasks, and columns to schedule your tasks and track their progress.  The app allows you to add other users to your boards, assign people responsible for tasks, leave comments and task descriptions. You can also choose a background for your boards.

## Features

- Create an account to access the app.
- Create boards and choose a background.
![addUsers](https://i.yapx.ru/VaOAD.gif)
- Create tasks and drag and drop
![Dnd](https://i.yapx.ru/VaNXA.gif)
- Add users to the project and responsible user to the task
![addUsers](https://i.yapx.ru/VaN1E.gif)
- All possible CRUD  synchronized with the database are present.



## Run Locally

Clone the project

```bash
  git clone https://github.com/valogus/Whatman.git
```
Backend:

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```


Copy .env_example and create .env
Change login, password and database name (PostgresSQl must be installed) in .env.
```bash
  DEV_DB_URL=postgres://login:password@localhost:5432/databaseName
```

Create database and start the server.

```bash
  npm run dbr
  npm start
```

Frontend:

Go to the react-app directory(in new terminal)

```bash
  cd react-app
```

Install dependencies

```bash
  npm install
```

Start the server
```bash
  npm start
```

