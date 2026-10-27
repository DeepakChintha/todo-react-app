
import { useEffect, useState } from "react";
import "./App.css";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="New task"
        maxLength={150}
      />
      <button className="add-button" type="submit">
        + Add Task
      </button>
    </form>
  );
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  function saveEdit(event) {
    event.preventDefault();

    const trimmedDraft = draft.trim();
    if (!trimmedDraft) return;

    onEdit(todo.id, trimmedDraft);
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(todo.title);
    setEditing(false);
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Complete ${todo.title}`}
      />

      {editing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Edit task"
            maxLength={150}
            autoFocus
          />
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>

          <div className="item-actions">
            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setDraft(todo.title);
                setEditing(true);
              }}
              aria-label={`Edit ${todo.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>No tasks here</h3>
        <p>Add a task or choose another filter.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

function TodoFilters({ filter, onChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filters" aria-label="Filter tasks">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          className={filter === item ? "filter active-filter" : "filter"}
          onClick={() => onChange(item)}
          aria-pressed={filter === item}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

function TaskSummary({ todos }) {
  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;

  return (
    <div className="summary">
      <div className="summary-card">
        <span>Total Tasks</span>
        <strong>{todos.length}</strong>
      </div>
      <div className="summary-card">
        <span>Remaining</span>
        <strong>{remaining}</strong>
      </div>
      <div className="summary-card">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("college-todo-tasks");
      const parsed = saved ? JSON.parse(saved) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("college-todo-tasks", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title,
      completed: false,
    };

    setTodos((current) => [newTodo, ...current]);
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  }

  function editTodo(id, title) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos((current) =>
      current.filter((todo) => !todo.completed)
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-icon">✓</div>
        <p className="eyebrow">YOUR PERSONAL PRODUCTIVITY SPACE</p>
        <h1>My Todo List</h1>
        <p className="subtitle">
          Organize your day, one task at a time.
        </p>
      </header>

      <section className="todo-card">
        <TodoForm onAdd={addTodo} />

        <TaskSummary todos={todos} />

        <div className="list-heading">
          <div>
            <h2>Your Tasks</h2>
            <p>Stay focused and get things done.</p>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              className="clear-button"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </div>

        <TodoFilters filter={filter} onChange={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </section>

      <footer className="app-footer">
        Built with React · Tasks saved in your browser
      </footer>
    </main>
  );
}

export default App;
