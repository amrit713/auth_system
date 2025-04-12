# Authentication system

A simple full-stack application where users can create and manage tasks. This project is built with a **React** frontend (using **Vite**) and an **Express** backend, providing a clean and modern development setup.

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **API Communication**: RESTful API using Fetch/Axios
- **Styling**: Tailwind CSS / CSS Modules (customizable)

---

## 📁 Project Structure

## 🚀 Features

- User can sign in and sign-up
- Create tasks with title and description
- View a list of all tasks
- Simple and clean UI
- RESTful API integration between frontend and backend
- used postgres database

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:amrit713/auth_system.git
```

After that, open the folder

``` cd backend
npm install or yarn


```

You will find .env example file and put all env variable


```
DATABASE_URL=

PORT=
AUTH_SECRET=
```
run 
```
npx prisma generate
and
npx prisma db push
```
and then
run 
```
npm run dev```
It will run backend

Open the frontend folder in a different terminal

```
npm install or yarn
npm run dev

```

now you ready to go
