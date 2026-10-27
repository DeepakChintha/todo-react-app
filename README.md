# TODO Application Using React

A simple, responsive, and user-friendly TODO application built using React and JavaScript. This project helps users organize their daily activities by adding, editing, completing, deleting, and filtering tasks.

## Live Demo

**Live Website:** https://deepakchintha.github.io/todo-react-app/

**GitHub Repository:** https://github.com/DeepakChintha/todo-react-app

> Note: The live website will be available after GitHub Pages deployment succeeds.

## Project Overview

The TODO Application is a frontend web application developed as a college mini project. It provides an interactive interface for managing daily tasks and tracking task completion.

The application uses React components to organize the user interface and browser local storage to save tasks between page refreshes.

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as completed or active
- Delete individual tasks
- Filter tasks by All, Active, and Completed
- View total, remaining, and completed task counts
- Clear all completed tasks
- Automatically save tasks in browser local storage
- Responsive design for desktop and mobile screens

## Technologies Used

- **React:** Building reusable UI components
- **JavaScript:** Implementing application logic
- **HTML5:** Structuring the web application
- **CSS3:** Styling and responsive design
- **Vite:** Development server and build tool
- **Node.js and npm:** Project development and dependency management
- **Git and GitHub:** Version control and source code hosting
- **GitHub Pages:** Website deployment

## Project Structure

```text
todo-react-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Installation and Setup

### Prerequisites

Install the following software:

- Node.js (LTS version)
- npm
- Git
- Visual Studio Code

### Step 1: Clone the repository

```bash
git clone https://github.com/DeepakChintha/todo-react-app.git
```

### Step 2: Navigate to the project directory

```bash
cd todo-react-app
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Run the application

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

### Step 5: Build for production

```bash
npm run build
```

## How to Use

1. Open the application in your browser.
2. Enter a task in the input field.
3. Click **Add Task** to add it to your list.
4. Use the checkbox to mark a task as completed.
5. Click **Edit** to update a task.
6. Click **Delete** to remove a task.
7. Use the All, Active, and Completed filters to organize tasks.
8. Click **Clear completed** to remove all completed tasks.

## Data Storage

The application uses the browser's `localStorage` API to persist tasks. Tasks remain available after refreshing the page in the same browser, provided the stored data is not cleared.

The current version does not use a separate backend server or cloud database.

## Learning Outcomes

This project demonstrates:

- React functional components
- React Hooks: `useState` and `useEffect`
- Props and component reusability
- Event handling and form submission
- Array methods such as `map()` and `filter()`
- Browser local storage
- Responsive web design
- Git version control and GitHub Pages deployment

## Future Enhancements

- Add task priorities and due dates
- Add search functionality
- Introduce user authentication
- Connect to a backend API and database
- Synchronize tasks across devices

## Author

**Deepak Chintha**

Developed as a college mini project to learn React development and web application deployment.

## License

This project is intended for educational and learning purposes.
