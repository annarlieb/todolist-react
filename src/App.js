import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

function getTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  if(todos) {
    return JSON.parse(todos);
  }
  return [];
}


function App() {
  const [todos, setTodos] = useState(getTodosFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // only run when todos changes

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = event.target.elements[0].value;
    setTodos([...todos, newTodo]);
    event.target.reset();
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit = {addTodo}>
        <input type="text" />
        <button>Add</button>
      </form>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;