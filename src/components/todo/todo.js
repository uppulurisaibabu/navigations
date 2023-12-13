// TodoApp.js
import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './todocss.css'; // Import custom CSS

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Todo App</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={addTodo}>
                Add
              </button>
            </div>
          </div>
          <ul className="list-group">
            {todos.map((todo, index) => (
              <li key={index} className="list-group-item">
                <span>{todo}</span>
                <button className="btn btn-danger btn-sm" onClick={() => removeTodo(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
